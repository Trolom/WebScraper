from ua_parser import user_agent_parser
from functools import cached_property
from typing import List, Optional
from time import time
import random
from collections import Counter

class UserAgent:

    def __init__(self, string) -> None:
        self.string: str = string
        # Parse the User-Agent string
        self.parsed_string: str = user_agent_parser.Parse(string)
        self.last_used: float = time()

    # Get the browser name
    @cached_property
    def browser(self) -> str:
        return self.parsed_string["user_agent"]["family"]

    # Get the browser version
    @cached_property
    def browser_version(self) -> Optional[int]:
        major_version = self.parsed_string["user_agent"]["major"]
        return int(major_version) if major_version else None
    # Get the operating system
    @cached_property
    def os(self) -> str:
        return self.parsed_string["os"]["family"]

    # Return the actual user agent string
    def __str__(self) -> str:
        return self.string

# if __name__ == '__main__':

#     # Some user agents from the list we created earlier
#     user_agents = [
#         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35",
#         "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35",
#         "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35",
#         "Mozilla/5.0 (Windows NT 6.1; rv:109.0) Gecko/20100101 Firefox/113.0",
#         "Mozilla/5.0 (Android 12; Mobile; rv:109.0) Gecko/113.0 Firefox/113.0",
#         "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/113.0",
#     ]
#     # The rotator class we created
#     rotator = Rotator(user_agents)
#     # Counter to track the most used user agents
#     counter = Counter()
#     for i in range(1000):
#         # Choose a random User-Agent in each iteration
#         user_agent = rotator.get()
#         counter[user_agent] += 1

#     # Show the most used User-Agents
#     for user_agent, used_count in counter.most_common():
#         print(f"{user_agent} was used {used_count} times")