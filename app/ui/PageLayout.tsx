import React from "react";
import Header from "../ui/header";
import Search from "./search";
import {
  Pagination,
  TableSkeleton,
  Searchbars,
  CreateButton,
} from "./skeleton";

interface PageLayoutProps {
  header: string;
  searchProps?: any;
  table?: React.ReactNode;
  createButton?: React.ReactNode;
  pagination?: React.ReactNode;
  isLoading: boolean;
  isSearchLoading?: boolean;
  currentPage?: number;
  totalPages?: number;
}

export default function PageLayout({
  header,
  searchProps,
  table,
  createButton,
  pagination,
  isLoading,
  isSearchLoading,
  currentPage,
  totalPages,
}: PageLayoutProps) {
  return (
    <div className="bg-transparent flex flex-col h-full">
      <div className="bg-white shadow pt-4 h-[72px] pb-4 flex justify-between items-center">
        <Header header={header} />
        <div className="flex items-center pr-6">
          {createButton &&
            (isLoading ? (
              <CreateButton />
            ) : (
              <div className="ml-4">{createButton}</div>
            ))}
        </div>
      </div>
      <div className="flex flex-col w-full overflow-y-auto">
        <div className="w-full px-6 py-4">
          {searchProps && (
            <div className="bg-white shadow pt-2">
              {isSearchLoading ? <Searchbars /> : <Search {...searchProps} />}
            </div>
          )}
          {isLoading ? (
            <div>
              <div className="bg-transparent overflow-x-hidden">
                <TableSkeleton />
              </div>
              <div className="bg-transparent">
                <Pagination currentPage={currentPage} totalPages={totalPages} />
              </div>
            </div>
          ) : (
            <div>
              <div className="bg-white"> {table}</div>
              {pagination && (
                <div className="bg-transparent pb-2">{pagination}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
