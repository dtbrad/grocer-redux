import React, { Component } from 'react';
import axios from 'axios';
import BasketsShow from './baskets_show'
const URL = process.env.REACT_APP_URL;

class BasketsShowContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { basket: null};
    this.loadBasket = this.loadBasket.bind(this);
  };

  componentDidMount() {
    this.loadBasket();
  };

  loadBasket() {
    axios.get(`${URL}/baskets/${this.props.match.params.id}`).then(response => {
      this.setState({basket: response.data});
    })
  };
  
  render(){
    if(this.state.basket == null) {
      return <h4>Loading...</h4>
    };

    return ( <BasketsShow basket = { this.state.basket }/> )
  };
};

export default BasketsShowContainer
