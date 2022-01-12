// initialize Firebase
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

// add function later to retrieve current city
const currentCity = 'nashville-by-night';

// initialize Mapbox
mapboxgl.accessToken = 'pk.eyJ1Ijoia2lsb3JvbWVvZGVsdGEiLCJhIjoiY2t3ZHpxbWdtNHhpYzJwbXF2MHAyOWhrbSJ9.3eOrjPEsgXiA4izuIZMliw';

// Add terrain–map first, then add height and map streets on top?
// https://docs.mapbox.com/mapbox-gl-js/guides/

// populate the map
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [-86.774444, 36.162222], // nashville
  zoom: 12
});
  
// Add Mapbox Geocoder plugin !
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

// actions once base map loaded
map.on('load', () => {

  // add a layer for search locations
  map.addSource('search-result', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  })

  // define the style of each search marker
  map.addLayer({
    id: 'point',
    source: 'search-result',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': 'blue'
    }
  });

  // add a search marker when result selected
  geocoder.on('result', (e) => {
    map.getSource('search-result').setData(e.result.geometry)
    console.log(e.result.text, e.result.geometry);
  });

  // add a pop up to add the location (and add notes, etc.)

});

// add a marker for each saved location
const addMarkers = (locationData) => {
  for (const location in locationData) {
    console.log(location, locationData[location]);
    const el = document.createElement('div');
    el.id = location.split(' ').join('-');
    el.className = 'marker';
    new mapboxgl.Marker(el)
      .setLngLat(locationData[location])
      .addTo(map);
  }
}

// get already saved locations from firebase
const fetchLocationData = () => {
  const locationDataRef = db.collection(currentCity).doc('locations');
  locationDataRef.get().then((doc) => {
    const locationData = doc.data()
    // console.log(locationData);
    addMarkers(locationData);
  })
}
fetchLocationData();

// save a location to firebase
const saveLocation = (locationName, geometry) => {
  db.collection(currentCity).doc('locations').add({
    name: locationName,
    center: geometry
  })
    .then((docRef) => {
      console.log('added location with ID:', docRef.id);
    })
    .catch((error) => {
      console.error('error adding location:', error);
    })
}

