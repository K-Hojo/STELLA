from rest_framework import serializers
from .models import Collection

class CollectionSerializer(serializers.Serializer):
  class Meta:
    model = Collection
    fields = '__all__'