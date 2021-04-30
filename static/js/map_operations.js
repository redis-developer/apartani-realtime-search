var socket = io("ws://localhost:5000/rt-search");

function send_mov(mov) {
  var prevLat = point.features[0].geometry.coordinates[0];
  var prevLon = point.features[0].geometry.coordinates[1];
  var newcoords;
  switch (mov) {
    case "up":
      newcoords = [prevLat, prevLon + 0.0003];
      break;
    case "down":
      newcoords = [prevLat, prevLon - 0.0003];
      break;
    case "left":
      newcoords = [prevLat - 0.0003, prevLon];
      break;
    case "right":
      newcoords = [prevLat + 0.0003, prevLon];
      break;
    default:
      newcoords = [prevLat, prevLon];
      break;
  }

  socket.emit("position", {
    user: "example",
    lat: newcoords[0],
    lon: newcoords[1],
  });
  point.features[0].geometry.coordinates = newcoords;
  map.getSource("pointpos").setData(point);
  map.flyTo({ center: newcoords });
}

socket.on("update_prop", function (data) {
  let newProps = [];

  data.forEach((prop) => {
    if (document.getElementById(prop[0]) == null) {
      add_new(prop[0], prop[1][0], prop[1][1]);
    }

    newProps.push(prop[0]);
  });

  //i need to delete all houses that were added but are far away
  const added = document.querySelectorAll('*[id^="pr-"]');

  for (var elem of added) {
    if (!newProps.includes(elem.id)) {
      var oldProp = document.getElementById(elem.id);
      oldProp.parentNode.removeChild(oldProp);
    }
  }
});
socket.on("update_prop", function (data) {
  let newProps = [];

  data.forEach((prop) => {
    //Add new if doesn't exists
    if (document.getElementById(prop[0]) == null) {
      add_new(prop[0], prop[1][0], prop[1][1]);
    }

    newProps.push(prop[0]);
  });

  //Delete all houses that were added but are far away
  const added = document.querySelectorAll('*[id^="pr-"]');

  for (var elem of added) {
    if (!newProps.includes(elem.id)) {
      var oldProp = document.getElementById(elem.id);
      oldProp.parentNode.removeChild(oldProp);
    }
  }
});
