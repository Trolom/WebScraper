from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

class PageNavigator:
    def __init__(self, driver):
        self.driver = driver

    def detect_page_type(self):
        pagination_links = self.driver.find_elements(By.CSS_SELECTOR, 'a.nBDE1b.G5eFlf')
        if pagination_links:
            return 'pagination'
        else:
            return 'infinite_scroll'

    def infinite_scroll_button(self, wait_time=5):
        try:
            load_more_button = WebDriverWait(self.driver, wait_time).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, 'a.T7sFge.sW9g3e.VknLRd'))
            )
            if "transform: scale(0);" in load_more_button.get_attribute("style"):
                print("'Load More' button is hidden. Ending scroll.")
                return False
        except (NoSuchElementException, TimeoutException):
            print("Error occurred.")
            return False

        if load_more_button:
            print("Found 'Load More' button, clicking.")
            self.driver.execute_script("arguments[0].click();", load_more_button)
            return True
        return False

    def pagination_button_first_type(self, wait_time=5):
        try:
            selector = 'a.nBDE1b.G5eFlf'
            all_buttons = WebDriverWait(self.driver, wait_time).until(
                EC.presence_of_all_elements_located((By.CSS_SELECTOR, selector))
            )
            # Determine the button to click
            if len(all_buttons) == 1:
                load_more_button = all_buttons[0]
            elif len(all_buttons) > 1:
                load_more_button = all_buttons[1]
            else:
                print("No 'Next page' button found.")
                return False

        except (NoSuchElementException, TimeoutException):
            print("No 'Next page' button found or timed out waiting for it.")
            return False

        if load_more_button:
            print("Found 'Next page' button, clicking.")
            self.driver.execute_script("arguments[0].click();", load_more_button)
            WebDriverWait(self.driver, wait_time).until(
                EC.staleness_of(load_more_button)
            )
            return True
        return False

    def pagination_button_second_type(self, wait_time=25, use_second_button=False):
        try:
            selector = 'td.d6cvqb.BBwThe a'
            next_button = WebDriverWait(self.driver, wait_time).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, selector))
            )
        except (NoSuchElementException, TimeoutException):
            print("No 'Load More' button found or timed out waiting for it.")
            return False

        if next_button:
            print("Found 'Next page' button, clicking.")
            self.driver.execute_script("arguments[0].click();", next_button)
            WebDriverWait(self.driver, wait_time).until(
                EC.staleness_of(next_button)
            )
            return True
        return False

    def get_elements(self, selector):
        elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
        links = [element.get_attribute('href') for element in elements if element.get_attribute('href')]
        for link in links:
            print({'URL': link})
        return links
