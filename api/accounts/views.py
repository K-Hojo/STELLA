from django.http import Http404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics
from .serializers import (
    UserSerializer,
    UserRegistrationSerializer,
)
from .models import CustomUser


class UserList(APIView):
    """
    List all users
    """
    permission_classes = (IsAuthenticated, )
    def get(self, request, format=None):
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response({'users': serializer.data})

# CustomUserの内容がAbstractUserと全く同じでUserSerializer一つしかない場合UserListと同じ情報しかない
class UserDetail(APIView):
    """
    User profile details
    """
    permission_classes = (IsAuthenticated, )
    def get_object(self, pk):
        try:
            return CustomUser.objects.get(pk=pk)
        except Todo.DoesNotExist:
            raise Http404
    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        if request.user != user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = UserSerializer(user, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CurrentUser(APIView):
   permission_classes = (IsAuthenticated, )
   def get(self, request, *args, **kwargs):
        if request.user.id == None:
            raise Http404
        serializer = UserProfileSerializer(request.user)
        data = serializer.data
        data['is_admin'] = request.user.is_superuser
        return Response(data)

class Registration(generics.GenericAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny,)
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer, request.data)
        return Response({}, status=status.HTTP_201_CREATED)
    def perform_create(self, serializer, data):
        user = serializer.create(data)
        return user