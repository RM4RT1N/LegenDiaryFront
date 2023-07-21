import React from 'react';
import Weather from './Weather';
import MapGeocoder from './MapGeocoder';
import AudioPlayer from 'react-audio-player';
import MapSearchByKeyword from './MapSearchByKeyword';
import Navbar from './Navbar';
import LeftSidebar from './LeftSidebar';
import L from 'leaflet';

class OpenMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lng: 19.8056,
      lat: 51.7470,
      zoom: 2,
      legends: null,
      filteredLegends:[],
      markers: [],
      radioStations: [],
      showPlayer: false,
      urlRadio: null,
      lngLegend: null,
      latLegend: null,
<<<<<<< Updated upstream
      title: '',
      description: '',
      sidebarVisible: false,
      mapa: null
=======
      legendData: {
        "title":'',
        "description":'',
        "images":[],
        "author_id":null
      },
      images:[],
      mapa: null      
>>>>>>> Stashed changes
    };
    this.mapContainer = React.createRef();
    this.playerContainer = React.createRef();
  }

<<<<<<< Updated upstream
//   async loadLegends() {
//     fetch('http://localhost:8081/places')
//       .then(response => response.json())
//       .then(data => {
//         this.setState({ legends: data });
//       });
//   }
=======
  async loadAllLegends() {
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
      this.props.allImages(data);
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
>>>>>>> Stashed changes

//   async loadRadio() {
//     try {
//       fetch('https://at1.api.radio-browser.info/json/stations/search?limit=1000&countrycode=PL&hidebroken=true&order=votes&reverse=true')
//         .then(response => response.json())
//         .then(data => {
//           this.setState({ radioStations: data });
//         });
//     } catch (error) {
//       console.error('Error occurred while loading radio stations:', error);
//     }
//   }

//   loadPlayer(url) {
//     this.setState({ urlRadio: url });
//   }

//   loadRadioStations(mapa) {
//     if (this.state.markers.length === 0) {
//       const newMarkers = this.state.radioStations.map((radio) => {
//         if (radio.geo_lat !== null && this.isPlaceInRange(this.state.latLegend, this.state.lngLegend, radio.geo_lat, radio.geo_long, 20)) {
//           const customRadioIcon = L.divIcon({ className: 'custom-marker' });
//           const newMarker = L.marker([radio.geo_lat, radio.geo_long], { icon: customRadioIcon })
//             .bindPopup(`<h3>${radio.name}</h3>`)
//             .addTo(mapa);
//           newMarker.on('click', () => {
//             this.setState({ showPlayer: true });
//             this.loadPlayer(radio.url);
//           });

<<<<<<< Updated upstream
//           return newMarker;
//         } else {
//           return null;
//         }
//       });
//       // Save new markers in the component state
//       this.setState({ markers: newMarkers });
//     }
//   }

//   addMarkers(data, mapa) {
//     data.map((legend) => {
//       const popupContent = `<h3>${legend.name}</h3>`;
//       const popupOptions = {
//         className: 'pop-up'
//       };
//       const popup = L.popup(popupOptions).setContent(popupContent);

//       const markerOptions = {
//         id: legend.id,
//         color: "green",
//         draggable: false
//       };
//       const marker = L.marker([legend.latitude, legend.longitude], markerOptions)
//         .bindPopup(popup)
//         .addTo(mapa);

//       marker.getElement().addEventListener('click', () => {
//         this.setState({ latLegend: legend.latitude });
//         this.setState({ lngLegend: legend.longitude });
//         this.setState({ urlRadio: null });
//         this.setState({ title: legend.name });
//         this.setState({ description: legend.description });
//         this.setState({ showPlayer: false });
//         this.loadRadioStations(mapa);
//         mapa.flyTo([legend.latitude, legend.longitude], 12);
//       });

//       marker.getElement().addEventListener('click', () => {
//         this.props.toggle(this.state.title, this.state.description);
//       });

//       return null;
//     });
//   }

=======
  addMarkers(data, mapa) {
    
    this.state.filteredLegends.forEach((marker) => {
      if(marker!=null && marker!=undefined){
      mapa.removeLayer(marker);}
    })
    this.setState({ filteredMarkers: []});
   
    
    

    const filteredMarkers = data.map((legend) => {
      if(this.isPlaceInRange(this.state.lat,this.state.lng,legend.latitude,legend.longitude,70)) 
      {const popupContent = `<h3>${legend.name}</h3>`;
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
        this.setState({
          legendData:{
            "id":legend.id,
            "title":legend.name,
            "description":legend.description,
            "author_id":legend.userId
          }
        });
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
        this.props.toggle(
          this.state.legendData.id,
          this.state.legendData.title,
          this.state.legendData.description,
          filteredImages,
          this.state.legendData.author_id
        );
      });

      return marker;}

      
    });
    this.setState({ filteredLegends: filteredMarkers });
  }
  setMap(lat,lng){
    this.state.mapa.setView([
      lat,lng],
      6
    );
  }  
  
>>>>>>> Stashed changes
  componentDidMount() {
    this.loadAllLegends();
    const zoomOutBtn = document.getElementById("zoomOutBtn")
    zoomOutBtn.addEventListener("click", () => {
<<<<<<< Updated upstream
      this.setState({
        lng: 19.8056,
        lat: 51.7470,
        zoom: 6
      });
      this.props.drawerClose();
      zoomOutBtn.style.visibility = 'hidden';
=======
      this.state.mapa.setView([
        51.7470,19.8056],
        6
      );
>>>>>>> Stashed changes
    });
    const startBtn = document.getElementById("startBtn");
    startBtn.addEventListener("click", () => {
    this.state.mapa.setView([51.7470, 19.8056], 6);
    startBtn.style.display = "none";
});

    this.loadRadio();

<<<<<<< Updated upstream
    // Load legends and initialize the map
    this.loadLegends();

    const map = L.map(this.mapContainer.current).setView([this.state.lat, this.state.lng], this.state.zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    this.setState({ mapa: map });
=======
    const map = L.map(this.mapContainer.current).setView([this.state.lat, this.state.lng], this.state.zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    this.setState({ mapa: map });
  


    this.setState({ mapa: map });


    const marker = L.marker([this.state.lat, this.state.lng]).addTo(map);
    marker.getElement().classList.add('colorCenterMarker');
    map.on('move', (event) => {
      this.handleMapMove(map, marker);
      this.addMarkers(this.state.legends,map);
      this.setState({
        zoom: map.getZoom(),
      });
    });
    map.on('moveend',(event)=>{this.setState({
      wthrLng: this.state.lng,
      wthrLat: this.state.lat
    });})
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
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
  render() {
    return (
      <div>
        {this.state.sidebarVisible && <LeftSidebar toggleSidebar={this.toggleSidebar} visible={this.state.sidebarVisible} />}
        <Navbar toggleSidebar={this.toggleSidebar} />
        <div className="footer">
          <MapGeocoder latitude={this.state.lat} longitude={this.state.lng} />
          Longitude: {this.state.lng} | Latitude: {this.state.lat} | <Weather latitude={this.state.lat} longitude={this.state.lng} />
=======
render() {
  return (
    
    <div>
     <div className='footer'>
     
        {/* <Carousel images={this.state.images}/> */}
            
        Longitude: {this.state.lng} | Latitude: {this.state.lat} | 
        <Weather latitude={this.state.wthrLat} longitude={this.state.wthrLng} />
      </div>
      <div>
        <div ref={this.mapContainer} className="map-OSM-container"></div>
        <button  id="startBtn" className="show" >Zaczynamy</button>
        <button  id="zoomOutBtn" className={this.state.zoom>6&&!this.props.up?'zoomOutBtn show' : 'zoomOutBtn'} >Zoom Out</button>
        <MapSearchByKeyword legends={this.state.legends} flyToMarker={this.flyToMarker} />
      </div>
      <div>
      <button className='addLegend' id="addLegend"  onClick={this.props.sidebarOpen}> + </button>
      </div>

      {this.state.showPlayer && (
        <div className="player-container" ref={this.playerContainer}>
          <AudioPlayer src={this.state.urlRadio} controls />
>>>>>>> Stashed changes
        </div>
        <div>
          <div ref={this.mapContainer} className="map-container"></div>
          <button className='zoomOutBtn' id="zoomOutBtn" style={{ visibility: this.state.zoom > 6 ? 'visible' : 'hidden' }}>Zoom Out</button>
          <MapSearchByKeyword legends={this.state.legends} flyToMarker={this.flyToMarker} />
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
