import React from 'react';
import { Alert, Col, Grid, Row } from 'react-bootstrap';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ProductIndex from './ProductIndex';
import ShoppingTripIndex from './ShoppingTripIndex';
import LogIn from './LogIn';
import Welcome from './Welcome';
import Navigation from './Navigation';

const MainPage = ({ topState, logIn, logOut }) => {
  const navigation = topState.authenticated ? (
    <Navigation authenticated={topState.authenticated} logOut={logOut} />
  ) : (
    null
  );
  return (
    <BrowserRouter>
      <Grid>
        <Row>
          <Col md={10} mdOffset={1}>
            <Alert bsStyle="info">
              <p> There are three demo accounts: user1@mail.com, user2@mail.com and
                  user3@mail.com. All have the same password: &quot;password&quot;
              </p>
            </Alert>
            <h3 className="text-center">GROCER-REACT<small> purchase tracking for New Seasons shoppers</small></h3>
            {navigation}
            <Switch>
              <Route
                path="/products"
                render={() => (
                  topState.authenticated === true ? (
                    <ProductIndex
                      data="This is the products index"
                    />
                  ) : (
                    <Redirect to="/login" />
                  )
                )}
              />
              <Route
                path="/shopping_trips"
                render={() => (
                  topState.authenticated === true ? (
                    <ShoppingTripIndex
                      data="This is the baskets index"
                    />
                  ) : (
                    <Redirect to="/login" />
                  )
                )}
              />
              <Route
                path="/login"
                render={props => (
                  topState.authenticated === false ? (
                    <LogIn logIn={logIn} logOut={logOut} authenticated={topState.authenticated} {...props} />
                  ) : (
                    <Redirect to="/shopping_trips" />
                  )
                )}
              />
              <Route
                path="/welcome"
                render={() => (
                  topState.authenticated === false ? (
                    <Welcome />
                  ) : (
                    <Redirect to="/shopping_trips" />
                  )
                )}
              />
              <Route
                exact
                path="/"
                render={() => <Redirect to="/welcome" />}
              />
            </Switch>
          </Col>
        </Row>
      </Grid>
    </BrowserRouter>
  );
};

export default MainPage;
