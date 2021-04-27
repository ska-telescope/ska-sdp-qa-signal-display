
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

```bash
export BROKER_API=http://localhost:8001

python main.py \
data/PSI-LOW_5_stations_1_km_2_sources_10000_channels-autocorr-noise.ms
```

