mapboxgl.accessToken = 'pk.eyJ1Ijoia2lsb3JvbWVvZGVsdGEiLCJhIjoiY2t3ZHpxbWdtNHhpYzJwbXF2MHAyOWhrbSJ9.3eOrjPEsgXiA4izuIZMliw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [-86.774444, 36.162222], // nashville
  zoom: 13
});
  
/* - - - Adds terrain – map first, then add height and map streets on top? https://docs.mapbox.com/mapbox-gl-js/guides/ - - - */
  // map.on('load', () => {
  //   map.addLayer({
  //     id: 'terrain-data',
  //     type: 'line',
  //     source: {
  //       type: 'vector',
  //       url: 'mapbox://mapbox.mapbox-terrain-v2'
  //     },
  //     'source-layer': 'contour'
  //   });
  // });
  
/* - - - Adds building height - - - */
  // map.on('load', () => {
  //   // Insert the layer beneath any symbol layer.
  //   const layers = map.getStyle().layers;
  //   const labelLayerId = layers.find(
  //     (layer) => layer.type === 'symbol' && layer.layout['text-field']
  //   ).id;

  //   // The 'building' layer in the Mapbox Streets
  //   // vector tileset contains building height data
  //   // from OpenStreetMap.
  //   map.addLayer(
  //     {
  //       'id': 'add-3d-buildings',
  //       'source': 'composite',
  //       'source-layer': 'building',
  //       'filter': ['==', 'extrude', 'true'],
  //       'type': 'fill-extrusion',
  //       'minzoom': 10,
  //       'paint': {
  //         'fill-extrusion-color': '#aaa',

  //         // Use an 'interpolate' expression to
  //         // add a smooth transition effect to
  //         // the buildings as the user zooms in.
  //         'fill-extrusion-height': [
  //           'interpolate',
  //           ['linear'],
  //           ['zoom'],
  //           15,
  //           0,
  //           15.05,
  //           ['get', 'height']
  //         ],
  //         'fill-extrusion-base': [
  //           'interpolate',
  //           ['linear'],
  //           ['zoom'],
  //           15,
  //           0,
  //           15.05,
  //           ['get', 'min_height']
  //         ],
  //         'fill-extrusion-opacity': 0.6
  //       }
  //     },
  //     labelLayerId
  //   );
  // });

// Mapbox Geocoder plugin !
const geocoder = new MapboxGeocoder({
  // initialize geocoder
  accessToken: mapboxgl.accessToken, // set access token
  // placeholder: 'Search near Nashville, TN',
  proximity: {
    longitude: -86.774444,
    latitude: 36.162222
  }, // nashville, tn
  mapboxgl: mapboxgl, // set mapboxGL instance
  marker: false // disable default marker
});

// add the geocoder to the map
map.addControl(geocoder);

geocoder.on('result', (e) => {
  console.log(e.result.text, e.result.center);
})

map.on('load', () => {

  map.addSource('single-point', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  })

  map.addLayer({
    id: 'point',
    source: 'single-point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#448EE4'
    }
  });

  geocoder.on('result', (e) => {
    map.getSource('single-point').setData(e.result.geometry)
  });

});

// const marker = new mapboxgl.Marker()
//   .setLngLat([-86.774444, 36.162222])
//   .addTo(map);

// const locationSearch = async (query) => {
//   const url = new URL(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`);
//   url.search = new URLSearchParams({
//     access_token: mapboxgl.accessToken,
//     proximity: '-86.774444,36.162222' // Nashville
//   })
//   const promise = await fetch(url);
//   const locationData = await promise.json();
//   // console.log(locationData.features);

//   locationData.features.map((location) => {
//     console.log(location.text);
//   })
// }

// const searchForm = document.querySelector('.searchForm');
// searchForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const queryString = document.getElementById('searchInput').value;
//   locationSearch(queryString);
// });
