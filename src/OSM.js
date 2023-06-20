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
      sidebarVisible: false,
      mapa: null
    };
    this.mapContainer = React.createRef();
    this.playerContainer = React.createRef();
  }

//   async loadLegends() {
//     fetch('http://localhost:8081/places')
//       .then(response => response.json())
//       .then(data => {
//         this.setState({ legends: data });
//       });
//   }

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

  componentDidMount() {
    const zoomOutBtn = document.getElementById("zoomOutBtn")
    zoomOutBtn.addEventListener("click", () => {
      this.setState({
        lng: 19.8056,
        lat: 51.7470,
        zoom: 6
      });
      this.props.drawerClose();
      zoomOutBtn.style.visibility = 'hidden';
    });

    this.loadRadio();

    // Load legends and initialize the map
    this.loadLegends();

    const map = L.map(this.mapContainer.current).setView([this.state.lat, this.state.lng], this.state.zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    this.setState({ mapa: map });
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

  render() {
    return (
      <div>
        {this.state.sidebarVisible && <LeftSidebar toggleSidebar={this.toggleSidebar} visible={this.state.sidebarVisible} />}
        <Navbar toggleSidebar={this.toggleSidebar} />
        <div className="footer">
          <MapGeocoder latitude={this.state.lat} longitude={this.state.lng} />
          Longitude: {this.state.lng} | Latitude: {this.state.lat} | <Weather latitude={this.state.lat} longitude={this.state.lng} />
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
