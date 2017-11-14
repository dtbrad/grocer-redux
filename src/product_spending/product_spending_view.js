import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Paginate from '../shared_components/paginate';
import SpendingHistoryControl from '../shared_components/spending_history_control';
import ProductTable from './product_table';
import ProductSpendingChart from './product_spending_chart';

const ProductSpendingView = (props) => {
  const productName = props.pageOfResources[0].product_name || null;
  // const SpendingHistoryTable = props.tableComponent;
  return (
    <div>
      <ProductSpendingChart
        productName={productName}
        chartData={props.chartData}
        unit={props.unit}
        loadChartAndTable={props.loadChartAndTable}
      />
      <SpendingHistoryControl
        loadChart={props.loadChart}
        loadChartAndTable={props.loadChartAndTable}
        oldest_date={props.oldest_date}
        newest_date={props.newest_date}
        unit={props.unit}
      />
      <div className="panel panel-default">
        <ProductTable
          desc={props.desc}
          resources={props.pageOfResources}
          loadTable={props.loadTable}
        />
      </div>
      <div className="text-center">
        <Paginate
          currentPage={props.currentPage}
          totalPages={props.totalPages}
          loadTable={props.loadTable}
          desc={props.desc}
        />
      </div>
    </div>
  );
};

ProductSpendingView.propTypes = {
  unit: PropTypes.string.isRequired,
  chartData: PropTypes.arrayOf(PropTypes.shape).isRequired,
  pageOfResources: PropTypes.arrayOf(PropTypes.shape).isRequired,
  desc: PropTypes.bool.isRequired,
  loadTable: PropTypes.func.isRequired,
  oldest_date: PropTypes.instanceOf(moment).isRequired,
  newest_date: PropTypes.instanceOf(moment).isRequired,
  loadChart: PropTypes.func.isRequired,
  loadChartAndTable: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};


export default ProductSpendingView;
