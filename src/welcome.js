import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import BasketsIndex from './baskets_index/baskets_index'


const Welcome = () => {

  let router;

  return (
    <div>
    <HashRouter ref={r => router = r}>
    <Route path="/baskets" component={BasketsIndex}/>
    </HashRouter>
    <div>
      <div className="jumbotron" style={{backgroundColor: '#646170', color: '#f2f4f7'}}>
        <p>
          Grocer-React-Client is a React translation of <a target="blank" href="https://www.my-grocer.com">Grocer</a>, a full stack rails app. Grocer-React-Client currently has basket index and show views, along with JWT authentication. More to come soon.
        </p>
      </div>

      <div className="row">

        <div className="col-lg-4 list-group" style={{paddingLeft: '15px'}}>
          <Link className="btn btn-warning btn-lg btn-block" to={ '/login' }>Sign Up (currently goes to login)</Link>
        </div>
        <div className="col-lg-4 list-group" style={{paddingLeft: '15px'}}>
          <Link className="btn btn-primary btn-lg btn-block" to={ '/login' }>Log in</Link>
        </div>
        <div className="col-lg-4 list-group" style={{paddingLeft: '15px'}}>
          <Link className="btn btn-success btn-lg btn-block" to={ '/baskets' }>See a demo!</Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Welcome;
