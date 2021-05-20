FROM python:3.8

WORKDIR /usr/src/broker-api

# dont write pyc files
ENV PYTHONDONTWRITEBYTECODE 1
# dont buffer to stdout/stderr
ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /usr/src/broker-api/requirements.txt
COPY ./.env /usr/src/broker-api/.env
COPY ./server /usr/src/broker-api/server
COPY ./tests /usr/src/broker-api/tests

# dependencies
RUN set -eux \
    && pip install --upgrade pip setuptools wheel \
    && pip install -r requirements.txt \
    && rm -rf /root/.cache/pip

RUN pip install jupyter

CMD ["uvicorn", "server.main:app", "--host", "0.0.0.0", "--port", "8001"]
