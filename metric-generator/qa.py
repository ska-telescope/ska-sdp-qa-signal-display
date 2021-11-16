"""
Functions to convert visibilities into QA plots.
"""

import numpy as np


# translate numbers from a range to another range
# by default, -180 - 180 -> 0 - 360
def transfrom(x, min_a=-180, max_a=180, min_b=0, max_b=360):
    return (x - min_a) * ((max_b - min_b) / (max_a - min_a)) + min_b


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


def phase_plot(data, baseline, frequency, polarisation, chan_avg=50):
    """
    Generate plot of phase.

    :param data: visibility data array
    :param baseline: baselines
    :param frequency: frequency of channels
    :param polarisation: polarisations
    :param chan_avg: number of channels to average together

    """
    # Get array dimensions
    # nbase, _, npol = data.shape
    nbase, npol, _ = data.shape

    # Normalise visibilities by dividing by amplitude
    data_norm = np.where(data != 0.0, data / np.abs(data), 0.0)

    # Average over channels
    # freq_avg = frequency.reshape(-1, chan_avg).mean(axis=1)
    freq_avg = frequency

    # data_avg = data_norm.reshape(nbase, -1, chan_avg, npol).mean(axis=2)
    data_avg = data_norm

    # Get phase (in range -180 to 180)
    phase = np.angle(data_avg, deg=True)

    # convert phase (in range 0 to 360)
    phase_scaled = transfrom(phase)

    # Create body of plot
    body = {
        "description": "Phase",
        "baseline": baseline,
        "frequency": freq_avg.tolist(),
        "polarisation": polarisation,
        # "phase_values": phase.tolist(),
        "phase_values": phase_scaled.tolist(),
    }

    return body
