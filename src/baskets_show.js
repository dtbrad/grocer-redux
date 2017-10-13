import React from 'react';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format'
import LineItem from './line_item.js'

const BasketsShow = ({ basket }) =>  {

  const line_items = basket.line_items.map(function(li) {
    return <LineItem key={li.id} info={li}/>
  });

  return (
    <div class="panel panel-default">
      <div class="panel-heading">
        <h5>You bought the following items on <Moment add={{ hours: 7 }} format='ddd MM-D-YYYY h:mm a'>{ basket.transaction_date }</Moment></h5>
      </div>
      <div class="panel-body">
        <table className="table table-borderless table-hover">
          <thead>
            <tr>
              <th>Item</th>
              <th>Unit Price</th>
              <th>Qty</th>
              <th>Weight</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            { line_items }
            <tr class='rowC2'>
          <td></td>
          <td></td>
          <td></td>
          <td><strong>TOTAL:</strong></td>
          <td><strong><NumberFormat value={ basket.total_cents / 100 } displayType={'text'} decimalPrecision={2} thousandSeparator={true} prefix={'$'} /></strong></td>
        </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default BasketsShow;
