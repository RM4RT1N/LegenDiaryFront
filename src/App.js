import './App.css';
import Map from './Map';
import 'mapbox-gl/dist/mapbox-gl.css';
import React from 'react';
import Sidebar from './Sidebar'
import Navbar from './Navbar';


export default class App extends React.Component {
  state = { drawerOpen: false,
  title:'',
  description:''
  }
  
drawerToggleClickHandler = (title,description) => {
   this.setState({
     drawerOpen: !this.state.drawerOpen,
     title:title,
     description:description
   })
 }
 drawerHandleClose = () => {
  this.setState({
    drawerOpen: false
  })
}


  render(){
     
     return(
        <div> 
          <Navbar/>         
          <Sidebar show={this.state.drawerOpen} title={this.state.title} description={this.state.description}/>
          <Map toggle={this.drawerToggleClickHandler} drawerClose={this.drawerHandleClose} />
        </div>
     )
   }
}
