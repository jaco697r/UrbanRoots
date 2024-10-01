from django.urls import re_path
from . import views

urlpatterns = [
    re_path('auth/login', views.login),
    re_path('auth/createUser', views.create_user),
    re_path('auth/testToken', views.test_token),
    re_path('auth/logout', views.logout),
    re_path('createCommunity', views.create_community),
    re_path('myCommunities', views.my_communities, name="my_communities"),
    re_path('joinCommunity', views.join_community, name="join_community"),
    re_path('leaveCommunity', views.leave_community, name="leave_community")
    ]