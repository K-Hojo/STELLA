from rest_framework import viewsets,permissions

from .models import Collection, Book, CollectionDetail
from .serializers import CollectionSerializer, BookSerializer, CollectionDetailSerializer

# 資料検索を返す
from .ndl import searchMaterial


class CollectionViewSet(viewsets.ModelViewSet):
  queryset = Collection.objects.all()
  serializer_class = CollectionSerializer
  permission_classes = [permissions.IsAuthenticated]


class BookViewSet(viewsets.ModelViewSet):
  queryset = Book.objects.all()
  serializer_class = BookSerializer
  permission_classes = [permissions.IsAdminUser]