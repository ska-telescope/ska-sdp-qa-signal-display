import asyncio
import json
import typing
from loguru import logger
from fastapi import APIRouter, WebSocket
from starlette.endpoints import WebSocketEndpoint
from aiokafka import AIOKafkaConsumer

from server.models.model import ConsumerResponse
from server.core.config import BROKER_INSTANCE
from server.core.config import PROJECT_NAME

ws_router = APIRouter()


async def consume(consumer, topicname):
    async for msg in consumer:
        return msg.value.decode()


@ws_router.websocket_route("/ws/consumer/{topicname}")
class WebsocketConsumer(WebSocketEndpoint):
    """
    Consume messages from <topicname>
    This will start a Kafka Consumer from a topic
    And this path operation will:
    * return ConsumerResponse
    """

    async def on_connect(self, websocket: WebSocket) -> None:
        # until I figure out an alternative
        topicname = websocket["path"].split("/")[3]
        logger.info(f'topicname = {topicname}; BROKER_INSTANCE = {BROKER_INSTANCE}')
        await websocket.accept()
        await websocket.send_json({"status": "connected"})

        loop = asyncio.get_event_loop()
        self.consumer = AIOKafkaConsumer(
            topicname,
            loop=loop,
            client_id=PROJECT_NAME,
            bootstrap_servers=BROKER_INSTANCE,
            enable_auto_commit=False,
        )

        await self.consumer.start()

        self.consumer_task = asyncio.create_task(
            self.send_consumer_message(websocket=websocket, topicname=topicname)
        )

        logger.info("connected")

    async def on_disconnect(self, websocket: WebSocket, close_code: int) -> None:
        self.consumer_task.cancel()
        await self.consumer.stop()
        # logger.info(f"counter: {self.counter}")
        logger.info("disconnected")
        logger.info("consumer stopped")

    async def on_receive(self, websocket: WebSocket, data: typing.Any) -> None:
        await websocket.send_json({"Message": data})

    async def send_consumer_message(self, websocket: WebSocket, topicname: str) -> None:
        while True:
            data = await consume(self.consumer, topicname)
            logger.info(f"data = {data}, {json.loads(data)}")

            # TODO
            # response = ConsumerResponse(topic=topicname, **json.loads(data))
            # response = SpectrumDataResponse(topic=topicname, **json.loads(data))
            # logger.info(f'response = {response}')

            # await websocket.send_text(f"{response.json()}")
            # res = {'data': response.json()}
            # logger.info(f'res = {res}')
            # await websocket.send_json(res)

            await websocket.send_json(json.loads(data))
