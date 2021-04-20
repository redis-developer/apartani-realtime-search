var socket = io();

function send_mov(mov) {
  socket.emit("position", "user-1", { lat: 12.3456, lon: 99.1010101 });

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

  point.features[0].geometry.coordinates = newcoords;
  map.getSource("pointpos").setData(point);
  map.flyTo({ center: newcoords });
}
