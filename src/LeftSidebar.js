import React from 'react';
import AddLegend2 from './AddLegend2';
import './LeftSidebar.css';

class LeftSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible
    };
  }
  toggleSidebar = () => {
    this.setState((prevState) => ({
      visible: !prevState.visible
    }));
  };
  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      this.setState({
        visible: this.props.visible
      });
    }
  }
  render() {
    const { visible } = this.state;
    const { latitude,longitude } = this.props;
    if (!visible) {
      return null;
    }
    return (
      
      <div className={visible ? 'sidebar visible' : 'sidebar'}>
        <div className="navAdd">
        <img src={require("./nav1.png")} alt="Logo" width="50" height="50" />
        <button className='leftSidebarCloseBtn' onClick={this.props.toggleSidebar}>X</button>
        </div>
        <AddLegend2 userID={this.props.userID} latitude={latitude} longitude={longitude}/>
      </div>
    );
  }
}

export default LeftSidebar;