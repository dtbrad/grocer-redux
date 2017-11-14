import React from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

const LineItem = props => (
  <tr>
    <td>
      <Link to={`/products/${props.info.product_id}`}> {props.info.product_name}</Link>
    </td>
    <td><NumberFormat value={props.info.price_cents / 100} displayType="text" decimalPrecision={2} prefix="$" /></td>
    <td>{props.info.quantity}</td>
    <td>{props.info.weight}</td>
    <td><NumberFormat value={props.info.total_cents / 100} displayType="text" decimalPrecision={2} prefix="$" /></td>
  </tr>
);


export default LineItem;
