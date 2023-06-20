import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

mapboxgl.accessToken = process.env.REACT_APP_MAP_API_KEY;
const AddLegend = () => {
  const [title, setTitle] = useState('');
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // const handleMapClick = (e, marker) => {
  //   const { lng, lat } = e.lngLat;
  //   setLongitude(lng);
  //   setLatitude(lat);
  //   marker.setLngLat([lng, lat]);
  // };

  const handleMapMove = (map, marker) => {
    const lng = map.getCenter().lng.toFixed(4);
    const lat = map.getCenter().lat.toFixed(4);
    setLongitude(lng);
    setLatitude(lat);
    marker.setLngLat([lng, lat]);
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
          navigate('/'); // Przekierowanie na stronę główną po sukcesie
        } else {
          console.log('not ok');
        }
      })
      .catch((error) => {
        console.error('Błąd podczas wysyłania danych do API:', error);
      });
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/navigation-night-v1',
      center: [18, 52.2],
      zoom: 5,
    });

    const marker = new mapboxgl.Marker({
      color: 'red',
      draggable: true,
    })
      .setLngLat([18, 52])
      .addTo(map);

    map.on('move', function (event) {
      handleMapMove(map, marker);
    });

    // map.on('click', function (event) {
    //   handleMapClick(event, marker);
    // });

    return () => map.remove();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Dodaj legendę</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Tytuł:</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} /><br />
          <label htmlFor="description">Opis legendy:</label>
          <textarea type="text" id="description" value={description} onChange={handleDescriptionChange} /> 
        </div>

        <div id="map" style={{ width: '50%', height: '300px' }}></div>
        <p>Współrzędne: {longitude}, {latitude}</p>
        <button type="submit">Submit</button> 
      </form>
    </div>
  );
};

export default AddLegend;