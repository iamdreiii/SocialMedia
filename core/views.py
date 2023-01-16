from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import exceptions
from core.authentication import create_access_token, decode_access_token
from core.models import User
from .serializers import UserSerializer
from rest_framework.authentication import get_authorization_header

class RegisterAPIView(APIView):
    def post(self, request):
        data = request.data
        if data['password'] != data['password_confirm']:
            raise exceptions.APIException('password not match')
        serializer = UserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class UserAPIView(APIView):
    def get(self, request):
        auth = get_authorization_header(request).split()
        if auth and len(auth) == 2:
            token = auth[1].decode('UTF-8')
            id = decode_access_token(token)
            user = User.objects.get(pk=id)
            if user:
                serializer = UserSerializer(user)
                return Response(serializer.data)
        raise exceptions.AuthenticationFailed('unauthenticated')
    
class LoginAPIView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email = email).first()
        if user is None:
            raise exceptions.AuthenticationFailed('Invalid Credentials')
        if not user.check_password(password):
            raise exceptions.AuthenticationFailed('Invalid Credentials')
        access_token = create_access_token(user.id)
        refresh_token = create_access_token(user.id)
        response = Response()
        response.set_cookie(key='refresh_token', value=refresh_token, httponly=True)
        response.data= {
            'token': access_token
        }
        return response
        # serializer = UserSerializer(user)
        # return Response(serializer.data)

