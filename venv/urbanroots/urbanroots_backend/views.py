from django.shortcuts import render
from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer

@api_view(['POST'])
def logout_user(request):
    logout(request)
    return Response({'message': 'Logout successful'})


@api_view(['POST'])
def login_and_get_token(request):
    print(request.data)
    try:
        user = get_object_or_404(User, username=request.data['email'])
        print(user)
    except Exception as e:
        return Response({"message": "Not Found",'token': ''}, status=status.HTTP_400_BAD_REQUEST)
    if user.check_password(request.data['password']) == False:
        print('PASSWORD IS FALSE')
        return Response({"message": "Not Found",'token': ''}, status=status.HTTP_400_BAD_REQUEST)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({"message": "Welcome", 'token': token.key, 'user': serializer.data})

@api_view(['POST'])
def create_user(request):
    print(request.data)
    _user, created = User.objects.get_or_create(
        username=request.data['email'],
        defaults={'email': request.data['email'], 'password': request.data['password']}
    )
    token, created = Token.objects.get_or_create(user=_user)
    serializer = UserSerializer(instance=_user)
    print('*****SERIALIZER')
    print(serializer.data)
    return Response({"message": "Welcome", 'token': token.key, 'user': serializer.data})