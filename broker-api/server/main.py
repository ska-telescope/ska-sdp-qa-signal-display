import asyncio
import json

import uvicorn
from aiokafka import AIOKafkaProducer
from fastapi import FastAPI
from loguru import logger

from server.core.config import BROKER_INSTANCE
from server.core.config import PROJECT_NAME
from server.core.models.model import ProducerMessage, ProducerResponse


app = FastAPI(title=PROJECT_NAME)

logger.info(f'PROJECT_NAME: {PROJECT_NAME}; BROKER_INSTANCE : {BROKER_INSTANCE}')
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

    logger.info(f"broker_produce: payload = {payload}")

    await aioproducer.send(topic, json.dumps(payload).encode("ascii"))

    response = ProducerResponse(topic=topic)
    logger.info(f"broker_produce: response = {response}")
    return response


if __name__ == "__main__":
    uvicorn.run(app, log_level="debug", reload=True)
