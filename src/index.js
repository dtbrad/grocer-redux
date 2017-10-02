import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import BasketTable from './basket_table'

const URL = process.env.REACT_APP_URL;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { baskets: [] };
  };

  componentDidMount() {
		axios.get(`${URL}/baskets`).then(response => {
			this.setState({ baskets: response.data });
		});
	};


  render() {
    return (
      <div>
        <h3 className="text-center">Empty React Application</h3>
        <BasketTable baskets={this.state.baskets}/>
      </div>
    );
  }

};

ReactDOM.render(<App />, document.getElementById('root'));
