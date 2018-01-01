import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Main from './Main';
import Footer from './Footer';
import TokenHelper from '../api/TokenHelper';
import BasketService from '../api/BasketService';

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

  loadSpendingTable = async ({ desc, page, newestDate, oldestDate, sortCategory }) => {
    if (this.isAuthenticated()) {
      const response = await BasketService.getBaskets({
        sortCategory, newestDate, oldestDate, page, per_page: 10, desc
      });
      if (response.status !== 200) {
        this.setState({ error: `${response.data.errors[0]} - try logging out and back in` });
      } else {
        TokenHelper.set('jwt', response.headers.jwt);
        const newState = {
          currentPage: page || this.state.baskets.currentPage,
          desc,
          loaded: true,
          newestDate: response.headers.newest_date || this.state.baskets.newestDate,
          oldestDate: response.headers.oldest_date || this.state.baskets.oldestDate,
          tableData: response.data,
          sortCategory: sortCategory || this.state.baskets.sortCategory,
          totalPages: Math.ceil(response.headers.total / response.headers['per-page']) || this.state.baskets.totalPages,
        };
        this.updateResource('baskets', newState);
      }
    } else {
      alert('Your token has expired - try logging out and back in' );
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
          logIn={this.logIn}
          logOut={this.logOut}
        />
        <Footer />
      </div>
    );
  }
}

export default Application;
