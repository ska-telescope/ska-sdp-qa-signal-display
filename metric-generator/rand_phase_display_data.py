import requests
import random
from datetime import datetime
from time import sleep
import numpy as np

from src.post_to_broker import post

while True:
    # data = {
    #     'topic': 'phase',
    #     'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    #     "body": {
    #         "polarisation": ["XX", "XY"],
    #         "baseline": ["00", "01", "10"],
    #         "phase_values": [
    #             [
    #                 np.random.randint(0,361,100, dtype=np.uint16).tolist(), # 100 random phase values between 0-360
    #                 np.random.randint(0,361,100, dtype=np.uint16).tolist(),
    #             ],
    #             [
    #                 np.random.randint(0,361,100, dtype=np.uint16).tolist(),
    #                 np.random.randint(0,361,100, dtype=np.uint16).tolist(),
    #             ],
    #             [
    #                 np.random.randint(0,361,100, dtype=np.uint16).tolist(),
    #                 np.random.randint(0,361,100,dtype=np.uint16).tolist(),
    #             ],
    #         ]
    #     }
    # }

    data = {
        'topic': 'phase',
        'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "body": {
            "polarisation": ["XX", "XY", 'AB', 'CD'],
            "baseline": ["00", "01", "10"],
            "phase_values": [
                [
                    np.random.randint(0,361,100, dtype=np.uint16).tolist(), # 100 random phase values between 0-360
                    np.random.randint(0,361,100, dtype=np.uint16).tolist(),
                    np.random.randint(0,361,100, dtype=np.uint16).tolist(),
                    np.random.randint(0,361,100, dtype=np.uint16).tolist(),

                ],
                [
                    np.random.randint(0,361,100, dtype=np.uint16).tolist(),
                    np.random.randint(0,361,100, dtype=np.uint16).tolist(),
                    np.random.randint(0,361,100, dtype=np.uint16).tolist(),
                    np.random.randint(0,361,100, dtype=np.uint16).tolist(),
                ],
                [
                    np.random.randint(0,361,100, dtype=np.uint16).tolist(),
                    np.random.randint(0,361,100,dtype=np.uint16).tolist(),
                    np.random.randint(0,361,100, dtype=np.uint16).tolist(),
                    np.random.randint(0,361,100, dtype=np.uint16).tolist(),
                ],
            ]
        }
    }

    print(data["body"]["phase_values"])
    post(data)
    sleep(1)
