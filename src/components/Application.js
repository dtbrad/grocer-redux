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
  baskets: {},
  products: {},
  product: {},
};

class Application extends Component {
  state = initialState;

  componentDidMount = async () => {
    await this.setAuthStatus();
    if (this.state.authenticated) { this.loadBasketsAndProducts(); }
  }

  setAuthStatus = () => {
    this.setState({ authenticated: TokenHelper.tokenCurrent('jwt') });
  }

  loadBasketsAndProducts = () => {
    this.loadSpendingTable({ resourceName: 'baskets', desc: true, sortCategory: this.state.baskets.sortCategory });
    this.loadProducts({ desc: false, sortCategory: 'sort_name' });
  }

  logIn = async (token) => {
    TokenHelper.set('jwt', token);
    await this.setState({ authenticated: true });
    await this.loadBasketsAndProducts();
  }

  logOut = () => {
    TokenHelper.remove('jwt');
    this.setState(initialState);
  }

  loadSpendingTable = async ({ desc, currentPage, newestDate, oldestDate, productId, resourceName, sortCategory, userId }) => {
    const fileService = resourceName === 'baskets' ? BasketService : ProductService;
    const response = await fileService.getSpendingTable({
      userId, sortCategory, newestDate, oldestDate, currentPage, per_page: 10, desc, productId,
    });
    if (response.status !== 200) {
      alert(`error: ${response.data.errors[0]} - try logging out and back in`);
    } else {
      TokenHelper.set('jwt', response.headers.jwt);
      const newState = {
        currentPage: currentPage || this.state[resourceName].currentPage,
        desc,
        loaded: true,
        newestDate: response.headers.newestdate || newestDate,
        oldestDate: response.headers.oldestdate || oldestDate,
        tableData: response.data,
        sortCategory: sortCategory || this.state[resourceName].sortCategory,
        totalPages: Math.ceil(response.headers.total / response.headers['per-page']) || this.state[resourceName].totalPages,
      };
      this.updateResource(resourceName, newState);
    }
  }

  loadBasket = async ({ basketId }) => {
    const response = await BasketService.getBasket({ basketId });
    if (response.status !== 200) {
      alert("error");
    } else {
      TokenHelper.set('jwt', response.headers.jwt);
      const newState = response.data;
      this.updateResource('basket', newState);
    }
  }

  loadProducts = async ({ desc, page, userId, sortCategory }) => {
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
