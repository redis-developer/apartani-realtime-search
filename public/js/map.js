var map;
  mapboxgl.accessToken =
    "pk.eyJ1IjoianVsaWFudXN1IiwiYSI6ImNrbm56dWU3ZjEzZ2Uyb21vMXRpaHp0bDMifQ.jOaoVuPdkcgQcpgq7yHz1Q";
  var monument = [-74.039882, 4.697129];
document.addEventListener("DOMContentLoaded", function () {
  map = new mapboxgl.Map({
    container: "map-container",
    style: "mapbox://styles/mapbox/light-v10",
    center: monument,
    zoom: 15,
  });

  // create the popup
  var popup = new mapboxgl.Popup({ offset: 25 }).setText(
    "Construction on the Washington Monument began in 1848."
  );

  // create DOM element for the marker
  var el = document.createElement("div");
  el.id = "marker";

  el.addEventListener("click", () => {
    alert("Hola!");
  });

  // create the marker
  new mapboxgl.Marker(el)
    .setLngLat(monument)
    .setPopup(popup) // sets a popup on this marker
    .addTo(map);
});
