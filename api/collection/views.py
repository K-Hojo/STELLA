from rest_framework import viewsets, permissions, status
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
  serializer_class = CollectionSerializer
  permission_classes = [permissions.IsAuthenticated]

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)

  def get_queryset(self):
      user = self.request.user
      return Collection.objects.filter(user=user)

class CollectionDetailViewSet(viewsets.ModelViewSet, MultipleFieldLookupMixin):
  serializer_class = CollectionDetailSerializer
  lookup_fields = ['collection','pk']
  permission_classes = [permissions.IsAuthenticated]

  def get_queryset(self):
      user = self.request.user
      return CollectionDetail.objects.filter(collection__user=user)

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

  def create(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    id=request.data.pop('id')
    collection = Collection.objects.get(id=id)
    if collection.user == request.user:
      self.perform_create(serializer, collection)
      headers = self.get_success_headers(serializer.data)
      return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    else:
      return Response({"detail":"ログインしているユーザーとコレクションの所有者が異なります。正しいアカウントでログインして再度お試しください。"},status=status.HTTP_403_FORBIDDEN)


  def perform_create(self, serializer,collection):
    serializer.save(collection=collection)


class BookViewSet(viewsets.ModelViewSet):
  queryset = Book.objects.all()
  serializer_class = BookSerializer
  permission_classes = [permissions.IsAdminUser]