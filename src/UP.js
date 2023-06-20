import React from 'react';
import './UP.css';
import vid from './video.mp4'

const UP = () => {
  return (<div>
    
    <video src={vid} autoPlay muted loop/>
    <div className='overlay'></div>
    <div className='all'>
    <div className="user-panel">
      
        
      <div className="user-panel-header">
        <h2 className="user-panel-title">Panel użytkownika</h2>
      </div>
      <div className="user-panel-content">
        <div className="user-info">
          <img
            className="user-avatar"
            src="https://example.com/avatar.jpg"
            alt="Avatar użytkownika"
          />
          <div className="user-details">
            <h3 className="user-name">John Doe</h3>
            <p className="user-email">john.doe@example.com</p>
          </div>
        </div>
        <div className="user-actions">
          <button className="action-button">Edytuj profil</button>
          <button className="action-button">Zmień hasło</button>
        </div>
      </div>
    </div></div>
    </div>
  );
};

export default UP;