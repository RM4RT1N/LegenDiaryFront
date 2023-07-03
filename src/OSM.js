import React from 'react';
import Weather from './Weather';
import AudioPlayer from 'react-audio-player';
import MapSearchByKeyword from './MapSearchByKeyword';
import L from 'leaflet';
import './OSM.css';

class OpenMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lng: 19.8056,
      lat: 51.7470,
      zoom: 6,
      legends: null,
      markers: [],
      radioStations: [],
      showPlayer: false,
      urlRadio: null,
      lngLegend: null,
      latLegend: null,
      title: '',
      description: '',
      mapa: null,
      images:[]
    };
    this.mapContainer = React.createRef();
    this.playerContainer = React.createRef();
    this.handleMapMove = this.handleMapMove.bind(this);
  }

  async loadLegends() {
    try {
      const response = await fetch('http://localhost:8081/places');
      const data = await response.json();
      this.addMarkers(data, this.state.mapa);
      this.setState({ legends: data });
    } catch (error) {
      console.error('Error occurred while loading legends:', error);
    }
  }
  async loadImages() {
    try {
      const response = await fetch('http://localhost:8081/images');
      if (!response.ok) {
        throw new Error('Error fetching images');
      }
      const data = await response.json();
      this.setState({images : data});
      console.log(this.state.images);
    } catch (error) {
      console.error(error.message, error);
    }
  };
  
  async loadRadio() {
    try {
      const response = await fetch('https://at1.api.radio-browser.info/json/stations/search?limit=1000&countrycode=PL&hidebroken=true&order=votes&reverse=true');
      const data = await response.json();
      const filteredStations = data.filter(station => station.geo_lat !== null);
      this.setState({ radioStations: filteredStations });
    } catch (error) {
      console.error('Error occurred while loading radio stations:', error);
    }
  }

  loadPlayer(url) {
    this.setState({ urlRadio: url });
  }

  loadRadioStations(mapa) {
    if (this.state.markers.length === 0) {
      const newMarkers = this.state.radioStations.map((radio) => {
        if (radio.geo_lat !== null && this.isPlaceInRange(this.state.latLegend, this.state.lngLegend, radio.geo_lat, radio.geo_long, 20)) {
          const markerRadioOptions = {
            color: "red",
            draggable: false
          };
          const newMarker = L.marker([radio.geo_lat, radio.geo_long],markerRadioOptions )
            .bindPopup(`<h3>${radio.name}</h3>`)
            .addTo(mapa);
          newMarker.on('click', () => {
            this.setState({ showPlayer: true });
            this.loadPlayer(radio.url);
          });
          

          return newMarker;
          
          
        }
        else{}}
        );
      this.setState({ markers: newMarkers });
    }
    
  }

  addMarkers(data, mapa) {
    data.map((legend) => {
      const popupContent = `<h3>${legend.name}</h3>`;
      const popupOptions = {
        className: 'pop-up'
      };
      const popup = L.popup(popupOptions).setContent(popupContent);

      const markerOptions = {
        id: legend.id,
        draggable: false
      };
      const marker = L.marker([legend.latitude, legend.longitude], markerOptions)
        .bindPopup(popup)
        .addTo(mapa);
      marker.osmVariable = legend.id;
      marker.getElement().classList.add('colorLegendMarker');
      marker.getElement().addEventListener('click', () => {

        this.setState({ latLegend: legend.latitude });
        this.setState({ lngLegend: legend.longitude });
        this.setState({ urlRadio: null });
        this.setState({ title: legend.name });
        this.setState({ description: legend.description });
        this.setState({ showPlayer: false });
        this.state.markers.forEach((radioMarker) => {
          if (radioMarker!== undefined && radioMarker!= null){
              mapa.removeLayer(radioMarker);
                     
          }
        });
        this.setState({ markers: []});
        this.loadRadioStations(mapa);
          
        
    
        mapa.flyTo([legend.latitude, legend.longitude], 12);
      });
      
      
      
    

      marker.getElement().addEventListener('click', () => {
        const filteredImages = this.state.images.filter(image => image.place_id === marker.osmVariable);
        this.props.toggle(this.state.title, this.state.description,filteredImages);
      });

      return null;
    });
  }
  
  componentDidMount() {
    const zoomOutBtn = document.getElementById("zoomOutBtn")
    zoomOutBtn.addEventListener("click", () => {
      this.state.mapa.setView([
        51.7470,19.8056],
        6
      );

    });

    this.loadRadio();
    this.loadImages();

    this.loadLegends();

    const map = L.map(this.mapContainer.current).setView([this.state.lat, this.state.lng], this.state.zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    this.setState({ mapa: map });
    
    const marker = L.marker([this.state.lat, this.state.lng]).addTo(map);
    marker.getElement().classList.add('colorCenterMarker');
    map.on('move', (event) => {
      this.handleMapMove(map, marker);
      this.setState({
        zoom: map.getZoom(),
      });
    });
  }
  
  handleMapMove(map, marker) {
    const lng = map.getCenter().lng.toFixed(4);
    const lat = map.getCenter().lat.toFixed(4);
    this.setState({
      lng: lng,
      lat: lat
    });
    this.props.cords(lat,lng);
    marker.setLatLng([lat, lng]);
  
    if (!map.hasLayer(marker)) {
      marker.addTo(map);
    }
  }
  flyToMarker = (item) => {
    const mapa = this.state.mapa;

    var flying = false;
    mapa.on('zoomstart', function () {
      flying = true;
    });
    mapa.on('zoomend', function () {
      flying = false;
    });

    mapa.flyTo([item.latitude, item.longitude], 12, {
      duration: 0.8,
      animate: true
    });
    mapa.fire('zoomstart');

    mapa.on('zoomend', function (e) {
      if (flying) {
        let coords = mapa.getCenter();
        mapa.fire('click', { latlng: coords, containerPoint: mapa.latLngToContainerPoint(coords), originalEvent: {} });
        mapa.fire('zoomend');
      }
    });
  };

  toggleSidebar = () => {
    this.setState((prevState) => ({
      sidebarVisible: !prevState.sidebarVisible
    }));
  };
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

render() {
  return (
    
    <div>
      {/* <Navbar toggleSidebar={this.toggleSidebar} /> */}
      <div className="footer">
        Longitude: {this.state.lng} | Latitude: {this.state.lat} | 
        <Weather latitude={this.state.lat} longitude={this.state.lng} />
      </div>
      
      <div>
        <div ref={this.mapContainer} className="map-OSM-container"></div>
        <button  id="zoomOutBtn" className={this.state.zoom>6?'zoomOutBtn show' : 'zoomOutBtn'} >Zoom Out</button>
        <MapSearchByKeyword legends={this.state.legends} flyToMarker={this.flyToMarker} />
      </div>
      <div>
      <button className='addLegend' id="addLegend"  onClick={this.props.sidebarOpen}> + </button>
      </div>

      {this.state.showPlayer && (
        <div className="player-container" ref={this.playerContainer}>
          <AudioPlayer src={this.state.urlRadio} controls />
        </div>
      )}
    </div>
  );
}
}

export default OpenMap;