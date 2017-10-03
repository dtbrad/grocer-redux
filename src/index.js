import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import BasketTable from './basket_table'
import Paginate from './paginate'

const URL = process.env.REACT_APP_URL;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageOfBaskets: [],
      totalBasketsCount: 0,
      perPage: 0,
      currentPage: 0,
      totalPages: 0
    };
    this.loadBaskets = this.loadBaskets.bind(this)
    this.loadBaskets(10, 1);
  };

  loadBaskets(per_page, page) {
    axios.get(`${URL}/baskets?per_page=${per_page}&page=${page}`).then(response => {
			this.setState({
        pageOfBaskets: response.data,
        totalBasketsCount: response.headers["total"],
        perPage: per_page,
        currentPage: page,
        totalPages: Math.ceil(response.headers["total"] / response.headers["per-page"]),
      });
		});
  }

  render() {
    return (
      <div className="container">
        <h3 className="text-center">Baskets Table</h3>
        <div className="panel panel-default">
        <br/>
          <div className="text-center">
            <Paginate currentPage={ this.state.currentPage } totalPages={this.state.totalPages} loadBaskets = { this.loadBaskets }/>
          </div>
          <br/>
          <BasketTable baskets={ this.state.pageOfBaskets }/>
        </div>
      </div>
    );
  }

};

ReactDOM.render(<App />, document.getElementById('root'));
