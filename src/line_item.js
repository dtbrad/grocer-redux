import React from 'react'
import NumberFormat from 'react-number-format'

const LineItem = (props) => {
  return (
    <tr>
      <td>{props.info.product_name}</td>
      <td><NumberFormat value={ props.info.price_cents / 100 } displayType={'text'} decimalPrecision={2} thousandSeparator={true} prefix={'$'} /></td>
      <td>{props.info.quantity}</td>
      <td>{props.info.weight}</td>
      <td><NumberFormat value={ props.info.total_cents / 100 } displayType={'text'} decimalPrecision={2} thousandSeparator={true} prefix={'$'} /></td>
    </tr>
  )
}

export default LineItem
