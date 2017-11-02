import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import UsersService from '../api/users_service';
import TokenHelper from './token_helper';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
      loading: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange(event) {
    this.setState({ [event.type]: event.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    if (this.validateForm()) {
      const response = await UsersService.loginUser({
        email: this.state.email,
        password: this.state.password,
      });
      if (response.status === 200) {
        await TokenHelper.set('jwt', response.headers.jwt);
        this.props.loggedIn()
      } else {
        this.setState({ error: 'Invalid email or password' });
      }
    } else {
      this.setState({ error: 'Invalid email or password' });
    }
  }


  render() {
    const errorMessage = this.state.error === null ? (
      null
    ) : (
      <Alert bsStyle="danger" className="text-center"> {this.state.error } </Alert>
    );
    const loadingMessage = this.state.loading === null ? (
      null
    ) : (
      <Alert bsStyle="warning" className="text-center"> Loading... </Alert>
    );

    return (
      <div className="col-md-6 col-md-offset-3">
        <br />
        { errorMessage }
        <div className="panel panel-default">
          <br />
          <div>
            <h4 className="text-center">Log In</h4>
            <div className="panel-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="email"
                    value={this.state.email}
                    ref={(ref) => { this.input = ref; }}
                    type="email"
                    onChange={event => this.handleChange(event.target)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="password"
                    ref={(ref) => { this.input = ref; }}
                    onChange={event => this.handleChange(event.target)}
                  />
                </div>
                <input type="submit" className="btn btn-primary btn-block" />
              </form>
            </div>
          </div>
        </div>
        { loadingMessage }
        <div className="text-center"><Link to={'/welcome'}>Back to Home Page</Link></div>
      </div>
    );
  }
}
