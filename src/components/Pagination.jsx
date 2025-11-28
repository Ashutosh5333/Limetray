import React from 'react';

export default function Pagination({ pagination, onChange }) {
  if (!pagination) return null;
  const { page, pages } = pagination;
  return (
    <div className="flex items-center gap-2 mt-4">
      <button className="px-3 py-1 border rounded" onClick={() => onChange(Math.max(1, page-1))} disabled={page===1}>Prev</button>
      <span className="px-3 py-1">Page {page} of {pages}</span>
      <button className="px-3 py-1 border rounded" onClick={() => onChange(Math.min(pages, page+1))} disabled={page===pages}>Next</button>
    </div>
  );
}
