from django.urls import path

from . import views


app_name = 'collection'
urlpatterns = [
  path('search/',views.searchMaterial, name='search'),
  path('hello/',views.hello, name='hello'),
]