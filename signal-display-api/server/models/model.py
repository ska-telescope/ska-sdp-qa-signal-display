from typing import Optional, List, Any
from pydantic import BaseModel
from pydantic import confloat
from pydantic import StrictStr


class ConsumerResponse(BaseModel):
    topic: StrictStr
    timestamp: str
    name: StrictStr
    message_id: StrictStr


class SpectrumDataResponse(BaseModel):
    topic: StrictStr
    timestamp: str
    data: List[Any]
