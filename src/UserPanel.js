import React from 'react';
import './UserPanel.css'
import vid from './videos/video.mp4'
import Navbar from './Navbar';
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes

const UserPanel = ({ username, email, avatarUrl }) => {
    return (
        <div><Navbar/>
    <div className="clmn">
        <video src={vid} autoPlay muted loop/>
    <div className='overlay'></div>
        <div className="user-panel">
        <h3>User Name : {username}</h3>
            <img src={avatarUrl} alt="User Avatar" className="avatar" />
            <h3>Account type : User</h3>
            <p>Email : {email}</p>
        </div>
        <div>
       
        <div className="user-panel">
        <h3>Badgets</h3>
            <img src="https://i.pinimg.com/736x/07/78/56/07785646b7d848b9d01c73dba0fef73c.jpg" className='badget' />
            <img src="https://freesvg.org/img/scout-badge.png" className='badget' />
            <img src="https://cdn.iconscout.com/icon/free/png-256/free-achievement-52-124188.png" className='badget' />
        </div>
        </div>
        <div className="user-panel" id="user-legends-list">
            <h3>Odyssey legend</h3>
            <ul>
<<<<<<< Updated upstream
                <li>Smok Wawelski</li>
                <li>Morderstwo na Mariackiej</li>
=======
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
            }}>Edit
                   </a>
                 </li>
                ))}
>>>>>>> Stashed changes
            </ul>
        </div>
        <div className="user-panel">
            <h3>Points</h3>
            <h3> 37 points</h3>
            <h3> Next level : 50 points</h3>

        </div>
    </div>
    {this.state.editLegend?<Edit place={this.state.legend}/>:null}
    </div>
    );
  };
  
  export default UserPanel;