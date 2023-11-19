import React, { Component } from 'react';
import './Carousel.css'

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      images:[]
    };
    
  }

  next = () => {
    const currentIndex = this.state.currentIndex;
    const images = this.props.images;
    this.setState({
      currentIndex: (currentIndex + 1) % images.length
    });
  };

  prev = () => {
    const currentIndex = this.state.currentIndex;
    const images = this.props.images;
    this.setState({
      currentIndex: (currentIndex - 1 + images.length) % images.length
    });
  };

  setCurrentIndex = (index) => {
    this.setState({ currentIndex: index });
  };

  renderImages(images, currentIndex, isOnePhoto) {
   return(
    <>
    <div className='slider-container'>
      {images.map((photo) => (
      <div
        key={photo.id}
        className={
          images[currentIndex].id === photo.id ? 'fade' : 'slide fade'
        }>
        <img
          src={photo.imageUrl}
          className='photo'
          alt='image'
        />
      </div>
      ))}

    {!isOnePhoto && (<button onClick={this.prev} className='prev'>
      &lt;
    </button>)}

    {!isOnePhoto && (<button onClick={this.next} className='next'>
      &gt;
    </button>)}
  </div>

  
  {!isOnePhoto && (<div className='dots'>
    {images.map((photo) => (
      <span
        key={photo.id}
        className={
          images[currentIndex].id === photo.id ? 'dot active' : 'dot'
        }
        onClick={() => this.setCurrentIndex(images.indexOf(photo))}
      ></span>
    ))}
  </div>)}
  </>);
  }

  render() {
    const currentIndex = this.state.currentIndex;
    const images = this.props.images;
    let isOnePhoto=false;
    if(images.length==1){
      isOnePhoto=true;
    }
    
    return (
      <>{
        this.renderImages(images, currentIndex, isOnePhoto)}</>

    );
  }
}

export default Carousel;