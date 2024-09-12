from django.db import models
from django.contrib.auth.models import User


class CommunityType(models.Model):
    name = models.CharField(max_length=255)

class Community(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True)
    type_id = models.ForeignKey('Type', on_delete=models.SET_NULL, null=True)
    price_type = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=6, decimal_places=1)
    image = models.ImageField(null=True, upload_to='images')
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, default=None, null=True)
    rented_by_user_id = models.ForeignKey(User, on_delete=models.SET_NULL, default=None, null=True, related_name='rented_products')