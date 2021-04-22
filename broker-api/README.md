
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

The configuration variables (below) should be defined in `.env`. An example development configuration; 

```bash
PROJECT_NAME=broker-api
BROKER_URI=127.0.0.1
BROKER_PORT=9092
```

Start the API server.

```bash
source ./venv/bin/activate
uvicorn server.main:app --reload --port 8001
```

## Push Test Data to Broker

`tests/producer.ipynb`
