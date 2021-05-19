from rest_framework import serializers
from .models import Collection, Book, CollectionDetail
from accounts.serializers import UserSerializer


class BookSerializer(serializers.ModelSerializer):
  class Meta:
    model = Book
    fields = ('title', 'creator', 'publisher', 'issued')


class CollectionDetailSerializer(serializers.ModelSerializer):
  book = BookSerializer()
  class Meta:
    model = CollectionDetail
    fields = ('book',)


class CollectionSerializer(serializers.ModelSerializer):
  user = UserSerializer()
  books = CollectionDetailSerializer(many=True)
  class Meta:
    model = Collection
    fields = ('name', 'user', 'created_at', 'updated_at', 'books')



