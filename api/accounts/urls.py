from django.urls import path
from . import views

from django.views.generic import TemplateView
# from .views import GoogleLogin



index_view = TemplateView.as_view(template_name="index.html")

app_name = 'accounts'
urlpatterns = [
  path('',index_view, name = 'index'),
  path('me/',views.CurrentUser.as_view(), name = 'me'),
  path('registration/',views.Registration.as_view(), name = 'registration'),
  path('users/',views.UserList.as_view(), name = 'users'),
  path('user-detail/<int:pk>/',views.UserDetail.as_view(), name = 'user-detail'),

]