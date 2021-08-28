from datetime import datetime
from typing import Any
from pydantic import BaseModel, confloat, StrictStr, validator


class ProducerMessage(BaseModel):
    topic: StrictStr = ""
    timestamp: StrictStr = ""
    body: Any

    @validator("timestamp", pre=True, always=True)
    def set_datetime_utcnow(cls, v):
        return str(datetime.utcnow())


class ProducerResponse(BaseModel):
    topic: StrictStr = ""
    timestamp: StrictStr = ""

    @validator("timestamp", pre=True, always=True)
    def set_datetime_utcnow(cls, v):
        return str(datetime.utcnow())
