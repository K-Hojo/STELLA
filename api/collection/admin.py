from django.contrib import admin

from .models import Collection, Book, CollectionDetail


admin.site.register(Collection)
admin.site.register(Book)
admin.site.register(CollectionDetail)