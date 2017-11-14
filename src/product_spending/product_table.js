import React from 'react';
import PropTypes from 'prop-types';
import ProductTableRow from './product_table_row';

const ProductTable = ({ resources, desc, loadTable }) => {
  const productTableContent = resources.map(line_item => (
    <ProductTableRow key={line_item.id} line_item={line_item} />
  ));

  return (
    <table className="table table-hover">
      <thead>
        <tr style={{ color: '#07C' }}>
          <th role="button" onClick={() => loadTable({ page: 1, desc: !desc, category: 'sort_date' })}>Date</th>
          <th role="button" onClick={() => loadTable({ page: 1, desc: !desc, category: 'price_cents' })}>Price</th>
          <th role="button" onClick={() => loadTable({ page: 1, desc: !desc, category: 'quantity' })}>Qty Purchased</th>
          <th role="button" onClick={() => loadTable({ page: 1, desc: !desc, category: 'weight' })}>Weight</th>
          <th role="button" onClick={() => loadTable({ page: 1, desc: !desc, category: 'total_cents' })}>Total</th>
        </tr>
      </thead>
      <tbody>
        {productTableContent}
      </tbody>
    </table>
  );
};

ProductTable.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.shape).isRequired,
  desc: PropTypes.bool.isRequired,
  loadTable: PropTypes.func.isRequired,
};


export default ProductTable;
