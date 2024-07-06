import re
import string
from bs4 import BeautifulSoup, Comment, NavigableString, Tag
from email.utils import parseaddr
from urllib.parse import urlparse, urljoin


class PageScraper:
    def __init__(self):
        self.css_block_regex = r'{[^}]*}'
        self.html_block_regex = r'<[^>]+>'

        excluded_chars = '@.,+-'
        excluded_punctuation = ''.join(c for c in string.punctuation if c not in excluded_chars)
        self.punctuation_pattern = '[' + re.escape(excluded_punctuation) + ']'

        self.email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b(?![\w@.-]*[^{},])'
        self.pattern1 = r'\b(\+?\d{2,4}[-\s.]\d{3}[-\s.]\d{3,4}|\d{3}[-\s.]\d{4})\b'
        self.pattern2 = r'\b\+?\d{10,12}\b'

        self.social_patterns = {
            'facebook': r'https?://(?:www\.)?facebook\.com/[^\s"\']+',
            'instagram': r'https?://(?:www\.)?instagram\.com/[^\s"\']+',
            'youtube': r'https?://(?:www\.)?youtube\.com/[^\s"\']+',
        }

    def custom_get_text(self, element):
        texts = []
        if element is None:
            return ""

        for child in element.children:
            if isinstance(child, Comment):  # Ignore comments found in html content
                continue
            if isinstance(child, NavigableString):  # NavigableString is the object bs uses for text without tags
                text = str(child).strip()
                if text:  # Avoid adding empty strings
                    texts.append(text)
            elif child.name in ['a', 'li', 'td', 'span', 'br']:  # For inline tags, use space as separator and recurse
                text = self.custom_get_text(child)
                texts.append(text)
            elif child.name == 'script' or child.name == 'style':  # Ignore scripts
                continue
            else:  # For block tags, use ||| as separators
                text = self.custom_get_text(child)
                if text:
                    texts.append(text)
                    # Append unique delimiter after block-level content
                    texts.append('|||')

        final_text = ' '.join(texts)
        return final_text

    def clean_text(self, line):
        line = line.lower()
        line = line.encode('utf-8', 'ignore').decode('utf-8')
        line = re.sub(self.punctuation_pattern, '', line)
        line = re.sub(r'\r?\n', '', line)
        line = re.sub(r'©', '', line)
        return line

    def process_html(self, text):
        filtered_parts = []
        # Replace more than one occurrence of '|||' with a single '|||'
        normalized_text = re.sub(r'(\|\|\| )+', '|||', text)
        parts = normalized_text.split('|||')

        for part in parts:
            # Remove excessive whitespace
            part = re.sub(r'\s+', ' ', part).strip()
            part = self.clean_text(part)
            filtered_parts.append(part)

        return filtered_parts

    def extract_links(self, soup, url):
        contact_link = None
        about_link = None

        all_links = soup.select('a')
        parsed_url = urlparse(url)
        base_url = f"{parsed_url.scheme}://{parsed_url.netloc}"

        for link in all_links:
            href = link.get('href', '')
            text = link.text.lower()

            if href:
                # If relative link
                if href.startswith('/'):
                    href = urljoin(base_url, href)
                elif not href.startswith('http'):
                    # Not a relative link but lacks scheme and domain
                    href = urljoin(base_url, href)
                else:
                    # Ensure the link is within the same domain
                    parsed_href = urlparse(href)
                    if parsed_href.netloc != parsed_url.netloc:
                        continue

                if 'contact' in href.lower() or 'contact' in text:
                    contact_link = href
                elif 'about' in href.lower() or 'about' in text:
                    about_link = href

                if contact_link and about_link:
                    break

        result_links = []
        if contact_link:
            result_links.append(contact_link)
        if about_link:
            result_links.append(about_link)

        return result_links

    def is_valid_email(self, email):
        name, addr = parseaddr(email)
        return '@' in addr and '.' in addr.split('@')[-1]

    def find_emails_and_phones(self, text):
        phones_with_separators = re.findall(self.pattern1, text)
        phones_without_separators = re.findall(self.pattern2, text)

        raw_emails = re.findall(self.email_pattern, text, re.IGNORECASE)
        valid_emails = [email for email in raw_emails if self.is_valid_email(email)]

        emails_set = set(valid_emails)
        phones_set = set(phones_with_separators + phones_without_separators)

        return emails_set, phones_set

    def find_social_links(self, soup):
        social_links = {}

        for platform, pattern in self.social_patterns.items():
            links = re.findall(pattern, str(soup), re.IGNORECASE)  # Convert soup to string
            if links:
                unique_links = set(links)  # Use set to remove duplicates
                social_links[platform] = list(unique_links)

        return social_links