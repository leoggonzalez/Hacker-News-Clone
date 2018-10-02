import React, { Component } from 'react';
import './assets/styles/App.scss';
import './assets/styles/animate.css';
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
      loadFailed: false,
      posts: [],
    };
    this.logInUser = this.logInUser.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
  }
  componentWillMount() {
    this.fetchPosts();
    // events
    const source = new EventSource('https://likemachine-api.nerdgeschoss.de/links');
    source.addEventListener('change', (e) => {
      const data = JSON.parse(e.data);
      this.fetchPost(data.link);
    }, false);
  }
  async fetchPost(post) {
    const updatedPost = await api.fetchPost(post, this.state.sessionId);
    const posts = [...this.state.posts];
    for (let i = 0; i < posts.length; i += 1) {
      if (posts[i].id === updatedPost.id) posts[i] = updatedPost;
    }
    this.setState({
      posts,
    });
  }
  async fetchPosts() {
    try {
      const posts = await api.fetchPosts(this.state.sessionId);
      this.setState({
        posts,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loadFailed: true,
      });
    }
  }
  async logInUser(data) {
    try {
      const sessionId = await api.logIn(data);
      this.setState({
        sessionId,
        posts: [],
        ...data,
      });
      this.fetchPosts();
    } catch (error) {
      console.log(error);
      this.setState({
        loadFailed: true,
      });
    }
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
                sessionId={this.state.sessionId} 
                loadFailed={this.state.loadFailed}
                onDelete={this.fetchPosts} /> )}
            />
            { /* LOGIN */ }
            <Route exact path="/login" render={
              (props) => {
                if (!this.state.loggedUser) {
                  return (    
                    <Login onSubmit={this.logInUser} loadFailed={this.state.loadFailed} />
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
                    <Submit onSubmit={this.fetchPosts} sessionId={this.state.sessionId} />
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
