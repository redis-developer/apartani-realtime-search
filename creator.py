import json
import string
import random
data = []

letters = string.ascii_lowercase

def creator(pid):
    im = ''.join(random.choice(letters) for i in range(4))
    data.append({
        "id": pid,
        "img": f"https://www.{im}.com/{im}.jpg",
        "area": int(random.uniform(10, 100)),
        "rooms": int(random.uniform(1, 5)),
        "lat" : -74.039882+random.uniform(-0.05, 0.05),
        "lon" : 4.6971232+random.uniform(-0.05, 0.05)
    })

for i in range(1, 2000):
    pr = ''.join(random.choice(letters) for i in range(5))
    creator('pr-' + str(pr))

with open('data.json', 'w') as outfile:
    json.dump(data, outfile)

# import json

# with open('data.json', 'r') as data:
#     data = json.load(data)
#     for i in data:
#         print(i["id"])