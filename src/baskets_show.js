import React, { Component } from 'react';

class BasketsShow extends Component  {

  componentDidMount() {
    // fetch basket data here
  };

  render(){
    const id = this.props.match.params.id;
    return (
      <div className="text-center">
        <h2>Basket Show Page</h2>
        <h4>ID: { id }</h4>
      </div>
    )
  }
};

export default BasketsShow;
