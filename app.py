from rejson import Client, Path
from flask import Flask, render_template, request, session
from flask_socketio import SocketIO, emit
import json


# Connect to redis json client
rj = Client(host="127.0.0.1", port=6379, decode_responses=True)

# Gets one property with id
def getproperty(pid):
    """ Deletes properties by Id """
    prop = rj.jsonget(pid)
    return prop


def addproperty(pid, img, price, area, rooms, lat, lon):
    """ Adds each property to Redis JSON """
    prop = {
        "id": pid,
        "img": img,
        "price": price,
        "area": area,
        "rooms": rooms,
    }
    # adds json object
    rj.jsonset(pid, Path.rootPath(), prop)
    # adds geo location of property 
    rj.geoadd("properties", lat, lon, pid)


def delproperty(pid):
    """ Deletes properties by Id """
    rj.zrem("properties", pid)
    rj.jsondel(pid)


# Loads all the properties from the data.json file
with open("data.json", "r") as data:
    data = json.load(data)
    for i in data:
        addproperty(
            i["id"], i["img"], i["price"], i["area"], i["rooms"], i["lat"], i["lon"]
        )


# Start Flask app
app = Flask(__name__)
app.config["SECRET_KEY"] = "secret!"

# Socket io client
socketio = SocketIO()
socketio.init_app(app)


# Socket that detects changes in user position
@socketio.on("position", namespace="/rt-search")
def position(data):
    """ Called when user sends new position """

    result = rj.georadius(
        # I need to leave the "" paramenter to dont get the distances from database
        # Get properties that are 500m away in radius of my current location
        "properties",
        data["lat"],
        data["lon"],
        "500",
        "m",
        "",
        "WITHCOORD",
    )

    # Emit propierties to one user
    emit("update_prop", result, room=request.sid)


# Socket that returns properties
@socketio.on("property", namespace="/rt-search")
def property(data):
    """ Called when user clicks on a property """

    result = getproperty(data["selection"])

    # Emit propierties to one user
    emit("property_result", result, room=request.sid)


# Index Route
@app.route("/")
def index():
    return render_template("demo/index.html")


# Start app
if __name__ == "__main__":
    app.run(threaded=True, debug=True)
    print("App running on http://localhost:5000")
