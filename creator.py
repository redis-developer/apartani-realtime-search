## This script creates random properties


import json
import string
import random
data = []


letters = string.ascii_lowercase

def creator(pid):
    im = ''.join(random.choice(letters) for i in range(4))
    rooms = int(random.uniform(3, 5))
    data.append({
        "id": pid,
        "img": f"https://www.{im}.com/{im}.jpg",
        "area": int(random.uniform(10, 100)),
        "rooms": rooms,
        "baths": rooms - int(random.uniform(1, 2)),
        "lat" : -74.039882+random.uniform(-0.05, 0.05),
        "lon" : 4.6971232+random.uniform(-0.05, 0.05),
        "price" : int(random.uniform(120, 500))*1000
    })

for i in range(1, 1500):
    pr = ''.join(random.choice(letters) for i in range(5))
    creator('pr-' + str(pr))

with open('data.json', 'w') as outfile:
    json.dump(data, outfile)
