import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddLegend2.css';
import L from 'leaflet';

const AddLegend2 = ({ onSubmit }) => {
const [title, setTitle] = useState('');
const [longitude, setLongitude] = useState(null);
const [latitude, setLatitude] = useState(null);
const [description, setDescription] = useState('');
const navigate = useNavigate();
const mapContainer = useRef(null);
// 
const handleTitleChange = (e) => {
setTitle(e.target.value);
};

const handleMapMove = (map, marker) => {
const lng = map.getCenter().lng.toFixed(4);
const lat = map.getCenter().lat.toFixed(4);
setLongitude(lng);
setLatitude(lat);
marker.setLatLng([lat, lng]);
};

const handleDescriptionChange = (e) => {
setDescription(e.target.value);
};

const handleSubmit = (e) => {
e.preventDefault();
const data = {
name: title,
description: description,
longitude: longitude,
latitude: latitude,
category_id: 1,
};


fetch('http://localhost:8081/api/add-legend', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => {
    if (response.ok) {
      if (onSubmit) {
        onSubmit();
      }
      navigate('/');
      window.location.reload(); // Odświeżenie strony po kliknięciu "Submit"
    } else {
      console.log('not ok');
    }
  })
  .catch((error) => {
    console.error('Błąd podczas wysyłania danych do API:', error);
  });
};

useEffect(() => {
const map = L.map(mapContainer.current).setView([51.7470, 19.8056], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
const marker = L.marker([52, 18]).addTo(map);




map.on('move', function (event) {
  handleMapMove(map, marker);
});

return () => map.remove();
}, []);

return (
<div align="center" className="wrapper">
<h1>Dodaj legendę</h1>
<form onSubmit={handleSubmit}>
<div>
<label className="label" htmlFor="title">Tytuł:</label>
<input className="formAddTitle" type="text" id="title" value={title} onChange={handleTitleChange} /><br />
<label className="label" htmlFor="description">Opis legendy:</label>
<textarea className="description" type="text" id="description" value={description} onChange={handleDescriptionChange} />
</div>
<div className="addMapLegend" id="map" style={{ width: '350px', height: '350px' }} ref={mapContainer}></div>
<p>Współrzędne: {latitude},{longitude} </p>
<button className="subButton" type="submit">Dodaj</button>
</form>
</div>
);
};

export default AddLegend2;