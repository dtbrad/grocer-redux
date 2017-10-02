import React from 'react'

const BasketItem = (props) => {
  const item = props.item

  return (
    <tr>
      <td> { item.transaction_date }</td>
      <td> { item.line_items.length }</td>
      <td> { item.total_cents }</td>
    </tr>
  )
}

export default BasketItem
