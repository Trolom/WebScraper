from django.db import models
from datetime import date
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    birthday = models.DateField(null=True, blank=True)
    country = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return self.user.username

class SearchQuery(models.Model):
    query = models.CharField(max_length=255, default='Null')
    count = models.PositiveIntegerField(default=1)
    country = models.CharField(max_length=255, default='us')
    location = models.CharField(max_length=255, default='')

    def __str__(self):
        return self.query


class UserAgentModel(models.Model):
    user_agent = models.CharField(max_length=255, unique=True)
    introduced_date = models.DateField(default=date.today)
    use_count = models.PositiveIntegerField(default=0)
    is_infinite_scroll = models.BooleanField(default=False)

    def __str__(self):
        return self.user_agent