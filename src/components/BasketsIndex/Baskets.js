import React from 'react';
import { Panel } from 'react-bootstrap';
import BasketsTable from './BasketsTable';
import SpendingFormContainer from '../SharedComponents/SpendingFormContainer';
import Paginate from '../SharedComponents/Paginate';

const Baskets = ({ currentPage, desc, loaded, loadSpendingTable, newestDate, oldestDate, tableData, resourceName, sortCategory, totalPages, unit }) => {
  if (loaded !== true) {
    return <h4>Loading...</h4>;
  }
  return (
    <div>
      <SpendingFormContainer
        oldestDate={oldestDate}
        newestDate={newestDate}
        unit={unit}
        loadSpendingTable={loadSpendingTable}
      />
      <Panel default>
        <BasketsTable
          oldestDate={oldestDate}
          newestDate={newestDate}
          tableData={tableData}
          desc={desc}
          loadSpendingTable={loadSpendingTable}
        />
      </Panel>
      <Paginate
        oldestDate={oldestDate}
        newestDate={newestDate}
        currentPage={currentPage}
        totalPages={totalPages}
        loadResource={loadSpendingTable}
        desc={desc}
        sortCategory={sortCategory}
        resourceName={resourceName}
      />
    </div>
  );
};

Baskets.defaultProps = {
  currentPage: 1,
};

export default Baskets;
