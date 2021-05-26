function main() {
  document.getElementById("list_toggle_button").addEventListener("click", toggle_visibility)
}
function toggle_visibility() {
  document.getElementById("accordionPanelsStayOpenExample").classList.toggle("invisible");
}


let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: new google.maps.LatLng(49.246292, -123.116226),
    mapTypeId: "terrain",
  });
  // Create a <script> tag and set the USGS URL as the source.
  map.data.loadGeoJson('data/community-gardens-and-food-trees.geojson');

}

const eqfeed_callback = function (results) {
  for (let i = 0; i < results.features.length; i++) {
    const coords = results.features[i].geometry.coordinates;
    const latLng = new google.maps.LatLng(coords[1], coords[0]);
    let this_marker = new google.maps.Circle({
      position: latLng,
      map: map,
    });
    this_marker.addEventListener("click", function() {

    })
  }
};
main();