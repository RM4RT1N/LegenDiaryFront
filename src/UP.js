import React from 'react';
import './UP.css';


import L from 'leaflet';

class UP extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    // Tworzenie mapy przy użyciu OpenStreetMap
    const map = new L.Map(this.mapRef.current);

    // Ustawianie początkowych współrzędnych i powiększenia mapy
    map.setView([51.505, -0.09], 13);

    // Dodawanie warstwy z mapą OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(map);
  }

  render() {
    return <div ref={this.mapRef} style={{ height: '400px' }} />;
  }
}


export default UP;