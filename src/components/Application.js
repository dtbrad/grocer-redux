import React, { Component } from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Main from './Main';
import Footer from './Footer';
import TokenHelper from '../api/TokenHelper';
import BasketService from '../api/BasketService';
import ProductService from '../api/ProductService';

const initialState = {
  authenticated: false,
  baskets: {
    resourceName: 'baskets',
    currentPage: 1,
    desc: true,
    loaded: false,
    tableData: [],
    perPage: 10,
    sortCategory: 'sort_date',
  },
  products: {
    resourceName: 'products',
    currentPage: 1,
    desc: false,
    loaded: false,
    tableData: [],
    perPage: 10,
    totalPages: 0,
    sortCategory: 'sort_name',
  },
  product: {
    productId: 0,
    resourceName: 'product',
    currentPage: 1,
    desc: true,
    loaded: false,
    tableData: [],
    perPage: 10,
    sortCategory: 'sort_date',
  },
};

class Application extends Component {
  state = initialState;

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
    this.setState(initialState);
  }

  loadSpendingTable = async ({ desc, page, newestDate, oldestDate, productId, resourceName, sortCategory, userId }) => {
    if (this.isAuthenticated()) {
      const fileService = resourceName === 'baskets' ? BasketService : ProductService;
      const response = await fileService.getSpendingTable({
        userId, sortCategory, newestDate, oldestDate, page, per_page: 10, desc, productId,
      });
      if (response.status !== 200) {
        alert(`error: ${response.data.errors[0]} - try logging out and back in`);
      } else {
        TokenHelper.set('jwt', response.headers.jwt);
        const newState = {
          currentPage: page || this.state[resourceName].currentPage,
          desc,
          loaded: true,
          newestDate: moment(response.headers.newestdate || this.state[resourceName].newestDate),
          oldestDate: moment(response.headers.oldestdate || this.state[resourceName].oldestDate),
          tableData: response.data,
          sortCategory: sortCategory || this.state[resourceName].sortCategory,
          totalPages: Math.ceil(response.headers.total / response.headers['per-page']) || this.state[resourceName].totalPages,
        };
        this.updateResource(resourceName, newState);
      }
    } else {
      alert('Your token has expired and you will need to log in again' );
    }
  }

  loadBasket = async ({ basketId }) => {
    if (this.isAuthenticated()) {
      const response = await BasketService.getBasket({ basketId });
      if (response.status !== 200) {
        alert("error");
      } else {
        TokenHelper.set('jwt', response.headers.jwt);
        const newState = response.data;
        this.updateResource('basket', newState);
      }
    } else {
      alert('Your token has expired and you will need to log in again' );
    }
  }

  loadProducts = async ({ desc, page, userId, sortCategory }) => {
    if (this.isAuthenticated()) {
      const response = await ProductService.getProducts({ desc, page, userId, sortCategory, per_page: 10 });
      const newState = {
        currentPage: page || this.state.products.currentPage,
        desc,
        loaded: true,
        tableData: response.data,
        sortCategory: sortCategory || this.state.products.sortCategory,
        totalPages: Math.ceil(response.headers.total / response.headers['per-page']) || this.state.product.totalPages,
      };
      this.updateResource('products', newState);
    }
  }

  updateResource = (resource, args) => {
    const newState = { [resource]: args };
    newState[resource].resourceName = resource;
    this.setState(newState);
  }

  render() {
    return (
      <div className="container">
        <Main
          loadSpendingTable={this.loadSpendingTable}
          loadBasket={this.loadBasket}
          loadProducts={this.loadProducts}
          logIn={this.logIn}
          logOut={this.logOut}
          topState={this.state}
        />
        <Footer />
      </div>
    );
  }
}

export default Application;
