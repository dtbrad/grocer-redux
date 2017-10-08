import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import BasketTable from './basket_table'
import Paginate from './paginate'
import DateForm from './date_form'
import SpendingHistory from './spending_history'

const URL = process.env.REACT_APP_URL;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newest_date: null,
      oldest_date: null,
      pageOfBaskets: [],
      totalBasketsCount: 0,
      perPage: 10,
      currentPage: 1,
      totalPages: 0,
      loaded: false,
      chartData: null,
      unit: null,
      sortCategory: "sort_date",
      desc: true
    };
    this.loadBaskets = this.loadBaskets.bind(this)
    this.changeDate = this.changeDate.bind(this)
    this.resort = this.resort.bind(this)
    this.updatePagination = this.updatePagination.bind(this)
  };

  componentDidMount() {
    this.loadBaskets({per_page: this.state.perPage, page: this.state.currentPage, category: this.state.sortCategory, desc: this.state.desc});
	}

  resort(cat) {
    const val = !this.state.desc
    this.loadBaskets({per_page: this.state.perPage, page: 1, category: cat, desc: val})
  }

  updatePagination(args) {
    this.loadBaskets({per_page: this.state.perPage, page: args.page, category: this.state.sortCategory, desc: this.state.desc, chartData: this.state.chartData, unit: this.state.unit, newest_date: this.state.newest_date, oldest_date: this.state.oldest_date, })
  };

  loadBaskets(args) {
    args = args || {}
    args.direction = args.desc === true ? "desc" : "asc"
    axios.get(`${URL}/baskets?per_page=${args.per_page || null}&page=${args.page || null}`, {
      params: {
        newest_date: args.newest_date || null,
        oldest_date: args.oldest_date || null,
        category: args.category || null,
        direction: args.direction || null,
        unit: args.unit || null
      }
    }).then(response => {
			this.setState({
        pageOfBaskets: response.data.baskets_array.b,
        totalBasketsCount: response.headers["total"],
        newest_date: response.data.newest_date,
        oldest_date: response.data.oldest_date,
        perPage: args.per_page,
        currentPage: args.page,
        totalPages: Math.ceil(response.headers["total"] / response.headers["per-page"]),
        loaded: true,
        chartData: response.data.chart_array.data,
        unit: response.data.chart_array.unit,
        desc: response.data.dir === "desc" ? true : false

      });
		});
  }

  changeDate(args) {
      if (this.state.newest_date === args.newest_date._i && this.state.oldest_date === args.oldest_date._i) {
        args.page = this.state.currentPage
      }
      else {
        args.page = 1};
      this.loadBaskets( {per_page: 10, page: args.page, newest_date: args.newest_date, oldest_date: args.oldest_date, unit: args.unit, desc: this.state.desc})
  };

  render() {

    if (this.state.loaded === false) {
        return <h3 className="text-center"> Loading... </h3>
    };
    return (
      <div className="container">
        <div className="col-md-12 col-md-offset-0">
          <SpendingHistory chartData={ this.state.chartData } unit= { this.state.unit }/>
          <DateForm changeDate ={ this.changeDate } oldest_date={ this.state.oldest_date } newest_date={ this.state.newest_date } unit = { this.state.unit }/>
          <div className="panel panel-default">
            <BasketTable baskets={ this.state.pageOfBaskets } resort = { this.resort }/>
          </div>
          <div className="text-center">
            <Paginate currentPage={ this.state.currentPage } totalPages={this.state.totalPages} updatePagination = { this.updatePagination } desc = { this.state.desc } newest_date = {this.state.newest_date} oldest_date = { this.state.oldest_date }/>
          </div>
        </div>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
