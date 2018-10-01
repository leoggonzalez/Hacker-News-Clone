import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './views/Home';
import Login from './views/Login';
import Submit from './views/Submit';
import api from './components/Api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      loggedUser: false,
      posts: [],
    };
    this.logInUser = this.logInUser.bind(this);
    this.addNewPost = this.addNewPost.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
  }
  componentWillMount() {
    this.fetchPosts();
    // events
    const source = new EventSource('https://likemachine-api.nerdgeschoss.de/links');
    source.addEventListener('change', (e) => {
      const data = JSON.parse(e.data);
      debugger;
      this.fetchPost(data);
    }, false);
  }
  async fetchPost(post) {
    debugger;
  }
  async fetchPosts(sessionId) {
    const posts = await api.fetchPosts(sessionId);
    this.setState({
      posts,
    });
  }
  async logInUser(data) {
    try {
      const sessionId = await api.logIn(data);
      this.setState({
        sessionId,
        posts: [],
        ...data,
      });
      this.fetchPosts(sessionId);
    } catch (error) {
      console.log(error);
    }
  }
  async addNewPost(data) {
    await api.addNewPost(data.link, this.state.sessionId);
  }
  render() {
    return (
      <Router>
        <div className="main">
          <div className="main-container">
            <Navbar loggedUser={this.state.loggedUser} />
            { /* HOME */ }
            <Route 
              exact path="/"
              render={props => ( <Home posts={this.state.posts}
                loggedUser={this.state.loggedUser}
                sessionId={this.state.sessionId} /> )}
            />
            { /* LOGIN */ }
            <Route exact path="/login" render={
              (props) => {
                if (!this.state.loggedUser) {
                  return (    
                    <Login onSubmit={this.logInUser} />
                  )
                } else {
                  return (
                    <Redirect to="/" push />
                  )
                }
              }
            } />
            { /* SUBMIT */ }
            <Route exact path="/submit" render={
              (props) => {
                if (this.state.loggedUser) {
                  return (
                    <Submit onSubmit={this.addNewPost} />
                  )
                } else {
                  return (
                    <Redirect to="/login" push />
                  )
                }
              }
            } />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
