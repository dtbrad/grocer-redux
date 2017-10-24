import React from 'react';

const Paginate = ({ currentPage, totalPages, loadTable, desc }) => {

  const previous = currentPage <= 1 ? "hidden" : "btn btn-default";
  const last = currentPage === totalPages ? "hidden" : "btn btn-default";
  const next = currentPage === totalPages || (currentPage === (totalPages -1)) ? "hidden" : "btn btn-default";

  if(totalPages <= 1) { return null }

  return (
    <div className="btn-group">
      <button className={ previous } onClick={ () => loadTable({page: 1, desc: desc}) }>1</button>
      <button className={ previous } onClick={ () => loadTable({page: (currentPage - 1), desc: desc}) }>Prev</button>
      <button className="btn btn-secondary">{ currentPage }</button>
      <button className={ next } onClick={ () => loadTable({page: (currentPage + 1), desc: desc}) }>Next</button>
      <button className={ last } onClick={ () => loadTable({page: totalPages, desc: desc}) }>{ totalPages }</button>
    </div> )
};

export default Paginate
