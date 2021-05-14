from rest_framework import viewsets,permissions

from .models import Collection
from .serializers import CollectionSerializer

# 資料検索を返す
from .ndl import searchMaterial


class CollectionViewSet(viewsets.ModelViewSet):
  queryset = Collection.objects.all()
  serializer_class = CollectionSerializer
  permission_classes = [permissions.IsAuthenticated]