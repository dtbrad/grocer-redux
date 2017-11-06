import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import BasketsIndex from './baskets_index/baskets_index';
import BasketsShowContainer from './baskets_show/baskets_show_container';
import Navigation from './navigation';
import TokenHelper from './auth/token_helper';
import Login from './auth/login';
import Welcome from './welcome';
import Footer from './footer';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: null,
    };
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.isAuthenticated();
  }

  isAuthenticated() {
    if (TokenHelper.tokenCurrent('jwt')) {
      this.setState({
        authenticated: true,
      });
      return true;
    }
    const alreadyLoggedIn = this.state.authenticated;
    TokenHelper.remove('jwt');
    this.setState({
      authenticated: false,
    });
    if (alreadyLoggedIn === true) {
      this.router.history.push('/login');
    } else {
      this.router.history.push('/welcome');
    }
    return false;
  }

  async loggedIn() {
    await this.setState({ authenticated: true });
    this.router.history.push('/baskets');
  }

  async logout() {
    await this.setState({ authenticated: false });
    TokenHelper.remove('jwt');
    this.router.history.push('/welcome');
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-10 col-md-offset-1">
          <div className="alert alert-info">
            <p> There are three demo accounts: user1@mail.com, user2@mail.com and
              user3@mail.com. All have the same password: &quot;password&quot;
            </p>
          </div>
          <h1 className="text-center">GROCER-REACT<small> purchase tracking for New Season Market shoppers</small></h1>
          <Navigation authenticated={this.state.authenticated} logout={this.logout} />
          <BrowserRouter ref={r => this.router = r}>
            <div>
              <br />
              <Switch>

                <Route exact path="/login" render={() => {
                  return (
                    this.state.authenticated === true ? (
                      <Redirect to="/baskets" />
                    ) : (
                      <Login loggedIn={this.loggedIn} />
                    )
                  );
                }}
                />

                <Route path="/baskets/:id" exact render={({ match }) => {
                  return (
                    this.state.authenticated === false ? (
                      <Redirect to="/login" />
                    ) : (
                      <BasketsShowContainer
                        authenticated={this.state.authenticated}
                        isAuthenticated={this.isAuthenticated}
                        match={match}
                      />
                    )
                  );
                }}
                />

                <Route exact path="/baskets" render={() => {
                  return (
                    this.state.authenticated === false ? (
                      <Redirect to="/login" />
                    ) : (
                      <BasketsIndex
                        authenticated={this.state.authenticated}
                        isAuthenticated={this.isAuthenticated}
                      />
                    )
                  );
                }}
                />

                <Route exact path="/welcome" render={() => {
                  return (
                    this.state.authenticated === true ? (
                      <Redirect to="/baskets" />
                    ) : (
                      <Welcome />
                    )
                  );
                }}
                />;

                <Route exact path="/" render={() => (<Redirect to="/welcome" />)} />

              </Switch>
            </div>
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
