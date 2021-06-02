from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from rest_framework.authtoken.models import Token
from accounts.models import CustomUser
from .models import *
from .views import *
# Create your tests here.

class CollectionAPITests(APITestCase):
  def setUp(self):
    registration_url = reverse("rest_register")
    self.user1 = {'username':'user1', 'email':'user1@example.com', 'password1':'user1password', 'password2': 'user1password'}
    self.user2 = {'username':'user2', 'email':'user2@example.com', 'password1':'user2password', 'password2': 'user2password'}
    self.client.post(registration_url, self.user1, format='json')
    self.client.post(registration_url, self.user2, format='json')
    self.token1 = Token.objects.get(user__username='user1').key
    self.token2 = Token.objects.get(user__username='user2').key
    self.no_books = []
    self.four_books = [{'book':{'title':f'title{i}', 'creator':f'creator{i}', 'publisher':f'publisher{i}', 'issued':'2021'}} for i in range(1,5)]


  def test_create_collection(self):
    collection_url = reverse("collection:collection-list")
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1)

    # check collection with no books
    data_no_books = {'name':'collection1', 'books':self.no_books}
    response_no_books = self.client.post(collection_url, data_no_books, format='json')
    self.assertEqual(response_no_books.status_code, status.HTTP_201_CREATED)
    self.assertEqual(Collection.objects.count(), 1)
    self.assertEqual(response_no_books.data['user']['username'], self.user1['username'])
    self.assertEqual(response_no_books.data['name'], data_no_books['name'])
    self.assertEqual(len(response_no_books.data['books']), 0)

    #check collection with four books
    data_four_books = {'name':'collection2', 'books':self.four_books}
    response_four_books = self.client.post(collection_url, data_four_books, format='json')
    self.assertEqual(response_four_books.status_code, status.HTTP_201_CREATED)
    self.assertEqual(Collection.objects.count(), 2)
    self.assertEqual(response_four_books.data['user']['username'], self.user1['username'])
    self.assertEqual(response_four_books.data['name'], data_four_books['name'])
    self.assertEqual(len(response_four_books.data['books']), 4)


  def test_get_collections_list(self):
    collection_url = reverse("collection:collection-list")
    # create user1's 4 collections
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1)
    list = [{'name':f'user1collection{i}', 'books':self.no_books} for i in range(1,5)]
    for collection in list:
      self.client.post(collection_url, collection, format='json')

    # check if user1 can get own 4 collections
    response = self.client.get(collection_url)
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data['count'], 4)
    self.assertEqual(response.data['results'][0]['user']['username'], self.user1['username'])

    # check if no collection can be got without authorization
    self.client.credentials()
    response = self.client.get(collection_url)
    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    #check if user2 can get own only collection
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token2)
    data = {'name':'user2collection1', 'books':self.no_books}
    self.client.post(collection_url, data, format='json')
    response = self.client.get(collection_url)
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data['count'], 1)
    self.assertEqual(response.data['results'][0]['name'], data['name'])
    self.assertEqual(response.data['results'][0]['user']['username'], self.user2['username'])


  def test_delete_collection(self):
    collection_url = reverse("collection:collection-list")
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1)
    data_no_books = {'name':'collection1', 'books':self.no_books}
    response_no_books = self.client.post(collection_url, data_no_books, format='json')
    id = response_no_books.data['id']
    delete_url = reverse("collection:collection-detail", kwargs={'pk':id})

    # check if an unauthorized user can't delete user1's collection
    self.client.credentials()
    unauth_response_delete_collection = self.client.get(delete_url)
    self.assertEqual(unauth_response_delete_collection.status_code, status.HTTP_401_UNAUTHORIZED)

    #check if user2 can't get user1's collection
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token2)
    other_response_delete_collection = self.client.get(delete_url)
    self.assertEqual(other_response_delete_collection.status_code, status.HTTP_404_NOT_FOUND)

    # check if user1 can delete own collection
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1)
    own_response_delete_collection = self.client.delete(delete_url)
    self.assertEqual(own_response_delete_collection.status_code, status.HTTP_204_NO_CONTENT)


class CollectionDetailAPITests(APITestCase):
  def setUp(self):
    registration_url = reverse("rest_register")
    self.user1 = {'username':'user1', 'email':'user1@example.com', 'password1':'user1password', 'password2': 'user1password'}
    self.user2 = {'username':'user2', 'email':'user2@example.com', 'password1':'user2password', 'password2': 'user2password'}
    self.client.post(registration_url, self.user1, format='json')
    self.client.post(registration_url, self.user2, format='json')
    self.token1 = Token.objects.get(user__username='user1').key
    self.token2 = Token.objects.get(user__username='user2').key
    self.no_books = []
    self.four_books = [{'book':{'title':f'title{i}', 'creator':f'creator{i}', 'publisher':f'publisher{i}', 'issued':'2021'}} for i in range(1,5)]
    self.collection_four_books = {'name':'collection_four_books','books':self.four_books}

    # create user1's collection with 4 books
    self.collection_url = reverse("collection:collection-list")
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1)
    response = self.client.post(self.collection_url, self.collection_four_books, format='json')
    self.assertEqual(len(response.data['books']), 4)
    self.collection = response.data['id']
    self.detail_url = reverse("collection:detail_list",kwargs={'collection':self.collection})
    self.pk = response.data['books'][0]['id']
    self.book_url = reverse("collection:detail_item",kwargs={'collection':self.collection,'pk':self.pk})


  def test_get_books(self):
    # check if user1 can get own books
    own_response_detail = self.client.get(self.detail_url)
    self.assertEqual(own_response_detail.status_code, status.HTTP_200_OK)
    self.assertEqual(len(own_response_detail.data['results']), 4)

    # check if no books can be got without authorization
    self.client.credentials()
    response_detail = self.client.get(self.detail_url)
    self.assertEqual(response_detail.status_code, status.HTTP_401_UNAUTHORIZED)

    # check if user2 can't get others's books
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token2)
    others_response_detail = self.client.get(self.detail_url)
    self.assertEqual(others_response_detail.status_code, status.HTTP_200_OK)
    self.assertEqual(len(others_response_detail.data['results']), 0)


  def test_create_books(self):
    # check if user1 can add a new book to own books
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1)
    new_book = {'title':'new title', 'creator': 'new creator', 'publisher': 'new publisher', 'issued':'2021'}
    response_add_own = self.client.post(self.detail_url, {'id':self.collection, 'book':new_book}, format='json')
    self.assertEqual(response_add_own.status_code, status.HTTP_201_CREATED)
    self.assertEqual(response_add_own.data['book']['title'], new_book['title'])
    own_response_detail = self.client.get(self.detail_url)
    self.assertEqual(own_response_detail.status_code, status.HTTP_200_OK)
    self.assertEqual(len(own_response_detail.data['results']), 5)

    # check if user1 can add the same book to another own books
    same_book = new_book.copy()
    response_another = self.client.post(self.collection_url, {'name':'another_collection','books':self.four_books}, format='json')
    another_collection = response_another.data['id']
    another_detail_url = reverse("collection:detail_list",kwargs={'collection':another_collection})
    response_add_own_another = self.client.post(another_detail_url, {'id':another_collection,'book':same_book}, format='json')
    self.assertEqual(response_add_own_another.status_code, status.HTTP_201_CREATED)

    # check if an unauthorized user can't add a book to user1's collection
    fuga_book = {'title':'fuga', 'creator': 'fuga', 'publisher': 'fuga', 'issued':'2021'}
    self.client.credentials()
    response_add_others = self.client.post(self.detail_url, {'id':self.collection,'book':fuga_book}, format='json')
    self.assertEqual(response_add_others.status_code, status.HTTP_401_UNAUTHORIZED)

    # check if user2 can't add a book to user1's collection
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token2)
    response_add_others = self.client.post(self.detail_url, {'id':self.collection,'book':fuga_book}, format='json')
    self.assertEqual(response_add_others.status_code, status.HTTP_403_FORBIDDEN)


  def test_get_book(self):
    # check if user1 can get own book item
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1)
    own_response_book = self.client.get(self.book_url)
    self.assertEqual(own_response_book.status_code, status.HTTP_200_OK)
    self.assertEqual(own_response_book.data['id'], self.pk)

    # check if an unauthorized user can't get user1's book item
    self.client.credentials()
    unauth_response_book = self.client.get(self.book_url)
    self.assertEqual(unauth_response_book.status_code, status.HTTP_401_UNAUTHORIZED)

    #check if user2 can't get user1's book item
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token2)
    other_response_book = self.client.get(self.book_url)
    self.assertEqual(other_response_book.status_code, status.HTTP_404_NOT_FOUND)


  def test_delete_book(self):
    # check if an unauthorized user can't delete user1's book item
    self.client.credentials()
    unauth_response_delete_book = self.client.get(self.book_url)
    self.assertEqual(unauth_response_delete_book.status_code, status.HTTP_401_UNAUTHORIZED)

    #check if user2 can't get user1's book item
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token2)
    other_response_delete_book = self.client.get(self.book_url)
    self.assertEqual(other_response_delete_book.status_code, status.HTTP_404_NOT_FOUND)

    # check if user1 can delete own book item
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1)
    own_response_delete_book = self.client.delete(self.book_url)
    self.assertEqual(own_response_delete_book.status_code, status.HTTP_204_NO_CONTENT)