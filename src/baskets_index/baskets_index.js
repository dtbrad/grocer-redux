import React, { Component } from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import BasketsTable from './baskets_table';
import Paginate from './paginate';
import DateForm from './date_form';
import SpendingChart from './spending_chart';
import BasketService from '../api/basket_service';

class BasketsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: null,
      currentPage: 1,
      desc: true,
      loaded: false,
      newest_date: moment('2017-09-25'),
      oldest_date: moment('2015-11-23'),
      pageOfBaskets: [],
      perPage: 10,
      sortCategory: 'sort_date',
      totalPages: 0,
      unit: null,
    };
    this.loadTable = this.loadTable.bind(this);
    this.loadChart = this.loadChart.bind(this);
    this.loadChartAndTable = this.loadChartAndTable.bind(this);
    this.basketService = new BasketService();
  }

  componentDidMount() {
    this.loadChartAndTable({ desc: true, user_id: this.props.user_id });
  }

  loadChartAndTable(args) {
    args.desc = true;
    args.page = 1;
    this.loadTable(args, this.loadChart(args));
  }

  async loadChart(args) {
    const params = {
      user_id: args.user_id || null,
      newest_date: args.newest_date == null ? this.state.newest_date : args.newest_date,
      oldest_date: args.oldest_date == null ? this.state.oldest_date : args.oldest_date,
      unit: args.unit || null,
    };
    const chartResponse = await this.basketService.getChart(params);
    const dateArray = chartResponse.data.data;
    this.setState({
      chartData: dateArray,
      unit: chartResponse.data.unit,
    });
  }

  async loadTable(args) {
    const direction = args.desc === true ? 'desc' : 'asc';
    const params = {
      user_id: args.user_id || null,
      category: args.category || null,
      direction: direction || null,
      newest_date: args.newest_date == null ? this.state.newest_date : args.newest_date,
      oldest_date: args.oldest_date == null ? this.state.oldest_date : args.oldest_date,
      page: args.page || null,
      per_page: args.per_page || this.state.perPage,
    };
    const baskets = await this.basketService.getBaskets(params);
    this.setState((prevState) => {
      return {
        currentPage: args.page || prevState.currentPage,
        desc: args.desc,
        loaded: true,
        newest_date: args.newest_date || prevState.newest_date,
        oldest_date: args.oldest_date || prevState.oldest_date,
        pageOfBaskets: baskets.data,
        perPage: args.per_page || prevState.perPage,
        sortCategory: args.category,
        totalPages: Math.ceil(baskets.headers.total / baskets.headers['per-page']) || prevState.totalPages,
      };
    });
  }

  render() {
    if (this.state.loaded === false) {
      return <h3 className="text-center"> Loading... </h3>;
    }

    const guestMessage = this.props.authenticated === false ? <div className="alert alert-danger text-center">Not Logged In - Viewing Sample Data</div> : null;

    return (
      <div>
        { guestMessage }
        <SpendingChart
          chartData={this.state.chartData}
          unit={this.state.unit}
          loadChartAndTable={this.loadChartAndTable}
        />
        <DateForm
          loadChart={this.loadChart}
          loadChartAndTable={this.loadChartAndTable}
          oldest_date={this.state.oldest_date}
          newest_date={this.state.newest_date}
          unit={this.state.unit}
        />
        <div className="panel panel-default">
          <BasketsTable
            desc={this.state.desc}
            baskets={this.state.pageOfBaskets}
            loadTable={this.loadTable}
          />
        </div>
        <div className="text-center">
          <Paginate
            currentPage={this.state.currentPage}
            totalPages={this.state.totalPages}
            loadTable={this.loadTable}
            desc={this.state.desc}
          />
        </div>
      </div>
    );
  }
}

export default BasketsIndex;
