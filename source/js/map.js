/* eslint-disable */
'use strict';

function initMap() {
  var LAT_LNG = {
    lat: 59.938549,
    lng: 30.322993
  };

  var mapArea = document.querySelector('.map__interactive');

  function getMapOptions() {
    var ZOOM = 17;
    var SCROLLWHEEL = false;

    return {
      zoom: ZOOM,
      center: LAT_LNG,
      scrollwheel: SCROLLWHEEL
    }
  }

  function getMarkerOptions(map) {
    var TITLE = 'Пинк';

    var PIN = {
      url: 'img/icon-map-marker.svg',
      width: 36,
      height: 36,
      originX: 0,
      originY: 0,
      anchorX: 18,
      anchorY: 18
    }

    var icon = {
      url: PIN.url,
      size: new google.maps.Size(PIN.width, PIN.height),
      origin: new google.maps.Point(PIN.originX, PIN.originY),
      anchor: new google.maps.Point(PIN.anchorX, PIN.anchorY),
      scaledSize: new google.maps.Size(PIN.width, PIN.height)
    };

    return {
      position: LAT_LNG,
      map: map,
      title: TITLE,
      icon: icon
    }
  }

  if (mapArea !== null) {
    mapArea.classList.remove('map__interactive--hidden');
    var map = new google.maps.Map(mapArea, getMapOptions());

    var marker = new google.maps.Marker(getMarkerOptions(map));
  }
}
