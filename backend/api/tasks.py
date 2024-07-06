from celery import shared_task
from celery.utils.log import get_task_logger
from django.core.management import call_command
from .scraper.userAgentScraper import UserAgentScraper
from .scraper.google_bot_scraper import MyGoogleBotScraper
from .scraper.driver_factory import WebDriverFactory
from .scraper.consent_handler import ConsentHandler
from .scraper.page_navigator import PageNavigator
from .scraper.userAgent import UserAgent
from .scraper.rotator import Rotator
from .models import UserAgentModel
from .parser.parser import WebScraper
import pandas as pd
import traceback

logger = get_task_logger(__name__)

@shared_task #celery -A backend beat --loglevel=info
def scrape_user_agents():
    logger.info('Starting user agent scraping task.')
    try:
        scraper = UserAgentScraper("https://www.useragentlist.net/")
        scraper.run()
        logger.info('User agent scraping task completed successfully.')
    except Exception as e:
        logger.error(f'Error during user agent scraping task: {e}')


@shared_task(bind=True)
def run_google_bot_scraper_task(self, search_term, location, country):
    logger.info('Starting Google bot scraping task.')
    try:
        # Fetch user agents from the database
        user_agent_strings = [ua.user_agent for ua in UserAgentModel.objects.all()]

        # Initialize the Rotator with user agents
        rotator = Rotator(user_agent_strings)

        # Initialize the WebDriver factory
        driver_factory = WebDriverFactory(rotator)

        # Initialize the Google bot scraper
        scraper = MyGoogleBotScraper(driver_factory)

        # Get search results
        results = scraper.get_search_results(search_term, location, country)

         # Check if results contain an error
        if isinstance(results, str) and "Error" in results:
            raise Exception(results)
        
        logger.info(f'Google bot scraping task completed successfully.')

        df = pd.DataFrame(results, columns=['domain'])

        parser = WebScraper(driver_factory)#error

        final_results = parser.process_dataframe(df)
        
        # Convert the final results to JSON
        final_results_json = final_results.to_json(orient='records')

        # Log and return final results
        logger.info('Parser scraped successfully the scraped pages.')
        return final_results_json


    except Exception as e:
        # Format and log the error
        error_message = f"Error during Google bot scraping task: {str(e)}"
        logger.error(error_message)
        logger.error(traceback.format_exc())
        
        # Retry the task if it fails
        #raise self.retry(exc=Exception(error_message), countdown=60, max_retries=3)
        raise Exception(error_message)