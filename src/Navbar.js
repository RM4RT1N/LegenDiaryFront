import React from "react";
import LoginActive from "./LoginActive";
import RegisterActive from "./RegisterActive";
import './Navbar.css';
import MapSearchByKeyword from "./MapSearchByKeyword";


class Navbar extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            search:false,
            login:false,
            register:false,
        }
        this.setSearchDistance = this.setSearchDistance.bind(this)
    }
 handleLoginActive(){
        if (this.state.login){
            this.setState({login:false})
        }else
            this.setState({ search:false,
                login:true,
                register:false})
    }
    handleRegisterActive(){
        if (this.state.register){
            this.setState({register:false})
        }else
            this.setState({ search:false,
                login:false,
                register:true})
    }

    setSearchDistance(searchDistance){
        this.props.setSearchDistance(searchDistance)
    }
    handleLogout() {
        const token = localStorage.getItem("jwtToken");
        fetch("http://localhost:8081/api/auth/logout", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        })
            .then((response) => {
                if (response.ok) {
                    localStorage.removeItem("jwtToken");
                    window.location.reload();
                } else {
                    throw new Error("Wystąpił błąd podczas wylogowywania");
                }
            })
            .catch((err) => {
                console.log(err.message, err);
            });
    };


  render() {

      return (
          <section className="navbar-wraper">
          <nav className="navbar">
              {!this.props.user?
                  <ul className="navbar-list">
                      <li className={"nav-element"}
                          onClick={this.handleLoginActive.bind(this)}>Legend-in</li>
                      <li className={"nav-element"}
                          onClick={this.handleRegisterActive.bind(this)}>Legend-ister</li>
                      <li className={"nav-element"}> Browse map</li>
                      <li className={"nav-element"}>About Us</li>
                  </ul>
                  :
                  <ul className="navbar-list">
                      <li className={"nav-element"} onClick={this.props.userPanel} >{this.props.user.username}</li>
                      <li className={"nav-element"} onClick={this.handleLogout}>Wyloguj</li>
                      <li className={"nav-element"}>About Us</li>
                  </ul>
              }
          </nav>
              {!this.props.up?<MapSearchByKeyword legends={this.state.legends} flyToMarker={this.flyToMarker} />:null}
              <LoginActive active={this.state.login}/>
              <RegisterActive active={this.state.register}/>
          </section>
      );
  };

}

    export default Navbar;