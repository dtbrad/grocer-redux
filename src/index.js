import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import BasketTable from './basket_table';
import Paginate from './paginate';
import DateForm from './date_form';
import SpendingHistory from './spending_history';

const URL = process.env.REACT_APP_URL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newest_date: null,
      oldest_date: null,
      pageOfBaskets: [],
      perPage: 10,
      currentPage: 1,
      totalPages: 0,
      loaded: false,
      chartData: null,
      unit: null,
      sortCategory: 'sort_date',
      desc: true
    };
    this.loadBaskets = this.loadBaskets.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.resort = this.resort.bind(this);
    this.updatePagination = this.updatePagination.bind(this);
  }

  componentDidMount() {
    this.loadBaskets({
      newest_date: moment('2017-09-25'),
      oldest_date: moment('2015-11-22')
    });
  }

  resort(cat) {
    this.loadBaskets({
      page: 1,
      category: cat,
      desc: !this.state.desc,
      just_a_resort: true
    });
  }

  changeDate(args) {
    const just_a_unit_change = (args.newest_date === null && args.oldest_date === null)
    this.loadBaskets({
      newest_date: args.newest_date,
      oldest_date: args.oldest_date,
      unit: args.unit,
      just_a_unit_change: just_a_unit_change
    });
  }

  updatePagination(args) {
    this.loadBaskets({
      per_page: this.state.perPage,
      page: args.page,
      just_a_page_turn: true
    });
  }

  loadBaskets(args) {
    const per_page = args.per_page || this.state.perPage
    args.desc = ('desc' in args) ? args.desc : this.state.desc
    const direction = args.desc === true ? 'desc' : 'asc';
    const newest_date = (args.newest_date == null) ? this.state.newest_date : args.newest_date
    const oldest_date = (args.oldest_date == null) ? this.state.oldest_date : args.oldest_date
    const just_a_unit_change = (args.just_a_unit_change === true) ? args.just_a_unit_change : null

    const params = {
      newest_date: newest_date,
      oldest_date: oldest_date,
      category: args.category || null,
      direction: direction || null,
      unit: args.unit || null,
      just_a_unit_change: just_a_unit_change,
      just_a_resort: args.just_a_resort,
      just_a_page_turn: args.just_a_page_turn
    };

    axios
      .get(
        `${URL}/baskets?per_page=${per_page}&page=${args.page || null}`, { params })
      .then((response) => {
        this.setState(function(prevState){
          return {
          pageOfBaskets: response.data.baskets_array.b || prevState.pageOfBaskets,
          newest_date: (response.data.newest_date == null) ? prevState.newest_date : moment(response.data.newest_date),
          oldest_date: (response.data.oldest_date == null) ? prevState.oldest_date : moment(response.data.oldest_date),
          perPage: args.per_page || prevState.perPage,
          currentPage: args.page || prevState.currentPage,
          totalPages: Math.ceil(response.headers['total'] / response.headers['per-page']) || prevState.totalPages,
          loaded: true,
          chartData: (response.data.chart_array ? response.data.chart_array.data : prevState.chartData),
          unit: (response.data.chart_array ? response.data.chart_array.unit : prevState.unit),
          desc: response.data.dir === 'desc'
        }});
      });
  }

  render() {
    if (this.state.loaded === false) {
      return <h3 className="text-center"> Loading... </h3>;
    }
    return (
      <div className="container">
        <div className="col-md-12 col-md-offset-0">
          <SpendingHistory
            chartData={this.state.chartData}
            unit={this.state.unit}
          />
          <DateForm
            changeDate={this.changeDate}
            oldest_date={this.state.oldest_date}
            newest_date={this.state.newest_date}
            unit={this.state.unit}
          />
          <div className="panel panel-default">
            <BasketTable
              baskets={this.state.pageOfBaskets}
              resort={this.resort}
            />
          </div>
          <div className="text-center">
            <Paginate
              currentPage={this.state.currentPage}
              totalPages={this.state.totalPages}
              updatePagination={this.updatePagination}
              desc={this.state.desc}
              newest_date={this.state.newest_date}
              oldest_date={this.state.oldest_date}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
