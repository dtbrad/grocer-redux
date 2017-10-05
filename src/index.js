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
      chartData: null
    };
    this.loadBaskets = this.loadBaskets.bind(this)
    this.changeDate = this.changeDate.bind(this)
    this.loadBaskets(10, 1);
    this.loadChart()
  };

  loadBaskets(per_page, page, beg=null, fin=null) {
    axios.get(`${URL}/baskets?per_page=${per_page}&page=${page}`, {
      params: {
        beginning: beg,
        finish: fin
      }
    }).then(response => {
			this.setState({
        pageOfBaskets: response.data,
        totalBasketsCount: response.headers["total"],
        perPage: per_page,
        currentPage: page,
        totalPages: Math.ceil(response.headers["total"] / response.headers["per-page"]),
        loaded: true
      });
		});
  }

  loadChart(beg=null, fin=null) {
    axios.get(`${URL}/spending_history`, {
      params: {
        beginning: beg,
        finish: fin
      }
    }).then(response => {
      this.setState({chartData: response.data})
    });
  };


  changeDate(beg, end) {
    this.setState({beginning: beg._d, finish: end._d})
    this.loadBaskets(this.state.perPage, 1, beg._d, end._d)
    this.loadChart(beg._d, end._d)
  };

  render() {

    if (this.state.loaded === false) {
        return <h3 className="text-center"> Loading... </h3>
    };
    return (
      <div className="container">

          <div className="col-md-12 col-md-offset-0">
            <SpendingHistory chartData={ this.state.chartData }/>

            <DateForm changeDate = { this.changeDate }/>

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
