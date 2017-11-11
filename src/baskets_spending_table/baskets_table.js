import React from 'react';
import PropTypes from 'prop-types';
import BasketsTableRow from './baskets_table_row';

const BasketsTable = ({ resources, desc, loadTable }) => {
  const basketsTableContent = resources.map(basket => (
    <BasketsTableRow key={basket.id} basket={basket} />
  ));

  return (
    <table className="table table-hover">
      <thead>
        <tr style={{ color: '#07C' }}>
          <th role="button" onClick={() => loadTable({ page: 1, desc: !desc, category: 'sort_date' })}>Date</th>
          <th role="button" onClick={() => loadTable({ page: 1, desc: !desc, category: 'sort_items' })}>Items</th>
          <th role="button" onClick={() => loadTable({ page: 1, desc: !desc, category: 'sort_total' })}>Total</th>
        </tr>
      </thead>
      <tbody>
        {basketsTableContent}
      </tbody>
    </table>
  );
};

BasketsTable.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.shape).isRequired,
  desc: PropTypes.bool.isRequired,
  loadTable: PropTypes.func.isRequired,
};


export default BasketsTable;
