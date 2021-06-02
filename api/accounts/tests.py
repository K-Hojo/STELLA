from django.urls import reverse
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase
from .models import CustomUser
from rest_framework.authtoken.models import Token

# Create your tests here.
class UserTests(TestCase):
  def test_create_account(self):
    expectedUser = {'username':'user1', 'email':'user1@example.com', 'password':'user1password'}
    user = CustomUser.objects.create(username='user1', email='user1@example.com', password='user1password')
    self.assertEqual(CustomUser.objects.count(), 1)
    self.assertEqual(expectedUser,{'username': user.username, 'email': user.email,'password': user.password})


class UserAPITests(APITestCase):
  def test_create_account(self):
    url = reverse('rest_register')
    data = {'username':'user1', 'email':'user1@example.com', 'password1':'user1password', 'password2': 'user1password'}
    response = self.client.post(url, data, format='json')
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertEqual(CustomUser.objects.count(), 1)
    self.assertEqual(CustomUser.objects.get().username, 'user1')
    self.assertEqual(Token.objects.count(), 1)
    self.assertEqual(Token.objects.get().user.username, 'user1')