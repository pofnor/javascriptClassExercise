function showMap(){
  var map = L.map('map').setView([35.714183, 51.365204], 11);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 15,    
    }).addTo(map);

    var marker = L.marker([35.678494, 51.306839]).addTo(map);

    var circle = L.circle([35.695504, 51.469917], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
    }).addTo(map);

    var polygon = L.polygon([
    [35.769079, 51.345978],
    [35.769079, 51.38855],
    [35.74902, 51.384773]
    ]).addTo(map);

    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    circle.bindPopup("I am a circle.");
    polygon.bindPopup("I am a polygon.");

    var popup = L.popup();

    function onMapClick(e) {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
    }

    map.on('click', onMapClick);

    // https://www.geoapify.com/ to reverse geocoding
}

// --------------- Client Location -----------------------
function getLocation() {
  const x = document.getElementById("demo");
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else { 
    document.getElementById("demo").innerHTML = "Geolocation is not supported by this browser.";
  }
}
    
function showPosition(position) {
  document.getElementById("demo").innerHTML="Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
}