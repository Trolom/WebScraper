from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import UserProfile, UserAgentModel, SearchQuery

# Define an inline admin descriptor for UserProfile model
# which acts a bit like a singleton
class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'user profiles'

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (UserProfileInline,)

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)

# Register the UserProfile model separately if you want to manage it directly as well
@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'birthday', 'country', 'phone']
    search_fields = ['user__username', 'user__email', 'birthday', 'country', 'phone']

@admin.register(UserAgentModel)
class UserAgentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_agent', 'use_count', 'introduced_date', 'is_infinite_scroll')
    search_fields = ('user_agent',)
    list_filter = ('user_agent', 'introduced_date', 'is_infinite_scroll')
    date_hierarchy = 'introduced_date'
    list_per_page = 20

@admin.register(SearchQuery)
class SearchQueryAdmin(admin.ModelAdmin):
    list_display = ('query', 'count', 'country', 'location')
    search_fields = ('query', 'country', 'location')
