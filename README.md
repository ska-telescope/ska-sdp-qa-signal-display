# Projects
This folder consists of four projects;

1. **metric-generator** : 
    - Currently, there are three metrics generators implemented for testing or demo.
        - Randomly generating spectrum plot data.
        - Creating spectrum plot data from measurement set.
        - Creating spectrum plot data from Plasma object-store.
    - The generated quality metrics is feed to a message broker using a **broker-api**. Finally, the data is propagated to **signal-display-ui** for visualization.

2. **broker-api** : 
    - RESTful API to push data to the message broker (Kafka).
    - For example, the **metric-generator** pushes spectrum plot data to the message broker using this API.

3. **signal-display-api** 
    - This RESTful API server subscribes to the message broker and receives any data pushed to the message broker in real-time.
    - This API also maintains connection requests from **signal-display-ui** on a socket, and propagates the data received from the message broker to the **signal-display-ui**.

4. **signal-display-ui** : 
    - The quality metrics data visualization user interface.
    - This connects to the **signal-display-api** on a socket and visualizes the received metrics (e.g, spectrum plot).


> Note: the mentioned projects should be spitted into 3-4 different repositories.

# Getting Started

Ideally, the services should be started in a sequence as follows.

1. Message Broker
2. `broker-api`
3. `signal-display-api`
4. `signal-display-ui`
5. `metric-generator`

We created two docker-compose files to start the service [1] and services [2]-[5] respectively.

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

Start all the `broker-api`, `signal-display-api`, `signal-display-ui`, and `metric-generator` services.

```bash
docker-compose -f docker-compose-sig.yml up -d
docker-compose -f docker-compose-sig.yml ps
```

Access the signal display UI: http://localhost:3000


### Run Metric Generators

The metric generators can be executed from the `metric-generator` container. SSH to `metric-generator` container:

```bash
docker exec -it metric-generator bash
```


### Periodically create random spectrum plot data and send to the message broker

```
python rand_spectrumplt.py
```

### Read a measurement set, prepare spectrum plot data, and send to the message broker

Download example measurement set (if not there) in the `data` folder.

```bash
mkdir ./data
gsutil -m cp -r \
 "gs://ska1-simulation-data/ska1-low/psi_test/PSI-LOW_5_stations_1_km_2_sources_10000_channels-autocorr-noise.ms" \
 ./data/
```


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

For more details information of `plasma_store`, `emu-send`, and `emu-recv`, please refer to [ska-cbf-sdp-emulator in Gitlab](https://gitlab.com/ska-telescope/ska-sdp-cbf-emulator).