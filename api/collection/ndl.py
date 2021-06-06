import lxml.etree
import requests
from django.http import JsonResponse

def searchMaterial(req):
  title = ''
  ndc = ''
  page = '1'
  if 'title' in req.GET:
    title = req.GET['title']
    print(title)
  if 'ndc' in req.GET:
    ndc = req.GET['ndc']
  if 'page' in req.GET:
    page = req.GET['page']
  start = str((int(page) - 1) * 10 + 1)
  base = "https://iss.ndl.go.jp/api/sru?operation=searchRetrieve&recordSchema=dcndl_simple&maximumRecords=10"
  url = base + "&startRecord=" + start + "&query=mediatype=1 AND title=" + title + " AND ndc=" + ndc
  print(url)
  r = requests.get((url))
  tree = lxml.etree.XML(r.content)
  ns_srw = 'http://www.loc.gov/zing/srw/'
  ns_dc = 'http://purl.org/dc/elements/1.1/'
  ns_dcndl_simple = 'http://ndl.go.jp/dcndl/dcndl_simple/'
  ns_dcterms = 'http://purl.org/dc/terms/'
  if not tree.xpath('srw:numberOfRecords', namespaces={'srw':ns_srw}):
    return JsonResponse({
      "numberOfRecords": 0,
      "result": [{
        "title":"検索結果のデータが正しくありません。",
        "creator":"",
        "publisher":"",
        "issued":"",
      }]
    })
  else:
    numberOfRecords = tree.xpath('srw:numberOfRecords', namespaces={'srw':ns_srw})[0].text
    if numberOfRecords == 0:
      return JsonResponse({
        "numberOfRecords": 0,
        "result": [{
          "title":"該当するデータがありません。",
          "creator":"",
          "publisher":"",
          "issued":"",
        }]
      })
    else:
      records = tree.xpath('srw:records', namespaces={'srw':ns_srw})[0]
      result = []
      for record in records:
        data = record.xpath('srw:recordData', namespaces={'srw':ns_srw})[0]
        dc = data.xpath('srw:dc', namespaces={'srw':ns_dcndl_simple})[0]
        title = dc.xpath('dc:title', namespaces={'dc':ns_dc})[0].text
        if dc.xpath('dc:creator', namespaces={'dc':ns_dc}):
          creator = dc.xpath('dc:creator', namespaces={'dc':ns_dc})[0].text
        else:
          creator = '著者不明'
        if dc.xpath('dc:publisher', namespaces={'dc':ns_dc}):
          publisher = dc.xpath('dc:publisher', namespaces={'dc':ns_dc})[0].text
        else:
          publisher = '出版社不明'
        if dc.xpath('dcterms:issued', namespaces={'dcterms':ns_dcterms}):
          issued = dc.xpath('dcterms:issued', namespaces={'dcterms':ns_dcterms})[0].text
        else:
          issued = '出版年不明'
        result.append({'title': title, 'creator': creator, 'publisher': publisher, 'issued': issued})
      return JsonResponse({"numberOfRecords": numberOfRecords, "result": result})
      # return {"numberOfRecords": numberOfRecords, "result": result}



if __name__ == '__main__':
  title = "マリーアントワネット"
  ndc = "2"
  print(searchMaterial(subject,ndc))