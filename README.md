# SKAO Signal Display

# Overview

This connects to the [Signal Data API](https://gitlab.com/ska-telescope/ska-sdp-qa-data-api) via a WebSocket and visualizes the received Signal metrics (e.g, spectrum plot, waterfall plot etc) in real-time.

More information can be found in the [Read The Docs](https://developer.skao.int/projects/ska-sdp-qa-data-api/en/latest/index.html) page.

# Getting Started

**To get the Signal Display running services should be started in the following order:**

**Step 1:** Follow the steps in the [Signal Data API](https://gitlab.com/ska-telescope/ska-sdp-qa-data-api) README to start up the the Data API, Kafka and Redis.\
**Step 2** Then start [Signal Metric Generator](https://gitlab.com/ska-telescope/ska-sdp-qa-metric-generator) using information in it's README.\
**Step 3:** Finally start the [SKAO Signal Display](https://gitlab.com/ska-telescope/sdp/ska-sdp-qa-display) in this repository, using the steps below.\
**Sending spoof data to display:** Consult the README in the [metric-generator](https://gitlab.com/ska-telescope/ska-sdp-qa-metric-generator/-/tree/main/metric-generator) folder.

## Option-1: Using Container

```bash
docker-compose up -d
docker-compose ps
```

The docker container's working/source directory `/usr/src/app` is mapped/mounted to the host's `./` folder.

## Option-2: Start Locally

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

# References

- Using React [MUI](https://mui.com)

# Project Structure

```
├── __test__
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   ├── locales                         /* Language resources for supported languages ( en is the default ) */
│       └── en
│           └── translations.json       
│   └── static
│       └── ****                        /* Static Images */
├── src
│   ├── App
│   │   ├── App.test.tsx
│   │   └── App.tsx
│   ├── components                      /* Contains all components, below is just one as a sample */
│   │   ├── spectrumPlot
│   │   │   ├── spectrumPlot.test.tsx
│   │   │   └── spectrumPlot.tsx
│   ├── index.scss                      /* Styling for the D3 charting ONLY */
│   ├── index.tsx
│   ├── mockData                        /* Mock Data for testing */                  
│   ├── models                          /* different data models */
│   ├── services
│   │   └── i18n                        /* Internationalization */
│   │   └── redux-telescope             /* Local Storage and types for telescope, Not to be accessed directly */
│   │   └── redux-theme                 /* Local Storage and types for theme, Not to be accessed directly */
│   │   └── redux-user                  /* Local Storage and types for user, Not to be accessed directly */
│   │   └── stateStorage                /* Provides access for the application to all redux-xxxx services */
│   │   └── theme                       /* Material-UI Theme */
│   ├── types
│   └── utils
└── ****
```

[1] The package.json files lists all the packages and libraries used in this project.

[2] To our knowledge, none of the packages or libraries used in this project require any license. Please let us know if any package or component require license or acknowledgement.


# Link to Running Instance

[Click here](https://sdhp.stfc.skao.int/dp-naledi/qa/display/) to access a running instance of the Signal Display


