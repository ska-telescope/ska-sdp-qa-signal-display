# Projects
This folder consists of four projects;

1. `metric-generator` : 
    - Reads measurement set.
    - Process and generate quality metrics.
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

# Setup / Run

Services Start Sequence:

1. Message Broker (next section)
2. `broker-api`
3. `signal-display-api`
4. `signal-display-ui`
5. `metric-generator`


Start the message broker and dependent services:

```bash
docker compose up -d
docker compose ps
```
Access the broker control center UI: http://localhost:9021

> Note: if any process has not started or exited then run the command `docker-compose up -d` again or start the individual containers.

Access the signal display UI: http://localhost:3000

SSH to `metric-generator` container, download measurement sets, and feed data:

```bash
docker exec -it metric-generator bash

mkdir ./data

# Example 1
gsutil -m cp -r \
 "gs://ska1-simulation-data/ska1-low/psi_test/PSI-LOW_5_stations_1_km_2_sources_10000_channels-autocorr-noise.ms" \
 ./data/

python main.py \
 data/PSI-LOW_5_stations_1_km_2_sources_10000_channels-autocorr-noise.ms

 # Example 2
gsutil -m cp -r \
  "gs://ska1-simulation-data/ska1-mid/psi_test/sim_mid_psi_6ant.ms/" \
  ./data/

python main.py \
 data/sim_mid_psi_6ant.ms
```


