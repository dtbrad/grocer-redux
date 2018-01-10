import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';
import TokenHelper from '../../api/TokenHelper';

const ProductsTableRow = withRouter(({ id: productId, name, highest_price, history, loadSpendingTableAndChart, lowest_price, most_recently_puchased, total_purchased  }) => {
  const userId = TokenHelper.userId('jwt');
  const updateProductStateAndLink = async (e) => {
    e.preventDefault();
    await loadSpendingTableAndChart({ productId, userId, resourceName: 'product', desc: true });
    history.push(`/products/${productId}`);
  };
  return (
    <tr key={productId}>
      <td>
        <Link to={`/products/${productId}`} onClick={e => updateProductStateAndLink(e)}> {name} </Link>
      </td>
      <td>{total_purchased}</td>
      <td><NumberFormat value={highest_price / 100} displayType="text" decimalPrecision={2} thousandSeparator prefix="$" /></td>
      <td><NumberFormat value={lowest_price / 100} displayType="text" decimalPrecision={2} thousandSeparator prefix="$" /></td>
      <td>
        <Moment add={{ hours: 7 }} format="ddd MM-D-YYYY h:mm a">
          {most_recently_puchased}
        </Moment>
      </td>
    </tr>
  );
});

export default ProductsTableRow;
