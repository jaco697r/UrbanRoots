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
    try:
        token = Token.objects.get(user=request.user)
        token.delete()
        return Response({'message' : 'Logout successful' })
    except Token.DoesNotExist:
        return Response({'error': 'Invalid token or token not found'}, status=400)


@api_view(['POST'])
def login(request):
    try:
        user = get_object_or_404(User, username=request.data['username'])
        print(user)
    except Exception as e:
        return Response({"message": "Not Found",'token': ''}, status=status.HTTP_400_BAD_REQUEST)
    if not user.check_password(request.data['password']):
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
    serializer = CommunitySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def join_community(request):
    try:
        community = get_object_or_404(Community, id=request.data['community_id'])
        user = request.user
        if community.members.filter(id=user.id).exists():
            return Response({'message': 'You are already a member of this community.'}, status=401)
        community.members.add(user)
        return Response({'message': 'Successfully joined the community.'}, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=400)
    
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def leave_community(request):
    try:
        community = get_object_or_404(Community, id=request.data['community_id'])
        user = request.user
        print(community.members.filter(id=user.id).exists())
        if not community.members.filter(id=user.id).exists():
            return Response({'message': 'Could not find user in community'}, status=401)
        community.members.remove(user)
        return Response({'message': 'Successfully left the community.'}, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=400)


@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def my_communities(request):
    print(request)
    user = get_user_from_token(request.data['token'])
    if not user:
        return Response({"detail": "User not found from token"}, status=status.HTTP_400_BAD_REQUEST)
    created_communities = Community.objects.filter(creater_user_id=user)
    joined_communities = Community.objects.filter(members=user).exclude(creater_user_id=user)
    other_communities = Community.objects.exclude(creater_user_id=user).exclude(members=user)
    all_communities = [
        {
            "id": community.id,
            "name": community.name,
            "city": community.city,
            "description": community.description,
            "cycle_duration_days": community.cycle_duration_days,
            "is_creator": True,
            "members": list(community.members.values_list('username', flat=True))
        }
        for community in created_communities
    ] + [
        {
            "id": community.id,
            "name": community.name,
            "city": community.city,
            "description": community.description,
            "cycle_duration_days": community.cycle_duration_days,
            "is_creator": False,
            "members": list(community.members.values_list('username', flat=True))
        }
        for community in joined_communities
    ] + [
        {
            "id": community.id,
            "name": community.name,
            "city": community.city,
            "description": community.description,
            "cycle_duration_days": community.cycle_duration_days,
            "is_creator": False,
            "members": list(community.members.values_list('username', flat=True))
        }
        for community in other_communities
    ]

    return Response(all_communities)


def get_user_from_token(token):
    try:
        token_obj = Token.objects.get(key=token)
        return token_obj.user.id
    except Token.DoesNotExist:
        return False