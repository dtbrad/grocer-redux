import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import BasketsTable from './BasketsTable';
import Paginate from '../SharedComponents/Paginate';

class Baskets extends Component {
  componentDidMount = () => {
    if (this.props.tableData.length === 0) {
      this.props.loadSpendingTable({ resourceName: 'baskets', desc: true, sortCategory: this.props.sortCategory });
    }
  }

  render() {
    const { currentPage, desc, loadSpendingTable, tableData, sortCategory, totalPages, } = this.props;
    return (
      <div>
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
          loadSpendingTable={loadSpendingTable}
          desc={desc}
          sortCategory={sortCategory}
        />
      </div>
    );
  }
}

export default Baskets;
