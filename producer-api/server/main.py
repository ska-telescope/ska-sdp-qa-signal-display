import asyncio
import json
import logging
import uvicorn
from aiokafka import AIOKafkaProducer
from fastapi import FastAPI
import ska_ser_logging
from server.core.config import PROJECT_NAME, BROKER_INSTANCE, LOGGING_LEVEL
from server.core.models.model import ProducerMessage, ProducerResponse

ADDITIONAL_LOGGING_CONFIG = {
    "handlers": {
        "file": {
            "()" : logging.handlers.RotatingFileHandler,
            "formatter": "default",
            "filename": "./output.log",
            "maxBytes": 2048,
            "backupCount": 2,
        }
    },
    "root": {
        "handlers": ["console", "file"],
    }
}

ska_ser_logging.configure_logging(logging.INFO, overrides=ADDITIONAL_LOGGING_CONFIG)
logger = logging.getLogger(__name__)

app = FastAPI(title=PROJECT_NAME)

logger.info("PROJECT_NAME: %s; BROKER_INSTANCE: %s", PROJECT_NAME, BROKER_INSTANCE)

loop = asyncio.get_event_loop()

def serializer(value):
    return json.dumps(value).encode("ascii")

aioproducer = AIOKafkaProducer(
    loop=loop, 
    client_id=PROJECT_NAME, 
    bootstrap_servers=BROKER_INSTANCE, 
    value_serializer=serializer,
    compression_type="gzip",
    max_request_size=15728640 # 15 MB
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
    logger.debug(f'broker_produce: payload = {payload}')

    await aioproducer.send(topic, payload)

    response = ProducerResponse(topic=topic)
    logger.info("broker_produce: response = %s", response)
    return response


if __name__ == "__main__":
    uvicorn.run(app, log_level="debug", reload=True)
