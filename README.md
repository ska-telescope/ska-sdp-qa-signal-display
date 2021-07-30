# Projects
This folder consists of four projects;

1. `metric-generator` : 
    - Currently there are three metric generators creates  quality metrics, e.g., spectrum plot
    (a) Randomly generates spectrum plot data
    (b) Creates spectrum plot data from measurement set
    (b) Creates spectrum plot data from plasma object store
    - Feed the quality metrics to message broker using broker-api.  

2. `broker-api` : REST-API server to disseminate real-time data streams (e.g., QA Signal Display) through message broker (Kafka).
3. `signal-display-api` : QA signal display consumer RESTful API server.
    - Subscribes to the message broker.
    - Accepts connection request from clients (e.g., signal display user interface) on a socket.
    - Receives messages, whenever available, from the message broker.
    - Writes the received message to a socket.

4. `signal-display-ui` : QA signal display user interface
    - Connects to the `signal-display-api` on a socket.
    - Visualizes the received messages (e.g, using a spectrum plot).

> Note: in future, the above mentioned four projects may be spitted into four different repositories.

# Getting Started

Ideally, the services should be started in a sequence as follows.

1. Message Broker
2. `broker-api`
3. `signal-display-api`
4. `signal-display-ui`
5. `metric-generator`

We created two docker compose files to start the service [1] and services [2]-[5] respectively.

## Start Message Broker [1]

Start all message broker related  services.

```bash
docker-compose -f docker-compose-broker.yml up -d
docker-compose -f docker-compose-broker.yml ps
```
Access the broker control center UI: http://localhost:9021

> Note
> - Use `docker-compose` or `docker compose` based on the version you have installed. 
> - If any process has not started or exited then run the above command 'docker compose up ...' again or start the individual containers.
> - Use `--no-deps --build` to rebuild

## Start APIs, Metric Generator, and Signal Display [2-5]

Start all the services related to signal display.

```bash
docker-compose -f docker-compose-sig.yml up -d
docker-compose -f docker-compose-sig.yml ps
```

Access the signal display UI: http://localhost:3000


### Run Metric Generators

SSH to `metric-generator` container.

```bash
docker exec -it metric-generator bash
```

Open the signal display UI: http://localhost:3000.


### Create random spectrum plot data, and send to the message broker

```
python rand_spectrumplt.py
```

### Read a measurement set, create spectrum plot data, and send to the message broker

Download example measurement set, if not there.

```bash
mkdir ./data
gsutil -m cp -r \
 "gs://ska1-simulation-data/ska1-low/psi_test/PSI-LOW_5_stations_1_km_2_sources_10000_channels-autocorr-noise.ms" \
 ./data/
```

Read the measurement set, generate metrics, and feed it to the message broker.

```bash
python ms_to_spectrumplt.py data/PSI-LOW_5_stations_1_km_2_sources_10000_channels-autocorr-noise.ms

```

### Read payloads from plasma, create spectrum plot data, and send to the message broker
```
# Create plasma store
plasma_store -m 1000000000 -s /tmp/plasma &

# Convert plasma payload to spectrumplot and send to the message broker
python plasma_to_spectrumplt.py "/tmp/plasma"

# Start receiver
cd data
emu-recv -c ./50000ch.conf

# Start sender
cd data
emu-send -c ./50000ch.conf ./50000ch-model.ms
```