from ua_parser import user_agent_parser
from functools import cached_property
from typing import List, Optional
from time import time
import random
from collections import Counter
from .userAgent import UserAgent

class Rotator:

    def __init__(self, user_agents: List[str]):  # Accepts list of strings now
        self.user_agents = [UserAgent(ua) for ua in user_agents]

    def weigh_user_agent(self, user_agent: UserAgent) -> int:
        weight = 1_000
        # Add higher weight for less used User-Agents
        _seconds_since_last_use = time() - user_agent.last_used
        weight += _seconds_since_last_use

        # Browser-based weights
        if user_agent.browser == "Chrome":
            weight += 100
        elif user_agent.browser == "Firefox" or user_agent.browser == "Edge":
            weight += 50
        elif user_agent.browser == "Chrome Mobile" or user_agent.browser == "Firefox Mobile":
            weight += 0

        # Version-based weights
        if user_agent.browser_version:
            weight += user_agent.browser_version * 10

        # OS-based weights
        if user_agent.os == "Windows":
            weight += 150
        elif user_agent.os == "Mac OS X":
            weight += 100
        elif user_agent.os == "Linux" or user_agent.os == "Ubuntu":
            weight -= 50
        elif user_agent.os == "Android":
            weight -= 100

        return weight

    def get(self) -> UserAgent:
        user_agent_weights = [self.weigh_user_agent(ua) for ua in self.user_agents]
        user_agent = random.choices(self.user_agents, weights=user_agent_weights, k=1)[0]
        user_agent.last_used = time()
        return user_agent

