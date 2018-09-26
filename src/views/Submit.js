import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    const link = this.refs.name.value;

    this.props.onSubmit({
      link,
    });
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="form-group">
          <label>Link: </label>
          <input type="text" ref="name" />
        </div>
        <button>SUBMIT</button>
      </form>
    );
  }
}

export default Login;
