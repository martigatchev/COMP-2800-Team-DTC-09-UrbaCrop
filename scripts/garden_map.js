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
  var markers = Array();
  map.data.loadGeoJson('data/community-gardens-and-food-trees.geojson', null, function (results) {
    /**for (let i = 0; i < results.length; i++) {
      console.log(results[i]);
      const coords = results.features[i].geometry.coordinates;
      const latLng = new google.maps.LatLng(coords[1], coords[0]);
      let marker = new google.maps.Marker({
        position: latLng,
        map: map,
        clickable: true,
      });*/
      /**var markers = features.map(function (feature) {
        console.log(feature);
        const coords = feature.coordinates;
        const latLng = new google.maps.LatLng(coords[1], coords[0]);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          clickable: true,
        });
        return marker;
      });*/
      markers = results.map(function (result) {
        if (result.getGeometry() !== null) {
          var marker = new google.maps.Marker({
            position: result.getGeometry().get(0)
          });
          return marker;
        }
    });
  });

  var infowindow = new google.maps.InfoWindow({
    content: "<b>Hello</b>",
  });

  map.data.addListener('click', function(event) {
    let html = "<b>Name: </b>" + event.feature.getProperty("name") + "<br>"
              + "<b>Location: </b>" + event.feature.getProperty("merged_address") + "<br>"
              + "<b>Neighborhood: </b>" + event.feature.getProperty("geo_local_area") + "<br>"
              + "<button type='button' id='openCommentsModal'>Apply</button>"
    infowindow.setContent(html);
    // position the infowindow on the marker
    infowindow.setPosition(event.feature.getGeometry().get());
    // anchor the infowindow on the marker
    infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
    infowindow.open(map);
    $(document).ready(function(){
      $("#openCommentsModal").click(function(){
        $("#commentsModal").modal("show");
      });
    });
  });
}

/**const eqfeed_callback = function (results) {
  var markers = Array();
  var infowindow = new google.maps.InfoWindow({
    content: "<b>Hello</b>",
  });
  //results.features.length
  for (let i = 0; i < results.features.length; i++) {
    const coords = results.features[i].geometry.coordinates;
    const latLng = new google.maps.LatLng(coords[1], coords[0]);
    let marker = new google.maps.Marker({
      position: latLng,
      map: map,
      clickable: true,
    });
    google.maps.event.addListener(marker, 'click', (function (marker) {
      return function () {
          infowindow.open(map, marker);
          google.maps.event.addListener(infowindow,'domready');
      };
   })(marker));
  }
};*/

main();
