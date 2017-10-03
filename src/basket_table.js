import React from 'react';
import BasketItem from './basket_item'

const BasketTable = ({ baskets }) => {

  const basketsTable = baskets.map(basket => {
			return <BasketItem key={basket.id} item={ basket } />;
		});

  return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Date</th>
            <th># of Items</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          { basketsTable }
        </tbody>
      </table>
  )
};

export default BasketTable;
