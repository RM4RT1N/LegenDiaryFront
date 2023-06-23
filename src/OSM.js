import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRadio from './radio-station-2.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Navbar from './Navbar';
import AudioPlayer from 'react-audio-player';
import MapSearchByKeyword from './MapSearchByKeyword';
import './OSM.css';

class OpenStreetMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map:null,
      legends: null,
      markers:[],
      radioStations:[],
      showPlayer:false,
      urlRadio:null,
      lngLegend:null,
      latLegend:null,
      title:'',
      description:'',
      sidebarVisible: false
    };
    this.flyToMarker = this.flyToMarker.bind(this);
  }

  componentDidMount() {
    
    this.map = L.map('map').setView([51.7470, 19.8056], 7);

    
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 20,
    }).addTo(this.map);
    this.setState({ map: this.map });

   
    // Dodanie markera na mapie
    const marker = L.marker([51.747, 19.80], { icon: this.createMarkerIcon(iconRadio) }).addTo(this.map);
    marker.bindPopup('To jest marker! Kliknij, aby zobaczyć szczegóły.');
    this.loadLegends(this.map);
    this.loadRadio();
  }
  
  loadPlayer(url){
    this.setState({urlRadio:url})
} 
  loadLegends(map) {
    fetch('http://localhost:8081/places')
      .then(response => response.json())
      .then(leg => {
        
        this.setState({ legends: leg });
        this.addMarkers(this.state.legends, map);
   
      })
      .catch(error => console.log(error));
  }
  async loadRadio(){
    try {
        fetch('https://at1.api.radio-browser.info/json/stations/search?limit=1000&countrycode=PL&hidebroken=true&order=votes&reverse=true')
        .then(response => response.json())
        .then(data=>{this.setState({radioStations:data})
        })}
    catch (error) {
        console.error('Error occurred while loading radio stations:', error);
        }
}

  addMarkers(data, map) {
    data.forEach(legend => {
      L.marker([legend.latitude, legend.longitude],{ icon: this.createMarkerIcon(icon) }).bindPopup(`<h3>${legend.name}</h3>`).on('click', () => {
        this.setState({latLegend:legend.latitude});
            this.setState({lngLegend:legend.longitude});
            this.setState({urlRadio:null});
            this.setState({title:legend.name});
            this.setState({description:legend.description});
            this.setState({showPlayer:false});
            this.loadRadioStations(map)}).addTo(map);

    });
  }
  loadRadioStations(mapa) {
    if (this.state.markers.length === 0) {
      const newMarkers = this.state.radioStations.map((radio) => {
        if (radio.geo_lat !== null && this.isPlaceInRange(this.state.latLegend, this.state.lngLegend, radio.geo_lat, radio.geo_long, 20)) 
          {
          var newMarker = L.marker([radio.geo_lat, radio.geo_long], {
            icon: this.createMarkerIcon(iconRadio) })
            .bindPopup(`<h3>${radio.name}</h3>`)
            .addTo(mapa);
          
          newMarker.on('click', () => {
            this.setState({ showPlayer: true });
            this.loadPlayer(radio.url);
          });
          
          return newMarker;
        } else {
          return null;
        }
      });
  
      this.setState({ markers: newMarkers });
    } else {
  
      this.state.markers.forEach((marker) => {
        if (marker != null) {
          marker.remove();
        }
      });
  
      this.setState({ markers: [] });
    }
  }


  createMarkerIcon(icon) {
    return L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
    });
  }
  isPlaceInRange(latitudePointCentral, longitudePointCentral, latitudeAnotherPoint, longitudeAnotherPoint, radiusInKilometers) {
    const Distance = {
      EARTH_RADIUS: 6371 // Przyjęta wartość promienia Ziemi w kilometrach
    };  
  
    const latCentral = this.toRadians(latitudePointCentral);
    const latEdge = this.toRadians(latitudeAnotherPoint);
  
    const lngCentral = this.toRadians(longitudePointCentral);
    const lngEdge = this.toRadians(longitudeAnotherPoint);
  
    const deltalng = lngEdge - lngCentral;
    const deltalat = latEdge - latCentral;
  
    const a = Math.sin(deltalat / 2) * Math.sin(deltalat / 2) + Math.cos(latCentral) * Math.cos(latEdge) * Math.sin(deltalng / 2) * Math.sin(deltalng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = Distance.EARTH_RADIUS * c;
  
    return distance <= radiusInKilometers;
}
  
toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
flyToMarker = (item) => {
  const mapa = this.state.map;
  let flying = false;

  mapa.on('flystart', () => {
    flying = true;
  });

  mapa.on('flyend', () => {
    flying = false;
  });

  mapa.flyTo([item.latitude,item.longitude], 12);

  mapa.fire('flystart');

  mapa.on('moveend', function(e)  {
    
    if (flying) {

      const coords = mapa.getCenter();
      mapa.fire('click', {
        latLng: coords,
        point: mapa.project(coords),
        originalEvent: {}
      });
      mapa.fire('flyend');
    }
  });
};


  render() {
    return <div>
    <Navbar />
    

    <div className="searchField">
      <MapSearchByKeyword legends={this.state.legends} flyToMarker={this.flyToMarker} />
    </div>

    <div className="map-container" id="map" style={{ width: '100%', height: '800px' }} />
    
    {this.state.showPlayer && (
      <div className="radio-player-container" ref={this.playerContainer}>
        <AudioPlayer src={this.state.urlRadio} controls />
      </div>
    )}
  </div>
    
  }
}

export default OpenStreetMap;