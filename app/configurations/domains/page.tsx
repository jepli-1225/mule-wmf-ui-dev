"use client";

import React, { useState, useCallback, useEffect } from "react";
import type { Domains } from "@/app/lib/definitions";
import { CreateNew } from "@/app/ui/buttons";
import useFetchData from "@/app/lib/utils/hooks/useFetchData";
import Table from "@/app/ui/table";
import PageLayout from "@/app/ui/PageLayout";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import Pagination from "@/app/ui/pagination";
import { useRouter } from "next/navigation";

export default function DomainsPage() {
  const router = useRouter();
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>(
    {}
  );
  const [awaitLoading, setAwaitLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

  const { data, loading, debouncedFetch } = useFetchData<{
    data: Domains[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>("/api/configurations/domains");

  const totalRowOnPage = data?.data.length || 0;
  const totalRows = data?.pagination.total || 0;

  useEffect(() => {
    if (!loading) {
      setAwaitLoading(false);
    }
  }, [loading]);

  const handleSearch = useCallback(
    (queries: Record<string, string>) => {
      setSearchQueries(queries);
      setCurrentPage(1);
      const queryString = new URLSearchParams({
        ...queries,
        page: "1",
        limit: itemsPerPage.toString(),
      }).toString();
      debouncedFetch(queryString)?.finally(() => setAwaitLoading(false));
    },
    [debouncedFetch, itemsPerPage]
  );

  useEffect(() => {
    setAwaitLoading(true);
    const initialQueryString = new URLSearchParams({
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
    }).toString();
    debouncedFetch(initialQueryString)?.finally(() => setAwaitLoading(false));
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      const queryString = new URLSearchParams({
        ...searchQueries,
        page: page.toString(),
        limit: itemsPerPage.toString(),
      }).toString();
      debouncedFetch(queryString)?.finally(() => setAwaitLoading(false));
    },
    [debouncedFetch, searchQueries, itemsPerPage]
  );

  const searchProps = {
    onSearch: handleSearch,
    placeholder: "Search...",
    fields: [{ key: "general", placeholder: "Search" }],
    showDatePicker: false,
    showAdvancedSearch: false,
  };

  const formatDate = (createdOn: string) => {
    if (createdOn) {
      const date = parseISO(createdOn);
      // SG(UTC-8)
      date.setHours(date.getHours() - 8);
      const formattedDate = format(date, "yyyy-MM-dd");

      if (date.getFullYear() < 1900) return "";

      return `${formattedDate}`;
    } else {
      return ``;
    }
  };

  const handleCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/configurations/domains/create");
  };

  const columns = [
    {
      key: "DOMAINID",
      header: "DOMAINID",
      render: (value: string) => (
        <Link
          href={`/configurations/domains/${value}`}
          className="text-[#deb941]"
        >
          {value}
        </Link>
      ),
    },
    { key: "DOMAINDESCRIPTION", header: "DOMAINDESCRIPTION" },
    {
      key: "CREATEDBY",
      header: "CREATEDBY",
    },
    {
      key: "CREATEDON",
      header: "CREATEDON",
      render: (value: string) => `${formatDate(value)}`,
    },
    {
      key: "UPDATEDBY",
      header: "UPDATEDBY",
    },
    {
      key: "UPDATEDON",
      header: "UPDATEDON",
      render: (value: string) => `${formatDate(value)}`,
    },
  ];

  const table = (
    <div className="mt-4">
      <Table data={data?.data || []} columns={columns} name="domains" />
    </div>
  );

  const paginationComponent = data?.pagination && (
    <Pagination
      currentPage={currentPage}
      onPageChange={handlePageChange}
      totalRowOnPage={totalRowOnPage}
      totalRows={totalRows}
      itemsPerPage={itemsPerPage}
    />
  );

  return (
    <PageLayout
      header="Mule Domains"
      searchProps={searchProps}
      table={table}
      createButton={<CreateNew onClick={handleCreate} name="Domain" />}
      pagination={paginationComponent}
      isLoading={awaitLoading}
      currentPage={currentPage}
      totalPages={Math.ceil(totalRows / 50)}
    ></PageLayout>
  );
}
