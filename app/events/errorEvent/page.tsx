"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import Table from "@/app/ui/table";
import type { ErrorEvent } from "../../lib/definitions";
import PageLayout from "@/app/ui/PageLayout";
import Link from "next/link";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import useFetchData from "@/app/lib/utils/hooks/useFetchData";
import { Download } from "@/app/ui/events/errorEvent/buttons";
import { useSearchParams } from "next/navigation";
import Pagination from "@/app/ui/pagination";

export default function ErrorEventsPage() {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [awaitLoading, setAwaitLoading] = useState(true);
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({
    startDate: new Date().toISOString().split("T")[0] + "T00:00:00.000Z",
    endDate:
      new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split("T")[0] + "T00:00:00.000Z",
  });

  const { data, loading, debouncedFetch } = useFetchData<{
    data: ErrorEvent[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>("/api/events/errorEvents");

  const totalRowOnPage = data?.data.length || 0;
  const totalRows = data?.pagination.total || 0;

  const handleSearch = useCallback(
    (queries: Record<string, string>) => {
      if (queries.startDate) {
        queries.startDate =
          new Date(queries.startDate).toISOString().split("T")[0] +
          "T00:00:00.000Z";
      }
      if (queries.endDate) {
        queries.endDate =
          new Date(
            new Date(queries.endDate).setDate(
              new Date(queries.endDate).getDate() + 1
            )
          )
            .toISOString()
            .split("T")[0] + "T00:00:00.000Z";
      }
      const newQueries = { ...queries };
      setSearchQueries(newQueries);
      setCurrentPage(1);
      const queryString = new URLSearchParams({
        ...newQueries,
        page: "1",
        limit: itemsPerPage.toString(),
      }).toString();
      debouncedFetch(queryString)?.finally(() => setAwaitLoading(false));
    },
    [itemsPerPage]
  );

  useEffect(() => {
    if (!loading) {
      setAwaitLoading(false);
    }
  }, [loading]);

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

  useEffect(() => {
    setAwaitLoading(true);
    const relatedInboundInstance = searchParams.get("relatedInboundInstance");
    if (relatedInboundInstance) {
      handleSearch({ relatedInboundInstance });
    }
  }, []);

  const handleDownload = useCallback(async (errorId: string) => {
    try {
      const response = await fetch(
        `/api/events/errorEvents/download/${errorId}`
      );
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `ERROR_EVENT_${errorId}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }, []);

  const formatDate = (createdOn: string) => {
    if (createdOn) {
      const date = parseISO(createdOn);
      date.setHours(date.getHours() - 8);
      const formattedDate = format(date, "HH:mm");
      const relativeTime = formatDistanceToNow(date, { addSuffix: true });
      if (date.getFullYear() < 1900) return "";
      return `${formattedDate} (${relativeTime})`;
    } else {
      return ``;
    }
  };

  const columns = useMemo(
    () => [
      {
        key: "ERRORID",
        header: "ERROR ID",
        render: (value: string) => (
          <Link href={`/events/errorEvent/${value}`} className="text-[#deb941]">
            {value}
          </Link>
        ),
      },
      { key: "ERRORTITLE", header: "ERROR TITLE" },
      { key: "ERRORDETAIL", header: "ERROR DETAIL" },
      { key: "STATUS", header: "STATUS" },
      {
        key: "CREATEDON",
        header: "CREATED",
        render: (value: string, row: ErrorEvent) =>
          `${row.CREATEDBY} ${formatDate(value)}`,
      },
      {
        key: "ACTIONS",
        header: "ACTIONS",
        render: (_value: string, row: ErrorEvent) => (
          <Download errorId={row.ERRORID} />
        ),
      },
    ],
    [formatDate]
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" &&
        target.textContent?.trim() === "Download"
      ) {
        const errorId = target.getAttribute("data-error-id");
        if (errorId) {
          handleDownload(errorId);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [handleDownload]);

  const table = useMemo(
    () => (
      <div className="mt-4">
        <Table
          data={data?.data || []}
          columns={columns}
          name="error events"
          rightHeader={true}
          isRightAlignedRows={true}
        />
      </div>
    ),
    [data, columns]
  );

  const paginationComponent = useMemo(
    () =>
      data?.pagination && (
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalRowOnPage={totalRowOnPage}
          totalRows={totalRows}
          itemsPerPage={itemsPerPage}
        />
      ),
    [
      data?.pagination,
      currentPage,
      handlePageChange,
      totalRowOnPage,
      totalRows,
      itemsPerPage,
    ]
  );

  const searchProps = useMemo(
    () => ({
      onSearch: handleSearch,
      placeholder: "Search...",
      fields: [
        { key: "general", placeholder: "Search" },
        {
          key: "relatedInboundInstance",
          placeholder: "Related Inbound Instance",
        },
      ],
      showDatePicker: true,
      showAdvancedSearch: false,
      initialStartDate: searchQueries.startDate,
      initialEndDate: searchQueries.endDate,
    }),
    [handleSearch, searchQueries.startDate, searchQueries.endDate]
  );

  return (
    <PageLayout
      header="Mule Error Events"
      searchProps={searchProps}
      table={table}
      pagination={paginationComponent}
      isLoading={awaitLoading}
      currentPage={currentPage}
      totalPages={data?.pagination.totalPages || 0}
    />
  );
}
