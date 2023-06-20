import React, { Component } from 'react';
import mapboxSdk from '@mapbox/mapbox-sdk/services/geocoding';

class MapboxGeocoder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeName: '',
    };
  }

  async fetchPlaceName(latitude, longitude) {
    const accessToken = process.env.REACT_APP_MAP_API_KEY;;
    const geocodingService = mapboxSdk({ accessToken });
    const response = await geocodingService.reverseGeocode({
      query: [longitude, latitude].map(Number), 
    }).send();

    const features = response.body.features;
    if (features.length > 0) {
      const firstFeature = features[0];
      this.setState({ placeName: firstFeature.place_name });
    }
  }

  componentDidMount() {
    const { latitude, longitude } = this.props;
    this.fetchPlaceName(latitude, longitude);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.latitude !== this.props.latitude || prevProps.longitude !== this.props.longitude) {
      const { latitude, longitude } = this.props;
      this.fetchPlaceName(latitude, longitude);
    }
  }

  render() {
    return (
      <div>
        Place Name: {this.state.placeName}
      </div>
    );
  }
}

export default MapboxGeocoder;
    