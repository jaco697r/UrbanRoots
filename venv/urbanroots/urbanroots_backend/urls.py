from django.urls import path
from .views import login_and_get_token, create_user

urlpatterns = [
    path('auth/login', login_and_get_token , name='login'),
    path('auth/createUser', create_user , name='create user'),
    ]