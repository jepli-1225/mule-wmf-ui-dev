"use client";

import React, { useCallback, useEffect, useState } from "react";
import { CreateNew } from "@/app/ui/buttons";
import useFetchData from "@/app/lib/utils/hooks/useFetchData";
import Table from "@/app/ui/table";
import type { NotifConfig } from "@/app/lib/definitions";
import PageLayout from "@/app/ui/PageLayout";
import { format, parseISO } from "date-fns";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Pagination from "@/app/ui/pagination";
import EmailInfoPopup from "@/app/ui/configurations/notifConfig/EmailInfoPopup";
import { useRouter } from "next/navigation";

export default function NotifConfigPage() {
  const router = useRouter();
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>(
    {}
  );
  const [awaitLoading, setAwaitLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

  const { data, loading, debouncedFetch } = useFetchData<{
    data: NotifConfig[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>("/api/configurations/notifConfigs");

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
    router.push("/configurations/notifConfig/create");
  };

  const handleLinkClick = (value: string) => {
    router.push(`/configurations/notifConfig/${value}`);
  };

  const columns = [
    {
      key: "NOTIFICATIONKEY",
      header: "NOTIFICATION KEY",
      className: "relative",
      render: (value: string, row: NotifConfig) => (
        <div className="flex items-center">
          <a
            onClick={() => handleLinkClick(value)}
            className="text-[#deb941] cursor-pointer"
          >
            {value}
          </a>
          <div className="description-info-container">
            <InformationCircleIcon className="h-5 w-5 text-blue-600 ml-2" />
            <div className="description-info-popup">{row.DESCRIPTION}</div>
          </div>
        </div>
      ),
    },
    {
      key: "INTERFACEID",
      header: "INTERFACE/ BUSINESS EVENT / SOURCE SYSTEM",
      render: (_value: string, row: NotifConfig) =>
        `${row.INTERFACEID} / ${row.BUSINESSEVENT} / ${row.SOURCESYSTEM}`,
    },
    { key: "RECIPIENTTO", header: "RECIPIENT TO" },
    { key: "RECIPIENTCC", header: "RECIPIENT CC" },
    {
      key: "EMAILINFO",
      header: "EMAIL INFO",
      className: "text-center",
      render: (_value: string, row: NotifConfig) => (
        <EmailInfoPopup emailTemplate={row.EMAILTEMPLATE} />
      ),
    },
    {
      key: "CREATEDON",
      header: "CREATED",
      render: (value: string, row: NotifConfig) =>
        `${row.CREATEDBY} ${formatDate(value)}`,
    },
    {
      key: "UPDATEDON",
      header: "UPDATED",
      render: (value: string, row: NotifConfig) =>
        `${row.UPDATEDBY} ${formatDate(value)}`,
    },
  ];

  const table = (
    <div className="mt-4">
      <Table
        data={data?.data || []}
        columns={columns}
        name="notification configurations"
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
      header="Mule Notification Configs"
      searchProps={searchProps}
      table={table}
      createButton={
        <CreateNew onClick={handleCreate} name="Notificationconfig" />
      }
      pagination={paginationComponent}
      isLoading={awaitLoading}
      currentPage={currentPage}
      totalPages={Math.ceil(totalRows / 50)}
    ></PageLayout>
  );
}
