import argparse
import numpy as np
from datetime import datetime
from src.ms_iterator import read_ms
from src.post_to_broker import post
from src.post_to_broker import post


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("ms1", nargs=1, help="<Required> visibility with flags")
    parser.add_argument("ms2", nargs=1, help="<Required> RFI data")

    args = parser.parse_args()
    ms1 = args.ms1
    ms2 = args.ms2

    vis_generator = read_ms(ms1)
    rfi_generator = read_ms(ms2)
    for vis_it, rfi_it in zip(vis_generator, rfi_generator):
        (
            vis_num,
            vis_time,
            vis_data,
            baseline,
            frequency,
            polarisation,
            flagged_vis,
        ) = vis_it
        (
            rfi_num,
            _,
            rfi_data,
            _,
            _,
            _,
            _,
        ) = rfi_it

        # print(sample_num1, sample_num2)

        ## compute aplitude from the complex number
        ## add visibility and rfi aplitutes
        ## round to the number to 1 decimal
        sum_data = np.round(np.abs((vis_data + rfi_data)), 1)
        vis_data = np.round(np.abs(vis_data), 1)
        rfi_data = np.round(np.abs(rfi_data), 1)

        ## (baseline, channel, polarisation) -> (baseline, polarisation, channel)
        sum_data = sum_data.transpose(0, 2, 1)
        vis_data = vis_data.transpose(0, 2, 1)
        rfi_data = rfi_data.transpose(0, 2, 1)
        flags = flagged_vis.transpose(0, 2, 1)

        ## convert to MHz
        frequency = frequency * 1.0e-6

        ## TODO no need to send all data points, just send a quality
        rfi_summary_payload = {
            "topic": "rfi_summary",
            "timestamp": datetime.utcfromtimestamp(vis_time).strftime(
                "%Y-%m-%d %H:%M:%S"
            ),
            "body": {
                "baseline": baseline,
                "polarisation": polarisation,
                "rfi_data": rfi_data.tolist(),
                "flags": flags.tolist(),
                "frequencies": frequency.tolist(),
            },
        }
        post(rfi_summary_payload)

        rfi_details_payload = {
            "topic": "rfi_xx_00_01",
            "timestamp": datetime.utcfromtimestamp(vis_time).strftime(
                "%Y-%m-%d %H:%M:%S"
            ),
            "body": {
                "description": "RFI (XX, 00-01)",
                "xLabel": "Frequency (MHz)",
                "yLabel": "Intensity",
                "sum_data": sum_data.tolist()[0][1],
                "vis_data": vis_data.tolist()[0][1],
                "rfi_data": rfi_data.tolist()[0][1],
                "flags": flags.tolist()[0][1],
                "frequencies": frequency.tolist(),
                "xMin": np.min(frequency),
                "xMax": np.max(frequency),
                "yMin": min(
                    np.min(sum_data[0][1]),
                    np.min(vis_data[0][1]),
                    np.min(rfi_data[0][1]),
                ),
                "yMax": max(
                    np.max(sum_data[0][1]),
                    np.max(vis_data[0][1]),
                    np.max(rfi_data[0][1]),
                    1,
                ),
            },
        }
        post(rfi_details_payload)
