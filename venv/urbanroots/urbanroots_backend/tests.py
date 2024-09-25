from django.test import TestCase

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .models import Community

class MyCommunitiesTest(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username='user1', password='password123')
        self.user2 = User.objects.create_user(username='user2', password='password123')
        self.token1 = Token.objects.create(user=self.user1)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1.key)
        
        self.created_community = Community.objects.create(
            name='Created Community', 
            city='City1', 
            description='This is created by user1',
            cycle_duration_days=7,
            creater_user_id=self.user1
        )
        self.joined_community = Community.objects.create(
            name='Joined Community', 
            city='City2', 
            description='User1 is a member of this community',
            cycle_duration_days=10,
            creater_user_id=self.user2
        )
        self.joined_community.members.add(self.user1)
        
        self.other_community = Community.objects.create(
            name='Other Community', 
            city='City3', 
            description='User1 is not involved in this community',
            cycle_duration_days=5,
            creater_user_id=self.user2
        )
        self.my_communities_url = reverse('my_communities')

    def test_get_my_communities(self):
        response = self.client.post(self.my_communities_url, {'token': self.token1.key})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        data = response.json()
        self.assertEqual(len(data), 3)
        created_community = data[0]
        self.assertEqual(created_community['name'], 'Created Community')
        self.assertTrue(created_community['is_creator'])

    def test_invalid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token invalidtoken')
        response = self.client.post(self.my_communities_url, {'token': 'invalidtoken'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(response.json()['detail'], "Invalid token.")
