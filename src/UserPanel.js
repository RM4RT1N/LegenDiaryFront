import React from 'react';
import './UserPanel.css'
import vid from './video.mp4'
import Navbar from './Navbar';

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
        <div className="user-panel">
            <h3>Odyssey legend</h3>
            <ul>
                <li>Smok Wawelski</li>
                <li>Morderstwo na Mariackiej</li>
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
  };
  
  export default UserPanel;