import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import BasketsIndex from './baskets_index'
import BasketsShowContainer from './baskets_show_container'

class Index extends Component {
  render(){
    return (
      <div className="container">
        <div className="col-md-10 col-md-offset-1">
      <HashRouter>
        <div>
          <h1 className="text-center">GROCER<small> purchase tracking for New Season Market shoppers</small></h1>
          <br/>
          <Switch>
          <Route path="/baskets/:id" exact component={BasketsShowContainer} />
          <Route path="/baskets" component={BasketsIndex} />
          <Route exact path="/" render={() => (<Redirect to="/baskets"/>)}/>
          </Switch>
        </div>
      </HashRouter>
      </div>
      </div>
    )
  };
};


ReactDOM.render(<Index />, document.getElementById('root'));
