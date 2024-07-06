from django.urls import path
from .views import PopularSearchesView, AutocompleteView, ScrapeView, ScrapeStatusView, UserCreateView, MeView, UserCreateView

urlpatterns = [
    path('popular-searches/', PopularSearchesView.as_view(), name='popular_searches'),
    path('autocomplete/', AutocompleteView.as_view(), name='autocomplete'),
    path('start-scrape/', ScrapeView.as_view(), name='start-scrape'),
    path('scrape-status/', ScrapeStatusView.as_view(), name='scrape-status'),
    path('users/register/', UserCreateView.as_view(), name='user-register'),
    path('users/me/', MeView.as_view(), name='user-me'),

]
