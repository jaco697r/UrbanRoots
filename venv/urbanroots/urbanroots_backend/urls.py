from django.urls import path
from .views import login_and_get_token

urlpatterns = [
    path('login/login_and_get_token', login_and_get_token , name='login'),
    ]