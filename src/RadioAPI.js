import React, { useEffect, useState } from 'react';
import RadioPlayer from './RadioPlayer';
import Navbar from './Navbar';

const RadioBrowserAPI = () => {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://at1.api.radio-browser.info/json/stations/search?limit=1000&countrycode=PL&hidebroken=true&order=votes&reverse=true');
        const data = await response.json();
        const filteredStations = data.filter(station => station.geo_lat !== null)
        setStations(filteredStations);
      } catch (error) {
        console.error('Wystąpił błąd podczas pobierania danych z API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Stacje Radiowe</h1>
      <RadioPlayer stations={stations} />
    </div>
  );
};

export default RadioBrowserAPI;