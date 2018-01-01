import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Main from './Main';
import Footer from './Footer';
import TokenHelper from '../api/TokenHelper';
import BasketService from '../api/BasketService';
import ProductService from '../api/ProductService';

class Application extends Component {
  state = {
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
    this.setState({ authenticated: false });
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
          newestDate: response.headers.newest_date || this.state[resourceName].newestDate,
          oldestDate: response.headers.oldest_date || this.state[resourceName].oldestDate,
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

  updateResource = (resource, args) => {
    const newState = { [resource]: args };
    newState[resource].resourceName = resource;
    this.setState(newState);
  }

  render() {
    return (
      <div className="container">
        <Main
          topState={this.state}
          loadSpendingTable={this.loadSpendingTable}
          loadBasket={this.loadBasket}
          logIn={this.logIn}
          logOut={this.logOut}
        />
        <Footer />
      </div>
    );
  }
}

export default Application;
