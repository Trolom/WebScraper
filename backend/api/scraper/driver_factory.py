from selenium.webdriver.chrome.options import Options
from .rotator import Rotator
from api.models import UserAgentModel
import logging
from selenium import webdriver


logger = logging.getLogger(__name__)

class WebDriverFactory:
    def __init__(self, rotator: Rotator):
        self.rotator = rotator

    def create_driver(self):
        chrome_options = Options()
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        #chrome_options.add_argument('--headless')
        
        user_agent = self.rotator.get()
        user_ag_db = UserAgentModel.objects.get(user_agent=user_agent)
        user_ag_db.use_count += 1
        user_ag_db.save()

        chrome_options.add_argument(f'user-agent={user_agent}')

        driver = webdriver.Chrome(options=chrome_options)
        
        # Debugging steps
        driver.save_screenshot('undetected_screenshot.png')
        with open('undetected_page_source.html', 'w') as f:
            f.write(driver.page_source)

        return driver
