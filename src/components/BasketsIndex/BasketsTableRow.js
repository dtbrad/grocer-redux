import React from 'react';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

const BasketsTableRow = ({ basket }) => (
  <tr>
    <td>
      <Link
        to={`/shopping_trips/${basket.id}`}
      >
        <Moment add={{ hours: 7 }} format="ddd MM-D-YYYY h:mm a">
          { basket.transaction_date }
        </Moment>
      </Link>
    </td>
    <td> { basket.line_item_count }</td>
    <td> <NumberFormat value={basket.total_cents / 100} displayType="text" decimalPrecision={2} thousandSeparator prefix="$" /></td>
  </tr>
);

export default BasketsTableRow;
