import React from 'react';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format'

const BasketItem = (props) => {
  const item = props.item
  return (
    <tr>
      <td> <Moment add={{ hours: 7 }} format='ddd MM-D-YYYY h:mm a'>{ item.transaction_date }</Moment></td>
      <td> { item.line_item_count }</td>
      <td> <NumberFormat value={ item.total_cents / 100 } displayType={'text'} decimalPrecision={2} thousandSeparator={true} prefix={'$'} /></td>
    </tr>
  )
}

export default BasketItem
