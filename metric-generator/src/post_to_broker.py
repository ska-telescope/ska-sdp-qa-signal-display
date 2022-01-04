import requests
from loguru import logger

from core.config import PRODUCER_API


def post(data):
    broker_api = f"{PRODUCER_API}/broker"
    logger.info(f"broker_api = {broker_api}")
    # logger.info(f"spctrum_plt = {data}")
    requests.post(broker_api, json=data)
