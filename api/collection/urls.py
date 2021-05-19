from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'collection',views.CollectionViewSet)
router.register(r'book',views.BookViewSet)

app_name = 'collection'
urlpatterns = [
  path('search/',views.searchMaterial, name='search'),
  path('',include(router.urls)),
]