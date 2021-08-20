"""
Project Settings file
"""
import os
from starlette.datastructures import CommaSeparatedStrings, Secret

default_route_str = ""

ALLOWED_HOSTS = CommaSeparatedStrings(os.getenv("ALLOWED_HOSTS", "*"))
