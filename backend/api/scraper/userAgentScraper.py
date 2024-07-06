import os
import sys
import django
import httpx
from bs4 import BeautifulSoup
from api.models import UserAgentModel
from datetime import date



sys.path.append(os.path.join(os.path.dirname(__file__), '../../'))  # Adjust this if needed
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()


class UserAgentScraper:
    def __init__(self, url):
        self.url = url
        self.user_agents = []

    def fetch_user_agents(self):
        response = httpx.get(self.url)
        soup = BeautifulSoup(response.text, "html.parser")
        self.user_agents = [ua.text.strip() for ua in soup.select("pre.wp-block-code")]

    def save_user_agents(self):
        for ua in self.user_agents:
            user_agent, created = UserAgentModel.objects.get_or_create(user_agent=ua, defaults={'introduced_date': date.today()})
            if created:
                print(f"Added new user agent: {ua}")

    def run(self):
        self.fetch_user_agents()
        self.save_user_agents()
        print(f"Saved {len(self.user_agents)} user agents to the database")

if __name__ == "__main__":
    scraper = UserAgentScraper("https://www.useragentlist.net/")
    scraper.run()