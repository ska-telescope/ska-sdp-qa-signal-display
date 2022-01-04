# Display API

Here, we will describe how to develop and debug this code.

# Development & Debugging

The docker container's working/source directory `/usr/src/display-api` is mapped/mounted to the host's `./display-api` folder. Therefore, attaching a VSCode editor to the `display-api` container is a most convenient way to develop and debug.

The server will start with the container, therefore, the server log can be found in a `output.log` file.

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

## set the configuration variables, e.g, the broker address
export BROKER_INSTANCE=localhost:9092

## start the server
uvicorn server.main:app --reload --port 8002 --host 0.0.0.0
```
