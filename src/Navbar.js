import React from "react";
import Login from "./Login";
import Register from "./Register";
import './Navbar.css';





class Navbar extends React.Component  {
    constructor() {
        super();
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
        localStorage.removeItem("jwtToken")
        window.location.reload()
    }
  render() {

      return (
          <nav className="navbar">
              {!this.props.user?
                  <ul className="navbar-list">
                  {this.state.login?
                      <Login/>:
                      <li className={"nav-element"}
                          onClick={this.handleLoginActive.bind(this)}>
                          Legend-in</li>}
                  {this.state.register?
                      <Register/>:
                      <li className={"nav-element"}
                          onClick={this.handleRegisterActive.bind(this)}>Legend-ister</li>}
                  </ul>
                  :
                  <ul className="navbar-list">
                      <li className={"nav-element"} onClick={this.handleLogout}>Wyloguj</li>
                  </ul>
              }

          </nav>
      );
  };

}

    export default Navbar;