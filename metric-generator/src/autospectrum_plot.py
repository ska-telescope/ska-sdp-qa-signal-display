import numpy as np


def autospectrum_plot(data, antenna1, antenna2, frequency, chan_avg=5):
    """
    Generate plot of mean autospectrum in intensity over all antennas.

    :param data: visibility data array
    :param antenna1: antenna 1
    :param antenna2: antenna 2
    :param frequency: channel frequencies
    :param chan_avg: number of channels to average together

    """
    # Extract autocorrelations and calculate their intensity
    auto = np.array(antenna1) == np.array(antenna2)
    spectrum = 0.5 * (data[auto, :, 0] + data[auto, :, 3]).real

    # Take mean over antennas
    spectrum = spectrum.mean(axis=0)

    # Average frequencies over channels and convert to MHz
    # freq_avg = 1.0e-6 * frequency.reshape(-1, chan_avg).mean(axis=1)
    freq_avg = 1.0e-6 * frequency

    # Take mean and standard deviation of spectrum over channels
    # tmp = spectrum.reshape(-1, chan_avg)
    # spec_avg = tmp.mean(axis=1)
    # spec_std = tmp.std(axis=1)
    tmp = spectrum
    spec_avg = tmp
    spec_std = np.zeros(tmp.shape)

    # Stack data into 2D array
    data = np.stack((spec_avg, spec_std, spec_std)).T

    # Create body of plot
    body = {
        "description": "Spectrum",
        "xLabel": "Frequency (MHz)",
        "yLabel": "Intensity",
        "xMin": np.min(freq_avg),
        "xMax": np.max(freq_avg),
        "yMin": np.min(spec_avg),
        "yMax": np.max(spec_avg),
        "frequencies": freq_avg.tolist(),
        "spectrum_values": data.tolist(),
    }

    return body
