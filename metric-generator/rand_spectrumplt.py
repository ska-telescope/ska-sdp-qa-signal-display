import requests
import random
from datetime import datetime
from time import sleep

from src.post_to_broker import post

while True:
    curve = []
    xMax = 100
    yMax = 20
    for i in range(xMax):
        curve.append([i, random.randrange(5, yMax - 1, 5)	, 0.4, 0.8])

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
            'data': curve
        }
    }

    post(spectrumplt)
    sleep(.5)
