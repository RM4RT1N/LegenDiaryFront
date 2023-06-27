import './App.css';
import Map from './Map';
import 'mapbox-gl/dist/mapbox-gl.css';
import React from 'react';
import Sidebar from './Sidebar'
import Navbar from './Navbar';
import jwtDecode from "jwt-decode";
import UserPanel from "./UserPanel";


export default class App extends React.Component {
    constructor() {
        super();
        this.token = localStorage.getItem("jwtToken");
        this.userName=this.decodeToken(this.token)
    }
  state = {
        drawerOpen: false,
        title:'',
        description:'',
        userData: {
          "id": null,
          "nickname": null,
          "username": "",
          "avatar_image_id": null,
          "points": null,
          "address_id": null,
          "places": []
         },
        addLegendOpen: false,
        userPanelOpen:false,
        cords:[]
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
setCords(latitude,longitude){
        this.setState({
            cords:[latitude,longitude]
        })
}

    async fetchUser(){
        if (this.state.userData.id==null){
        try {
            const response = await fetch(`http://localhost:8081/api/user/${this.userName}`);
            const data = await response.json()
                .then((data)=>{
                    this.setState({
                        userData:{
                            "id": data.id,
                            "nickname": data.nickname,
                            "username": data.username,
                            "avatar_image_id": data.avatar_image_id,
                            "points": data.points,
                            "address_id": data.address_id,
                            "places": data.places
                        }
                    })
                })
        } catch (error) {
            console.error(error.message, error);
        }
    }}
decodeToken(token){
    if (this.token){
        let decoedToken=jwtDecode(token)
        return decoedToken.sub
    }else {
        return null;
    }

}

  render(){
      if (this.token) {
          this.fetchUser()
          return (
              <div>
                  <Navbar user={this.state.userData}/>
                  {this.state.userData.id!=null ?
                      <>
                          {/*<Sidebar show={this.state.drawerOpen} title={this.state.title} description={this.state.description}/>*/}
                          {/*<UserPanel show={this.state.userPanelOpen} />*/}
                          <Map toggle={this.drawerToggleClickHandler} drawerClose={this.drawerHandleClose} passCords={this.setCords}/>
                      </>:

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
