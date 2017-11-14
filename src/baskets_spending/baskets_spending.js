import React, { Component } from 'react';
import moment from 'moment';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import PropTypes from 'prop-types';
import TokenHelper from '../auth/token_helper';
import SpendingHistoryView from '../shared_components/spending_history_view';
import BasketsTable from './baskets_table';
import BasketsSpendingChart from './baskets_spending_chart';
import BasketService from '../api/basket_service';

class BasketsSpending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: null,
      currentPage: 1,
      desc: true,
      loaded: false,
      newest_date: moment('2017-09-25'),
      oldest_date: moment('2015-11-23'),
      pageOfResources: [],
      perPage: 10,
      totalPages: 0,
      unit: null,
    };
    this.loadTable = this.loadTable.bind(this);
    this.loadChart = this.loadChart.bind(this);
    this.loadChartAndTable = this.loadChartAndTable.bind(this);
  }

  componentDidMount() {
    this.loadChartAndTable({ desc: true, user_id: TokenHelper.userId('jwt') });
  }

  loadChartAndTable(args) {
    const newArgs = { ...args, ...{ desc: true, page: 1 } };
    this.loadTable(newArgs, this.loadChart(newArgs));
  }

  async loadChart(args) {
    if (this.props.isAuthenticated()) {
      const params = {
        user_id: args.user_id || null,
        newest_date: args.newest_date == null ? this.state.newest_date : args.newest_date,
        oldest_date: args.oldest_date == null ? this.state.oldest_date : args.oldest_date,
        unit: args.unit || null,
        productId: this.state.productId || null,
      };
      const response = await BasketService.getChart(params);
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

  async loadTable(args) {
    if (this.props.isAuthenticated()) {
      const direction = args.desc === true ? 'desc' : 'asc';
      const category = args.category !== undefined ? args.category : null;
      const params = {
        user_id: args.user_id || null,
        category,
        direction: direction || null,
        newest_date: args.newest_date == null ? this.state.newest_date : args.newest_date,
        oldest_date: args.oldest_date == null ? this.state.oldest_date : args.oldest_date,
        page: args.page || null,
        per_page: args.per_page || this.state.perPage,
        productId: this.state.productId || null,
      };
      const response = await BasketService.getBaskets(params);
      if (response.status !== 200) {
        this.setState({ error: response.data.errors[0] });
      } else {
        TokenHelper.set('jwt', response.headers.jwt);
        this.setState(prevState => (
          {
            currentPage: args.page || prevState.currentPage,
            desc: args.desc,
            loaded: true,
            newest_date: args.newest_date || prevState.newest_date,
            oldest_date: args.oldest_date || prevState.oldest_date,
            pageOfResources: response.data,
            perPage: args.per_page || prevState.perPage,
            sortCategory: args.category,
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
      <SpendingHistoryView
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
