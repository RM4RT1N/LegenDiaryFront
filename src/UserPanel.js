import React, {useState,useEffect} from 'react';
import './UserPanel.css'
import vid from './video.mp4'
import Navbar from './Navbar';
import jwtDecode from "jwt-decode";
import Edit from "./Edit"

export default class UserPanel extends React.Component {
    constructor() {
        super();
        this.state={
            editLegend:false,
            idLegend:null
        }
        }

handleEditLegend(id){
    if(this.state.editLegend){
        this.setState({
            editLegend:false,
            idLegend:null
        })
    }
    else{
    this.setState({
        editLegend:true,
        idLegend:id
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
            <h3>Account type : USER</h3>
            <p>Email : {this.props.userData.username}</p>
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
                {this.props.userData.places.map((place) => (
                    <li key={place.id}>{place.name}
                    <a href="#" onClick={() => this.handleEditLegend(place.id)}>
                    Edit
                    </a>
                    </li>
                ))}
            </ul>
        </div>
        <div className="user-panel">
            <h3>Points</h3>
            <h3> {this.props.userData.points} points</h3>
            <h3> Next level : 50 points</h3>

        </div>
    </div>
    {this.state.editLegend?<Edit/>:null}
    </div>
    );
  };}