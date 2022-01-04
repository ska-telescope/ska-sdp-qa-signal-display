# Producer API

Here, we will describe how to develop and debug this code.

# Development & Debugging

The docker container's working/source directory `/usr/src/producer-api` is mapped/mounted to the host's `./producer-api` folder. Therefore, attaching a VSCode editor to the `producer-api` container is a most convenient way to develop and debug.

The server will start with the container, therefore, the server log can be found in a `output.log` file.

> Note: Without the `metric-generator`, test data can be sent directly to the broker using `tests/producer.ipynb`

> Note: follow the instructions below to develop and debug in the host machine, which is not recommended.

Required

-   Python 3.7+
-   fastAPI

```bash
## setup a python virtual environment and install the dependencies.
pip install virtualenv
virtualenv venv
source ./venv/bin/activate
pip install -r requirements.txt

## set the configuration variables and start the server:
export BROKER_INSTANCE=localhost:9092

## start the server
uvicorn server.main:app --reload --host 0.0.0.0 --port 8001
```
