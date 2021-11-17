import numpy as np


# translate numbers from a range to another range
# by default, -180 - 180 -> 0 - 360
def transfrom(x, min_a=-180, max_a=180, min_b=0, max_b=360):
    return np.round((x - min_a) * ((max_b - min_b) / (max_a - min_a)) + min_b, 2)
