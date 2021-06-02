from enum import unique
from django.db import models

from accounts.models import CustomUser


class Collection(models.Model):
  name = models.CharField(max_length=50)
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='user', related_name='collections')
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
      return self.name

class Book(models.Model):
  title = models.CharField(max_length=100, null=False)
  creator = models.CharField(max_length=100)
  publisher = models.CharField(max_length=30)
  issued = models.CharField(max_length=10)

  def __str__(self):
    return self.title


class CollectionDetail(models.Model):
  collection = models.ForeignKey(Collection,on_delete=models.CASCADE, related_name='books')
  book = models.ForeignKey(Book, on_delete=models.PROTECT)

  def __str__(self) -> str:
      return super().__str__()