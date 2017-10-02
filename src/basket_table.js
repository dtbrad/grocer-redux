import React from 'react';
import BasketItem from './basket_item'

const BasketTable = (props) => {

  const baskets = props.baskets.map(basket => {
			return <BasketItem key={basket.id} item={basket} />;
		});

  return (
    <div className="panel panel-default">
      <h4 className="text-center">Basket Table</h4>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Date</th>
            <th># of Items</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          { baskets }
        </tbody>
      </table>
    </div>
  )
};

export default BasketTable;
