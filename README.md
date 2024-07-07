### Lead Finder Web Scraper using Machine Learning as well

## Overview
Lead Finder is a comprehensive web scraping project designed to help users retrieve and organize contact information and social links from various websites. This project is particularly useful for finding leads and gathering data about small businesses. The primary components and functionalities of this project include:

- **Web Scraping with Selenium:** Utilizes Selenium to scrape links from Google search results. The scraper retrieves a number of links from most to least relevant based on the user's search query.
- **Data Extraction:** Once the links are retrieved, each link is visited individually. Relevant data such as emails, phone numbers, and social media links are extracted from these pages. Additionally, the scraper extracts "Contact" and "About Us" links to gather more comprehensive data from these sections.
- **Link Categorization:** A machine learning model is used to categorize the links based on the text found on them. This ensures that less relevant links, such as e-commerce, news, and streaming sites, are pushed to the bottom, prioritizing personal business links.
- **User Agent Rotator:** To avoid detection, the scraper incorporates a user agent rotator that is updated regularly using Celery. This feature helps in simulating different browsers and devices.
- **User Functionality:** Users can add additional information about themselves, which will be used in the future to improve recommendations and personalize the scraping results.

## Features
- **Web Scraping with Selenium:** Efficiently scrape Google search results for relevant links.
- **User Agent Rotator:** Regularly updated to evade detection.
- **Link Categorization:** Prioritize personal business links using a machine learning model.
- **Data Extraction:** Extract emails, phone numbers, social media links, and more from each visited link.
- **Extended Data Collection:** Collect additional data from "Contact" and "About Us" pages.
- **User Functionality:** Improve recommendations with user-provided information.

## Future Improvements
- **Proxy Integration:** Use an API for proxies to enhance scraping capabilities.
- **Google API Integration:** Consider using the Google API for more efficient scraping.
- **Headless Scraping:** Modify the Selenium driver to work in headless mode.
- **International Support:** Expand scraping functionality to support countries other than the US.
- **Address Extraction:** Implement a machine learning model to extract physical addresses.
- **Pricing Functionality:** Add a pricing model for additional user requests and benefits.
- **Keyword Recommendation:** Develop an ML model for recommending adjacent words to the keywords introduced by the user.
- **Feedback Option:** Add a feedback option where users can indicate if the categorization was incorrect. Incorrectly categorized links will be stored, and once a sufficient number are gathered, the ML model will be retrained to improve accuracy.

## Usage

- Clone the repository
- Run in /backend folder: python3 manage.py runserver
- Run in /frontend folder: npm run dev
- Run in /backend folder for celery worker: celery -A backend worker --loglevel=info
- Run in /backend folder for user agent retriever: celery -A backend beat --loglevel=info
