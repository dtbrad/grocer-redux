import React from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

const BasketTableRow = ({ info }) => (
  <tr>
    <td>
      <Link to={`/products/${info.product_id}`} > {info.product_name} </Link>
    </td>
    <td><NumberFormat value={info.price_cents / 100} displayType="text" decimalPrecision={2} prefix="$" /></td>
    <td>{info.quantity}</td>
    <td>{info.weight}</td>
    <td className="dan" ><NumberFormat value={info.total_cents / 100} displayType="text" decimalPrecision={2} prefix="$" /></td>
  </tr>
);

export default BasketTableRow;
