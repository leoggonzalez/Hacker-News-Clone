import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import './../assets/styles/Submit.scss';
import api from './../components/Api';

class Login extends Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.state = {
      submitted: false,
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    const link = this.refs.name.value;
    const reg = /^(http: \/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
    if (!link || !reg.test(link)) {
      alert('You must provide a valid url');
    } else {
      this.addNewPost({
        link,
      });
    }
  };
  async addNewPost(data) {
    try {
      await api.addNewPost(data.link, this.props.sessionId);
      this.setState({ submitted: true });
      this.props.onSubmit();
    } catch (error) {
      alert('There was an error submitting your post. Please try again');
    }
  }

  render() {
    let submitForm;
    if (this.state.submitted) {
      submitForm = (
        <div className="submit-submitted"> 
          <p>Thank you for submitting your link.</p>
          <NavLink to="/" exact>Back to Home</NavLink>
        </div>
      )
    } else {
      submitForm = (
        <form onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label className="form-label">url </label>
            <input className="form-control" type="text" ref="name" />
          </div>
          <button className="submit-button">SUBMIT</button>
        </form>
      )
    }
    return (
      <div className="submit">
        <header className="submit-header">
          <h1>Add new Post</h1>
        </header>
        <article className="submit-body">
          { submitForm }
        </article>
      </div>
    );
  }
}

export default Login;
