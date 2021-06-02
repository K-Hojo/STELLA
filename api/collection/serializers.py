from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
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
    fields = ('id','collection','book',)
    read_only_fields = ['collection',]
    ordering = ['id']


  def create(self, validated_data):
    bookdata = validated_data.pop('book')
    same = Book.objects.filter(**bookdata).order_by('id')
    if same:
      book = same[0]
    else:
      book = Book.objects.create(**bookdata)
    validated_data['book'] = book
    detail = CollectionDetail.objects.create(**validated_data)
    return detail


class CollectionSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  books = CollectionDetailSerializer(many=True)
  class Meta:
    model = Collection
    fields = ('id', 'name', 'user', 'created_at', 'updated_at', 'books')
    read_only_fields = ('user','created_at','updated_at')
    depth = 2

  # 該当するbookがなければBookのインスタンスを作り、CollectionDetailのインスタンスも作る
  def create(self, validated_data):
    books = validated_data.pop('books')
    collection = Collection.objects.create(**validated_data)
    for book in books:
      bookdata = book['book']
      same = Book.objects.filter(**bookdata).order_by('id')
      if same:
        book = same[0]
      else:
        book = Book.objects.create(**bookdata)
      CollectionDetail.objects.create(collection=collection, book=book)
    return collection






