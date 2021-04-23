import logging
import sys
from loguru import logger
from starlette.config import Config

from core.logging import InterceptHandler

config = Config(".env")


BROKER_API: str = config("BROKER_API")
MEASUREMENT_SET: str = config("MEASUREMENT_SET")
DEBUG: bool = config("DEBUG", cast=bool, default=False)

LOGGING_LEVEL = logging.DEBUG if DEBUG else logging.INFO

logging.basicConfig(
    handlers=[InterceptHandler(level=LOGGING_LEVEL)], level=LOGGING_LEVEL
)
logger.configure(handlers=[{"sink": sys.stderr, "level": LOGGING_LEVEL}])
