import React, { useState } from 'react';
import AudioPlayer from 'react-audio-player';

const RadioPlayer = ({ stations }) => {
  const [selectedStation, setSelectedStation] = useState(null);

  const handleStationSelect = (station) => {
    setSelectedStation(station);
  };

  return (
    <div>
      {selectedStation ? (
        <div>
          <h3>Wybierz stację radiową:</h3>
          {stations.map((station, index) => (
            <button key={index} onClick={() => handleStationSelect(station)}>
              {station.name}
            </button>
          ))}
          <h3>{selectedStation.name}</h3>
          <AudioPlayer src={selectedStation.url} controls />
        </div>
      ) : (
        <div>
          <h3>Wybierz stację radiową:</h3>
          {stations.map((station, index) => (
            <button key={index} onClick={() => handleStationSelect(station)}>
              {station.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RadioPlayer;