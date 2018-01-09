import React from 'react';
import { Panel } from 'react-bootstrap';
import BasketsTable from './BasketsTable';
import SpendingFormContainer from '../SharedComponents/SpendingFormContainer';
import Paginate from '../SharedComponents/Paginate';
import BasketsChart from './BasketsChart';

const Baskets = ({ chartData, page, desc, loaded, loadSpendingTable, loadChart, loadSpendingTableAndChart, newestDate, oldestDate, tableData, resourceName, sortCategory, totalPages, unit }) => {
  if (loaded !== true) {
    return <h4>Loading...</h4>;
  }
const chart = chartData ? <BasketsChart chartData={chartData} unit={unit} loadSpendingTableAndChart={loadSpendingTableAndChart} isPureConfig /> : null;
  return (
    <div>
      { chart }
      <SpendingFormContainer
        oldestDate={oldestDate}
        newestDate={newestDate}
        unit={unit}
        loadSpendingTable={loadSpendingTable}
        loadChart={loadChart}
        loadSpendingTableAndChart={loadSpendingTableAndChart}
        resourceName={resourceName}
      />
      <Panel default>
        <BasketsTable
          oldestDate={oldestDate}
          newestDate={newestDate}
          tableData={tableData}
          desc={desc}
          loadSpendingTable={loadSpendingTable}
          chartData={chartData}
          unit={unit}
        />
      </Panel>
      <Paginate
        oldestDate={oldestDate}
        newestDate={newestDate}
        page={page}
        totalPages={totalPages}
        loadResource={loadSpendingTable}
        desc={desc}
        sortCategory={sortCategory}
        resourceName={resourceName}
        chartData={chartData}
        unit={unit}
      />
    </div>
  );
};

Baskets.defaultProps = {
  page: 1,
  resourceName: 'baskets',
};

export default Baskets;
