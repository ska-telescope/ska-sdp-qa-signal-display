import sys
import time
import json
import requests
import math
import numpy as np
from loguru import logger
from datetime import datetime

from casacore.tables import table, tablecolumn
from casacore.quanta import quantity
import plotly.graph_objs as go

from core.config import BROKER_API


def main(ms):
    t = table(ms, ack=False)
    ant1 = tablecolumn(t, "ANTENNA1")
    ant2 = tablecolumn(t, "ANTENNA2")
    time = tablecolumn(t, "TIME")  # in mjd seconds
    data = tablecolumn(t, "DATA")
    spw = table(t.getkeyword("SPECTRAL_WINDOW"), ack=False)

    num_antennas = table(t.getkeyword("ANTENNA"), ack=False).nrows()
    num_baselines = int(((num_antennas + 1) * num_antennas) / 2)
    num_times = int(t.nrows() / num_baselines)
    num_channels = tablecolumn(spw, "NUM_CHAN")[0]
    freqs = tablecolumn(spw, "CHAN_FREQ")[0]
    num_pols = tablecolumn(table(t.getkeyword("POLARIZATION"), ack=False), "NUM_CORR")[
        0
    ]

    logger.info("-" * 60)
    logger.info(f"No. Rows ........ = {t.nrows()}")
    logger.info(f"No. Antennas .... = {num_antennas}")
    logger.info(f"No. Baselines ... = {num_baselines}")
    logger.info(f"No. Times ....... = {num_times}")
    logger.info(f"No. Channels .... = {num_channels}")
    logger.info(f"No. Polarisations = {num_pols}")
    logger.info("-" * 60)
    logger.info("")

    # Loop over autocorrelations

    # Genereate a bandpass taper
    w = 2000
    h = np.kaiser(w, 0.3)
    taper = np.ones((num_channels,))
    taper[0 : w // 2] = h[: w // 2]
    taper[num_channels - w // 2 :] = h[w // 2 : w]

    # Parameters for adding RFI spikes
    num_rfi_spikes = 8
    rfi_level_min = 5
    rfi_level_max = 70

    num_times = 1
    curves = []
    plot_data = np.zeros((num_channels, num_antennas))

    plot_data_touple = []
    xMin = float("inf")
    xMax = float("-inf")
    yMin = float("inf")
    yMax = float("-inf")

    for t in range(num_times):
        plot_data = np.zeros((num_channels, num_baselines))

        n = 0
        for b in range(num_baselines):
            i = t * num_baselines + b
            if ant1[i] == ant2[i]:
                plot_data[:, n] = np.abs(0.5 * (data[i][:, 0] + data[i][:, 3]))

                n += 1
        rfi_positions = np.random.randint(0, num_channels, num_rfi_spikes)
        rfi_amps = np.random.uniform(rfi_level_min, rfi_level_max, num_rfi_spikes)

        plot_y = np.average(plot_data, axis=1)
        plot_y[rfi_positions] = plot_y[rfi_positions] + rfi_amps
        plot_y *= taper
        group = 5  # Number of channels to average together
        plot_y = plot_y.reshape(-1, group).mean(axis=1)
        plot_x = np.arange(plot_y.shape[0])
        plot_x = freqs.reshape(-1, group).mean(axis=1) / 1.0e6

        # Plot to verify
        # curves.append(go.Scatter(name=f"time-{t}", x=plot_x, y=plot_y))

        plot_std = np.zeros(plot_x.shape[0])
        plot_data_touple = list(
            zip(plot_x, plot_y, plot_std, plot_std)
        )  # std or CI low/high
        xMin = min(np.min(plot_x), xMin)
        xMax = max(np.max(plot_x), xMax)
        yMin = min(np.min(plot_y), yMin)
        yMax = max(np.max(plot_y), yMax)

    # Plot to verify
    # fig = go.Figure(curves)
    ##fig.update_yaxes(range=[180, 215])
    # fig.update_layout(
    #     xaxis_title="Frequency (MHz)",
    #     yaxis_title="Total Intensity",
    #     font=dict(
    #         family="Open Sans",
    #         size=13,
    #     ),
    # )
    # fig.show()

    # Send the spectrum plot data for visualization
    payload = {
        "topic": "spectrum",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "body": {
            "description": "Spectrum",
            "xLabel": "Frequency (MHz)",
            "yLabel": "Total Intensity",
            "xMin": xMin,
            "xMax": xMax,
            "yMin": yMin,
            "yMax": yMax,
            "data": plot_data_touple,
        },
    }

    endpoint = f"{BROKER_API}/broker"
    logger.info(f"endpoint = {endpoint}, payload = {payload}")
    requests.post(endpoint, json=payload)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        logger.error("Usage: python main.py <measurement set>")
        exit(1)

    logger.info(f"Args: {sys.argv}")
    logger.info(f"Measurement set = {sys.argv[1]}")

    main(sys.argv[1])