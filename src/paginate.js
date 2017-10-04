import React from 'react';

const Paginate = ({ currentPage, totalPages, loadBaskets, beginning, finish }) => {

  const previous = currentPage <= 1 ? "hidden" : "btn btn-default";
  const last = currentPage === totalPages ? "hidden" : "btn btn-default";
  const next = currentPage === totalPages || (currentPage === (totalPages -1)) ? "hidden" : "btn btn-default";

  return (
      <div className="btn-group">
        <button className={ previous } onClick={() => loadBaskets(10, 1, beginning, finish)}>1</button>
        <button className={ previous } onClick={() => loadBaskets(10, (currentPage - 1), beginning, finish )}>Prev</button>
        <button className="btn btn-secondary">{ currentPage }</button>
        <button className={ next } onClick={() => loadBaskets(10, (currentPage + 1), beginning, finish)}>Next</button>
        <button className={ last } onClick={() => loadBaskets(10, totalPages, beginning, finish)}>{ totalPages }</button>
      </div>
  )
}

export default Paginate
