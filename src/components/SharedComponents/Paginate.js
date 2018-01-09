import React from 'react';

const Paginate = ({ page, totalPages, loadResource, desc, oldestDate, newestDate, productId, userId, resourceName, sortCategory }) => {
  const previous = page <= 1 ? 'hidden' : 'btn btn-default';
  const last = page === totalPages ? 'hidden' : 'btn btn-default';
  const next = page === totalPages || (page === (totalPages - 1)) ? 'hidden' : 'btn btn-default';
  if (totalPages <= 1) { return null; }

  return (
    <div className="text-center">
      <div className="btn-group">
        <button className={previous} onClick={() => loadResource({ oldestDate, newestDate, productId, userId, sortCategory, resourceName, page: 1, desc })}>1</button>
        <button className={previous} onClick={() => loadResource({ oldestDate, newestDate, productId, userId, sortCategory, resourceName, page: (page - 1), desc })}>Prev</button>
        <button className="btn btn-primary">{page}</button>
        <button className={next} onClick={() => loadResource({ oldestDate, newestDate, productId, userId, sortCategory, resourceName, page: (page + 1), desc })}>Next</button>
        <button className={last} onClick={() => loadResource({ oldestDate, newestDate, productId, userId, sortCategory, resourceName, page: totalPages, desc })}>{totalPages}</button>
      </div>
    </div>
  );
};

export default Paginate;
