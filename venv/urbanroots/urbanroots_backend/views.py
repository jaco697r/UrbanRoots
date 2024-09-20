from django.shortcuts import render
from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, CommunitySerializer
from .models import Community

    
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    print(request.data)
    print(request.headers)
    try:
        token = Token.objects.get(user=request.user)
        token.delete()
        return Response({'message' : 'Logout successful' })
    except Token.DoesNotExist:
        print('************except**************')
        return Response({'error': 'Invalid token or token not found'}, status=400)

@api_view(['POST'])
def login(request):
    print(request.data)
    try:
        user = get_object_or_404(User, username=request.data['username'])
        print(user)
    except Exception as e:
        return Response({"message": "Not Found",'token': ''}, status=status.HTTP_400_BAD_REQUEST)
    if not user.check_password(request.data['password']):
        print('PASSWORD IS FALSE')
        return Response({"message": "Not Found",'token': ''}, status=status.HTTP_400_BAD_REQUEST)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({"message": "Welcome", 'token': token.key, 'user': serializer.data})

@api_view(['POST'])
def create_user(request):
    print(request.data)
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        print(serializer.data)
        return Response({"message": "Welcome", 'token': token.key, 'user': serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response('PERMISSION GRANTED TO {}'.format(request.user.username))

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_community(request):
    request.data['creater_user_id'] = get_user_from_token(request.data['token'])
    print(request.data)
    serializer = CommunitySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def my_communities(request):
    print(request)
    user = get_user_from_token(request.data['token'])
    if not user:
        return Response("User not found from token", status=status.HTTP_400_BAD_REQUEST)
    created_communities = Community.objects.filter(creater_user_id=user)
    joined_communities = Community.objects.filter(members=user)
    all_communities = created_communities | joined_communities
    data = [{"id": community.id, "name": community.name, "city": community.city} for community in all_communities]
    print('********DATA')
    print(data)
    return Response(data)

def get_user_from_token(token):
    try:
        token_obj = Token.objects.get(key=token)
        return token_obj.user.id
    except Token.DoesNotExist:
        return False