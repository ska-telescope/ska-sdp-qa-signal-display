import uvicorn
from loguru import logger
from fastapi import FastAPI
from starlette.middleware.gzip import GZipMiddleware
from starlette.middleware.cors import CORSMiddleware

from server.core.settings import default_route_str
from server.api import router as endpoint_router
from server.core.config import PROJECT_NAME, BROKER_INSTANCE


app = FastAPI(title=PROJECT_NAME, version="2")
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(CORSMiddleware, allow_origins=["*"])
app.include_router(endpoint_router, prefix=default_route_str)

logger.info(f'PROJECT_NAME: {PROJECT_NAME}; BROKER_INSTANCE : {BROKER_INSTANCE}')

@app.on_event("startup")
async def on_app_start():
    """Anything that needs to be done while app starts"""
    pass


@app.on_event("shutdown")
async def on_app_shutdown():
    """Anything that needs to be done while app shutdown"""
    pass


@app.get("/ping")
def ping():
    return {"ping": "live"}


if __name__ == "__main__":
    uvicorn.run(app, log_level="debug", reload=True)
