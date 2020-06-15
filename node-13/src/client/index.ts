import io from 'socket.io-client';
import L from 'leaflet';

import './index.css';

const socket = io(window.location.origin);
const geo = navigator.geolocation;

const map = L.map('mapid');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

geo.getCurrentPosition(({ coords: { latitude, longitude } }) => {
  map.setView([latitude, longitude], 13);
  const marker = L.marker([latitude, longitude], { draggable: true })
    .addTo(map);
  socket.emit('move', { lat: latitude, lng: longitude });
  socket.on('sendGEO', (payload) => {
    L.geoJSON(payload, {
      style: {
        "color": "#ff7800",
        "weight": 5,
        "opacity": 0.65,
      },
    }).addTo(map);
    if (payload.geometry.coordinates.length) {
      console.log(payload.geometry.coordinates[payload.geometry.coordinates.length - 1]);
      marker.setLatLng(payload.geometry.coordinates[payload.geometry.coordinates.length - 1].reverse());
    }
  });
  marker
    .on('dragend', () => {
      const latlng = marker.getLatLng();
      socket.emit('move', latlng);
      marker.setLatLng(latlng);
    });
});



