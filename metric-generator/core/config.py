import logging
import sys
import os
from loguru import logger
from starlette.config import Config
from core.logging import InterceptHandler


config = Config(".env")

PROJECT_NAME: str = config("PROJECT_NAME", default="metric-generator")
BROKER_API = os.environ.get("BROKER_API", "http://localhost:8001")

DEBUG: bool = config("DEBUG", cast=bool, default=False)
LOGGING_LEVEL = logging.DEBUG if DEBUG else logging.INFO

logging.basicConfig(
    handlers=[InterceptHandler(level=LOGGING_LEVEL)], level=LOGGING_LEVEL
)
logger.configure(handlers=[{"sink": sys.stderr, "level": LOGGING_LEVEL}])
