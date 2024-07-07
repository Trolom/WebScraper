### Lead Finder Web Scraper

## Overview

Lead Finder is a web scraping project designed to retrieve and organize contact information and social links from various websites, prioritizing personal business links over less relevant links like e-commerce, news, and streaming sites. It leverages Selenium for scraping, a user agent rotator for evading detection, and a machine learning model for categorizing the links.

## Features
- **Web Scraping with Selenium:** Utilizes Selenium to scrape links from Google search results.
- **User Agent Rotator:** Incorporates a user agent rotator updated regularly with Celery to avoid detection.
- **Link Categorization:** Uses a machine learning model to categorize links based on their content.
- **User Functionality:** Allows users to add additional information to improve future recommendations.

## Future Improvements
- **Proxy Integration:** Use an API for proxies to enhance scraping capabilities.
- **Google API Integration:** Consider using the Google API for more efficient scraping.
- **Headless Scraping:** Modify the Selenium driver to work in headless mode.
- **International Support:** Expand scraping functionality to support countries other than the US.
- **Address Extraction:** Implement a machine learning model to extract physical addresses.
- **Pricing Functionality:** Add a pricing model for additional user requests and benefits.

## Usage

- Clone the repository
- Run in /backend folder: python3 manage.py runserver
- Run in /frontend folder: npm run dev
- Run in /backend folder for celery worker: celery -A backend worker --loglevel=info
- Run in /backend folder for user agent retriever: celery -A backend beat --loglevel=info
