import { useState, useEffect } from "react";

export default function DataTable({ 
  columns, 
  data, 
  onDelete, 
  onEdit, 
  pagination = true,
  pageSize: initialPageSize = 10,
  currentPage: externalCurrentPage,
  onPageChange
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  
  // Use external pagination control if provided
  const effectiveCurrentPage = externalCurrentPage !== undefined ? externalCurrentPage : currentPage;
  const effectiveSetCurrentPage = onPageChange || setCurrentPage;
  
  // Calculate pagination values
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (effectiveCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedData = pagination ? data.slice(startIndex, endIndex) : data;
  
  // Reset to first page when data changes significantly
  useEffect(() => {
    if (externalCurrentPage === undefined) {
      setCurrentPage(1);
    }
  }, [data.length, pageSize, externalCurrentPage]);
  
  // Handle page changes
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      effectiveSetCurrentPage(newPage);
    }
  };
  
  // Handle page size changes
  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setPageSize(newSize);
    if (externalCurrentPage === undefined) {
      setCurrentPage(1);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Page Size Selector */}
      {pagination && (
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-600">Show</span>
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span className="ml-2 text-sm text-gray-600">entries</span>
          </div>
        </div>
      )}
      
      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left border-b border-gray-200"
                >
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-4 py-3 text-left border-b">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="text-center py-6 text-gray-500"
                >
                  No data found
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr key={row._id} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-2 border-b">
                      {row[col.key]}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-4 py-2 border-b flex gap-2">
                      {/* Edit Button */}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                      )}
  
                      {/* Delete Button */}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row._id)}
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Controls */}
      {pagination && totalItems > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 px-2 py-2 bg-white rounded-lg shadow-md">
          <div className="text-sm text-gray-700 mb-2 sm:mb-0">
            Showing {startIndex + 1} to {endIndex} of {totalItems} entries
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(1)}
              disabled={effectiveCurrentPage === 1}
              className="px-3 py-1 rounded border text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              First
            </button>
            <button
              onClick={() => handlePageChange(effectiveCurrentPage - 1)}
              disabled={effectiveCurrentPage === 1}
              className="px-3 py-1 rounded border text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {/* Page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (effectiveCurrentPage <= 3) {
                pageNum = i + 1;
              } else if (effectiveCurrentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = effectiveCurrentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 rounded border text-sm ${
                    effectiveCurrentPage === pageNum
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(effectiveCurrentPage + 1)}
              disabled={effectiveCurrentPage === totalPages}
              className="px-3 py-1 rounded border text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={effectiveCurrentPage === totalPages}
              className="px-3 py-1 rounded border text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
}