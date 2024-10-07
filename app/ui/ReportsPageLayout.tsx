import React from "react";
import Header from "../ui/header";
import { BarGraphSkeleton, PieChartSkeleton, ReportsDomain } from "./skeleton";
import DateRangeSearch from "./reports/dateSearch";
import "react-datepicker/dist/react-datepicker.css";

interface PageLayoutProps {
  header: string;
  isLoading: boolean;
  isSearchLoading?: boolean;
  barGraph?: React.ReactNode;
  pieChart?: React.ReactNode;
  headerDomain?: React.ReactNode;
  onDateRangeSearch?: (startDate: Date | null, endDate: Date | null) => void;
  initialStartDate: string;
  initialEndDate: string;
}

export default function PageLayout({
  header,
  barGraph,
  pieChart,
  headerDomain,
  onDateRangeSearch,
  initialStartDate,
  initialEndDate,
  isLoading,
}: PageLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white shadow pt-4 pb-4 flex h-[72px] justify-between items-center">
        <Header header={header} />
        {isLoading ? (
          <ReportsDomain />
        ) : (
          <div className="mr-6">{headerDomain}</div>
        )}
      </div>
      <div className="pr-4 py-4 pl-4 flex">
        <div className="py-2 pl-2 bg-white shadow w-full">
          <DateRangeSearch
            onSearch={onDateRangeSearch}
            initialStartDate={initialStartDate}
            initialEndDate={initialEndDate}
          />
        </div>
      </div>
      <div className="flex justify-between gap-x-10">
        {isLoading ? (
          <PieChartSkeleton />
        ) : (
          pieChart && (
            <div className="w-1/4 bg-transparent items-center">
              <div className="h-[100px]">{pieChart}</div>
            </div>
          )
        )}
        {isLoading ? (
          <BarGraphSkeleton />
        ) : (
          barGraph && (
            <div className="w-3/4 bg-transparent">
              <div className="h-[400px]">{barGraph}</div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
