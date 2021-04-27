import logging
import sys
import os
from server.core.logging import InterceptHandler
from loguru import logger
from starlette.config import Config


config = Config(".env")

PROJECT_NAME: str = config("PROJECT_NAME", default="broker-api")
BROKER_INSTANCE = os.environ.get("BROKER_INSTANCE", "localhost:9092")

DEBUG: bool = config("DEBUG", cast=bool, default=False)
LOGGING_LEVEL = logging.DEBUG if DEBUG else logging.INFO

logging.basicConfig(
    handlers=[InterceptHandler(level=LOGGING_LEVEL)], level=LOGGING_LEVEL
)
logger.configure(handlers=[{"sink": sys.stderr, "level": LOGGING_LEVEL}])
