from django.urls import path

from django.views.generic import TemplateView

index_view = TemplateView.as_view(template_name="index.html")

app_name = 'accounts'
urlpatterns = [
  path('',index_view, name = 'index')
]