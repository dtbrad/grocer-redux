import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import BasketsShowView from './baskets_show_view';
import BasketService from '../api/basket_service';
import TokenHelper from '../auth/token_helper';

class BasketsShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { basket: null, error: null };
    this.loadBasket = this.loadBasket.bind(this);
  }

  componentDidMount() {
    this.loadBasket();
  }

  async loadBasket() {
    if (this.props.isAuthenticated()) {
      const { id } = this.props.match.params;
      const response = await BasketService.getBasket({ id });
      if (response.status === 400) {
        this.setState({ error: response.data.message[0] });
      } else {
        TokenHelper.set('jwt', response.headers.jwt);
        this.setState({ basket: response.data });
      }
    }
  }

  render() {
    const showTheUser = this.state.error === null ? (
      <BasketsShowView basket={this.state.basket} />
    ) : (
      <Alert bsStyle="danger" className="text-center"> {this.state.error } </Alert>
    );

    if (this.state.basket == null && this.state.error === null) {
      return <h4>Loading...</h4>;
    }

    return showTheUser;
  }
}

BasketsShowContainer.propTypes = {
  isAuthenticated: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

export default BasketsShowContainer;
