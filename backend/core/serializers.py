from rest_framework.serializers import ModelSerializer
from .models import User, Post

class UserSerializer(ModelSerializer):
    class Meta:
        model =  User
        fields = ['id', 'first_name', 'last_name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    def create(self, validate_data):
        password = validate_data.pop('password', None)
        instance = self.Meta.model(**validate_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
class PostSerializer(ModelSerializer):
    class Meta:
        model =  Post
        fields = ['email', 'content']
        extra_kwrgs = {
            'email' : {
                'required' : True
            },
            'content' : {
                'required' : True
            }
        }
    # def create(self, validate_data):
    #     email = validate_data.pop('email', None)
    #     instance = self.Meta.model(**validate_data)
    #     if email is not None:
    #         instance.save()
    #         return instance
class UserPostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'email', 'content', 'created_at', 'updated_at')
class DeletePostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = ('id')