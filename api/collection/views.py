from django.shortcuts import render
from django.http import JsonResponse


from .ndl import searchMaterial


def hello(request):
  response = JsonResponse({'response_text':'しぶりんめっかわ'})
  # response['Access-Control-Allow-Origin'] = 'localhost:3000/'
  return response