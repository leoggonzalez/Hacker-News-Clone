import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import logo from './../assets/y18.gif';
import './../assets/styles/Navbar.scss';

class Navbar extends Component {
  render() {
    let loggedIn;
    if (this.props.loggedUser) {
      loggedIn = <NavLink to="/" exact>{ this.props.loggedUser.name }</NavLink>
    } else {
      loggedIn = <NavLink to="/login" exact>login</NavLink>
    }
    return (
      <nav className="navbar">
        <ul className="navbar-links">
          <li className="navbar-logo">
            <NavLink to="/" exact>
              <img src={logo} alt="hacker-news"></img>
            </NavLink>
          </li>
          <li className="hacker-news-link">
            <NavLink to="/news" exact>Hacker News</NavLink>
          </li>
          <li className="navbar-link">
            <NavLink to="/newest" exact>new</NavLink>
          </li>
          <li className="navbar-link">
            <NavLink to="/newcomments" exact>comments</NavLink>
          </li>
          <li className="navbar-link">
            <NavLink to="/show" exact>show</NavLink>
          </li>
          <li className="navbar-link">
            <NavLink to="/ask" exact>ask</NavLink>
          </li>
          <li className="navbar-link">
            <NavLink to="/jobs" exact>jobs</NavLink>
          </li>
          <li className="navbar-link">
            <NavLink to="/submit" exact>submit</NavLink>
          </li>
        </ul>
        <div className="navbar-login">
          { loggedIn }
        </div>
      </nav>
    );
  }
}

export default Navbar;
