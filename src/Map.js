import React from 'react';
import mapboxgl from 'mapbox-gl'; 
import Weather from './Weather';
import MapboxGeocoder from './MapGeocoder';
import AudioPlayer from 'react-audio-player';
import MapSearchByKeyword from './MapSearchByKeyword';
import LeftSidebar from './LeftSidebar';


mapboxgl.accessToken = process.env.REACT_APP_MAP_API_KEY;

class Map extends React.PureComponent {
constructor(props) {
    super(props);
    this.state = {
        mapa: null, 
        lng: 19.8056,
        lat: 51.7470,
        zoom: 6,
        legends:null,
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

    this.mapContainer = React.createRef();
    this.flyToMarker = this.flyToMarker.bind(this);
}

async loadLegends(mapa){
    fetch('http://localhost:8081/places',{
        headers:{
            "Authoziration":`Bearer ${localStorage.getItem("jwtToken")}`
        }
    })
    .then(response => response.json())
    .then(data => {
      this.addMarkers(data,mapa)
      this.setState({legends : data});
    })
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

loadPlayer(url){
    this.setState({urlRadio:url})
}   

loadRadioStations(mapa) {
    if (this.state.markers.length === 0) {
      const newMarkers = this.state.radioStations.map((radio) => {
        if (radio.geo_lat !== null && this.isPlaceInRange(this.state.latLegend, this.state.lngLegend, radio.geo_lat, radio.geo_long, 20)) {
          var customRadioIcon = document.createElement('div');
          customRadioIcon.className = 'custom-marker';
          const newMarker = new mapboxgl.Marker({
            element: customRadioIcon,
            draggable: false,
          })
            .setLngLat([radio.geo_long, radio.geo_lat])
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${radio.name}</h3>`))
            .addTo(mapa);
          newMarker.getElement().addEventListener('click', () => {
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

addMarkers(data, mapa) {
    data.map((legend) => { 
      const popup = new mapboxgl.Popup({
        className:'pop-up'
        }).setHTML(`<h3>${legend.name}</h3>`)

      const pointer = new mapboxgl.Marker({
        id: legend.id,
        color: "green",
        draggable: false,
        
      })
        .setLngLat([legend.longitude, legend.latitude])
        .setPopup(popup)
        .addTo(mapa);        
        
        pointer.getElement().addEventListener('click', () => {
            this.setState({latLegend:legend.latitude});
            this.setState({lngLegend:legend.longitude});
            this.setState({urlRadio:null});
            this.setState({title:legend.name});
            this.setState({description:legend.description});
            this.setState({showPlayer:false});
            this.loadRadioStations(mapa);
            mapa.flyTo({
              center: [legend.longitude,legend.latitude],
              zoom: 12
            });
            });
            pointer.getElement().addEventListener('click',()=>{
              this.props.toggle(this.state.title,this.state.description);
            })
            return null;            
    });   
}

componentDidMount() {
  const zoomOutBtn = document.getElementById("zoomOutBtn")
  zoomOutBtn.addEventListener("click", () => {
    mapa.flyTo({
      center: [19.8056, 51.7470],
      zoom: 6
    });
    this.props.drawerClose();
    zoomOutBtn.style.visibility = 'hidden';
    const popup = document.getElementsByClassName('mapboxgl-popup');
    if ( popup.length ) {
        popup[0].remove();
    }
  })
  
  this.loadRadio();
  const { lng, lat, zoom } = this.state;
  const mapa = new mapboxgl.Map({
    container: this.mapContainer.current,
    style: 'mapbox://styles/mapbox/navigation-night-v1',
    center: [lng, lat],
    zoom: zoom
  });
  this.setState({mapa: mapa});
  
  mapa.addControl(new mapboxgl.NavigationControl());
  this.loadLegends(mapa);
  
  mapa.on('load', function() {
    mapa.addSource('countries', {
      type: 'vector',
      url: 'mapbox://mapbox.country-boundaries-v1'
    });

    mapa.addLayer({
        'id': 'country-boundaries',
        'type': 'fill',
        'source': 'countries',
        'source-layer': 'country_boundaries',
        'paint': {
          'fill-color': '#cccccc',
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'active'], false],
            1,
            0.2
          ]
        },
        'filter': ['!=', 'iso_3166_1_alpha_3', 'POL']
      });
    
    mapa.on('mouseenter', 'popups', () => {
      mapa.getCanvas().style.cursor = 'pointer'
    })
      
  });    

  //Red marker on center
  const marker = new mapboxgl.Marker({        
      color:'red',
      draggable: false
      }).setLngLat([this.state.lng,this.state.lat])
      .addTo(mapa)
  
  mapa.on('move', () => {
          this.setState({
            lng: mapa.getCenter().lng.toFixed(4),
            lat: mapa.getCenter().lat.toFixed(4),
            zoom: mapa.getZoom().toFixed(2),
          });
          marker.setLngLat([mapa.getCenter().lng.toFixed(4),mapa.getCenter().lat.toFixed(4)])
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
  const mapa = this.state.mapa;

  var flying = false;
  mapa.on('flystart', function(){
    flying = true;
  });
  mapa.on('flyend', function(){
      flying = false;
  });
  
  mapa.flyTo({
    center: [item.longitude,item.latitude],
    zoom: 12,
    duration: 800
  });
  mapa.fire('flystart');

  mapa.on('moveend', function(e){
    if(flying){
      /* var tooltip = new mapboxgl.Popup()
      .setLngLat(mapa.getCenter())
      .setHTML('<h1>Hello World!</h1>')
      .addTo(mapa); */
      let coords = mapa.getCenter();/* [this.state.lngLegend,this.state.latLegend]; */
      mapa.fire('click', { latLng: coords, point: mapa.project(coords), originalEvent: {} })
      mapa.fire('flyend'); 
    }
  });
};
toggleSidebar = () => {
  this.setState((prevState) => ({
    sidebarVisible: !prevState.sidebarVisible
  }));
};

render() {    

    return (
    <div>
      {this.state.sidebarVisible && <LeftSidebar toggleSidebar={this.toggleSidebar} visible={this.state.sidebarVisible} />}
      {/* <Navbar toggleSidebar={this.toggleSidebar}/>  */}
        <div className="footer">
        <MapboxGeocoder longitude={this.state.lng} latitude={this.state.lat} />
        Longitude: {this.state.lng} | Latitude: {this.state.lat}  |<Weather latitude={this.state.lat} longitude={this.state.lng} /> 
        </div>
        <div>
            <div ref={this.mapContainer} className="map-container"></div>
            <button className='zoomOutBtn' id="zoomOutBtn"  style={{ visibility: this.state.zoom > 6? 'visible': 'hidden'}} >Zoom Out</button>
            
            <MapSearchByKeyword legends={this.state.legends} flyToMarker={this.flyToMarker}/>
        </div>
        
        {this.state.showPlayer && (<div className="player-container" ref={this.playerContainer}>
              <AudioPlayer src={this.state.urlRadio} controls/>
        </div>)}
    </div>
    );
}
}

export default Map