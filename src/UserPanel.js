import React, {useState,useEffect} from 'react';
import './UserPanel.css'
import vid from './video.mp4'
import Navbar from './Navbar';
import jwtDecode from "jwt-decode";

const UserPanel = ({ username, email, avatarUrl }) => {
const token = localStorage.getItem("jwtToken");
const tokenDecoded = jwtDecode(token);
const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/user/${tokenDecoded.sub}`);
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error(error.message, error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div><Navbar/>
    <div className="clmn">
        <video src={vid} autoPlay muted loop/>
    <div className='overlay'></div>
        <div className="user-panel">
        <h3>User Name : {userData.username}</h3>
            <img src={avatarUrl} alt="User Avatar" className="avatar" />
            <h3>Account type : User</h3>
            <p>Email : {userData.username}</p>
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