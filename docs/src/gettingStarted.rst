Getting Started
===============

To get the Signal Display running services should be started in the following order:
-----------------------------------------------------------------------------------

**Step 1:** Follow the steps in the [Signal Data API](https://gitlab.com/ska-telescope/ska-sdp-qa-data-api) README to start up the the Data API, Kafka and Redis.\
**Step 2** Then start [Signal Metric Generator](https://gitlab.com/ska-telescope/ska-sdp-qa-metric-generator) using information in it's README.\
**Step 3:** Finally start the [SKAO Signal Display](https://gitlab.com/ska-telescope/sdp/ska-sdp-qa-display) in this repository, using the steps below.\
**Sending spoof data to display:** Consult the README in the [metric-generator](https://gitlab.com/ska-telescope/ska-sdp-qa-metric-generator/-/tree/main/metric-generator) folder.

Option-1: Using Container
-------------------------

```bash
docker-compose up -d
docker-compose ps
```

The docker container's working/source directory `/usr/src/app` is mapped/mounted to the host's `./` folder.

Option-2: Start Locally
-----------------------

Follow the instructions below to start the React app in your host machine.

Prerequisite

- Node.js 16+
- React.js 18+
- material UI ( MUI )

```bash
# install the dependencies
yarn

# run the app in development mode.
yarn dev

# run the app in production mode
yarn start
```

Open [http://localhost:3333](http://localhost:3333) to view the UI in a browser.