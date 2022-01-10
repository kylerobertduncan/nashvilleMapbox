mapboxgl.accessToken = 'pk.eyJ1Ijoia2lsb3JvbWVvZGVsdGEiLCJhIjoiY2t3ZHpxbWdtNHhpYzJwbXF2MHAyOWhrbSJ9.3eOrjPEsgXiA4izuIZMliw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [-86.774444, 36.162222],
  zoom: 13
});

/* - - - Adds terrain – map first, then add height and map streets on top? - - - */
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