# Overview

This folder consists of four projects;

1. **metric-generator** :
    - Currently, there are three metrics (quality metrics) generators implemented for testing and/or demo.
        - Randomly generating plot data.
        - Creating plot data from measurement set.
        - Creating plot data from plasma object-store.
    - The generated metrics is feed to a message broker using a **producer-api**. Finally, the data is propagated to **display-ui** for visualization.

2. **producer-api** :
    - RESTful API to push data to the message broker (Kafka).
    - For example, the **metric-generator** pushes spectrum plot data to the message broker using this API.

3. **display-api**
    - This RESTful API server subscribes to the message broker for receiving any data that are pushed to the message broker in real-time.
    - This API also maintains connection requests from **display-ui** on a socket, and propagates the data received data from the message broker to the **display-ui**.

4. **display-ui** :
    - The quality metrics visualization interface.
    - This connects to the **display-api** on a socket and visualizes the received metrics (e.g, spectrum plot, waterfall plot etc) in real-time.

> Note: perhaps these projects should be spitted into 3-4 different repositories.

# Getting Started

Ideally, the services should be started in the following sequence,

1. Message Broker
2. `producer-api`
3. `display-api`
4. `display-ui`
5. `metric-generator`

We created two docker-compose files to start the service [1] and services [2]-[5] respectively.

## [1] Start the Message Broker

Start all message broker related  services.

```bash
docker-compose -f docker-compose-broker.yml up -d
docker-compose -f docker-compose-broker.yml ps
```

> Note: 
> - If we start a control center (see, the `docker-compose-broker.yml`) instance then the broker control panel UI can be accessed via http://localhost:9021.
> - If any process has not started or exited then stop and start the instances again.
> - Use `--no-deps --build` with `docker-compose` to rebuild the containers.

## [2-5] Start APIs, Metric Generator, and Signal Display

Start the `producer-api`, `display-api`, `display-ui`, and `metric-generator` services.

```bash
docker-compose -f docker-compose-sig.yml up -d
docker-compose -f docker-compose-sig.yml ps
```

Access the signal display UI via http://localhost:3000. When the `metric-generator` will feed different quality metrics to the broker the UI will visualize the data.


### Metric Generator

Different metrics can be generated from the `metric-generator` container and for that first SSH to the container,

```bash
docker exec -it metric-generator bash
```

See the [metric-generator/README.md](./metric-generator/README) for more details.
