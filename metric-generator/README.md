
# metric-generator


## Requirements


## Setting up

Setup a python virtual environment and install the dependencies.

```bash
pip install virtualenv
virtualenv venv

source ./venv/bin/activate
pip install -r requirements.txt
```

In **MAC**, the `python-casacore` installation in virtualenv gives error related to C++ library. Whereas in conda environment it works well.

```bash
conda create --name metric-generator python=3.8
conda activate metric-generator

conda install -c conda-forge python-casacore
conda install -c conda-forge loguru
conda install -c conda-forge plotly
conda install -c conda-forge starlette
conda install -c conda-forge requests
```
TODO: Create conda environment.yml

## Running the Project in Development

Download an example measurement set:

```bash
mkdir ./data

gsutil -m cp -r \
"gs://ska1-simulation-data/ska1-low/psi_test/PSI-LOW_5_stations_1_km_2_sources_10000_channels-autocorr-noise.ms" \
./data/
```

Set the configuration variables, and run the code for reading measurement set, generate quality metrics (e.g., spectrum plot) and feed metrics the broker API:


Set the broker address, for example,
```
export BROKER_API=http://broker-api:8001 # or
export BROKER_API=http://localhost:8001
```

### Create random spectrum plot data, and send to the message broker

```
python rand_spectrumplt.py
```

### Read a measurement set, create spectrum plot data, and send to the message broker
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






## Generationg data for Spectrogram

We used [this](https://console.cloud.google.com/storage/browser/ska1-simulation-data/simulations/psi_simulations_SP-1158/low/PSI-LOW_5_stations_1_km_2_sources_10000_channels-autocorr-noise.ms.split) to test the spectrogram.


```bash
python ms_to_qa.py ./data/PSI-LOW_5_stations_1_km_2_sources_10000_channels-autocorr-noise.ms.split
```