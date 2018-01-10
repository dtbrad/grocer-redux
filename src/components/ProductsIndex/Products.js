import React from 'react';
import { Panel } from 'react-bootstrap';
import ProductsTable from './ProductsTable';
import ProductsChart from './ProductsChart';
import TokenHelper from '../../api/TokenHelper';
import Paginate from '../SharedComponents/Paginate';

const Products = (props) => {
  if (props.loaded !== true) {
    return <h4>Loading...</h4>;
  }
  const userId = TokenHelper.userId('jwt');

  const chart = props.chartData ? <ProductsChart chartData={props.chartData} /> : <div style={{ height: 400 }} />;
  return (
    <div>
      {chart}
      <Panel default>
        <ProductsTable
          tableData={props.tableData}
          desc={props.desc}
          chartData={props.chartData}
          loadProductsTable={props.loadProductsTable}
          loadSpendingTableAndChart={props.loadSpendingTableAndChart}
        />
      </Panel>
      <Paginate
        chartData={props.chartData}
        page={props.page}
        totalPages={props.totalPages}
        loadResource={props.loadProductsTable}
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
