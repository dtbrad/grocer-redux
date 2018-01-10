import React from 'react';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

const ProductTableRow = ({ line_item }) => (
  <tr>
    <td>
      <Link
        to={`/shopping_trips/${line_item.basket_id}`}
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


export default ProductTableRow;
