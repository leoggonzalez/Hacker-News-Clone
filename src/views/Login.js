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
    return (
      <div>
        <FacebookLogin
          appId="2178804432377132"
          fields="name,email,picture"
          callback={this.responseFacebook} />
      </div>
    );
  }
}

export default Login;
