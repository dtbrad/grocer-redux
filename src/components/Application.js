import React, { Component } from 'react';
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
  } // else router will redirect to welcome page with link to login page

  setAuthStatus = () => {
    this.setState({ authenticated: TokenHelper.tokenCurrent('jwt') });
  }

  loadBasketsAndProducts = async () => {
    await this.loadSpendingTableAndChart({ resourceName: 'baskets', desc: true, sortCategory: 'sort_date' });
    this.loadProducts({ desc: false, sortCategory: 'sort_name', page: 1 });
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

  loadSpendingTable = async (args) => {
    const fileService = args.resourceName === 'baskets' ? BasketService : ProductService;
    const response = await fileService.getSpendingTable(args);
    if (response.status !== 200) {
      alert(`error: ${response.data.errors[0]} - try logging out and back in`);
      this.logOut();
    } else {
      TokenHelper.set('jwt', response.headers.jwt);
      const newState = {
        page: args.page,
        desc: args.desc,
        loaded: true,
        newestDate: response.headers.newestdate || args.newestDate,
        oldestDate: response.headers.oldestdate || args.oldestDate,
        tableData: response.data,
        sortCategory: args.sortCategory,
        totalPages: Math.ceil(response.headers.total / response.headers['per-page']),
        chartData: args.chartData,
        unit: args.unit,
      };
      this.updateResource(args.resourceName, newState);
    }
  }

  loadChart = async (args) => {
    const fileService = args.resourceName === 'baskets' ? BasketService : ProductService;
    const response = await fileService.getChart(args);
    if (response.status === 400) {
      alert("error!");
      this.logOut();
    } else {
      TokenHelper.set('jwt', response.headers.jwt);
      const newState = this.state[args.resourceName];
      newState.chartData = response.data.data;
      newState.unit = response.data.unit;
      this.updateResource(args.resourceName, newState);
    }
  }

  loadSpendingTableAndChart = async (args) => {
    await this.loadSpendingTable(args);
    this.loadChart(args);
  }

  loadBasket = async ({ basketId }) => {
    const response = await BasketService.getBasket({ basketId });
    if (response.status !== 200) {
      alert("error");
      this.logOut();
    } else {
      TokenHelper.set('jwt', response.headers.jwt);
      const newState = response.data;
      this.updateResource('basket', newState);
    }
  }

  loadProducts = async ({ desc, page, userId, sortCategory }) => {
    const response = await ProductService.getProducts({ desc, page, userId, sortCategory });
    if (response.status !== 200) {
      alert(`error: ${response.data.errors[0]} - try logging out and back in`);
      this.logOut();
    } else {
      const newState = {
        page,
        desc,
        loaded: true,
        tableData: response.data,
        sortCategory,
        totalPages: Math.ceil(response.headers.total / response.headers['per-page']),
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
          loadChart={this.loadChart}
          loadSpendingTableAndChart={this.loadSpendingTableAndChart}
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
