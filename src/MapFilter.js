import React from 'react';
import mapboxgl from 'mapbox-gl'; 
import Navbar from './Navbar';
mapboxgl.accessToken = process.env.REACT_APP_MAP_API_KEY;
class Map extends React.PureComponent {
constructor(props) {
    super(props);
    this.state = {
        lng: 19.52,
        lat: 52.16,
        zoom: 6,
        inputValue : 0,
        markers : [],
        legends : []
   
    };
    

    this.mapContainer = React.createRef();
}

componentDidMount() {
    
    this.loadAllLegends();
    const { lng, lat, zoom } = this.state;
    const mapa = new mapboxgl.Map({
    container: this.mapContainer.current,
    style: 'mapbox://styles/mapbox/navigation-night-v1',
    center: [lng, lat],
    zoom: zoom
    });
    mapa.addControl(new mapboxgl.NavigationControl());
 
    
    
    
    const marker = new mapboxgl.Marker({
        color: "red",
        draggable: false
        }).setLngLat([this.state.lng,this.state.lat])
        .addTo(mapa)

        mapa.on('move', () => {
            this.setState({
            lng: mapa.getCenter().lng.toFixed(4),
            lat: mapa.getCenter().lat.toFixed(4),
            zoom: mapa.getZoom().toFixed(2)
            });
            marker.setLngLat([mapa.getCenter().lng.toFixed(4),mapa.getCenter().lat.toFixed(4)]);
            this.loadLegends()
        });
    
        this.mapa = mapa;
        this.marker = marker;
 
}
loadAllLegends(){
  try{
    fetch(`http://localhost:8081/places`)
    .then((response) => response.json())
    .then((data) => {this.setState({legends:data})})}
  catch (error) {
    console.error('Error occurred while loading legends:', error);
    }}


loadLegends() {
  
        this.state.markers.forEach((marker) => {
          if(marker!=null){
          marker.remove();}
        });
        const filteredMarkers = this.state.legends.map((legend) => {
          if(this.isPlaceInRange(this.state.lat,this.state.lng,legend.latitude,legend.longitude,this.state.inputValue)) 
        {const newMarker = new mapboxgl.Marker({
            color: 'darkgreen',
            draggable: false,
          })
            .setLngLat([legend.longitude, legend.latitude])
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${legend.name}</h3>`))
            .addTo(this.mapa);

          return newMarker;}
          return null;
        }
        );


        this.setState({ markers: filteredMarkers });
      };
  
handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

isPlaceInRange(latitudePointCentral, longitudePointCentral, latitudeAnotherPoint, longitudeAnotherPoint, radiusInKilometers) {
  const Distance = {
    EARTH_RADIUS: 6371 
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
    const { inputValue } = this.state;
    return (
    <div>
        <Navbar />
        <div>
          <label id="distance">Zakres odległości legend w kilometrach od znacznika</label>
      <input name="distance" type="text" value={inputValue} onChange={this.handleInputChange} />
    </div>
        <div className="sidebar">
        
        Longitude: {this.state.lng} | Latitude: {this.state.lat}
        </div>
        <div >
            <div ref={this.mapContainer} className="map-container" />
        </div>

    </div>
    );
}
}

export default Map