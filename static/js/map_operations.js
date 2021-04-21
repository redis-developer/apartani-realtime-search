var socket = io("ws://localhost:5000/rt-search");

function send_mov(mov) {

  var prevLat = point.features[0].geometry.coordinates[0];
  var prevLon = point.features[0].geometry.coordinates[1];
  var newcoords;
  switch (mov) {
    case "up":
      newcoords = [prevLat, prevLon + 0.00015];
      break;
    case "down":
      newcoords = [prevLat, prevLon - 0.00015];
      break;
    case "left":
      newcoords = [prevLat - 0.00015, prevLon];
      break;
    case "right":
      newcoords = [prevLat + 0.00015, prevLon];
      break;
    default:
      newcoords = [prevLat, prevLon];
      break;
  }

  socket.emit("position", {
    user: "juliano",
    lat: newcoords[0],
    lon: newcoords[1],
  });
  point.features[0].geometry.coordinates = newcoords;
  map.getSource("pointpos").setData(point);
  map.flyTo({ center: newcoords });
}

socket.on("update_prop", function (data) {
  console.log(data);
});