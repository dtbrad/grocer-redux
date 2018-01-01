import React from 'react';

const Paginate = ({ currentPage, totalPages, loadSpendingTable, desc, sortCategory }) => {
  const previous = currentPage <= 1 ? 'hidden' : 'btn btn-default';
  const last = currentPage === totalPages ? 'hidden' : 'btn btn-default';
  const next = currentPage === totalPages || (currentPage === (totalPages - 1)) ? 'hidden' : 'btn btn-default';

  if (totalPages <= 1) { return null; }

  return (
    <div className="text-center">
      <div className="btn-group">
        <button className={previous} onClick={() => loadSpendingTable({ sortCategory, resourceName: 'baskets', page: 1, desc })}>1</button>
        <button className={previous} onClick={() => loadSpendingTable({ sortCategory, resourceName: 'baskets', page: (currentPage - 1), desc })}>Prev</button>
        <button className="btn btn-primary">{currentPage}</button>
        <button className={next} onClick={() => loadSpendingTable({ sortCategory, resourceName: 'baskets', page: (currentPage + 1), desc })}>Next</button>
        <button className={last} onClick={() => loadSpendingTable({ sortCategory, resourceName: 'baskets', page: totalPages, desc })}>{totalPages}</button>
      </div>
    </div>
  );
};

export default Paginate;
