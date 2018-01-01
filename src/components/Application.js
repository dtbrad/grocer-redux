import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Main from './Main';
import Footer from './Footer';
import TokenHelper from '../api/TokenHelper';

class Application extends Component {
  state = {
    authenticated: false,
  };

  componentDidMount = () => {
    this.isAuthenticated();
  }

  isAuthenticated = () => {
    if (TokenHelper.tokenCurrent('jwt')) {
      this.setState({
        authenticated: true,
      });
      return true;
    }
    return this.logOut();
  }

  logIn = async (token) => {
    TokenHelper.set('jwt', token);
    await this.setState({ authenticated: true });
  }

  logOut = () => {
    TokenHelper.remove('jwt');
    this.setState({ authenticated: false });
  }

  render() {
    return (
      <div className="container">
        <Main
          topState={this.state}
          logIn={this.logIn}
          logOut={this.logOut}
        />
        <Footer />
      </div>
    );
  }
}

export default Application;
