
# metric-generator

This is a ..

## Requirements


## Setting up

Setup a python virtual environment and install the dependencies.

```bash
pip install virtualenv
virtualenv venv

source ./venv/bin/activate
pip install -r requirements.txt
```

In MAC the `python-casacore` installation in virtualenv gives error related to C++ library. Whereas in conda environment it works well.

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

The configuration variables (below) should be defined in `.env`. An example development configuration; 

```bash
# .env
BROKER_API=http://127.0.0.1:8001/broker
MEASUREMENT_SET=data/PSI-LOW_5_stations_1_km_2_sources_10000_channels-autocorr-noise.ms
```

Download the measurement sets defined in `.env`

```bash
mkdir ./data
gsutil -m cp -r \
  "gs://ska1-simulation-data/ska1-low/psi_test/PSI-LOW_5_stations_1_km_2_sources_10000_channels-autocorr-noise.ms" \
  ./data/
```

Read the measurement set and generate simple metrics (spectrum plot) and feed to the broker API.

```bash
python main.py
```

