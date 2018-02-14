import React from 'react';
import { Alert, Col, Grid, Row } from 'react-bootstrap';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ProductsIndex from './ProductsIndex/Products';
import Baskets from './BasketsIndex/Baskets';
import Product from './ProductShow/Product';
import Basket from './BasketShow/Basket';
import LogIn from './LogIn';
import Welcome from './Welcome';
import Navigation from './Navigation';
import ItemsContainer from '../containers/ItemsContainer';

const MainPage = ({ loadBasket, loadProductsTable, loadProductsTableAndChart, loadSpendingTable, loadChart, loadSpendingTableAndChart, logIn, logOut, topState }) => {
  const { authenticated, basket, baskets, product, products } = topState;
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
                path="/products/:id"
                render={({ match }) => (
                  authenticated === false ? (
                    <Redirect to="/login" />
                  ) : (
                    <Product
                      loadSpendingTable={loadSpendingTable}
                      loadChart={loadChart}
                      loadSpendingTableAndChart={loadSpendingTableAndChart}
                      match={match}
                      {...product}
                    />
                  )
                )}
              />
              <Route
                path="/products"
                render={() => (
                  topState.authenticated === true ? (
                    <ProductsIndex
                      loadSpendingTableAndChart={loadSpendingTableAndChart}
                      loadProductsTableAndChart={loadProductsTableAndChart}
                      loadProductsTable={loadProductsTable}
                      {...products}
                    />
                  ) : (
                    <Redirect to="/login" />
                  )
                )}
              />
              <Route path="/items" component={ItemsContainer} />
              <Route
                path="/shopping_trips/:id"
                render={({ match }) => (
                  authenticated === false ? (
                    <Redirect to="/login" />
                  ) : (
                    <Basket
                      {...basket}
                      match={match}
                      loadBasket={loadBasket}
                      loadSpendingTableAndChart={loadSpendingTableAndChart}
                    />
                  )
                )}
              />
              <Route
                path="/shopping_trips"
                render={() => (
                  topState.authenticated === true ? (
                    <Baskets
                      loadSpendingTable={loadSpendingTable}
                      loadChart={loadChart}
                      loadSpendingTableAndChart={loadSpendingTableAndChart}
                      {...baskets}
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
