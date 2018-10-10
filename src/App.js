import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import './assets/styles/App.scss';
import './assets/styles/animate.css';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Login from './views/Login';
import Submit from './views/Submit';

const mapStateToProps = state => {
  return { loggedUser: state.loggedUser }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loadFailed: false,
    };
  }
  
  render() {
    const { loggedUser } = this.props;

    return (
      <Router>
        <div className="main">
          <div className="main-container">
            <Navbar />
            { /* HOME */ }
            <Route exact path="/" component={Home} />
            { /* LOGIN */ }
            <Route exact path="/login" render={(props) => {
              return (!loggedUser ? 
                <Login loadFailed={this.state.loadFailed} />
                : <Redirect to="/" push /> )
              }}
            />
            { /* SUBMIT */ }
            <Route exact path="/submit" render={(props) => {
              return (loggedUser ?
                <Submit onSubmit={this.fetchPosts} sessionId={this.state.sessionId} />
                : <Redirect to="/login" push /> )
              }} 
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App);
