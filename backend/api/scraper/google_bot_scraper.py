import csv
from .driver_factory import WebDriverFactory
from .consent_handler import ConsentHandler
from .page_navigator import PageNavigator
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import logging
import time

logger = logging.getLogger(__name__)

class MyGoogleBotScraper:
    def __init__(self, driver_factory):
        self.driver_factory = driver_factory

    def process_url(self, search_terms, location, country_code):
        exclude_sites = ["youtube.com", "wikipedia.org"]
        exclusions = ' '.join(f"-site:{site}" for site in exclude_sites)
        final_query = f"{search_terms} {location} {exclusions}"
        encoded_query = final_query.replace(' ', '+')
        search_url = f"https://www.google.com/search?q={encoded_query}&gl={country_code}"
        return search_url

    def get_search_results(self, search_term, location, country):
        driver = self.driver_factory.create_driver()
        consent_handler = ConsentHandler(driver)
        page_navigator = PageNavigator(driver)
        max_links = 10
        max_iterations = 3

        try:
            search_url = self.process_url(search_term, location, country)
            driver.get(search_url)

            # Handle consent
            consent_handler.accept_consent_google_com()
            consent_handler.wait_for_consent_popup()

            links = []

            # Detect page type and scrape results
            if page_navigator.detect_page_type() == 'infinite_scroll':
                #print(user_agents)
                last_height = driver.execute_script("return document.body.scrollHeight")
                for _ in range(max_iterations):
                    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                    time.sleep(5)
                    new_height = driver.execute_script("return document.body.scrollHeight")
                    if new_height == last_height:
                        retry_attempts = 2
                        if page_navigator.infinite_scroll_button():
                            logger.info("Button handled successfully")
                            WebDriverWait(driver, 10).until(
                                lambda d: d.execute_script("return document.body.scrollHeight") > last_height
                            )
                            continue
                        else:
                            for attempt in range(retry_attempts):
                                WebDriverWait(driver, 10).until(
                                    lambda d: d.execute_script("return document.body.scrollHeight") > last_height
                                )
                                if not page_navigator.infinite_scroll_button():
                                    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                                    WebDriverWait(driver, 10).until(
                                        lambda d: d.execute_script("return document.body.scrollHeight") > last_height
                                    )
                                    new_height = driver.execute_script("return document.body.scrollHeight")
                                    if new_height == last_height:
                                        logger.info(f"Retrying scroll: attempt {attempt + 1}")
                                    else:
                                        break
                                else:
                                    break
                    else:
                        last_height = new_height

                links = page_navigator.get_elements('div.yuRUbf a')
                if not links:
                    links = page_navigator.get_elements('div.P8ujBc.v5yQqb.jqWpsc a')

            else:
                type_button = 0
                while len(links) < max_links:
                    new_links = page_navigator.get_elements('div.egMi0.kCrYT a')
                    links.extend(new_links)

                    if len(links) >= max_links:
                        break

                    if type_button == 0:
                        if page_navigator.pagination_button_first_type():
                            type_button = 1
                        elif page_navigator.pagination_button_second_type():
                            type_button = 2
                        else:
                            break
                    elif type_button == 1:
                        if not page_navigator.pagination_button_first_type():
                            break
                    else:
                        if not page_navigator.pagination_button_second_type():
                            break

            return links[:max_links]

        except Exception as e:
            logger.error(f"An error occurred: {str(e)}")
            return str(e)

        finally:
            driver.quit()
