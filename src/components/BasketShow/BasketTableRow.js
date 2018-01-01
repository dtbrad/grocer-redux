import React from 'react';
import NumberFormat from 'react-number-format';
import { Link, withRouter } from 'react-router-dom';
import TokenHelper from '../../api/TokenHelper';

const BasketTableRow = withRouter(({ loadSpendingTable, history, info }) => {
  const productId = info.product_id;
  const userId = TokenHelper.userId('jwt');
  const updateProductStateAndLink = async (e) => {
    e.preventDefault();
    await loadSpendingTable({ productId, userId, resourceName: 'product', desc: true });
    history.push(`/products/${productId}`);
  };
  return (
    <tr>
      <td>
        <Link to={`/products/${info.product_id}`} onClick={e => updateProductStateAndLink(e)} > {info.product_name} </Link>
      </td>
      <td><NumberFormat value={info.price_cents / 100} displayType="text" decimalPrecision={2} prefix="$" /></td>
      <td>{info.quantity}</td>
      <td>{info.weight}</td>
      <td className="dan" ><NumberFormat value={info.total_cents / 100} displayType="text" decimalPrecision={2} prefix="$" /></td>
    </tr>
  );
});

export default BasketTableRow;
