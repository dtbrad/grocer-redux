import React, { Component } from 'react';
import { Alert, Button, Col, FormControl, FormGroup, Panel } from 'react-bootstrap';
import UserService from '../api/UserService';

class LogIn extends Component {
  state = {
    email: '',
    emailError: true,
    password: '',
    passwordError: true,
    loading: null,
  };

  validateEmail = () => {
    const valid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    return valid ? this.setState({ emailError: false }) : this.setState({ emailError: true });
  };

  validatePassword = () => {
    const valid = this.state.password.length > 6;
    return valid ? this.setState({ passwordError: false }) : this.setState({ passwordError: true });
  };

  emailFieldState = () => {
    if (this.state.email.length > 0 && this.state.emailError === false) {
      return 'success';
    } else if (this.state.email.length > 0 && this.state.emailError === true) {
      return 'error';
    }
    return null;
  }

  passwordFieldState = () => {
    if (this.state.password.length > 0 && this.state.passwordError === false) {
      return 'success';
    } else if (this.state.password.length > 0 && this.state.passwordError === true) {
      return 'error';
    }
    return null;
  }

  handleChange = async (e) => {
    const field = e.target.type;
    await this.setState({ [field]: e.target.value });
    if (field === 'email') {
      this.validateEmail();
    } else {
      this.validatePassword();
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.emailError === false && this.state.passwordError === false) {
      await this.setState({ loading: true });
      const response = await UserService.loginUser({
        email: this.state.email,
        password: this.state.password,
      });
      if (response.status === 200) {
        await this.props.logIn(response.headers.jwt);
        this.props.history.push('/shopping_trips');
      } else {
        alert(`Server says: "${response.data.message[0]}"`);
      }
    } else {
      alert('invalid form!')
    }
  }

  render() {
    const loadingMessage = this.state.loading === null ? (
      null
    ) : (
      <Alert bsStyle="warning" className="text-center"> Loading... </Alert>
    );

    return (
      <Col md={6} mdOffset={3}>
        <Panel>
          <form onSubmit={this.handleSubmit}>
            <h4 className="text-center">Log In </h4>
            <FormGroup
              controlId="email"
              validationState={this.emailFieldState()}
            >
              <FormControl
                type="email"
                value={this.state.email}
                placeholder="Enter email"
                onChange={this.handleChange}
                inputRef={(ref) => { this.input = ref; }}
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="password"
              validationState={this.passwordFieldState()}
            >
              <FormControl
                type="password"
                value={this.state.password}
                placeholder="Enter password"
                onChange={this.handleChange}
                inputRef={(ref) => { this.input = ref; }}
              />
              <FormControl.Feedback />
            </FormGroup>
            <Button type="submit">
              Submit
            </Button>
          </form>
        </Panel>
        { loadingMessage }
      </Col>
    );
  }
}

export default LogIn;
