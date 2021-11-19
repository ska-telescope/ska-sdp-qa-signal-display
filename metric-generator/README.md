
# Metric Generator

Here, we will describe how to develop and debug the code, and how to generate different quality matrices.

# Development & Debugging

The docker container's working/source directory `/usr/src/metric-generator` is mapped/mounted to the host's `./metric-generator` folder. Therefore, attaching a VSCode editor to the `metric-generator` container is a most convenient way to develop and debug.

> Note: follow the instructions below to develop and debug in the host machine, which is not recommended.

Required
- Python 3.8.

```bash
## create a virtual environment and install dependencies
pip install virtualenv
virtualenv venv
source ./venv/bin/activate
pip install -r requirements.txt

## in **MAC**, the python-casacore installation in virtualenv gives error (C++ library related), therefore, use a conda environment to install casacore libraries.
conda create --name metric-generator python=3.8
conda activate metric-generator

conda install -c conda-forge python-casacore
conda install -c conda-forge loguru
conda install -c conda-forge plotly
conda install -c conda-forge starlette
conda install -c conda-forge requests

## set the configuration variables, and run the code for reading measurement set, generate quality metrics (e.g., spectrum plot) and feed metrics the broker API:

export PRODUCER_API=http://broker-api:8001 
## or
export PRODUCER_API=http://localhost:8001
```

# Generate Matrices

## Measurement Set

Create spectrum plot and spectrogram data from a measurement set, and send to the message broker.
 
```bash
python ms_to_qa.py <.ms>
## example
python ms_to_qa.py ./data/PSI-LOW_5_stations_1_km_2_sources_10000_channels-autocorr-noise.ms
```
We used measurement set [PSI-LOW_5_stations_1_km_2_sources_10000_channels-autocorr-noise.ms](https://console.cloud.google.com/storage/browser/ska1-simulation-data/simulations/psi_simulations_SP-1158/low/PSI-LOW_5_stations_1_km_2_sources_10000_channels-autocorr-noise.ms;tab=objects?prefix=&forceOnObjectsSortingFiltering=false) to test the spectrogram.



For the RFI debugging we aggregate date from two measurement sets (a) visibility data with flags, for example,

```bash
python rfi_main.py <measurement-set with visibility and flags> <measurement-set of RFI>
## example
python rfi_main.py ./data/rfi/20_sources_with_screen/aa0.5_ms.MS ./data/rfi/aa05_low_rfi_84chans.ms
```

## Using Plasma

Read payloads from plasma, create spectrum plot data, and send to the message broker

```bash
## create plasma store
plasma_store -m 1000000000 -s /tmp/plasma &

## convert plasma payload to spectrumplot and send to the message broker
python plasma_to_spectrumplt.py "/tmp/plasma"

## start receiver
cd data
emu-recv -c ./50000ch.conf

## send data
cd data
emu-send -c ./50000ch.conf ./50000ch-model.ms
```

## Synthetic / Randomly Generated

This is particularly helpful during development and debugging. The following scripts create random spectrum plot and spectrogram data, and send to the message broker.

```
python rand_spectrumplt_data.py
python rand_phase_display_data.py
```

# Data Structures

Spectrum plot, 

```sh
{
    'topic': String,
    'timestamp': DateTime,                                  ## format("%Y-%m-%d %H:%M:%S")
    'body': {
        'description': String,
        'xLabel': String,
        'yLabel': String,
        'xMin': Number,
        'xMax': Number,
        'yMin': Number,
        'yMax': Number,
        'frequencies': Array[Number],
        'spectrum_values': Array[[Number, Number, Number]], ## shape: (3, #channels)
    }
}

```
See the file `rand_spectrumplt_data.py` as an example.

Phase display with waterfall of spectrograms,

```sh
{
    'topic': String,
    'timestamp': DateTime,                 ## format("%Y-%m-%d %H:%M:%S")
    "body": {
        "polarisation": String[],
        "baseline": String[],
        "phase_values": Array[[[Number]]]  ## 3D array of shape: (#baseline, #polarisation, #channels)
            
    }
}

```
See the file `rand_phase_display_data.py` as an example.


# Downloading Measurement Sets

Download measurement sets from GCP,

```bash
# using gsutil tool
gsutil -m cp -r <src> <dst>

## create & download in the metrics-generator/data folder
cd metrics-generator 
mkdir ./data

## example 1
gsutil -m cp -r "gs://ska1-simulation-data/ska1-low/psi_test/PSI-LOW_5_stations_1_km_2_sources_10000_channels-autocorr-noise.ms" ./data/
## example 2
gsutil -m cp -r "gs://ska1-simulation-data/simulations/psi_simulations_SP-1158/low/PSI-LOW_5_stations_1_km_2_sources_10000_channels-autocorr-noise.ms" ./data/

```
