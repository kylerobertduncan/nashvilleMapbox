const firebaseConfig = {
  apiKey: "AIzaSyDqxKzitlb6W94YNOkh5ueyZOLC-wiiAQ8",
  authDomain: "cities-by-night.firebaseapp.com",
  projectId: "cities-by-night",
  storageBucket: "cities-by-night.appspot.com",
  messagingSenderId: "277232894119",
  appId: "1:277232894119:web:adef6b8e8f82a4f7c51b82",
  measurementId: "G-N57T3Q9W8S"
}
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

mapboxgl.accessToken = 'pk.eyJ1Ijoia2lsb3JvbWVvZGVsdGEiLCJhIjoiY2t3ZHpxbWdtNHhpYzJwbXF2MHAyOWhrbSJ9.3eOrjPEsgXiA4izuIZMliw';

// Add terrain–map first, then add height and map streets on top?
// https://docs.mapbox.com/mapbox-gl-js/guides/

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [-86.774444, 36.162222], // nashville
  zoom: 13
});
  
// Mapbox Geocoder plugin !
const geocoder = new MapboxGeocoder({
  // initialize geocoder
  accessToken: mapboxgl.accessToken, // set access token
  // placeholder: 'Search near Nashville, TN', // empty search bar text 
  proximity: {
    longitude: -86.774444,
    latitude: 36.162222
  }, // nashville, tn
  mapboxgl: mapboxgl, // set mapboxGL instance
  marker: false // disable default marker
});

// add the geocoder to the map
map.addControl(geocoder);

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
      'circle-color': 'red'
    }
  });

  geocoder.on('result', (e) => {
    console.log(e.result.text, e.result.center);
    map.getSource('single-point').setData(e.result.geometry)
  });

  // add a pop up to add the location (and add notes, etc.)

});

// add function later to retrieve current city
const currentCity = 'nashville-by-night';

const saveLocation = (locationName, coordinates) => {
  db.collection('locations').add({
    name: locationName,
    center: coordinates
  })
  .then((docRef) => {
    console.log('added location with ID:', docRef.id);
  })
  .catch((error) => {
    console.error('error adding location:', error);
  })
}


// const fetchLocationData = () => {
//   const locationDataRef = db.collection(currentCity).doc('locations');  
//   console.log(locationDataRef);
//   locationDataRef.get().then((doc) => {
//     const locationData = doc.data()
//     console.log(locationData);
//     return locationData;
//   })
// }

// console.log(fetchLocationData());
// const savedLocations = fetchLocationData();
// console.log(savedLocations);

const savedLocations = {}
const locationDataRef = db.collection(currentCity).doc('locations');
locationDataRef.get().then((doc) => {
  const locationData = doc.data()
  console.log(locationData);
})