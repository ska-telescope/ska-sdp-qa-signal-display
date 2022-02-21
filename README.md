# QA Display

This connects to the [QA data API](https://gitlab.com/ska-telescope/ska-sdp-qa-data-api) on a socket and visualizes the received metrics (e.g, spectrum plot, waterfall plot etc) in real-time.

KNOWN ISSUE : Full unit testing needs to be added.

# Getting Started

## Option-1: Using Container

Follow the instructions below to start the app in containers:

```bash
docker-compose up -d
docker-compose ps
```

The docker container's working/source directory `/usr/src/qa-display` is mapped/mounted to the host's `./` folder. Therefore, attaching a VSCode editor to the `qa-display` container is a most convenient way to develop and debug.

During development and debugging, the `react-scripts` will automatically reload the changes. Open [http://localhost:3000](http://localhost:3000) to view the UI in the browser, and use a Chrome debugger to debug.

## Option-2: Start Locally

Follow the instructions below to start the React app in your host machine.

Prerequisite

- Node.js 14+

```bash
## install the dependencies
yarn install

## setup environment variables

## Linux/MAC
export NODE_ENV=development && export PORT=3000 # UI port no
export REACT_APP_API=http://localhost:8002      # QA data API
export REACT_APP_WS=ws://localhost:8002/ws      # QA data API websocket

## Windows
$env:NODE_ENV="development"
$env:PORT="3000"
$env:REACT_APP_API="http://localhost:8002"
$env:REACT_APP_WS="ws://localhost:8002/ws"

## run the app in development mode.
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view the UI in a browser.

# Known Issues

- The source code was developed for proof of concepts. Therefore, the code may require improvement for production release.
- Need to use advanced build tool for production, and the production build step need to be improved.

# References

- Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Using react material dashboard style
