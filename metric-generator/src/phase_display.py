import numpy as np
from .utils import transfrom


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
