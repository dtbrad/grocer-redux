import React from 'react';
import { Panel } from 'react-bootstrap';
import ProductTable from './ProductTable';
import TokenHelper from '../../api/TokenHelper';
import Paginate from '.././SharedComponents/Paginate';
import SpendingFormContainer from '../SharedComponents/SpendingFormContainer';
import ProductChart from './ProductChart';

const Product = ({ loaded, page, chartData, totalPages, loadSpendingTable, loadChart, loadSpendingTableAndChart, oldestDate, newestDate, tableData, unit, desc, error, match, resourceName, sortCategory }) => {
  if (loaded !== true) {
    return <h4>Loading...</h4>;
  }
  const productName = (tableData && tableData.length) ? tableData[0].product_name : null;
  const userId = TokenHelper.userId('jwt');
  const productId = match ? match.params.id : null;
  const chart = chartData ? <ProductChart productId={productId} userId={userId} chartData={chartData} unit={unit} productName={productName} loadSpendingTableAndChart={loadSpendingTableAndChart} /> : null;
  // debugger;
  return (
    <div>
      { chart }
      <Panel default>
        <SpendingFormContainer
          oldestDate={oldestDate}
          newestDate={newestDate}
          unit={unit}
          loadSpendingTable={loadSpendingTable}
          loadChart={loadChart}
          loadSpendingTableAndChart={loadSpendingTableAndChart}
          resourceName={resourceName}
          productId={productId}
          userId={userId}
        />
        <ProductTable
          tableData={tableData}
          desc={desc}
          loadSpendingTable={loadSpendingTable}
          productId={productId}
          userId={userId}
          resourceName={resourceName}
          oldestDate={oldestDate}
          newestDate={newestDate}
          chartData={chartData}
          unit={unit}
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
        oldestDate={oldestDate}
        newestDate={newestDate}
        chartData={chartData}
        unit={unit}
      />
    </div>
  );
};

Product.defaultProps = {
  page: 1,
  resourceName: 'products',
};

export default Product;
