from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'date_joined')


class UserRegistrationSerializer(serializers.Serializer):
    """
    Serializer for Registration - password match check
    """
    email = serializers.EmailField(required=True, validators=[
        UniqueValidator(queryset=CustomUser.objects.all())])
    password = serializers.CharField()
    confirm_password = serializers.CharField()
    def create(self, data):
        return CustomUser.objects.create_user(data['email'], data['password'])
    def validate(self, data):
        if not data.get('password') or not data.get('confirm_password'):
            raise serializers.ValidationError({
                'password': 'Please enter password and confirmation'})
        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError(
                {'password': 'Passwords don\'t match'})
        return data