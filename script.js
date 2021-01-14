function initMap() {

  var markers = [];

  
  var image = {
    url: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
    scaledSize: new google.maps.Size(25, 25)
  };

  
  var locations = [
    ['0', 'Chawla Nursing Home', image, 29.151950, 75.731590, 'Hospital'],
    ['1', 'Sanjivini Hospital', image, 19.965740, 72.807150, 'Hospital'],
    ['2', 'Aadhar Health Institute', image, 28.433680, 77.071330, 'Hospital'],
    ['3', 'K L Arya', image, 28.713530, 77.124760, 'School'],
    ['4', 'J.D. Arya Public School', image, 28.900490, 28.900490, 'School']
  ];

  var map = new google.maps.Map(document.getElementById('map'), {

    center: {
      lat: 29.1492,
      lng: 75.7217
    },
    zoom: 3,
          mapTypeId: 'roadmap'

  });

  // Loop through length of locations.
  
  for (var i = 0; i < locations.length; i++) {
    addMarker(locations[i]);
  }

  // Create marker(s).
  
  function addMarker(properties) {
    var title = properties[1];
    var content = properties[1];
    var icon = properties[2];
    var position = new google.maps.LatLng(properties[3], properties[4]);
    var category = properties[5];

    
    var infoWindow = new google.maps.InfoWindow({
      content: ''
    });

    var marker = new google.maps.Marker({
      map: map,
      title: title,
      icon: icon,
      position: position,
      category: category,
      infowindow: infoWindow
    });
    markers.push(marker);

    // Check for icon property.
    
    if (properties.icon) {
      // Set up icon image.
      marker.setIcon(properties.icon);
    }

    // Check for content property.
    
    google.maps.event.addListener(marker, 'click', (function(marker, content) {
      return function() {
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
        map.panTo(this.getPosition());
        map.setZoom(3); // Revert back to zoomed view when marker is clicked.
        closeAllInfoWindows(map);
        this.infowindow.open(map, this);
      }
    })(marker, content));
  }

  
  filterLocations = function(category) {
    for (var i = 0; i < locations.length; i++) {
      properties = markers[i];

      if (properties.category == category || category.length === 0) {
        properties.setVisible(true);
        closeAllInfoWindows(map); // Hide all info windows when selection from dropdown menu changes.
      } else {
        properties.setVisible(false);
      }
    }
  }

  // Close all info windows and open only one that corresponds to when marker is clicked.
  
  function closeAllInfoWindows(map) {
    markers.forEach(function(marker) {
      marker.infowindow.close(map, marker);
    });
  }
}