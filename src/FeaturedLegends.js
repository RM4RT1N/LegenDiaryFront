import React, { Component } from 'react';
import './FeaturedLegends.css';

class FeaturedLegends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }
  
  handleClick(place_id, legends) {
    // this.props.flyToMarker(item);
    for(let place of legends) {
      if(place_id === place.id) {
        console.log(place);
        this.props.flyToMarker(place);
      }
    }    
  };
  
  filterImages(photos) {
    let valueSet = new Set();
    let newArray = [];
    for (let obj of photos) {
      if (obj.imageUrl === ""){
        continue;
      }
      if (!valueSet.has(obj.place_id)) {
        newArray.push(obj);
        valueSet.add(obj.place_id);
      }
    }
    return newArray.slice(0,6);
  }

  renderImgs(legends, photos) {
    const featuredArray = this.filterImages(photos);

    let result = featuredArray.map((photo, index) => {
      let legend = legends?.find(obj => obj.id === photo.place_id);
      if (legend !== undefined) {
        return (
            <div
              className='featured-item'
              onClick={() => this.handleClick(photo.place_id, legends)}>
                <img
                  src={photo.imageUrl} className='featured-photo'
                  key={photo.id}
                  alt={legend.name + 'image'}
                  onError={(e) => (e.target.style.display = 'none')}
                />
                <p className='featured-title'>{legend.name}</p>
            </div>
        );
      }      
    })
    return result;
  }

  render() {
    const photos = this.props.images;
    const legends = this.props.legends;    
    return (
      <div className={true ? 'featured-visible' : 'featured'}>
        {this.renderImgs(legends, photos)}
      </div>
    );
  }
}

export default FeaturedLegends;