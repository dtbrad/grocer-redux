import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import BasketsTable from './BasketsTable';
import SpendingFormContainer from '../SharedComponents/SpendingFormContainer';
import Paginate from '../SharedComponents/Paginate';

class Baskets extends Component {
  componentDidMount = () => {
    if (this.props.tableData.length === 0) {
      this.props.loadSpendingTable({ resourceName: 'baskets', desc: true, sortCategory: this.props.sortCategory });
    }
  }

  render() {
    const { currentPage, desc, loadSpendingTable, newestDate, oldestDate, tableData, sortCategory, totalPages, unit } = this.props;
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
            tableData={tableData}
            desc={desc}
            loadSpendingTable={loadSpendingTable}
          />
        </Panel>
        <Paginate
          currentPage={currentPage}
          totalPages={totalPages}
          loadResource={loadSpendingTable}
          desc={desc}
          sortCategory={sortCategory}
        />
      </div>
    );
  }
}

export default Baskets;
