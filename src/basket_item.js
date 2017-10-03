import React from 'react';
import Moment from 'react-moment';
// import 'moment-timezone';
import NumberFormat from 'react-number-format'

const BasketItem = (props) => {
  const item = props.item
  return (
    <tr>
      <td> <Moment add={{ hours: 7 }} format='dddd MMM Do YYYY h:mm A'>{ item.transaction_date }</Moment></td>
      <td> { item.line_items.length }</td>
      <td> <NumberFormat value={ item.total_cents / 100 } displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
    </tr>
  )
}

export default BasketItem
