# QA Display

#Overview

This connects to the [QA data API](https://gitlab.com/ska-telescope/ska-sdp-qa-data-api) via a WebSocket and visualises the received QA metrics (e.g, spectrum plot, waterfall plot etc) in real-time.

# Getting Started

**To get the QI Display running services should be started in the following order:**

**Step 1:** Follow the steps in the [QA Metric Generator](https://gitlab.com/ska-telescope/ska-sdp-qa-metric-generator) README to:
\
(1) create the `"ska-sdp-qa-metric-network"` -> (2) start Message Broker -> (3) Start Metric Generator\
**Step 2** Then start [QA Data API](https://gitlab.com/ska-telescope/ska-sdp-qa-data-api) using information in it's README.\
**Step 3:** Finally start the [QA Display](https://gitlab.com/ska-telescope/sdp/ska-sdp-qa-display) in this repository, using the steps below.\
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
- material UI ( MUI )

```bash
# install the dependencies
yarn

# run the app in development mode.
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the UI in a browser.

## References

- Using React [MUI](https://mui.com)

### Project Structure

```
├── __test__                            /* unit test for index.txt */
├── package.json                        /* list of used packages and libraries */
├── public
│   ├── index.html
│   └── manifest.json
│   └── robots.txt                      /* See https://www.robotstxt.org/robotstxt.html */
├── src
│   ├── components
│   │   ├── dashboard-layout
│   │   │   ├── dashboard-layout.tsx
│   │   │   ├── dashboard-navbar.tsx
│   │   │   ├── dashboard-sidebar.tsx
│   │   │   └── nav-item.tsx
│   ├── libs                            /* the visualisation functions */
│   │   └── css
│   │       └── ****                    /* stylesheets related to the visualisations */
│   ├── mock
│   │   └── ****                        /* mock data used for testing */
│   ├── models
│   │   └── ****                        /* different data models */
│   ├── pages
│   │   ├── _app.tsx                    /* Next.js specific */
│   │   ├── _document.tsx               /* Next.js specific */
│   │   ├── index.tsx
│   ├── theme
│   │   └── index.js                    /* MUI theme */
│   ├── types
│   └── utils
│       ├── create-emotion-cache.js     /* User by MUI */
│       └── get-initials.js
└── ****                                /* other files */

```

[1] The package.json files lists all the packages and libraries used in this project.

[2] To our knowledge, none of the packages or libraries used in this project require any license. Please let us know if any package or component require license or acknowledgement.

## Notes

- This is currently a Proof of Concept and will require addition effort to make production ready

# Screenshots

Screenshots of the visulisation functions implemented.

The appearance of the plots depends on the dataset analysed. Thus, plots generated using are generally expected to look different from the ones included below. Getting plots with different appearance when first setting up and testing the [QA Display](https://gitlab.com/ska-telescope/sdp/ska-sdp-qa-display), [QA Data API](https://gitlab.com/ska-telescope/ska-sdp-qa-data-api) and [QA Metric Generator](https://gitlab.com/ska-telescope/ska-sdp-qa-metric-generator) is not a cause for concern.

|                                                                 |                                                           |
| --------------------------------------------------------------- | --------------------------------------------------------- |
| ![](./public/static/images/screenshot-spectrograms.png)         | ![](./public/static/images/screenshot-spectrogram.png)    |
| Fig. 1: Spectrograms of different baselines and polarisations\* | Fig. 2: Waterfall (top -> bottom) plot of a spectrogram\* |
| ![](./public/static/images/screenshot-spectrum.png)             | ![](./public/static/images/screenshot-rfi.png)            |
| Fig. 3: Spectrum plot\*                                         | Fig. 4: RFI QA\*                                          |

_\*The spectrum plot and spectrograms are generated using data from Meerkat telescope, and the RFI QA is generated using simulated data._
