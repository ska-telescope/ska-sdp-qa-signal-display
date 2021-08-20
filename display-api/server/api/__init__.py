from fastapi import APIRouter

from server.api.endpoints.broker import ws_router


router = APIRouter()
router.include_router(ws_router, prefix="")
