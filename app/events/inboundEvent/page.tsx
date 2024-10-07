"use client";
import React, { useState, useEffect, useCallback } from "react";
import Table from "@/app/ui/table";
import type { InboundEvent, Domains } from "../../lib/definitions";
import PageLayout from "@/app/ui/PageLayout";
import Link from "next/link";
import {
  ViewErrors,
  View,
  Download,
  Replay,
} from "@/app/ui/events/inboundEvent/buttons";
import { format, getHours, parseISO } from "date-fns";
import useFetchData from "@/app/lib/utils/hooks/useFetchData";
import Pagination from "@/app/ui/pagination";

export default function InboundEventsPage() {
  const [domains, setDomains] = useState<Domains[]>([]);
  const [awaitLoading, setAwaitLoading] = useState(true);
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({
    startDate: new Date().toISOString().split("T")[0] + "T00:00:00.000Z",
    endDate:
      new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split("T")[0] + "T00:00:00.000Z",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [isSearchLoading, setIsSearchLoading] = useState(true);

  const { data, loading, debouncedFetch } = useFetchData<{
    data: InboundEvent[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>("/api/events/inboundEvents");

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

  const fetchDomains = useCallback(async () => {
    try {
      const res = await fetch("/api/configurations/domains");
      if (!res.ok) throw new Error("Failed to fetch domains");
      const data = await res.json();
      setDomains(data.data);
    } catch (error) {
      console.error("Error fetching inbound events:", error);
    }
  }, []);

  const searchProps = {
    onSearch: handleSearch,
    placeholder: "Search...",
    fields: [
      { key: "general", placeholder: "Search" },
      { key: "interfaceId", placeholder: "Interface ID" },
      { key: "businessEvent", placeholder: "Business Event" },
      { key: "status", placeholder: "Status" },
      { key: "sourceSystem", placeholder: "Source System" },
    ],
    domains: domains.map((domain) => ({
      value: domain.DOMAINID,
      label: domain.DOMAINID,
    })),
    showDatePicker: true,
    showAdvancedSearch: true,
    initialStartDate: new Date().toISOString(),
    initialEndDate: new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toISOString(),
  };

  const formatDate = (createdOn: string) => {
    const date = parseISO(createdOn);
    // SG(UTC-8)
    date.setHours(getHours(createdOn) - 8);
    const formattedDate = format(date, "dd MMMM yyyy HH:mm:ss");
    if (date.getFullYear() < 1900) return "";

    return `${formattedDate}`;
  };

  const columns = [
    {
      key: "TRANSACTIONID",
      header: "TRANSACTION",
      render: (value: string) => (
        <Link href={`/events/inboundEvent/${value}`} className="text-[#deb941]">
          {value}
        </Link>
      ),
    },
    { key: "INSTANCEID", header: "INSTANCE" },
    { key: "INTERFACEID", header: "INTERFACE" },
    { key: "BUSINESSEVENT", header: "BUSINESS EVENT" },
    { key: "DOMAINID", header: "DOMAIN" },
    { key: "SOURCESYSTEM", header: "SOURCE SYSTEM" },
    { key: "TARGETSYSTEM", header: "TARGET SYSTEM" },
    { key: "STATUS", header: "STATUS" },
    {
      key: "CREATEDON",
      header: "CREATED",
      render: (value: string, row: InboundEvent) =>
        `${row.CREATEDBY} ${formatDate(value)}`,
    },
    {
      key: "ACTIONS",
      header: "ACTIONS",
      render: (_value: string, row: InboundEvent) => (
        <div className="action-buttons">
          <ViewErrors transactionId={row.TRANSACTIONID} />
          {/* <Download />
          <View />
          <Replay /> */}
        </div>
      ),
    },
  ];

  const table = (
    <div className="mt-4">
      <Table
        data={data?.data || []}
        columns={columns}
        name="inbound events"
        specialId={true}
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

  useEffect(() => {
    setAwaitLoading(true);
    const loadDomains = async () => {
      setIsSearchLoading(true);
      await fetchDomains();
      setIsSearchLoading(false);
    };
    loadDomains();
  }, [fetchDomains]);

  return (
    <PageLayout
      header="Mule Inbound Events"
      searchProps={searchProps}
      table={table}
      pagination={paginationComponent}
      isLoading={awaitLoading}
      currentPage={currentPage}
      totalPages={Math.ceil(totalRows / 50)}
      isSearchLoading={isSearchLoading}
    ></PageLayout>
  );
}
