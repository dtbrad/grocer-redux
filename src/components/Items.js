import React from 'react';

const Items = (props) => {
  const { items } = props;
  return (
    <section className="Items">
      <h2>
        Items
      </h2>
      {items.map(item => (
        <h5>{item.value}</h5>
      ))}
    </section>
  );
};

export default Items;
