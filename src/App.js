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
import Welcome from "./Welcome"


export default class App extends React.Component {
  constructor() {
    super();
    this.token = localStorage.getItem("jwtToken");
    this.userName=this.decodeToken(this.token)
}
  state = { drawerOpen: false,
  title:'',
  description:'',
  images:[],
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
  longitude:null,
  latitude:null
  }

  
drawerToggleClickHandler = (title,description,images) => {
  if(this.state.title===title && this.state.description===description)
   {this.setState({
     drawerOpen: !this.state.drawerOpen,
     title:title,
     description:description,
     images:images
   })
 }
 else
 {this.setState({
  drawerOpen: true,
  title:title,
  description:description,
  images:images
})
}
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
userPanelChangeState= () => {
  this.setState({
    userPanelOpen:!this.state.userPanelOpen
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
getUserFromJwtTokenIntoState(jwtToken){
    const tokenDecoded = jwtDecode(jwtToken)
    if (!this.state.user) {
        this.setUser(tokenDecoded.sub)
    }
}
decodeToken(token){
  if (this.token){
      let decoedToken=jwtDecode(token)
      return decoedToken.sub
  }else {
      return null;
  }

}
// setUser(username){
//       this.setState({
//           user:username
//       })
// }

  // render(){
  //   const { sidebarVisible,drawerOpen } = this.state;
  //     const jwtToken = localStorage.getItem("jwtToken")
  //     if (jwtToken) {
  //         return (
  //             <div onLoad={this.getUserFromJwtTokenIntoState(jwtToken)}>
  //             <div>
  //                 <Navbar user={this.state.user}/>
  //                 <LeftSidebar toggleSidebar={this.sidebarClose} visible={sidebarVisible} />
  //                 <Sidebar drawerClose={this.drawerHandleClose} show={drawerOpen} title={this.state.title} description={this.state.description}/>
  //                 {/* {this.state.user ? */}
  //                 <OSM sidebarOpen={this.sidebarOpen} toggle={this.drawerToggleClickHandler} drawerClose={this.drawerHandleClose}/> 
  //                 {/* <h1>Hello !</h1>} */}
  //              </div>
  //              </div>)
  //      }else {
  //         return (
  //             <div>
  //                 <Navbar/>
  //                 <Sidebar show={this.state.drawerOpen} title={this.state.title} description={this.state.description}/>
  //                 {this.state.user ?
  //                     <Map toggle={this.drawerToggleClickHandler} drawerClose={this.drawerHandleClose}/> :
  //                     <h1>Hello !</h1>}
  //             </div>)
  //     }

  //  }
  render(){
    const { sidebarVisible,longitude,latitude} = this.state;
    if (this.token) {
        this.fetchUser()
        return (
            <div>
                <Navbar user={this.state.userData} userPanel={this.userPanelChangeState}/>
                {this.state.userData.id!=null ?
                    <>
                        <Sidebar images={this.state.images} show={this.state.drawerOpen} title={this.state.title} description={this.state.description} drawerClose={this.drawerClose} />
                        <LeftSidebar  userID={this.state.userData.id} latitude={latitude} longitude={longitude} toggleSidebar={this.sidebarClose} visible={sidebarVisible} />
                        
                        {this.state.userPanelOpen?<UserPanel show={this.state.userPanelOpen}  userData={this.state.userData}/>
                        :null}
                        <OSM up={this.state.userPanelOpen}cords={this.setCords.bind(this)} sidebarOpen={this.sidebarOpen} toggle={this.drawerToggleClickHandler} drawerClose={this.drawerHandleClose}/>
                    </>:

                    <Welcome/>}
            </div>)
    }else {
        return (
            <div>
                <Navbar/>
                {/* <Sidebar show={this.state.drawerOpen} title={this.state.title} description={this.state.description}/> */}
                {this.state.user ?
                    <OSM sidebarOpen={this.sidebarOpen} toggle={this.drawerToggleClickHandler} drawerClose={this.drawerHandleClose}/> :
                    <Welcome/>}
            </div>)
    }

 }
}
