from django.shortcuts import render
from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authtoken.models import Token
from serializers import UserSerializer

@api_view(['POST'])
def logout_user(request):
    logout(request)
    return Response({'message': 'Logout successful'})


@api_view(['POST'])
def login_and_get_token(request):
    try:
        user = get_object_or_404(User, username=request.data['username'])
    except Exception as e:
        return Response({"message": "Not Found",'token': ''}, status=status.HTTP_400_BAD_REQUEST)
    if user.check_password(request.data['password']) == False:
        return Response({"message": "Not Found",'token': ''}, status=status.HTTP_400_BAD_REQUEST)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({"message": "Welcome", 'token': token.key, 'user': serializer.data})