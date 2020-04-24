function initMap() {
  const LAT_LNG = {
    lat: 59.938549,
    lng: 30.322993
  };

  let mapArea = document.querySelector(`.map__interactive`);

  function getMapOptions() {
    const zoom = 17;
    const scrollwheel = false;

    return {
      zoom,
      center: LAT_LNG,
      scrollwheel
    };
  }

  function getMarkerOptions(map) {
    const TITLE = `Пинк`;

    const pinData = {
      url: `img/icon-map-marker.svg`,
      width: 36,
      height: 36,
      originX: 0,
      originY: 0,
      anchorX: 18,
      anchorY: 18
    };

    const {url, width, height, originX, originY, anchorX, anchorY} = pinData;

    const icon = {
      url,
      size: new google.maps.Size(width, height), /* eslint-disable-line */
      origin: new google.maps.Point(originX, originY), /* eslint-disable-line */
      anchor: new google.maps.Point(anchorX, anchorY), /* eslint-disable-line */
      scaledSize: new google.maps.Size(width, height) /* eslint-disable-line */
    };

    return {
      position: LAT_LNG,
      map,
      TITLE,
      icon
    };
  }

  if (mapArea) {
    mapArea.classList.remove(`map__interactive--hidden`);
    let map = new google.maps.Map(mapArea, getMapOptions()); /* eslint-disable-line */

    let marker = new google.maps.Marker(getMarkerOptions(map)); /* eslint-disable-line */
  }
}

export default initMap;
