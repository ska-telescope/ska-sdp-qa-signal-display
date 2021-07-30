import numpy as np
from datetime import datetime
import sys
import logging
import ska_ser_logging
from sdp_dal_schemas import PROCEDURES
import ska_sdp_dal as rpc

from src.post_to_broker import post

logger = logging.getLogger(__name__)
ska_ser_logging.configure_logging(level=logging.DEBUG)


class SimpleProcessor(rpc.Processor):
    """A Processor offering one call that saves incoming data as class members"""

    def __init__(self, *args, **kwargs):
        super(SimpleProcessor, self).__init__(
            [PROCEDURES['read_payload']], *args, **kwargs
        )

    def read_payload(self, times, baselines, channels, antennas, vis, polarizations, **_unused):
        payload_to_spectrum_plt(
            times, baselines, channels, antennas, polarizations, vis)


def payload_to_spectrum_plt(times, baselines, channels, antennas, polarizations, vis):

    ant1 = baselines.get()['antenna1']
    ant2 = baselines.get()['antenna2']
    time = times.get()
    data = vis.get()
    # spw = spectral_window.get()
    chan = channels.get()

    num_antennas = len(antennas.get())
    num_baselines = int(((num_antennas + 1) * num_antennas) / 2)
    num_times = len(time)
    num_channels = len(chan)
    freqs = channels.get()['frequency'].to_numpy()
    num_pols = len(polarizations.get())

    logger.info("-" * 60)
    logger.info(f"No. Rows ........ = {data.shape[0]}")
    logger.info(f"No. Antennas .... = {num_antennas}")
    logger.info(f"No. Baselines ... = {num_baselines}")
    logger.info(f"No. Times ....... = {num_times}")
    logger.info(f"No. Channels .... = {num_channels}")
    logger.info(f"No. Polarisations = {num_pols}")
    logger.info("-" * 60)
    logger.info("")

    # Genereate a bandpass taper
    w = 2000
    h = np.kaiser(w, 0.3)
    taper = np.ones((num_channels,))
    taper[0: w // 2] = h[: w // 2]
    taper[num_channels - w // 2:] = h[w // 2: w]

    # Parameters for adding RFI spikes
    num_rfi_spikes = 8
    rfi_level_min = 5
    rfi_level_max = 10

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
        rfi_amps = np.random.uniform(
            rfi_level_min, rfi_level_max, num_rfi_spikes)

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

        # Create the spectrum plot data structure for visualization
        spectrumplt = {
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

        post(spectrumplt)


# Set up simple event loop
proc = SimpleProcessor(sys.argv[1])
while True:
    proc.process()
