import React, { Component } from "react";
import { Constants } from "../../Constants";
import "./navbar.css";
import logo from "../../assets/img/zaio-logos/zaio-logo.png";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <nav >
        <div className="NavbarItems">
        <Link to="/" className="navbar-logo">
          <img className="zaio-logo" src={logo} alt=""></img>
        </Link>
        <div className="menu-icon" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {/* {this.props.username && <li>
            Welcome! {this.props.username}
          </li>} */}
          {Constants?.[!this.props.loggedin?"loggedout":"loggedin"].MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link className={item.cName} to={item.url}>
                  {item.title}
                </Link>
              </li>
            );
          })}
          
        </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
