import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TokenHelper from '../auth/token_helper';
import BasketsTable from './baskets_table';
import BasketsSpendingChart from './baskets_spending_chart';
import BasketsSpendingView from './baskets_spending_view';
import BasketService from '../api/basket_service';

class BasketsSpending extends Component {
  state = { loaded: false }

  componentDidMount = () => {
    this.loadChartAndTable({ user_id: TokenHelper.userId('jwt') });
  }

  loadChartAndTable = (args) => {
    const newArgs = { ...args, ...{ desc: true, page: 1 } };
    this.loadTable(newArgs, this.loadChart(newArgs));
  }

  loadChart = async (args) => {
    if (this.props.isAuthenticated()) {
      const response = await BasketService.getChart(args);
      if (response.status === 400) {
        this.setState({ error: response.data.message[0] });
      } else {
        TokenHelper.set('jwt', response.headers.jwt);
        const dateArray = response.data.data;
        this.setState({
          chartData: dateArray,
          unit: response.data.unit,
        });
      }
    }
  }

  loadTable = async ( { desc, page, user_id, category, newest_date = this.state.newest_date, oldest_date=this.state.oldest_date, per_page = 10 } ) => {
    if (this.props.isAuthenticated()) {
      const response = await BasketService.getBaskets({ user_id, category, newest_date, oldest_date, page, per_page, desc });
      if (response.status !== 200) {
        this.setState({ error: response.data.errors[0] });
      } else {
        TokenHelper.set('jwt', response.headers.jwt);
        this.setState(prevState => (
          {
            currentPage: page || prevState.currentPage,
            desc,
            loaded: true,
            newest_date: response.headers.newest_date || this.state.newest_date,
            oldest_date: response.headers.oldest_date || this.state.oldest_date,
            pageOfResources: response.data,
            sortCategory: category,
            totalPages: Math.ceil(response.headers.total / response.headers['per-page']) || prevState.totalPages,
          }));
      }
    }
  }

  render() {
    if (this.state.error) {
      return <Alert bsStyle="danger" className="text-center"> { this.state.error } </Alert>;
    }
    if (this.state.loaded === false) {
      return <h3 className="text-center"> Loading... </h3>;
    }

    return (
      <BasketsSpendingView
        {...this.state}
        loadChartAndTable={this.loadChartAndTable}
        loadChart={this.loadChart}
        loadTable={this.loadTable}
        headerArray={['date', 'items', 'total']}
        tableComponent={BasketsTable}
        chart={BasketsSpendingChart}
      />
    );
  }
}

BasketsSpending.propTypes = {
  isAuthenticated: PropTypes.func.isRequired,
};

export default BasketsSpending;
