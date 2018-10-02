import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // This binding is necessary to make `this` work in the callback
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  responseFacebook(response) {
    this.props.onSubmit({
      loggedUser: response,
    })
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
          callback={this.responseFacebook} />
      )
    }
    return (
      <div className="login">
        { loaded }
      </div>
    );
  }
}

export default Login;
