import csv
from bs4 import BeautifulSoup
import pandas as pd
import copy
from ..scraper.driver_factory import WebDriverFactory
from ast import literal_eval
import ast
from .page_scraper import PageScraper
from selenium.common.exceptions import WebDriverException
import joblib
from .ScrapTool import ScrapTool
import traceback
import sklearn
import lxml
import os


class WebScraper:
    def __init__(self, driver_factory):
        self.driver_factory = driver_factory
        self.page_scraper = PageScraper()
        #print(user_agent)

        # Load the fitted vectorizer and the model
        base_path = os.path.join(os.path.dirname(__file__), 'joblib_files')
        self.fitted_vectorizer = joblib.load(os.path.join(base_path, 'fitted_vectorizer.joblib'))
        self.m1 = joblib.load(os.path.join(base_path, 'calibrated_svc_model.joblib'))

        self.scrapTool = ScrapTool()
        self.id_to_category = {
            0: 'Travel', 1: 'Social Networking and Messaging', 2: 'News', 3: 'Streaming Services',
            4: 'Sports', 5: 'Photography', 6: 'Law and Government', 7: 'Health and Fitness',
            8: 'Games', 9: 'E-Commerce', 10: 'Forums', 11: 'Food', 12: 'Education',
            13: 'Computers and Technology', 14: 'Business/Corporate', 15: 'Adult'
        }

        self.custom_order = {category: i for i, category in enumerate(['Health and Fitness', 'Business/Corporate', 'Sports', 'Photography', 'Education', 'Computers and Technology', 'Law and Government', 'Social Networking and Messaging', 'Games', 'Forums', 'Food', 'Adult', 'News', 'Travel', 'Streaming Services', 'E-Commerce'])}


    def analyze_website(self, website, soup):
        try:
            # Fetch website content
            web = dict(self.scrapTool.visit_url(website, soup))
            text = self.scrapTool.clean_text(web['website_text'])

            # Transform text using the vectorizer
            t = self.fitted_vectorizer.transform([text])

            # Predict the category
            predicted_category_id = self.m1.predict(t)[0]
            predicted_category = self.id_to_category[predicted_category_id]

            return predicted_category

        except Exception as e:
            print("An error occurred:")
            print(str(e))
            traceback.print_exc()
            return None, None

    def main_method(self, soup):

        links_dict = self.page_scraper.find_social_links(str(soup))
        processed_text = self.page_scraper.custom_get_text(soup.find('body') or soup)

        # Process the HTML and extract data
        filtered_text = self.page_scraper.process_html(processed_text)

        emails = set()
        phones = set()

        # Loop through parts and extract emails and phones
        if filtered_text:
            for part in filtered_text:
                #print(part)  # Debug output
                email, phone = self.page_scraper.find_emails_and_phones(part)
                emails.update(email)
                phones.update(phone)

        return emails, phones, links_dict

    def parse_links(self, link, driver, category=None, is_contact=False):
        try:
            driver.get(link)
            soup = BeautifulSoup(driver.page_source, 'lxml')
            if not category:
                category = self.analyze_website(link, soup)
                print("Category:", category)

            emails, phones, links_dict = self.main_method(soup)

            if is_contact:
                return emails, phones, links_dict, category

            contact_links = self.page_scraper.extract_links(soup, link)

            if contact_links:
                print('Links: ')
                print(contact_links)
            else:
                print('No links found')
                return emails, phones, links_dict, category

            for url_contact in contact_links:
                print("Contact link: ", url_contact)
                emails_c, phones_c, links_dict_c, cat_c = self.parse_links(url_contact, driver, category, True)
                emails.update(emails_c)
                phones.update(phones_c)
                links_dict.update(links_dict_c)

            return emails, phones, links_dict, category

        except WebDriverException as e:
            print(f"Error fetching or parsing {link}: {e}")
            return set(), set(), {}, ''

    # def process_dataframe(self):
    #     url = ('https://www.sanantoniocosmeticsurgery.net/medspa/laser-hair-removal/')
    #     found_emails, found_phones, found_links = self.parse_links(url)


    def process_dataframe(self, df):
        list_tuples = []
        driver = self.driver_factory.create_driver()
        for index, row in df.iterrows():
            print(row['domain'])
            found_emails, found_phones, found_links, category = self.parse_links(row['domain'], driver)

            if found_emails or found_phones or any(found_links.values()):
                list_tuples.append((
                    row['domain'],
                    found_emails,
                    found_phones,
                    found_links.get('facebook', []),
                    found_links.get('instagram', []),
                    found_links.get('youtube', []),
                    category
                ))

        dataframe = pd.DataFrame(list_tuples,
                                 columns=['Link', 'Emails', 'Phones', 'Facebook', 'Instagram', 'YouTube', 'Category'])
        
        # Create a new column for custom order using the custom_order dictionary
        try:
            dataframe['CategoryOrder'] = dataframe['Category'].apply(lambda x: self.custom_order[x])
        except KeyError as e:
            print(f"KeyError: {e}. Possible categories: {list(self.custom_order.keys())}")
            raise

        # Sort the DataFrame by the new column
        dataframe = dataframe.sort_values(by='CategoryOrder')

        # Drop the new column and reset index
        dataframe = dataframe.drop(columns='CategoryOrder').reset_index(drop=True)

        return dataframe