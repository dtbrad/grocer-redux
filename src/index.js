import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import BasketsTable from './baskets_table';
import Paginate from './paginate';
import DateForm from './date_form';
import SpendingHistory from './spending_history';

const URL = process.env.REACT_APP_URL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: null,
      currentPage: 1,
      desc: true,
      loaded: false,
      newest_date: moment('2017-09-25'),
      oldest_date: moment('2015-11-22'),
      pageOfBaskets: [],
      perPage: 10,
      sortCategory: 'sort_date',
      totalPages: 0,
      unit: null
    };
    this.loadTable = this.loadTable.bind(this);
    this.loadChart = this.loadChart.bind(this);
    this.loadChartAndTable = this.loadChartAndTable.bind(this);
  }

  componentDidMount() {
    this.loadChartAndTable({desc: true});
  };

  loadChartAndTable(args) {
    args.desc = true;
    args.page = 1;
    this.loadTable(args, this.loadChart(args))
  }

  loadChart(args) {
    axios.get(`${URL}/spending_history`, {
      params: {
        newest_date: args.newest_date == null ? this.state.newest_date : args.newest_date,
        oldest_date: args.oldest_date == null ? this.state.oldest_date : args.oldest_date,
        unit: args.unit || null
      }
    }).then(response => {
      const dateArray = response.data.data
      this.setState({ chartData: dateArray,
                      unit: response.data.unit,
                    })
    });
  };

  loadTable(args) {
    const direction = args.desc === true ? 'desc' : 'asc';
    const params = {
      category: args.category || null,
      direction: direction || null,
      newest_date: args.newest_date == null ? this.state.newest_date : args.newest_date,
      oldest_date: args.oldest_date == null ? this.state.oldest_date : args.oldest_date,
      page: args.page || null,
      per_page: args.per_page || this.state.perPage
    };
    axios
      .get(
        `${URL}/baskets`, { params })
      .then((response) => {
        this.setState(function(prevState){
          return {
            currentPage: args.page || prevState.currentPage,
            desc: args.desc,
            loaded: true,
            newest_date: args.newest_date || prevState.newest_date,
            oldest_date: args.oldest_date || prevState.oldest_date,
            pageOfBaskets: response.data,
            perPage: args.per_page || prevState.perPage,
            sortCategory: args.category,
            totalPages: Math.ceil(response.headers['total'] / response.headers['per-page']) || prevState.totalPages
          }
        });
      });
  }

  render() {
    if (this.state.loaded === false) {
      return <h3 className="text-center"> Loading... </h3>;
    }
    return (
      <div className="container">
        <div className="col-md-10 col-md-offset-1">
          <SpendingHistory
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
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
