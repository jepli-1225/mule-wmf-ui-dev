import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import React, { useState, useEffect, useCallback } from "react";

interface Column {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
  className?: string;
}

interface TableProps {
  data: any[];
  columns: Column[];
  name?: string;
  specialId?: boolean;
  rightHeader?: boolean;
  isRightAlignedRows?: boolean;
}

const Table: React.FC<TableProps> = ({
  data,
  columns,
  name,
  specialId,
  rightHeader,
}) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [sorting, setSorting] = useState<{ key: string; ascending: boolean }>({
    key: "",
    ascending: true,
  });
  const [sortedData, setSortedData] = useState(data);

  const handleMediaQueryChange = useCallback((e: MediaQueryListEvent) => {
    setIsMobile(e.matches);
    if (!e.matches) {
      setExpandedRows([]);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [handleMediaQueryChange]);

  const toggleRow = (rowIndex: number, event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest("a, button")) {
      return;
    }
    setExpandedRows((prev) =>
      prev.includes(rowIndex)
        ? prev.filter((i) => i !== rowIndex)
        : [...prev, rowIndex]
    );
  };

  const applySorting = (key: string) => {
    setSorting((prevSorting) => ({
      key,
      ascending: prevSorting.key === key ? !prevSorting.ascending : true,
    }));
  };

  useEffect(() => {
    const sortedData = [...data].sort((a, b) => {
      if (sorting.key === "") return 0;
      const aValue = a[sorting.key];
      const bValue = b[sorting.key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sorting.ascending
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return sorting.ascending
        ? aValue > bValue
          ? 1
          : -1
        : bValue > aValue
        ? 1
        : -1;
    });
    setSortedData(sortedData);
  }, [data, sorting]);

  return (
    <table className="table-auto w-full">
      <thead className="hidden sm:table-header-group">
        <tr>
          {columns.map((column, index) => (
            <th
              key={column.key}
              className={`hover:underline ${
                index === 0
                  ? specialId && !rightHeader
                    ? "transaction-id-column"
                    : rightHeader && !specialId
                    ? "right-aligned"
                    : rightHeader && specialId
                    ? "transaction-id-column right-aligned"
                    : ""
                  : ""
              }`}
              onClick={() => applySorting(column.key)}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="px-2">
              {`No mule ${name} to show...`}
            </td>
          </tr>
        ) : (
          sortedData.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <tr
                className="cursor-pointer sm:cursor-default"
                onClick={(e) => toggleRow(rowIndex, e)}
              >
                <td className="sm:hidden py-2">
                  <div className={`flex justify-between items-center`}>
                    <span>
                      {columns[0].render
                        ? columns[0].render(row[columns[0].key], row)
                        : row[columns[0].key]}
                    </span>
                    {isMobile &&
                      (expandedRows.includes(rowIndex) ? (
                        <ChevronUpIcon className="h-5 w-5" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                      ))}
                  </div>
                </td>
                {columns.map((column) => (
                  <td
                    key={`${rowIndex}-${column.key}`}
                    className={`${column.className} hidden sm:table-cell`}
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
              {isMobile && expandedRows.includes(rowIndex) && (
                <tr className="sm:hidden">
                  <td colSpan={columns.length}>
                    {columns.slice(1).map((column) => (
                      <div key={column.key} className="py-2">
                        <strong>{column.header}:</strong>{" "}
                        {column.render
                          ? column.render(row[column.key], row)
                          : row[column.key]}
                      </div>
                    ))}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
