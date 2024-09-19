from django.urls import re_path
from . import views

urlpatterns = [
    re_path('auth/login', views.login),
    re_path('auth/createUser', views.create_user),
    re_path('auth/testToken', views.test_token)
    ]