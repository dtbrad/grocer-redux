import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Login extends Component {
  render() {
    return <Button onClick={this.props.logIn}>Click to log in </Button>
  }
}

export default Login;
