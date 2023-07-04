import './App.css';
import Map from './Map';
// import 'mapbox-gl/dist/mapbox-gl.css';
import React from 'react';
import Sidebar from './Sidebar'
import Navbar from './Navbar';
import OSM from './OSM'
import LeftSidebar from './LeftSidebar';
import jwtDecode from "jwt-decode";
import UserPanel from "./UserPanel";
import Welcome from "./Welcome";


export default class App extends React.Component {
  constructor() {
    super();
    this.token = localStorage.getItem("jwtToken");
    this.userName=this.decodeToken(this.token)
}
  state = { drawerOpen: false,
  title:'',
  description:'',
  // user:null,
  sidebarVisible:false,
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
  longitude:19.8056,
  latitude:51.747
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
sidebarClose = () => {
  this.setState({
      sidebarVisible: false
    });
  
}
drawerClose = () => {
  this.setState({
      drawerOpen: false
    });
  
}
sidebarOpen = () => {
  this.setState({
      sidebarVisible: true
    });
  
}
setCords(latitude,longitude){
  this.setState({
      latitude:latitude,
      longitude:longitude

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
// getUserFromJwtTokenIntoState(jwtToken){
//     const tokenDecoded = jwtDecode(jwtToken)
//     if (!this.state.user) {
//         this.setUser(tokenDecoded.sub)
//     }
// }
decodeToken(token){
  if (token){
      console.log(token)
      let decoedToken=jwtDecode(token)
      return decoedToken.sub
  }else {
      return null;
  }
}
    userPanelChangeState= () => {
        this.setState({
            userPanelOpen:!this.state.userPanelOpen
        })

    }

  render(){
    const { sidebarVisible} = this.state;
    if (this.token) {
        this.fetchUser()
        return (
            <div>
                <Navbar user={this.state.userData} userPanel={this.userPanelChangeState}/>
                {this.state.userData.id!=null ?
                    <>
                        <Sidebar show={this.state.drawerOpen} title={this.state.title} description={this.state.description} drawerClose={this.drawerClose} />
                        <LeftSidebar  userID={this.state.userData.id} latitude={this.state.latitude} longitude={this.state.longitude} toggleSidebar={this.sidebarClose} visible={sidebarVisible} />
                        {this.state.userPanelOpen?<UserPanel show={this.state.userPanelOpen}  userData={this.state.userData}/>
                            :
                            <OSM cords={this.setCords.bind(this)} sidebarOpen={this.sidebarOpen} toggle={this.drawerToggleClickHandler} drawerClose={this.drawerHandleClose}/>}
                    </>:
                    <Welcome/>}
            </div>)
    }else {
        return (
            <div>
                <Navbar/>
                <Sidebar show={this.state.drawerOpen} title={this.state.title} description={this.state.description}/>
                {this.state.user ?
                    <OSM sidebarOpen={this.sidebarOpen} toggle={this.drawerToggleClickHandler} drawerClose={this.drawerHandleClose}/> :
                    <Welcome/>}
            </div>)
    }

 }
}
