import React from 'react';
import './RightSidebar.css';
import TextToSpeech from './TextToSpeech';
import Carousel from './Carousel.js';

export default class SlideDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let drawerClasses = 'side-drawer';
    if (this.props.show) {
      drawerClasses = 'side-drawer open';
    }
    
    return (
      <div className={drawerClasses}>
        <p className='right-side-bar-title'>{this.props.title}</p>
        {this.props.images.some(e => e.imageUrl === "")?null:
        <div className='imageCarousel'>
               <Carousel images={this.props.images}/>
        </div>}
        <p className='description'>{this.props.description}</p>
      <div className='tools'>
          <button className='sidebarCloseBtn tools-button' onClick={this.props.drawerClose}></button>
          <TextToSpeech text={this.props.description} />
      </div>
      </div>
    );
  }
}