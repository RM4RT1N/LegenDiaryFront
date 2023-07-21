import React from 'react';
import video1 from './videos/1.mp4';
import video2 from './videos/2.mp4';
import video3 from './videos/3.mp4';
import video4 from './videos/4.mp4';
import logo from './nav.png';
import './Welcome.css';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: false,
      showImage: false,
      randomVideo:''
    };
  }

  componentDidMount() {
    const videos = [video1, video2, video3, video4];
    const randomIndex = Math.floor(Math.random() * videos.length);
    const randomVideo = videos[randomIndex];
    this.setState({randomVideo:randomVideo})

    this.textTimer = setTimeout(() => {
      this.setState({ showText: true });
    }, 2000);

    this.imageTimer = setTimeout(() => {
      this.setState({ showImage: true });
    }, 4000);
  }

  componentWillUnmount() {
    clearTimeout(this.textTimer);
    clearTimeout(this.imageTimer);
  }

  render() {
    const {randomVideo} = this.state;
   

    return (
      <div>
        {this.state.showText && (
          <div>
            <h1 className="welcome-text">LegenDiary</h1>
            <h2 className="welcome-text">Come and immerse yourself in a world of beliefs and legends</h2>
          </div>
        )}
        {this.state.showImage && (
          <div className="image-container">
            <img className="welcome-logo" src={logo} alt="Logo" />
          </div>
        )}
        <video src={randomVideo} autoPlay muted loop />
      </div>
    );
  }
}

export default Welcome;