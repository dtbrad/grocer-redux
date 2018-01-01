import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import ProductsTable from './ProductsTable';
import TokenHelper from '../../api/TokenHelper';
import Paginate from '../SharedComponents/Paginate';

class Products extends Component {
  componentDidMount = () => {
    this.props.loadProducts({ desc: false, sortCategory: 'sort_name' });
  }

  render() {
    const userId = TokenHelper.userId('jwt');
    return (
      <div>
        <Panel default>
          <ProductsTable
            tableData={this.props.tableData}
            desc={this.props.desc}
            loadProducts={this.props.loadProducts}
            loadSpendingTable={this.props.loadSpendingTable}
          />
        </Panel>
        <Paginate
          loadProducts={this.props.loadProducts}
          currentPage={this.props.currentPage}
          totalPages={this.props.totalPages}
          loadResource={this.props.loadProducts}
          desc={this.props.desc}
          resourceName={this.props.resourceName}
          userId={userId}
          sortCategory={this.props.sortCategory}
        />
      </div>
    );
  }
}

export default Products;
