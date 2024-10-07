import React from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/16/solid";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalRowOnPage: number;
  totalRows: number;
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  totalRowOnPage,
  totalRows,
  itemsPerPage,
}) => {
  console.log("Pagination render:", {
    currentPage,
    totalRowOnPage,
    totalRows,
    itemsPerPage,
  });

  const totalPages = Math.ceil(totalRows / 50);

  const startIndex =
    totalRowOnPage == 0
      ? (currentPage - 1) * itemsPerPage
      : (currentPage - 1) * itemsPerPage + 1;
  const endIndex =
    startIndex == 0
      ? Math.min(startIndex + totalRowOnPage, totalRows)
      : Math.min(startIndex + totalRowOnPage - 1, totalRows);

  const getPageNumbers = () => {
    const pageNumbers = [];
    let totalButtonsToShow = 5;

    if (totalRowOnPage <= 50 && totalPages == 1) {
      totalButtonsToShow = 0;
    }

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + totalButtonsToShow - 1);

    if (endPage - startPage + 1 < totalButtonsToShow) {
      startPage = Math.max(1, endPage - totalButtonsToShow + 1);
    }

    if (totalRows / itemsPerPage)
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

    console.log("Page numbers:", pageNumbers);
    return pageNumbers;
  };

  console.log("current page", currentPage);
  console.log("total pages", totalPages);
  return (
    <div className="flex justify-between items-center bg-transparent min-h-[40px]">
      <div className="text-[10px] text-gray-400">
        {totalPages < 2
          ? `${totalRows} records`
          : `${startIndex} to ${endIndex} of ${totalRows} records`}
      </div>
      <div className="text-xs pt-4 pr-2 flex">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-white border border-gray-400 disabled:hidden flex items-center"
        >
          <ArrowLeftIcon className="h-3 w-3 text-black mr-1" />
          previous
        </button>
        {currentPage > 3 && totalPages > 5 && (
          <button className="px-4 py-1 border border-gray-400 bg-white text-black disabled:hidden">
            ...
          </button>
        )}
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-4 py-1 ml-1 border border-gray-400 bg-white text-black ${
              pageNumber === currentPage ? " text-yellow-600" : ""
            }`}
          >
            {pageNumber}
          </button>
        ))}
        {currentPage + 2 < totalPages && totalPages > 5 && (
          <button
            className="px-4 py-1 ml-1 border border-gray-400 bg-white text-black"
            disabled
          >
            ...
          </button>
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-3 py-1 ml-1 border border-gray-400 bg-white disabled:hidden flex items-center"
        >
          next
          <ArrowRightIcon className="h-3 w-3 text-black ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
