import React from 'react';
import { Panel } from 'react-bootstrap';
import ProductsTable from './ProductsTable';
import TokenHelper from '../../api/TokenHelper';
import Paginate from '../SharedComponents/Paginate';

const Products = (props) => {
  if (props.loaded !== true) {
    return <h4>Loading...</h4>;
  }
  const userId = TokenHelper.userId('jwt');
  return (
    <div>
      <Panel default>
        <ProductsTable
          tableData={props.tableData}
          desc={props.desc}
          loadProducts={props.loadProducts}
          loadSpendingTable={props.loadSpendingTable}
        />
      </Panel>
      <Paginate
        loadProducts={props.loadProducts}
        page={props.page}
        totalPages={props.totalPages}
        loadResource={props.loadProducts}
        desc={props.desc}
        resourceName={props.resourceName}
        userId={userId}
        sortCategory={props.sortCategory}
      />
    </div>
  );
};

Products.defaultProps = {
  page: 1,
};

export default Products;
