import React from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';

const ProductsIndexTable = (props) => {
  const pageOfResources = props.pageOfResources.map(product => (
    <tr key={product.id}>
      <td>
        <Link
          to={`/products/${product.id}`}
        >
          {product.name}
        </Link>
      </td>
      <td>{product.total_purchased}</td>
      <td><NumberFormat value={product.highest_price / 100} displayType="text" decimalPrecision={2} thousandSeparator prefix="$" /></td>
      <td><NumberFormat value={product.lowest_price / 100} displayType="text" decimalPrecision={2} thousandSeparator prefix="$" /></td>
      <td>
        <Moment add={{ hours: 7 }} format="ddd MM-D-YYYY h:mm a">
          { product.most_recently_puchased }
        </Moment>
      </td>
    </tr>
  ));

  return (
    <table className="table table-hover">
      <thead>
        <tr style={{ color: '#07C' }}>
          <th role="button" onClick={() => props.loadProducts({ page: 1, desc: !props.desc, category: 'sort_name' })}>Name</th>
          <th role="button" onClick={() => props.loadProducts({ page: 1, desc: !props.desc, category: 'sort_times_bought' })}>Total Purchased</th>
          <th role="button" onClick={() => props.loadProducts({ page: 1, desc: !props.desc, category: 'sort_highest_price' })}>Highest Price</th>
          <th role="button" onClick={() => props.loadProducts({ page: 1, desc: !props.desc, category: 'sort_lowest_price' })}>Lowest Price</th>
          <th role="button" onClick={() => props.loadProducts({ page: 1, desc: !props.desc, category: 'sort_most_recently_purchased' })}>Most Recently Purchased</th>
        </tr>
      </thead>
      <tbody>
        {pageOfResources}
      </tbody>
    </table>
  );
};

export default ProductsIndexTable;
