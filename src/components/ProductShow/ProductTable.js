import React from 'react';
import ProductTableRow from './ProductTableRow';

const ProductTable = (props) => {
  const { tableData, desc, loadSpendingTable, resourceName, productId, userId } = props;
  const productTableContent = tableData.map(line_item => (
    <ProductTableRow key={line_item.id} line_item={line_item} />
  ));

  return (
    <table className="table table-hover">
      <thead>
        <tr style={{ color: '#07C' }}>
          <th
            role="button"
            onClick={() => loadSpendingTable({ productId, userId, resourceName, page: 1, desc: !desc, sortCategory: 'sort_date' })}
          > Date
          </th>
          <th
            role="button"
            onClick={() => loadSpendingTable({ productId, userId, resourceName, page: 1, desc: !desc, sortCategory: 'price_cents' })}
          > Price
          </th>
          <th
            role="button"
            onClick={() => loadSpendingTable({ productId, userId, resourceName, page: 1, desc: !desc, sortCategory: 'quantity' })}
          > Qty Purchased
          </th>
          <th
            role="button"
            onClick={() => loadSpendingTable({ productId, userId, resourceName, page: 1, desc: !desc, sortCategory: 'weight' })}
          > Weight
          </th>
          <th
            role="button"
            onClick={() => loadSpendingTable({ productId, userId, resourceName, page: 1, desc: !desc, sortCategory: 'total_cents' })}
          > Total
          </th>
        </tr>
      </thead>
      <tbody>
        {productTableContent}
      </tbody>
    </table>
  );
};

export default ProductTable;
