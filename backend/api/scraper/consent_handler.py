# consent_handler.py
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

class ConsentHandler:
    def __init__(self, driver):
        self.driver = driver

    def wait_for_consent_popup(self, retries=1, wait_time=2):
        consent_button_id = 'L2AGLb'
        for attempt in range(retries):
            try:
                wait = WebDriverWait(self.driver, wait_time)
                consent_button = wait.until(EC.visibility_of_element_located((By.ID, consent_button_id)))
                consent_button.click()
                print("Consent popup handled successfully.")
                return True
            except TimeoutException:
                print(f"Consent popup not found on attempt {attempt + 1}. Retrying...")
        print("Failed to handle consent popup after several attempts.")
        return False

    def accept_consent_google_com(self, retries=1, wait_time=2):
        for attempt in range(retries):
            if "consent.google.com" in self.driver.current_url:
                try:
                    wait_rdr = WebDriverWait(self.driver, wait_time)
                    try:
                        accept_button = wait_rdr.until(
                            EC.element_to_be_clickable((By.CSS_SELECTOR, 'input[aria-label="Accept all"]'))
                        )
                    except (NoSuchElementException, TimeoutException):
                        accept_button = wait_rdr.until(
                            EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[aria-label="Accept all"]'))
                        )
                    accept_button.click()
                    print("Consent accepted on Google consent page.")
                    return True
                except Exception as e:
                    print(f"Error while accepting consent on attempt {attempt + 1}: {e}")
        print("Failed to accept consent after several attempts.")
        return False
