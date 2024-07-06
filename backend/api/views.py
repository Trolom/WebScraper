from django.contrib.auth.models import User
from rest_framework import generics, status, permissions
from .serializers import UserSerializer, SearchQuerySerializer
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.views import View
import logging
from django.apps import apps
from .tasks import run_google_bot_scraper_task
from celery.result import AsyncResult
from .models import SearchQuery
import json


# List of relevant US cities for autocomplete
us_cities = [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
    "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose",
    "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte",
    "San Francisco", "Indianapolis", "Seattle", "Denver", "Washington"
]

logger = logging.getLogger(__name__)

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = []

class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PopularSearchesView(APIView):
    def get(self, request, *args, **kwargs):
        popular_searches = SearchQuery.objects.order_by('-count')[:6]
        serializer = SearchQuerySerializer(popular_searches, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class AutocompleteView(View):
    def get(self, request, *args, **kwargs):
        query = request.GET.get('q', '').lower()
        suggestions = [place for place in us_cities if query in place.lower()]
        return JsonResponse({'suggestions': suggestions})

class ScrapeView(View):
    def get(self, request, *args, **kwargs):
        query = request.GET.get('query', '')
        location = request.GET.get('location', '')
        country = 'us'  # Set the country to 'us'

        if not query or not location:
            logger.error("Query and location are required.")
            return JsonResponse({'error': 'Query and location are required.'}, status=400)
        
        search_query, created = SearchQuery.objects.get_or_create(query=query, location=location, country=country)
        if created:
            search_query.count = 1
        else:
            search_query.count += 1
        search_query.save()

        # Trigger the scraping task asynchronously
        task = run_google_bot_scraper_task.delay(query, location, country)

        # Return the task ID to the frontend
        return JsonResponse({'status': 'Scraping task started.', 'task_id': task.id})

class ScrapeStatusView(View):
    def get(self, request, *args, **kwargs):
        task_id = request.GET.get('task_id', '')

        if not task_id:
            return JsonResponse({'error': 'Task ID is required.'}, status=400)

        # Fetch the task result using the task ID
        task_result = AsyncResult(task_id)

        if task_result.state == 'PENDING':
            response = {
                'status': 'Pending...',
                'state': task_result.state,
                'result': None
            }
        elif task_result.state == 'FAILURE':
            # Convert the exception information to a string
            response = {
                'status': 'Failed',
                'state': task_result.state,
                'result': str(task_result.info),  # Ensure this is a string
            }
        else:
            result = task_result.result
            try:
                # Try to parse the result as JSON if it's a string
                if isinstance(result, str):
                    result_json = json.loads(result)
                else:
                    result_json = result
            except (TypeError, json.JSONDecodeError):
                result_json = result



            # Log the result to inspect its structure
            logger.info(f'Task {task_id} completed successfully with result: {result_json}')

            response = {
                'status': 'Completed' if task_result.state == 'SUCCESS' else 'In Progress',
                'state': task_result.state,
                'result': result_json
            }

        return JsonResponse(response)