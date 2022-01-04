import time
import numpy as np
from casacore.tables import table, tablecolumn

## map from correlation type to polarisation
corrtype_to_pol = {
    5: "RR",
    6: "RL",
    7: "LR",
    8: "LL",
    9: "XX",
    10: "XY",
    11: "YX",
    12: "YY",
}


def read_ms(ms, interval=None):
    """
    read a messurement set and return a generator

    :param ms: name of measurement set
    :params interval: time between sending samples
    """

    print(f"\nReading measurement set ......... = {ms}")

    ## open main table and ancillary tables
    main_table = table(ms, ack=False)
    ant_table = table(main_table.getkeyword("ANTENNA"), ack=False)
    spw_table = table(main_table.getkeyword("SPECTRAL_WINDOW"), ack=False)
    pol_table = table(main_table.getkeyword("POLARIZATION"), ack=False)

    ## get dimensions of data set
    num_rows = main_table.nrows()
    num_antennas = ant_table.nrows()
    num_baselines = ((num_antennas + 1) * num_antennas) // 2
    num_samples = num_rows // num_baselines
    num_channels = tablecolumn(spw_table, "NUM_CHAN")[0]
    num_polarisations = tablecolumn(pol_table, "NUM_CORR")[0]

    print(f"No. Rows ........................ = {num_rows}")
    print(f"No. Antennas .................... = {num_antennas}")
    print(f"No. Baselines ................... = {num_baselines}")
    print(f"No. Samples ..................... = {num_samples}")
    print(f"No. Channels .................... = {num_channels}")
    print(f"No. Polarisations ............... = {num_polarisations}")

    ## antennas and baselines
    antenna1 = tablecolumn(main_table, "ANTENNA1")[0:num_baselines]
    antenna2 = tablecolumn(main_table, "ANTENNA2")[0:num_baselines]
    name = tablecolumn(ant_table, "NAME")[0:num_antennas]
    baseline = [f"{name[a1]}, {name[a2]}" for a1, a2 in zip(antenna1, antenna2)]

    ## channel frequencies
    frequency = tablecolumn(spw_table, "CHAN_FREQ")[0]

    ## polarisations
    corrtype = tablecolumn(pol_table, "CORR_TYPE")[0]
    polarisation = [corrtype_to_pol[c] for c in corrtype]

    if interval is None:
        ## calculate interval from times in the measurement set
        times = tablecolumn(main_table, "TIME")
        interval = times[num_baselines] - times[0]

    print(f"Time interval between samples ... = {interval} s")

    ## open the data column of the main table
    data = tablecolumn(main_table, "DATA")

    ## open the FLAG column of the main table
    flags = tablecolumn(main_table, "FLAG")

    ## create array to contain data for one time sample
    data_sample = np.zeros(
        (num_baselines, num_channels, num_polarisations), dtype=np.complex128
    )

    ## create array to contain flags for one time sample
    flags_sample = np.zeros((num_baselines, num_channels, num_polarisations), np.intc)

    for sample_num in range(num_samples):
        start = time.time()
        print(f"Reading time sample ............. = {sample_num} of {ms}")

        ## unpack data for this time sample
        for b in range(num_baselines):
            i = sample_num * num_baselines + b
            data_sample[b, :, :] = data[i]
            flags_sample[b, :, :] = flags[i]

        sample_time = times[sample_num * num_baselines]

        yield sample_num, sample_time, data_sample, baseline, frequency, polarisation, flags_sample

        ## wait until sending next sample, if necessary
        wait = round(start + interval - time.time())
        print("wait =", wait)
        if wait > 0.0:
            time.sleep(wait)
