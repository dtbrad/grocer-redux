import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import BasketsIndex from './baskets_index'
import BasketsShow from './baskets_show'

class Index extends Component {
  render(){
    return (
      <HashRouter>
        <div>
          <h1 className="text-center">GROCER<small> purchase tracking for New Season Market shoppers</small></h1>
          <br/>
          <Switch>
          <Route path="/baskets/:id" exact component={BasketsShow} />
          <Route path="/baskets" component={BasketsIndex} />
          <Route exact path="/" render={() => (<Redirect to="/baskets"/>)}/>
          </Switch>
        </div>
      </HashRouter>
    )
  };
};


ReactDOM.render(<Index />, document.getElementById('root'));
