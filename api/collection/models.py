from django.db import models
from django.contrib.postgres.fields import ArrayField

from accounts.models import CustomUser

def book_json_default_value():
  return {"title":"","creator":"","publisher":"","issued":""}

class Collection(models.Model):
  name = models.CharField(max_length=50)
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE,verbose_name="user")
  books = ArrayField(
    models.JSONField(
      blank=True,
      null=False,
      default=book_json_default_value
    )
  )
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
      return self.name
