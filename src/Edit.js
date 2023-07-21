import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Edit = ({ place })=> {
  const [legendData, setLegendData] = useState();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    longitude: '',
    latitude: ''
  });

  useEffect(() => {
    
       
        setLegendData(place);
        setFormData({
          name: place.name,
          description: place.description,
          longitude: place.longitude,
          latitude: place.latitude
        });
      
  }, [place])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
        name: formData.name,
        description: formData.description,
        longitude: formData.longitude,
        latitude: formData.latitude,
      };
  
      fetch(`http://localhost:8081/api/edit-legend/${place.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            console.log('ok');
          } else {
            console.log('not ok');
          }
        })
        .catch((error) => {
          console.error('Błąd podczas wysyłania danych do API:', error);
        });
    };
  

  return (
    <div>
      {legendData && (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Longitude:
            <input
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Latitude:
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Aktualizuj</button>
        </form>
      )}
    </div>
  );
}

export default Edit;