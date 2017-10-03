import React from 'react';

const Paginate = ({ currentPage, totalPages, loadBaskets }) => {

  const previous = currentPage <= 1 ? "hidden" : "btn btn-default";
  const next = currentPage === totalPages ? "hidden" : "btn btn-default";

  return (
      <div className="btn-group">
        <button className={ previous } onClick={() => loadBaskets(10, 1)}>First</button>
        <button className={ previous } onClick={() => loadBaskets(10, (currentPage - 1) )}>Prev</button>
        <button className="btn btn-default">{ currentPage }</button>
        <button className={ next } onClick={() => loadBaskets(10, currentPage + 1)}>Next</button>
        <button className={ next } onClick={() => loadBaskets(10, totalPages)}>Last</button>
      </div>
  )
}

export default Paginate
