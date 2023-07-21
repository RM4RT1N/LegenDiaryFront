import React from 'react';
import AddLegend2 from './AddLegend2';
import './LeftSidebar.css';

class LeftSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  // handleToggleSidebar = () => {
  //   this.setState((prevState) => ({
  //     visible: !prevState.visible
  //   }));}

  render() {
    const { visible } = this.state;

    return (
      
      <div className={visible ? 'sidebar visible' : 'sidebar'}>
        <div className="navAdd">
        <img src={require("./nav1.png")} alt="Logo" width="50" height="50" />
        <button className='leftSidebarCloseBtn' onClick={this.props.toggleSidebar}>X</button>
        </div>
<<<<<<< Updated upstream
        <AddLegend2 />
=======
        <AddLegend2 userID={this.props.userID} username={this.props.username} latitude={latitude} longitude={longitude}/>
>>>>>>> Stashed changes
      </div>
    );
  }
}

export default LeftSidebar;