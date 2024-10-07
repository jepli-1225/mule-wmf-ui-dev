"use client";

import React, { useCallback, useEffect, useState } from "react";
import Table from "@/app/ui/table";
import type { InterfaceConfig } from "@/app/lib/definitions";
import { CreateNew } from "@/app/ui/buttons";
import useFetchData from "@/app/lib/utils/hooks/useFetchData";
import PageLayout from "@/app/ui/PageLayout";
import Link from "next/link";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import Pagination from "@/app/ui/pagination";
import { useRouter } from "next/navigation";

export default function InterfaceConfigPage() {
  const router = useRouter();
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>(
    {}
  );
  const [awaitLoading, setAwaitLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

  const { data, loading, debouncedFetch } = useFetchData<{
    data: InterfaceConfig[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>("/api/configurations/interfaceConfigs");

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
      const formattedDate = format(date, "dd MMMM");
      const relativeTime = formatDistanceToNow(date, { addSuffix: true });
      if (date.getFullYear() < 1900) return "";

      return `${formattedDate} (${relativeTime})`;
    } else {
      return ``;
    }
  };

  const handleCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/configurations/interfaceConfig/create");
  };

  const columns = [
    {
      key: "ID",
      header: "ID",
      render: (value: string) => (
        <Link
          href={`/configurations/interfaceConfig/${value}`}
          className="text-[#deb941]"
        >
          {value}
        </Link>
      ),
    },
    { key: "INTERFACEID", header: "INTERFACE" },
    { key: "SOURCESYSTEM", header: "SOURCE SYSTEM" },
    { key: "TARGETSYSTEM", header: "TARGET SYSTEM" },
    { key: "BUSINESSEVENT", header: "BUSINESS EVENT" },
    { key: "DOMAINID", header: "DOMAIN" },
    { key: "DESTINATIONVALUE", header: "DESTINATION VALUE" },
    { key: "DESTINATIONTYPE", header: "DESTINATION TYPE" },
    {
      key: "CREATEDON",
      header: "CREATED",
      render: (value: string, row: InterfaceConfig) =>
        `${row.CREATEDBY} ${formatDate(value)}`,
    },
    {
      key: "UPDATEDON",
      header: "UPDATEDBY",
      render: (value: string, row: InterfaceConfig) =>
        `${row.UPDATEDBY} ${formatDate(value)}`,
    },
  ];

  const table = (
    <div className="mt-4">
      <Table
        data={data?.data || []}
        columns={columns}
        name="interface configurations"
        rightHeader={true}
      />
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
      header="Mule Interface Configs"
      searchProps={searchProps}
      table={table}
      createButton={<CreateNew onClick={handleCreate} name="Interfaceconfig" />}
      pagination={paginationComponent}
      isLoading={awaitLoading}
      currentPage={currentPage}
      totalPages={Math.ceil(totalRows / 50)}
    ></PageLayout>
  );
}
