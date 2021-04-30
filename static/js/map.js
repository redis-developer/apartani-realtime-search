var map;
mapboxgl.accessToken =
  "pk.eyJ1IjoianVsaWFudXN1IiwiYSI6ImNrbm56dWU3ZjEzZ2Uyb21vMXRpaHp0bDMifQ.jOaoVuPdkcgQcpgq7yHz1Q";

var initial_point = [-74.039882, 4.697];

console.info("Started map");
map = new mapboxgl.Map({
  container: "map-container",
  style: "mapbox://styles/mapbox/light-v10",
  center: initial_point,
  zoom: 15,
});

const template = document.getElementById("template");

var point = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: initial_point,
      },
    },
  ],
};

map.on("load", function () {
  map.addSource("pointpos", {
    type: "geojson",
    data: point,
  });

  map.addLayer({
    id: "pointpos",
    source: "pointpos",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#3887be",
    },
  });
});

let selectionId = "";

function create_template(description) {
  const selection = template.content.cloneNode(true);
  selection.querySelector("#selection-title").innerText = description;

  return selection;
}

function replace_selection(newSelection) {
  

  socket.emit("property", {
    user: "example",
    selection: newSelection
  });


  var propertySelection = document.getElementById("properties-list");

  const selection = create_template(newSelection);

  if (selectionId == "") {
    propertySelection.appendChild(selection);
    document.getElementById(newSelection).classList.add("marker-selected")
  } else {
    document.getElementById(newSelection).classList.add("marker-selected")
    document.getElementById(selectionId).classList.remove("marker-selected")
    propertySelection.innerHTML = null;
    propertySelection.appendChild(selection);
  }
  selectionId = newSelection;
}

function add_new(pid, lat, lon) {
  
  var el = document.createElement("div");
  el.classList = "marker";
  el.id = pid;

  el.addEventListener("click", function () {
    replace_selection(el.id);
  });

  new mapboxgl.Marker(el).setLngLat([lat, lon]).addTo(map);
}
