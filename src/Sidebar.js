import React, { useEffect } from 'react'
import './Sidebar.css'
import Carousel from './Carousel';
import TextToSpeech from './TextToSpeech';
<<<<<<< Updated upstream
export default class SlideDrawer extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
      };
   }

   render() {
      let drawerClasses = 'side-drawer'
      if(this.props.show) {
          drawerClasses = 'side-drawer open'
      }
   
      return(   
          <div className={drawerClasses}>          
            <button className='sidebarCloseBtn' onClick={this.props.drawerClose}></button>
            <div className='title'>{this.props.title}</div>
            <div className='imageCarousel'>
               <Carousel images={this.props.images}/>
            </div>
            <div className='description'>{this.props.description}</div>
            <div className='TextToSpeech'>
               <TextToSpeech text={this.props.description} />  
            </div>
          </div>
      )
   }
=======
import Carousel from './Carousel.js';
import AddImgs from './AddImgs';

export default class SlideDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgDivOpen:false
    };
  }

  fetchHandle = (points) => {
    const data = {
      points: points
    }
    fetch(`http://localhost:8081/api/user/by-id/${this.props.author_id}/change-points`,{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("jwtToken")}`,
                "Content-type":"application/json"
            },
            body:JSON.stringify(data)
        }).then((response)=>{
            if (response.ok){
                window.location.reload()
                
            }else {
                console.log("Coś nie tak")
            }
        }).catch((error)=>{
            console.log(error.message, error)
        })
  }
  upVoteLegend = () => {
    this.fetchHandle(1);
  }

  downVoteLegend = () => {
    this.fetchHandle(-1);
  }

  imgDivToggleClickHandler = () => {
    console.log("imgdiv clicked");
    this.setState({
      imgDivOpen:!this.state.imgDivOpen
    })
  }

  render() {
    let drawerClasses = 'side-drawer';
    if(this.props.show) {
      drawerClasses = 'side-drawer open';
    }

    let areImagesEmpty = true;
    if(this.props.images.length==0) {
      areImagesEmpty = false;
    }
    return (
      <div className={drawerClasses}>
        <button className='sidebarCloseBtn' onClick={this.props.drawerClose}></button>
        <div className='title'>{this.props.title}</div>
        {(areImagesEmpty) && (<div className='imageCarousel'>
               <Carousel images={this.props.images}/>
        </div>)}
        {this.state.imgDivOpen?<AddImgs legendId={this.props.legendId} title={this.props.title} toggle={this.imgDivToggleClickHandler}/>:null}
        <div className='legendBtns'>&ensp;
          <button className='sidebar-button' id='adding-images-button' onClick={this.imgDivToggleClickHandler}><h3>+</h3></button>&ensp;
          <button className='sidebar-button' onClick={this.upVoteLegend}>&#129093;</button>&ensp;
          <button className='sidebar-button' onClick={this.downVoteLegend}>&#129095;</button>
        </div>
        <div className='description'>{this.props.description}</div>
        <div className='TextToSpeech'>
          <TextToSpeech text={this.props.description} />
        </div>
        
      </div>
    );
  }
>>>>>>> Stashed changes
}