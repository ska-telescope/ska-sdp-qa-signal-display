import argparse

from src.ms import ms_generator
from src.post_to_broker import post
from src.phase_display import phase_plot
from src.post_to_broker import post

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("ms", help="name of measurement set")
    args = parser.parse_args()
    ms_file = args.ms

    ms_iterator = ms_generator(ms_file)
    for it in ms_iterator:
        sample_num, data_sample, baseline, frequency, polarisation = it
        payload = phase_plot(data_sample, baseline, frequency, polarisation)
        post(payload)
