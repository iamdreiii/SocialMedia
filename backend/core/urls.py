from django.urls import path
from .views import RegisterAPIView, LoginAPIView, UserAPIView, RefreshAPIView, LogoutAPIView, IndexAPIView,PostAPIView, UserPostAPIView
urlpatterns = [
    path('', IndexAPIView.as_view()),
    path('register', RegisterAPIView.as_view()),
    path('login', LoginAPIView.as_view()),
    path('user', UserAPIView.as_view()),
    path('refresh', RefreshAPIView.as_view()),
    path('logout', LogoutAPIView.as_view()),
    path('post', PostAPIView.as_view()),
    path('userpost', UserPostAPIView.as_view()),
]