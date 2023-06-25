import React, {useState,useEffect} from 'react';
import './UserPanel.css'
import vid from './video.mp4'
import Navbar from './Navbar';
import jwtDecode from "jwt-decode";

export default class UserPanel extends React.Component {
    constructor() {
        super();
        this.token = localStorage.getItem("jwtToken");
        this.tokenDecoded = jwtDecode(this.token);
        this.state={
            userData: {
                "id": "",
                "nickname": null,
                "username": "",
                "avatar_image_id": null,
                "points": null,
                "address_id": null,
                "places": []
            }
            }
        }



    componentDidMount() {
        this.fetchUser();
    }

    async fetchUser(){
            try {
                const response = await fetch(`http://localhost:8081/api/user/${this.tokenDecoded.sub}`);
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
                        console.log(this.state.userData)
                    })
            } catch (error) {
                console.error(error.message, error);
            }
        };



render() {

    return (
        <div><Navbar/>
    <div className="clmn">
        <video src={vid} autoPlay muted loop/>
    <div className='overlay'></div>
        <div className="user-panel">
        <h3>User Name : {this.state.userData.username}</h3>
            <img src={this.avatarUrl} alt="User Avatar" className="avatar" />
            <h3>Account type : User</h3>
            <p>Email : {this.state.userData.username}</p>
        </div>
        <div>
       
        <div className="user-panel">
        <h3>Badgets</h3>
            <img src="https://i.pinimg.com/736x/07/78/56/07785646b7d848b9d01c73dba0fef73c.jpg" className='badget' />
            <img src="https://freesvg.org/img/scout-badge.png" className='badget' />
            <img src="https://cdn.iconscout.com/icon/free/png-256/free-achievement-52-124188.png" className='badget' />
        </div>
        </div>
        <div className="user-panel">
            <h3>Odyssey legend</h3>
            <ul>
                {this.state.userData.places.map((place) => (
                    <li key={place.id}>{place.name}</li>
                ))}
            </ul>
        </div>
        <div className="user-panel">
            <h3>Points</h3>
            <h3> 37 points</h3>
            <h3> Next level : 50 points</h3>

        </div>
    </div>
    </div>
    );
  };}
  
