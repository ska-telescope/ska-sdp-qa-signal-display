import requests
import random
from datetime import datetime
from time import sleep

from src.post_to_broker import post

while True:
    frequencies = []
    values = []
    xMax = 100
    yMax = 20
    flags = []
    rfis = []

    for i in range(xMax):
        frequencies.append(i)
        values.append([random.randrange(5, yMax - 1, 5)	, 0.4, 0.8])
        flags.append(random.randint(0, 1))
        rfis.append(random.randrange(0, 2))    

    spectrumplt = {
        'topic': 'spectrum',
        'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        'body': {
            'description': "Spectrum",
            'xLabel': "Frequency (MHz)",
            'yLabel': "Power (dB)",
            'xMin': 0,
            'xMax': xMax,
            'yMin': 1,
            'yMax': yMax,
            'frequencies': frequencies,
            'spectrum_values': values,
            'flags': flags,
            'rfis': rfis,
        }
    }

    post(spectrumplt)
    sleep(3)
