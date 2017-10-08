import React from 'react';
import BasketItem from './basket_item'

const BasketTable = (props) => {
  const baskets = props.baskets
  const date = "sort_date";
  const items = "sort_items";
  const total = "sort_total";

  const basketsTable = baskets.map(basket => {
			return <BasketItem key={basket.id} item={ basket } />;
		});

  return (
      <table className="table table-hover">
        <thead>
          <tr style={{ color: '#07C'}}>
            <th role="button" value={date} onClick={() => props.resort(date)}>Date</th>
            <th role="button" value={items} onClick={() => props.resort(items)}>Items</th>
            <th role="button" value={total} onClick={() => props.resort(total)}>Total</th>
          </tr>
        </thead>
        <tbody>
          { basketsTable }
        </tbody>
      </table>
  )
};

export default BasketTable;
