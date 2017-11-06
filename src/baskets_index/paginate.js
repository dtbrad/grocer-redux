import React from 'react';
import PropTypes from 'prop-types';

const Paginate = ({ currentPage, totalPages, loadTable, desc }) => {
  const previous = currentPage <= 1 ? 'hidden' : 'btn btn-default';
  const last = currentPage === totalPages ? 'hidden' : 'btn btn-default';
  const next = currentPage === totalPages || (currentPage === (totalPages - 1)) ? 'hidden' : 'btn btn-default';

  if (totalPages <= 1) { return null; }

  return (
    <div className="btn-group">
      <button className={previous} onClick={() => loadTable({ page: 1, desc })}>1</button>
      <button className={previous} onClick={() => loadTable({ page: (currentPage - 1), desc })}>Prev</button>
      <button className="btn btn-primary">{currentPage}</button>
      <button className={next} onClick={() => loadTable({ page: (currentPage + 1), desc })}>Next</button>
      <button className={last} onClick={() => loadTable({ page: totalPages, desc })}>{totalPages}</button>
    </div>
  );
};

Paginate.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  loadTable: PropTypes.func.isRequired,
  desc: PropTypes.bool.isRequired,
};

export default Paginate;
