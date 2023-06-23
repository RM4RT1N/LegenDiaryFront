import './App.css';
import Map from './Map';
import 'mapbox-gl/dist/mapbox-gl.css';
import React from 'react';
import Sidebar from './Sidebar'
import Navbar from './Navbar';
import jwtDecode from "jwt-decode";


export default class App extends React.Component {
  state = { drawerOpen: false,
  title:'',
  description:'',
  user:null
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

getUserFromJwtTokenIntoState(jwtToken){
    const tokenDecoded = jwtDecode(jwtToken)
    if (!this.state.user) {
        this.setUser(tokenDecoded.sub)
    }
}

setUser(username){
      this.setState({
          user:username
      })
}

  render(){
      const jwtToken = localStorage.getItem("jwtToken")
      if (jwtToken) {
          return (
              <div onLoad={this.getUserFromJwtTokenIntoState(jwtToken)}>
                  <Navbar user={this.state.user}/>
                  <Sidebar show={this.state.drawerOpen} title={this.state.title} description={this.state.description}/>
                  {this.state.user ?
                      <Map toggle={this.drawerToggleClickHandler} drawerClose={this.drawerHandleClose}/> :
                      <h1>Hello !</h1>}
              </div>)
      }else {
          return (
              <div>
                  <Navbar/>
                  <Sidebar show={this.state.drawerOpen} title={this.state.title} description={this.state.description}/>
                  {this.state.user ?
                      <Map toggle={this.drawerToggleClickHandler} drawerClose={this.drawerHandleClose}/> :
                      <h1>Hello !</h1>}
              </div>)
      }

   }
}
