
# broker-api

This is a RESTful API server to push data streams to message broker (Kafka).

## Requirements
* fastAPI
* Python 3.7+

## Setting up

Setup a python virtual environment and install the dependencies.

```bash
pip install virtualenv
virtualenv venv

source ./venv/bin/activate
pip install -r requirements.txt
```

## Running the Project in Development

Set the configuration variables and start the server:

```bash
source ./venv/bin/activate
export BROKER_INSTANCE=localhost:9092
uvicorn server.main:app --reload --host 0.0.0.0 --port 8001
```

## Push Test Data to Broker

`tests/producer.ipynb`
