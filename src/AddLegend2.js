import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useNavigate } from 'react-router-dom';
import './AddLegend2.css';
import jwtDecode from "jwt-decode";

mapboxgl.accessToken = process.env.REACT_APP_MAP_API_KEY;
const AddLegend2 = ({ onSubmit,userId }) => {
  const [title, setTitle] = useState('');
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [description, setDescription] = useState('');
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  const tokenDecoded = jwtDecode(token);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

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
      userId:userData.id,
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

    return () => map.remove();
  }, []);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/user/${tokenDecoded.sub}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error.message, error);
      }
    };

    fetchUser();
  }, []);

  return (

    <div align= "center" className="wrapper">
      <h1>Dodaj legendę</h1>
        <form onSubmit={handleSubmit}>
        <div >
          <label  className="label" htmlFor="title">Tytuł:</label>
          
          <input className="formAddTitle" type="text" id="title" value={title} onChange={handleTitleChange} /><br />
          
          <label className="label" htmlFor="description">Opis legendy:</label>
          
          <textarea className="description" type="text" id="description" value={description} onChange={handleDescriptionChange} />
          
        </div>

        <div className="addMapLegend" id="map" style={{ width: '400px', height: '400px' }}></div>
        <p>Współrzędne: {longitude}, {latitude}</p>
        <button className="subButton" type="submit">Dodaj</button>
      </form>
    </div>
  );
};

export default AddLegend2;