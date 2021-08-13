FROM python:3.9-slim

WORKDIR /usr/src/broker-api

# dont write pyc files
ENV PYTHONDONTWRITEBYTECODE 1
# dont buffer to stdout/stderr
ENV PYTHONUNBUFFERED 1

COPY . .

# dependencies
RUN set -eux \
    && pip install --upgrade pip setuptools wheel \
    && pip install -r requirements.txt \
    && rm -rf /root/.cache/pip

CMD ["uvicorn", "server.main:app", "--host", "0.0.0.0", "--port", "8001"]
