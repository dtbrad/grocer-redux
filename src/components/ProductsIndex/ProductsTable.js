import React from 'react';
import ProductsTableRow from './ProductsTableRow';

const ProductsTable = (props) => {
  const products = props.tableData.map(product => <ProductsTableRow key={product.id} {...product} loadSpendingTable={props.loadSpendingTable} />);
  return (
    <table className="table table-hover">
      <thead>
        <tr style={{ color: '#07C' }}>
          <th
            role="button"
            onClick={() => props.loadProducts({ page: 1, desc: !props.desc, sortCategory: 'sort_name' })}
          > Name
          </th>
          <th
            role="button"
            onClick={() => props.loadProducts({ page: 1, desc: !props.desc, sortCategory: 'sort_times_bought' })}
          > Total Purchased
          </th>
          <th
            role="button"
            onClick={() => props.loadProducts({ page: 1, desc: !props.desc, sortCategory: 'sort_highest_price' })}
          > Highest Price
          </th>
          <th
            role="button"
            onClick={() => props.loadProducts({ page: 1, desc: !props.desc, sortCategory: 'sort_lowest_price' })}
          > Lowest Price
          </th>
          <th
            role="button"
            onClick={() => props.loadProducts({ page: 1, desc: !props.desc, sortCategory: 'sort_most_recently_purchased' })}
          > Most Recently Purchased
          </th>
        </tr>
      </thead>
      <tbody>
        {products}
      </tbody>
    </table>
  );
};

export default ProductsTable;
