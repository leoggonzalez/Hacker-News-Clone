import React, { Component } from 'react';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import api from './../components/Api';
import { logInUser } from './../store/actions/index';

const mapDispatchToProps = dispatch => {
  return {
    logInUser: user => dispatch(logInUser(user)),
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.logInUser = this.logInUser.bind(this);
  }

  async logInUser(data) {
    try {
      const sessionId = await api.logIn(data.accessToken);
      this.props.logInUser({
        sessionId,
        ...data,
      })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let loaded;
    if (this.props.loadFailed) {
      loaded = <p className="home-loading">Failed to load. Press refresh the page.</p>;
    } else {
      loaded = (
        <FacebookLogin
          appId="2178804432377132"
          autoLoad={true}
          fields="name,email,picture"
          callback={this.logInUser} />
      )
    }
    return (
      <div className="login">
        { loaded }
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Login);
