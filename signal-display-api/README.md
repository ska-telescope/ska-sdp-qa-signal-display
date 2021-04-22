# signal-display-api 

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
PROJECT_NAME=signal-display-api
BROKER_URI=127.0.0.1
BROKER_PORT=9092
```

Start the API server.

```bash
source ./venv/bin/activate
uvicorn server.main:app --reload --port 8002

# --host 0.0.0.0 to make the application available on your local network
```