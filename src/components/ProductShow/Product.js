import React from 'react';
import { Panel } from 'react-bootstrap';
import ProductTable from './ProductTable';
import TokenHelper from '../../api/TokenHelper';
import Paginate from '.././SharedComponents/Paginate';
import SpendingFormContainer from '../SharedComponents/SpendingFormContainer';


const Product = ({ page, totalPages, loadSpendingTable, oldestDate, newestDate, tableData, unit, desc, error, match, resourceName, sortCategory }) => {
  const productName = (tableData && tableData.length) ? tableData[0].product_name : null;
  const userId = TokenHelper.userId('jwt');
  const productId = match ? match.params.id : null;

  return (
    <div>
      <h5>{productName}</h5>
      <Panel default>
        <SpendingFormContainer
          oldestDate={oldestDate}
          newestDate={newestDate}
          unit={unit}
          loadSpendingTable={loadSpendingTable}
        />
        <ProductTable
          tableData={tableData}
          desc={desc}
          loadSpendingTable={loadSpendingTable}
          productId={productId}
          userId={userId}
          resourceName={resourceName}
        />
      </Panel>
      <Paginate
        page={page}
        totalPages={totalPages}
        loadResource={loadSpendingTable}
        desc={desc}
        productId={productId}
        resourceName={resourceName}
        userId={userId}
        sortCategory={sortCategory}
      />
    </div>
  );
};

Product.defaultProps = {
  page: 1,
  resourceName: 'products'
};

export default Product;
