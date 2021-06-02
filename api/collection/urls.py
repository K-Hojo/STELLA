from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'collection',views.CollectionViewSet, basename='collection')
detail_list = views.CollectionDetailViewSet.as_view({'get':'list', 'post':'create'})
detail_item = views.CollectionDetailViewSet.as_view({'get':'retrieve', 'delete': 'destroy'})

app_name = 'collection'
urlpatterns = [
  path('search/',views.searchMaterial, name='search'),
  path('collection/<int:collection>/books/',detail_list, name='detail_list'),
  path('collection/<int:collection>/books/<int:pk>',detail_item, name='detail_item'),
  path('',include(router.urls)),
]