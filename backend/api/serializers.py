from django.contrib.auth.models import User
from rest_framework import serializers
from .models import SearchQuery, UserAgentModel, UserProfile

class UserSerializer(serializers.ModelSerializer):
    birthday = serializers.DateField(required=False, allow_null=True)
    country = serializers.CharField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)
    new_password = serializers.CharField(write_only=True, required=False, allow_blank=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'birthday', 'country', 'phone', 'new_password']
        extra_kwargs = {
            'password': {'write_only': True, 'required': True},
            'new_password': {'write_only': True, 'required': False},
        }

    def create(self, validated_data):
        profile_data = {
            'birthday': validated_data.pop('birthday', None),
            'country': validated_data.pop('country', ''),
            'phone': validated_data.pop('phone', '')
        }
        
        user = User.objects.create_user(**validated_data)
        
        UserProfile.objects.create(user=user, **profile_data)
        
        return user
    
    def update(self, instance, validated_data):
        profile_data = {
            'birthday': validated_data.pop('birthday', None),
            'country': validated_data.pop('country', ''),
            'phone': validated_data.pop('phone', '')
        }
        
        new_password = validated_data.pop('new_password', None)
        if new_password:
            instance.set_password(new_password)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        
        UserProfile.objects.update_or_create(user=instance, defaults=profile_data)
        
        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.pop('password', None)
        representation.pop('new_password', None)
        
        # Add profile fields to the representation
        representation['birthday'] = instance.profile.birthday
        representation['country'] = instance.profile.country
        representation['phone'] = instance.profile.phone
        
        return representation
    
class SearchQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchQuery
        fields = ['query', 'country', 'location', 'count']


class UserAgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAgentModel
        fields = ['id', 'user_agent']

