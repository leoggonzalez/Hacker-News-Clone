import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import logo from './../assets/y18.gif';
import './../assets/styles/Navbar.scss';

const mapStateToProps = state => {
  return { loggedUser: state.loggedUser }
}

class Navbar extends Component {
  render() {
    const { loggedUser} = this.props;

    return (
      <nav className="navbar">
        <ul className="navbar-links">
          <li className="navbar-logo">
            <NavLink to="/" exact>
              <img src={logo} alt="hacker-news"></img>
            </NavLink>
          </li>
          <li className="hacker-news-link">
            <NavLink to="/" exact>Hacker News</NavLink>
          </li>
          <li className="navbar-link">
            <NavLink to="/" exact>latest</NavLink>
          </li>
          <li className="navbar-link">
            <NavLink to="/submit" exact>submit new post</NavLink>
          </li>
        </ul>
        <div className="navbar-login">
          { loggedUser ?  
            <NavLink to="/" exact>{loggedUser.name}</NavLink>
            : <NavLink to="/login" exact>login</NavLink>
          }
        </div>
      </nav>
    );
  }
}

export default connect(mapStateToProps)(Navbar);
