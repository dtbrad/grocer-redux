import React, { Component } from 'react';
import BasketView from './BasketView';

class Basket extends Component {
  componentDidMount = () => {
    const basketId = this.props.match ? this.props.match.params.id : null;
    if (basketId) this.props.loadBasket({ basketId });
  }

  render() {
    const content = this.props.total_cents ? <BasketView {...this.props} /> : <h5>loading</h5>;
    return content;
  }
}

export default Basket;
