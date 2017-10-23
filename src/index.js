import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import BasketsIndex from './baskets_index'
import BasketsShowContainer from './baskets_show_container'
import Header from './header';
import Login from './login';
import axios from 'axios';
const URL = process.env.REACT_APP_URL;

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
        authenticated: false,
        user_id: null,
        user_name: null,
        user_email: null
    };
    this.saveLoginInfo = this.saveLoginInfo.bind(this);
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  componentDidMount() {
    this.isAuthenticated();
  };

  isAuthenticated(){
    if(localStorage.getItem("token") !== null) {
      this.setState({
        authenticated: true,
        user_id: localStorage.user_id,
        user_name: localStorage.user_name,
        user_email: localStorage.user_email
      })
    };
  };

  logout(){
    localStorage.removeItem("userInfo")

    this.setState({
        authenticated: false,
        user_id: null,
        user_email: null,
        user_name: null
    });
  }

  login(email, password) {
    axios.post(`${URL}/login`, {
      user: { email: email,
              password: password
            }
    })
    .then(response => {
      let userInfo = { token: response.headers.jwt,
                       user_id: response.headers.user_id,
                       user_name: response.headers.user_name,
                       user_email: response.headers.user_email
                    };
      this.saveLoginInfo(userInfo);
      this.setState(function(){
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        return {
          authenticated: true,
          user_id: userInfo.user_id,
          user_email: userInfo.user_email,
          user_name: userInfo.user_name
        }
      })
      this.router.history.push('/baskets');

    })
    .catch(function(){
      alert("Invalid login credentials, please try again")
    });
  };

  saveLoginInfo(userInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  };

  render(){
    return (
      <div>
        <div className="container">
          <div className="col-md-10 col-md-offset-1">
            <br/>
            <h1 className="text-center">GROCER<small> purchase tracking for New Season Market shoppers</small></h1>
            <Header logout = { this.logout } user_name = { this.state.user_name } isAuthenticated = { this.state.authenticated }/>
            <br/>
            <div>
              <HashRouter ref={r => this.router = r}>
                <div>
                  <br/>
                  <Switch>
                    <Route path="/login" render={ () => <Login login={this.login} /> }/>
                    <Route path="/baskets/:id" exact component={BasketsShowContainer} />
                    <Route path="/baskets" component={BasketsIndex} />
                    <Route exact path="/" render={() => (<Redirect to="/baskets"/>)}/>
                  </Switch>
                </div>
              </HashRouter>
            </div>
          </div>
        </div>
      </div>
    )
  };
};

ReactDOM.render(<Index />, document.getElementById('root'));
