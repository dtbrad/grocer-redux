import React, { Component } from 'react';
import axios from 'axios';
import BasketsShow from './baskets_show'
import { Alert } from 'react-bootstrap';
const URL = process.env.REACT_APP_URL;

class BasketsShowContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { basket: null, error: null };
    this.loadBasket = this.loadBasket.bind(this);
  };

  componentDidMount() {
    this.loadBasket();
  };

  loadBasket() {
    let self = this
    let token
    let headers

    if(localStorage.getItem("userInfo") !== null) {
       token = JSON.parse(localStorage.getItem('userInfo')).token
       headers = {
              'Content-Type': 'application/json',
              'Authorization': token
       }
    }
    axios({
      method: 'get',
      url: `${URL}/baskets/${this.props.match.params.id}`,
      headers: headers
    })
    .then(response => {
      this.setState({basket: response.data});
    })
    .catch(function(error){
      self.setState({error: error.response.data.message[0]});
    });;
  };

  render(){
    const showTheUser = this.state.error === null ? (
      <BasketsShow basket = { this.state.basket }/>
    ) : (
      <Alert bsStyle="danger" className="text-center"> {this.state.error } </Alert>
    )

    if(this.state.basket == null && this.state.error === null) {
      return <h4>Loading...</h4>
    };

    return ( showTheUser )
  };
};

export default BasketsShowContainer
