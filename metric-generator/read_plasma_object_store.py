#
# This script is written to investigate read paylaod from plasma. This code is adapted from the following code example.
#  a. https://gitlab.com/ska-telescope/sdp/ska-sdp-dal/-/blob/master/scripts/stream_processor.py
#  b. https://gitlab.com/ska-telescope/cbf-sdp-emulator/-/blob/master/cbf_sdp/plasma_processor.py
#

import argparse
import asyncio
import collections
import concurrent.futures
import logging
import queue
import signal
import subprocess as sp
import threading
from typing import Deque, Optional
import time

import numpy as np
import ska_sdp_dal as dal
import ska_ser_logging
from sdp_dal_schemas import PROCEDURES

from cbf_sdp import icd, msutils
from cbf_sdp.plasma_tm import PlasmaTM

logger = logging.getLogger(__name__)


class PlasmaPayload(icd.Payload):
    """
    A payload for the plasma communications that looks like the ICD payload.
    """
    def __init__(self, tm: PlasmaTM, times: np.ndarray, vis: dal.TensorRef):
        self.tm = tm
        self.baseline_count = tm.num_baselines
        self.channel_count = tm.num_channels
        self.timestamp_count, self.timestamp_fraction = icd.mjd_to_icd(times[0])
        self.visibilities = vis

        # These do not make it currently through Plasma, but they are currently
        # not used anywhere anyhow
        self.channel_id = 0
        self.correlated_data_fraction = 0
        self.hardware_id = 0
        self.phase_bin_id = 0
        self.phase_bin_count = 0
        self.polarisation_id = 0
        self.scan_id = 0
        self.time_centroid_indices = []


class SimpleProcessor(dal.Processor):
    """A Processor offering one call that saves incoming data as class members"""

    def __init__(self, *args, **kwargs):
        super(SimpleProcessor, self).__init__(
            [PROCEDURES['read_payload']], *args, **kwargs
        )
        self.bytes_received = 0
        self.payloads: Deque[PlasmaPayload] = collections.deque()

    def read_payload(self, time_index, times, intervals, exposures, baselines,
                     spectral_window, channels, antennas, field, polarizations,
                     uvw, vis, output):
        """Reads the payload from parameters into this object's members"""

        tm = PlasmaTM(
            antennas.get_awkward(), baselines.get_awkward(),
            polarizations.get_awkward(), field.get_awkward(),
            spectral_window.get_awkward(), channels.get_awkward(),
            uvw.get(), intervals.get(), exposures.get(), time_index.get()
        )
        payload = PlasmaPayload(tm, times.get(), vis)
        self.payloads.append(payload)
        output.put(np.empty(0, dtype='i1'))

        logger.info(f'SimpleProcessor:read_payload: payload = {payload}\n')

    def pop_payload(self) -> Optional[PlasmaPayload]:
        """Detaches a received payload and returns it to the caller"""
        if self.payloads:
            return self.payloads.popleft()
        return None


class Runner(object):
    """Runs a SimpleProcessor until signalled to stop"""

    def __init__(self, plasma_socket: str):
        self.processor = SimpleProcessor(plasma_socket)
        self.active = True
       
    async def run(self):

        report_rate = 1
        checkpoint = time.time() + report_rate

        while self.active:
            try:
                while time.time() >= checkpoint:
                    self.processor.bytes_received = 0
                    checkpoint += report_rate
                self.processor.process(max(0, checkpoint - time.time()))
                payload =  self.processor.pop_payload()

                if payload is not None:
                    logger.info(f'Runner:run: payload = {payload}')

            except KeyboardInterrupt:
                exit(0)

    def stop(self):
        """Signal this runner to stop its activity and return"""
        self.active = False


if __name__ == '__main__':
    
    ska_ser_logging.configure_logging(level=logging.DEBUG)
    logger.info(f'Starting read plasma object store script...')

    plasma_socket = "/tmp/plasma"
    runner = Runner(plasma_socket)
    
    def stop_runner(_sig, _stack):
        logger.info("Signalling runner to stop")
        runner.stop()

    signal.signal(signal.SIGTERM, stop_runner)
    signal.signal(signal.SIGINT, stop_runner)
    
    loop = asyncio.get_event_loop()
    loop.run_until_complete(runner.run())
