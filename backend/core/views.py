from urllib import request
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import exceptions
from core.authentication import create_access_token, JWTAuthentication, create_refresh_token, decode_refresh_token
from core.models import User, Post
from .serializers import UserSerializer, PostSerializer, UserPostSerializer
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


class IndexAPIView(APIView):
    def get(self, request, format=None):
        content = {
            "wmsg" : "Welcome to Python Django"
        }
        return Response(content)

class UserPostAPIView(APIView):
    def get(self, request):
        if request.method == 'GET':
            post = Post.objects.all()
        
            title = request.GET.get('title', None)
            if title is not None:
                tutorials = tutorials.filter(title__icontains=title)
            
            post = UserPostSerializer(post, many=True)
            return JsonResponse(post.data, safe=False)
            # 'safe=False' for objects serialization
    
class PostAPIView(APIView):
    def post(self, request):
        data = request.data
        email = request.data['email']
        content = request.data['content']
        if email == '':
            raise exceptions.APIException('email empty')
        elif content == '':
            raise exceptions.APIException('content empty')
        serializer = PostSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
        
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
    authentication_classes = [JWTAuthentication]
    def get(self, request, format=None):
        return Response(UserSerializer(request.user).data)
    
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
        refresh_token = create_refresh_token(user.id)
        response = Response()
        response.set_cookie(key='refresh_token', value=refresh_token, httponly=True)
        response.data= {
            'token': access_token
        }
        return response
        # serializer = UserSerializer(user)
        # return Response(serializer.data)

class RefreshAPIView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        id = decode_refresh_token(refresh_token)
        access_token = create_access_token(id)
        return Response({
            'token': access_token
        })

class LogoutAPIView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie(key='refresh_token')
        response.data = {
            'message': 'success'
        }
        return response

