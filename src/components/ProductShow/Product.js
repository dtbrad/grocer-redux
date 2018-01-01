import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import ProductTable from './ProductTable';
import TokenHelper from '../../api/TokenHelper';
import Paginate from '.././SharedComponents/Paginate';

class Product extends Component {
  componentDidMount = () => {
    if (this.props.tableData.length === 0) {
      const userId = TokenHelper.userId('jwt');
      const productId = this.props.match ? this.props.match.params.id : null;
      this.props.loadSpendingTable({ productId, userId, resourceName: 'product', desc: true, sortCategory: this.props.sortCategory });
    }
  }

  render() {
    const { loadSpendingTable, tableData, desc, error } = this.props;
    const productName = (tableData && tableData.length) ? tableData[0].product_name : null;
    const userId = TokenHelper.userId('jwt');
    const productId = this.props.match ? this.props.match.params.id : null;

    return (
      <div>
        <h5>{productName}</h5>
        <Panel default>
          <ProductTable
            tableData={tableData}
            desc={desc}
            loadSpendingTable={this.props.loadSpendingTable}
            productId={productId}
            userId={userId}
          />
        </Panel>
        <Paginate
          currentPage={this.props.currentPage}
          totalPages={this.props.totalPages}
          loadSpendingTable={loadSpendingTable}
          desc={this.props.desc}
          productId={productId}
          resourceName="product"
          userId={userId}
          sortCategory={this.props.sortCategory}
        />
      </div>
    );
  }
}

export default Product;
