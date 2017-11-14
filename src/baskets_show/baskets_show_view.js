import React from 'react';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import LineItem from './line_item';

const BasketsShowView = ({ basket }) => {
  const lineItems = basket.line_items.map(li => <LineItem key={li.id} info={li} />);

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h5>You bought the following items on <Moment add={{ hours: 7 }} format="ddd MM-D-YYYY h:mm a">{ basket.transaction_date }</Moment></h5>
      </div>
      <div className="panel-body">
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
            { lineItems }
            <tr>
              <td />
              <td />
              <td />
              <td><strong>TOTAL:</strong></td>
              <td><strong><NumberFormat value={basket.total_cents / 100} displayType="text" decimalPrecision={2} prefix="$" /></strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

BasketsShowView.propTypes = {
  basket: PropTypes.shape({
    id: PropTypes.number.isRequired,
    transaction_date: PropTypes.string,
    line_item_count: PropTypes.number,
    total_cents: PropTypes.number,
    line_items: PropTypes.arrayOf(PropTypes.shape),
  }),
};

BasketsShowView.defaultProps = {
  basket: {},
};

export default BasketsShowView;
