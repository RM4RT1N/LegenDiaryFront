import React, {Component} from 'react'
class Weather extends Component {
constructor(props) {
    super(props)
   
    this.state = {
        latitude : null,
        longitude : null,
        data : {},
        }
}

async loadWeather()
{
    try{
        const encodedLatitude = encodeURIComponent(this.props.latitude);
        const encodedLongitude = encodeURIComponent(this.props.longitude);
 
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${encodedLatitude}&longitude=${encodedLongitude}&current_weather=true`)
        .then(response => response.json())
        .then(data => this.setState({data : data}))
    } 
    catch (error) {
        console.error('Error while loading weather data:', error);
    }
   
}
componentDidMount()
{
    this.loadWeather()
}
componentDidUpdate(prevProps) {
    if (prevProps.longitude !== this.props.longitude 
        ||prevProps.latitude !== this.props.latitude ) {
            this.loadWeather();   
    }
}

render() {
    const { data } = this.state;

    if (data && data.current_weather) {
      let imgWthr = '';

      if (data.current_weather.temperature < 0) {
        imgWthr = "❄";
      } else if (data.current_weather.temperature >= 0 && data.current_weather.temperature <= 15) {
        imgWthr = "☁";
      } else {
        imgWthr = "☀";
      }

      return (
        <div>
          Temperature: {data.current_weather.temperature} ℃ .
          {imgWthr}
        </div>
      );
    }

    return null;
  }
}

export default Weather;