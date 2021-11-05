import requests
import random
from datetime import datetime
from time import sleep
import numpy as np

from src.post_to_broker import post

while True:
    curve = []
    xMax = 100
    yMax = 20
    for i in range(xMax):
        curve.append([i, random.randrange(5, yMax - 1, 5)	, 0.4, 0.8])

    data = {
        'topic': 'phase',
        'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "xxx": np.random.randint(0,361,100).tolist(),
        "body": {
            "baseline": ["XX", "XY"],
            "polarisation": ["00", "01", "10"],
            "phase_values": [
                [
                    np.random.randint(0,361,100, dtype=np.uint16).tolist(),
                    np.random.randint(0,361,100, dtype=np.uint16).tolist(),
                ],
                [
                    np.random.randint(0,361,100, dtype=np.uint16).tolist(),
                    np.random.randint(0,361,100, dtype=np.uint16).tolist(),
                ],
                [
                    np.random.randint(0,361,100, dtype=np.uint16).tolist(),
                    np.random.randint(0,361,100,dtype=np.uint16).tolist(),
                ],
            ]
        }
    }

    print(data["body"]["phase_values"])
    post(data)
    sleep(5)
