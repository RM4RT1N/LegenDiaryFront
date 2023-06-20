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
        inputValue : '',
        markers : []
   
    };
 
    this.mapContainer = React.createRef();
}

componentDidMount() {
    

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
          
        });
    
        this.mapa = mapa;
        this.marker = marker;
 
}
loadLegends = () => {
    const { inputValue } = this.state;

    fetch(`http://localhost:8081/placesContainWord?word=${inputValue}`)
      .then((response) => response.json())
      .then((data) => {
    
        this.state.markers.forEach((marker) => {
          marker.remove();
        });

        
        const newMarkers = data.map((legend) => {
          const newMarker = new mapboxgl.Marker({
            color: 'darkgreen',
            draggable: false,
          })
            .setLngLat([legend.longitude, legend.latitude])
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${legend.name}</h3>`))
            .addTo(this.mapa);

          return newMarker;
        });


        this.setState({ markers: newMarkers });
      });
  };
handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };


render() {
    const {  inputValue } = this.state;
    return (
    <div>
        <Navbar />
        <div>
          <label id="word">Znajdź legendę zawierającą słowo </label>
      <input name="word" type="text" value={inputValue} onChange={this.handleInputChange} />
      <button onClick={this.loadLegends}>Szukaj</button>
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