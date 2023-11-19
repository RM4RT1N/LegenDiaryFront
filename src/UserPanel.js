import React, {useState,useEffect} from 'react';
import './UserPanel.css'
import vid from './resources/themes_video/video.mp4'
import Navbar from './Navbar';
import jwtDecode from "jwt-decode";
import Edit from "./Edit"

export default class UserPanel extends React.Component {
    constructor() {
        super();
        this.state={
            editLegend:false,
            legend:null
        }
        }
acceptLegend(id){
    const data= {
        id: id}

    fetch(`http://localhost:8081/api/accept-legend/${id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      }).then((response) => {
        if (response.ok) {
          window.location.reload();
        } else {
          console.log("Coś nie tak");
        }
      }).catch((error) => {
        console.log(error.message, error);
      });
    }
  

handleEditLegend(place){
    if(this.state.editLegend&&place===this.state.legend){
        this.setState({
            editLegend:false,
            legend:null
        })
    }
    else{
    this.setState({
        editLegend:true,
        legend:place
    })
    }

}

render() {
    
    return (
        <div>
    <div className="clmn">
        <video src={vid} autoPlay muted loop/>
    <div className='overlay'></div>
        <div className="user-panel">
        <h3>User Name : {this.props.userData.username}</h3>
            <img src={this.avatarUrl} alt="User Avatar" className="avatar" />
            <h3>Account type : {this.props.userData.roles.map((role) => (
                    <li key={role.id}>{role.name}</li>))}</h3>
            <p>Email : {this.props.userData.username}</p>
        </div>
       
       
        
    
        <div className="user-panel">
            <h3>Odyssey legend</h3>
            <ul>
                {this.props.userData.places.map((place) => (
                   <li key={place.id}>
                   <a href="#" onClick={()=>{
                    this.props.fly(place.id,place.latitude,place.longitude);
                    this.props.close();
                }}>
                     {place.name}
                   </a>
                   <a href="#" onClick={() =>{ this.props.fly(place.id,place.latitude,place.longitude);
                    this.props.close();
                    this.props.open();
            }}>
                     Edit
                   </a>
                 </li>
                ))}
            </ul>
        </div>
        
        {this.props.userData.roles.map((role) => (role.name === 'MODERATOR')).includes(true) ? (
  <div className="user-panel">
    <h3>To accept</h3>
    <ul>
                {this.props.placesToAccept.map((place) => (
                   <li key={place.id}>
                   <a href="#" onClick={()=>{
                    this.props.fly(place.id,place.latitude,place.longitude);
                    this.props.close();
                    
                }}>
                     {place.name} <br/>
                     
                   </a>
                   {place.description} <br/>
                   <a href="#" onClick={() =>{ 
                    this.props.close();
                    this.acceptLegend(place.id)
            }}>
                     Accept
                   </a>
                 </li>
                ))}
            </ul>

  </div>
) : null}
        
    </div>
    {this.state.editLegend?<Edit place={this.state.legend}/>:null}
    </div>
    );
  };}