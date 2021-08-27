import logging
import os

from starlette.config import Config


config = Config(".env")

PROJECT_NAME: str = config("PROJECT_NAME", default="display-api")
BROKER_INSTANCE = os.environ.get("BROKER_INSTANCE", "localhost:9092")

DEBUG: bool = config("DEBUG", cast=bool, default=False)
LOGGING_LEVEL = logging.DEBUG if DEBUG else logging.INFO
