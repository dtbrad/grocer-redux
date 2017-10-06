import React from 'react';

const Paginate = ({ currentPage, totalPages, loadBaskets, beginning, finish }) => {

  const previous = currentPage <= 1 ? "hidden" : "btn btn-default";
  const last = currentPage === totalPages ? "hidden" : "btn btn-default";
  const next = currentPage === totalPages || (currentPage === (totalPages -1)) ? "hidden" : "btn btn-default";

  return (
      <div className="btn-group">
        <button className={ previous } onClick={() => loadBaskets({per_page: 10, page: 1, beg: beginning, fin: finish})}>1</button>
        <button className={ previous } onClick={() => loadBaskets({per_page: 10, page: (currentPage - 1), beg: beginning, fin: finish} )}>Prev</button>
        <button className="btn btn-secondary">{ currentPage }</button>
        <button className={ next } onClick={() => loadBaskets({per_page: 10, page: (currentPage + 1), beg: beginning, fin: finish})}>Next</button>
        <button className={ last } onClick={() => loadBaskets({per_page: 10, page: totalPages, beg: beginning, fin: finish})}>{ totalPages }</button>
      </div>
  )
}

export default Paginate
