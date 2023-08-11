Getting Started
===============

To get the Signal Display running services should be started in the following order:

- **1:** Follow the steps in the [Signal Data API](https://gitlab.com/ska-telescope/ska-sdp-qa-data-api) README to start up the the Data API, Kafka and Redis.\
- **2:** Then start [Signal Metric Generator](https://gitlab.com/ska-telescope/ska-sdp-qa-metric-generator) using information in it's README.\
- **3:** Finally start the [SKAO Signal Display](https://gitlab.com/ska-telescope/sdp/ska-sdp-qa-display) in this repository, using the steps below.\

**Sending dummy data to display:** 

Consult the README in the [metric-generator](https://gitlab.com/ska-telescope/ska-sdp-qa-metric-generator/-/tree/main/metric-generator) folder.

**Option-1: Using Container**

```docker-compose up -d```

```docker-compose ps```

The docker container's working/source directory ```/usr/src/app``` is 
mapped/mounted to the host's ```./``` folder.

**Option-2: Start Locally**

Follow the instructions below to start the React app in your host machine.

Prerequisite

- Node.js 16+
- React.js 18+
- material UI ( MUI )

Install the dependencies

```yarn````

Run the app in development mode.

```yarn dev````

# run the app in production mode

```yarn start````


Open [http://localhost:3333](http://localhost:3333) to view the UI in a browser.