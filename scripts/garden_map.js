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

  var privateGardens = Array();
  var geocoder = new google.maps.Geocoder();
  for (let i = 0; i < parsed_data.length; i++) {
    geocoder.geocode( {'address': parsed_data[i].address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
       });

      let html = "<h4>Private Garden</h4><br>"
              + "<b>Name: </b>" + parsed_data[i].gardenName + "<br>"
              + "<b>Location: </b>" + parsed_data[i].address + "<br>"
              + "<b>Neighborhood: </b>" + parsed_data[i].location + "<br>"
              + "<button type='button' id='openCommentsModal'>Apply</button>"
      marker.addListener('click', function () {
        infowindow.setContent(html);
        infowindow.open(marker.get('map'), marker);
        $(document).ready(function(){
          $("#openCommentsModal").click(function(){
            $("#commentsModal").modal("show");
          });
        });
      });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    })
  }


  map.data.addListener('click', function(event) {
    let html = "<b>Name: </b>" + event.feature.getProperty("name") + "<br>"
              + "<b>Location: </b>" + event.feature.getProperty("merged_address") + "<br>"
              + "<b>Neighborhood: </b>" + event.feature.getProperty("geo_local_area") + "<br>"
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

main();

