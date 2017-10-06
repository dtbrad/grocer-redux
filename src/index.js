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
      beginning: null,
      finish: null,
      pageOfBaskets: [],
      totalBasketsCount: 0,
      perPage: 0,
      currentPage: 0,
      totalPages: 0,
      loaded: false,
      chartData: null,
      unit: null
    };
    this.loadBaskets = this.loadBaskets.bind(this)
    this.changeDate = this.changeDate.bind(this)
  };

  componentDidMount() {
    this.loadBaskets({per_page: 10, page: 1});
    this.retrieveChartData()
	}

  loadBaskets(args) {
    args = args || {}
    args.per_page = args.per_page || null
    args.page = args.page || null
    args.beg = args.beg || null
    args.fin = args.fin || null
    axios.get(`${URL}/baskets?per_page=${args.per_page}&page=${args.page}`, {
      params: {
        beginning: args.beg,
        finish: args.fin
      }
    }).then(response => {
			this.setState({
        pageOfBaskets: response.data.baskets_array.b,
        totalBasketsCount: response.headers["total"],
        beginning: response.data.first_date,
        finish: response.data.last_date,
        perPage: args.per_page,
        currentPage: args.page,
        totalPages: Math.ceil(response.headers["total"] / response.headers["per-page"]),
        loaded: true
      });
		});
  }

  retrieveChartData(args) {
    args = args || {}
    args.beg = args.beg || null
    args.fin = args.fin || null
    args.unit = args.unit || null
    axios.get(`${URL}/spending_history`, {
      params: {
        beginning: args.beg,
        finish: args.fin,
        unit: args.unit
      }
    }).then(response => {
      const dateArray = response.data.data
      this.setState({ chartData: dateArray,
                      unit: response.data.unit,
                    })
    });
  };

  changeDate(beg, end, unit) {
    this.setState({beginning: beg._d, finish: end._d, unit: unit})
    this.loadBaskets({per_page: 10, page: 1, beg: beg._d, fin: end._d})
    this.retrieveChartData({beg: beg._d, fin: end._d, unit: unit} )
  };

  render() {

    if (this.state.loaded === false) {
        return <h3 className="text-center"> Loading... </h3>
    };
    return (
      <div className="container">
        <div className="col-md-12 col-md-offset-0">
          <SpendingHistory chartData={ this.state.chartData } unit= { this.state.unit }/>

          <DateForm changeDate ={ this.changeDate } start_date={ this.state.beginning } end_date={ this.state.finish } unit = { this.state.unit }/>

          <div className="panel panel-default">
            <BasketTable baskets={ this.state.pageOfBaskets }/>
          </div>

          <div className="text-center">
            <Paginate currentPage={ this.state.currentPage } totalPages={this.state.totalPages} beginning= {this.state.beginning} finish={this.state.finish} loadBaskets = { this.loadBaskets }/>
          </div>

        </div>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
