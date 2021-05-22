from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Collection, Book, CollectionDetail
from .serializers import CollectionSerializer, BookSerializer, CollectionDetailSerializer

# 資料検索を返す
from .ndl import searchMaterial

class MultipleFieldLookupMixin:
  def get_list(self,request,*args,**kwargs):
      queryset = self.get_queryset()
      filter = {}
      for field in self.lookup_fields:
        if kwargs.get(field, None):
          filter[field] = kwargs[field]
      obj = queryset.filter(**filter).order_by('id')
      self.check_object_permissions(request, obj)
      return obj

  def get_obj(self, request, *args, **kwargs):
    queryset = self.get_queryset()
    filter = {}
    for field in self.lookup_fields:
      if kwargs.get(field, None):
        filter[field] = kwargs[field]

    obj = get_object_or_404(queryset, **filter)
    self.check_object_permissions(request, obj)
    return obj


class CollectionViewSet(viewsets.ModelViewSet):
  queryset = Collection.objects.all()
  serializer_class = CollectionSerializer
  permission_classes = [permissions.IsAuthenticated]

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)


class CollectionDetailViewSet(viewsets.ModelViewSet, MultipleFieldLookupMixin):
  queryset = CollectionDetail.objects.all()
  serializer_class = CollectionDetailSerializer
  lookup_fields = ['collection','pk']
  permission_classes = [permissions.IsAuthenticated]

  def list(self,request,*args,**kwargs):
    queryset = self.get_list(request,*args,**kwargs)

    page = self.paginate_queryset(queryset)
    if page is not None:
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    serializer = self.get_serializer(queryset, many=True)
    return Response(serializer.data)

  def retrieve(self, request, *args, **kwargs):
    instance = self.get_obj(request, *args, **kwargs)
    serializer = self.get_serializer(instance)
    return Response(serializer.data)

  def perform_create(self, serializer):
    id=self.kwargs['collection']
    collection = Collection.objects.get(id=id)
    serializer.save(collection=collection)


class BookViewSet(viewsets.ModelViewSet):
  queryset = Book.objects.all()
  serializer_class = BookSerializer
  permission_classes = [permissions.IsAdminUser]