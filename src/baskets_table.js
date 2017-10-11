import React from 'react';
import BasketItem from './basket_item'

const BasketsTable = ({baskets, desc, loadTable}) => {

  const basketsTableContent = baskets.map(basket => {
			return <BasketItem key={basket.id} item={ basket } />;
		});

  return (
      <table className="table table-hover">
        <thead>
          <tr style={{ color: '#07C'}}>
            <th role="button" onClick={ () => loadTable({page: 1, desc: !desc, category: "sort_date"}) }>Date</th>
            <th role="button" onClick={ () => loadTable({page: 1, desc: !desc, category: "sort_items"}) }>Items</th>
            <th role="button" onClick={ () => loadTable({page: 1, desc: !desc, category: "sort_total"}) }>Total</th>
          </tr>
        </thead>
        <tbody>
          { basketsTableContent }
        </tbody>
      </table>
  )
};

export default BasketsTable;
