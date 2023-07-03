import React, { Component } from 'react';
import './Carousel.css'

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      photos:[]
    };
    
  }

  next = () => {
    const currentIndex = this.state.currentIndex;
    const photos = this.props.images;
    this.setState({
      currentIndex: (currentIndex + 1) % photos.length
    });
  };

  prev = () => {
    const currentIndex = this.state.currentIndex;
    const photos = this.props.images;
    this.setState({
      currentIndex: (currentIndex - 1 + photos.length) % photos.length
    });
  };

  setCurrentIndex = (index) => {
    this.setState({ currentIndex: index });
  };

  render() {
    /* this.setState({photos:this.props.images}); */
    /* console.log(this.state.photos); */
    const currentIndex = this.state.currentIndex;
    const photos = this.props.images;

    return (
      <>
         <div className='slider-container'>
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={
                photos[currentIndex].id === photo.id ? 'fade' : 'slide fade'
              }
            >
              <img src={photo.imageUrl} alt={photo.place_id} className='photo' />
            </div>
          ))}

          <button onClick={this.prev} className='prev'>
            &lt;
          </button>

          <button onClick={this.next} className='next'>
            &gt;
          </button>
        </div>

        
        <div className='dots'>
          {photos.map((photo) => (
            <span
              key={photo.id}
              className={
                photos[currentIndex].id === photo.id ? 'dot active' : 'dot'
              }
              onClick={() => this.setCurrentIndex(photos.indexOf(photo))}
            ></span>
          ))}
        </div>
      </>
    );
  }
}

export default Carousel;