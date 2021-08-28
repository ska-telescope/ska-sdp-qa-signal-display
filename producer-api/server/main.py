import asyncio
import json
import logging

import uvicorn
from aiokafka import AIOKafkaProducer
from fastapi import FastAPI

import ska_ser_logging

from server.core.config import PROJECT_NAME, BROKER_INSTANCE, LOGGING_LEVEL
from server.core.models.model import ProducerMessage, ProducerResponse

ska_ser_logging.configure_logging(LOGGING_LEVEL)
logger = logging.getLogger(__name__)

app = FastAPI(title=PROJECT_NAME)

logger.info("PROJECT_NAME: %s; BROKER_INSTANCE: %s", PROJECT_NAME, BROKER_INSTANCE)
loop = asyncio.get_event_loop()
aioproducer = AIOKafkaProducer(
    loop=loop, client_id=PROJECT_NAME, bootstrap_servers=BROKER_INSTANCE
)


@app.get("/ping")
def ping():
    return {"ping": "live"}


@app.on_event("startup")
async def startup_event():
    await aioproducer.start()


@app.on_event("shutdown")
async def shutdown_event():
    await aioproducer.stop()


@app.post("/broker")
async def broker_produce(msg: ProducerMessage):
    """
    Produce a message into <topicname>
    This will produce a message into a Apache Kafka topic
    And this path operation will:
    * return ProducerResponse
    """
    payload = msg.dict()
    topic = payload.get("topic")

    logger.info("broker_produce: payload = %s", payload)

    await aioproducer.send(topic, json.dumps(payload).encode("ascii"))

    response = ProducerResponse(topic=topic)
    logger.info("broker_produce: response = %s", response)
    return response


if __name__ == "__main__":
    uvicorn.run(app, log_level="debug", reload=True)
