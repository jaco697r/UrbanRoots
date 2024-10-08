from django.db import models
from django.contrib.auth.models import User


class Community(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(null=True)
    city = models.CharField(max_length=50)
    max_participants = models.IntegerField(null=True)
    min_kg_crops_per_person = models.FloatField(null=True)
    cycle_duration_days = models.IntegerField(default=90)
    invite_only = models.BooleanField(default=False)
    creater_user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    members = models.ManyToManyField(User, related_name='joined_communities', blank=True)

    def __str__(self):
        return self.name

class CommunityMembership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    community = models.ForeignKey(Community, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        unique_together = ('user', 'community')  # Ensure unique user in each community (Can't join several times)

    def __str__(self):
        return f"{self.user.username} in {self.community.name}"
