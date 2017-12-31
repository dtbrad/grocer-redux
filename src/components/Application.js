import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Main from './Main';
import Footer from './Footer';

class Application extends Component {
  state = {
    authenticated: false,
  };

  logIn = async () => {
    await this.setState({ authenticated: true });
  }

  logOut = () => {
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
