from rejson import Client, Path
from flask import Flask, render_template, request, session
from flask_socketio import SocketIO, emit
import json

rj = Client(host="127.0.0.1", port=6379, decode_responses=True)


def addproperty(pid, img, area, rooms, lat, lon):
    prop = {
        "id": pid,
        "img": img,
        "area": area,
        "rooms": rooms,
    }
    rj.jsonset(pid, Path.rootPath(), prop)
    rj.geoadd("properties", lat, lon, pid)

    return True


def delproperty(pid):
    rj.zrem("properties", pid)
    rj.jsondel(pid)


with open("data.json", "r") as data:
    data = json.load(data)
    for i in data:
        addproperty(i["id"], i["img"], i["area"], i["rooms"], i["lat"], i["lon"])


app = Flask(__name__)
app.config["SECRET_KEY"] = "secret!"

socketio = SocketIO()
socketio.init_app(app, message_queue="redis://")


@socketio.on("position", namespace="/rt-search")
def position(data):
    """ Called when user sends new position """
    print(f"data {data}")

    result = rj.georadius(
        "properties", data["lat"], data["lon"], "500", "m", "WITHDIST", "WITHCOORD"
    )
    
    emit("update_prop", result, room=request.sid)


@app.route("/")
def index():
    return render_template("demo/index.html")


if __name__ == "__main__":
    print("app running on http://localhost:5000")
    app.run(threaded=True, debug=True)
