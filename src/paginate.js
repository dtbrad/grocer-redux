import React from 'react';

const Paginate = ({ currentPage, totalPages, updatePagination, desc, newest_date, oldest_date }) => {

  const previous = currentPage <= 1 ? "hidden" : "btn btn-default";
  const last = currentPage === totalPages ? "hidden" : "btn btn-default";
  const next = currentPage === totalPages || (currentPage === (totalPages -1)) ? "hidden" : "btn btn-default";

  return (
    <div className="btn-group">
      <button className={ previous } onClick={() => updatePagination({per_page: 10, page: 1, newest_date: newest_date, oldest_date: oldest_date})}>1</button>
      <button className={ previous } onClick={() => updatePagination({per_page: 10, page: (currentPage - 1), newest_date: newest_date, oldest_date: oldest_date} )}>Prev</button>
      <button className="btn btn-secondary">{ currentPage }</button>
      <button className={ next } onClick={() => updatePagination({per_page: 10, page: (currentPage + 1), newest_date: newest_date, oldest_date: oldest_date})}>Next</button>
      <button className={ last } onClick={() => updatePagination({per_page: 10, page: totalPages, newest_date: newest_date, oldest_date: oldest_date})}>{ totalPages }</button>
    </div>
  )
}

export default Paginate
