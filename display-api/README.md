# display-api

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

Set the configuration variables, and start the API server:

```bash
source ./venv/bin/activate
export BROKER_INSTANCE=localhost:9092
uvicorn server.main:app --reload --port 8002 --host 0.0.0.0

```