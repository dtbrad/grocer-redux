import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Paginate from './paginate';
import SpendingHistoryControl from './spending_history_control';
import SpendingHistoryChart from './spending_history_chart';

const SpendingHistoryView = (props) => {
  const dan = 'Daniel';
  const SpendingHistoryTable = props.tableComponent;
  return (
    <div>
      <SpendingHistoryChart
        chartData={props.chartData}
        unit={props.unit}
        loadChartAndTable={props.loadChartAndTable}
        dan={dan}
      />
      <SpendingHistoryControl
        loadChart={props.loadChart}
        loadChartAndTable={props.loadChartAndTable}
        oldest_date={props.oldest_date}
        newest_date={props.newest_date}
        unit={props.unit}
      />
      <div className="panel panel-default">
        <SpendingHistoryTable
          desc={props.desc}
          resources={props.pageOfResources}
          loadTable={props.loadTable}
          headerArray={props.headerArray}
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

SpendingHistoryView.propTypes = {
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
  headerArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  tableComponent: PropTypes.func.isRequired,
};


export default SpendingHistoryView;
