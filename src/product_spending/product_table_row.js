import React from 'react';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductTableRow = ({ line_item }) => (
  <tr>
    <td>
      <Link
        to={`/baskets/${line_item.basket_id}`}
      >
        <Moment add={{ hours: 7 }} format="ddd MM-D-YYYY h:mm a">
          { line_item.transaction_date }
        </Moment>
      </Link>
    </td>
    <td> <NumberFormat value={line_item.price_cents / 100} displayType="text" decimalPrecision={2} thousandSeparator prefix="$" /></td>
    <td> {line_item.quantity}</td>
    <td> <NumberFormat value={line_item.weight} displayType="text" decimalPrecision={2} thousandSeparator /></td>
    <td><NumberFormat value={line_item.total_cents / 100} displayType="text" decimalPrecision={2} thousandSeparator prefix="$" /></td>
  </tr>
);

ProductTableRow.propTypes = {
  line_item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    transaction_date: PropTypes.string,
    line_item_count: PropTypes.number,
    total_cents: PropTypes.number,
  }).isRequired,
};

export default ProductTableRow;
