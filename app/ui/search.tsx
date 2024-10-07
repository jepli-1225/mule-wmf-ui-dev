import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

interface SearchProps {
  onSearch: (queries: Record<string, string>) => void;
  fields: Array<{
    key: string;
    placeholder: string;
  }>;
  domains?: Array<{ value: string; label: string }>;
  showDatePicker?: boolean;
  showAdvancedSearch?: boolean;
  initialStartDate?: string;
  initialEndDate?: string;
}

export default function Search({
  onSearch,
  fields,
  domains,
  showDatePicker,
  showAdvancedSearch,
  initialStartDate,
  initialEndDate,
}: SearchProps) {
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(
    initialStartDate ? new Date(initialStartDate) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    initialEndDate ? new Date(initialEndDate) : null
  );

  useEffect(() => {
    if (initialStartDate && initialEndDate) {
      handleSearch();
    }
  }, []);

  const handleDateChange = (date: Date | null, isStartDate: boolean) => {
    if (isStartDate) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }

    const queries: Record<string, string> = { ...searchTerms };
    queries.startDate = startDate ? startDate.toISOString() : "";
    queries.endDate = endDate ? endDate.toISOString() : "";

    if (isStartDate && date) {
      queries.startDate = date.toISOString();
    } else if (!isStartDate && date) {
      queries.endDate = date.toISOString();
    }

    onSearch(queries);
  };

  const handleInputChange = (field: string, value: string) => {
    setSearchTerms((prev) => ({ ...prev, [field]: value }));

    if (field === "startDate" || field === "endDate") {
      const queries: Record<string, string> = { ...searchTerms };
      if (showDatePicker) {
        queries.startDate = startDate ? startDate.toISOString() : "";
        queries.endDate = endDate ? endDate.toISOString() : "";
      }
      onSearch(queries);
    }
  };

  const handleSearch = () => {
    const queries: Record<string, string> = { ...searchTerms };
    if (showDatePicker) {
      queries.startDate = startDate ? startDate.toISOString() : "";
      queries.endDate = endDate ? endDate.toISOString() : "";
    }
    onSearch(queries);
  };

  const resetSearch = () => {
    setSearchTerms({});
    if (showDatePicker) {
      const end = new Date();
      const start = new Date();
      end.setDate(end.getDate() + 1);
      setStartDate(start);
      setEndDate(end);
      onSearch({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      });
    } else {
      onSearch({});
    }

    const domainSelect = document.querySelector(
      'select[name="domain"]'
    ) as HTMLSelectElement;
    if (domainSelect) {
      domainSelect.value = "";
    }
  };

  const toggleAdvancedSearch = () => {
    setShowAdvanced(!showAdvanced);
  };

  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setContentHeight(entry.target.scrollHeight);
        }
      });

      resizeObserver.observe(contentRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <div
      className={`flex flex-col text-sm ${showAdvancedSearch ? "" : "pb-2"}`}
    >
      <div className="flex flex-wrap gap-2 pl-2">
        <input
          type="text"
          value={searchTerms[fields[0].key] || ""}
          onChange={(e) => handleInputChange(fields[0].key, e.target.value)}
          className="border border-gray-400 rounded bg-white px-2 py-1 w-72 h-[24px]"
        />
        <button
          onClick={handleSearch}
          className="bg-[#cba900] hover:bg-[#a68c05] text-white text-xs px-3 rounded border-b-2 border-b-[#a68c05] h-[24px]"
        >
          Search
        </button>
        <button
          onClick={resetSearch}
          className="border border-gray-300 bg-white hover:bg-[#f6f6f6] hover:border-b text-[#c3a300] text-xs px-4 rounded border-b-2 border-b-[#d0d1d1] h-[24px]"
        >
          Reset
        </button>

        <div className="ml-4">
          {domains && (
            <>
              <span className="pr-2 text-[10px]">Domain</span>
              <select
                name="domains"
                onChange={(e) => handleInputChange("domain", e.target.value)}
                className="border border-gray-400 text-xs rounded bg-white pl-1 h-[24px]"
              >
                <option value="">All</option>
                {domains.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        {showDatePicker && (
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex items-center ml-4">
              <span className="mr-2 text-[10px]">Start</span>
              <DatePicker
                selected={startDate}
                onChange={(date) => handleDateChange(date, true)}
                dateFormat="yyyy-MM-dd"
                className="border border-gray-400 rounded text-xs bg-white px-2 w-28 h-[24px]"
              />
            </div>
            <div className="flex items-center ml-4">
              <span className="mr-2 text-[10px]">End</span>
              <DatePicker
                selected={endDate}
                onChange={(date) => handleDateChange(date, false)}
                dateFormat="yyyy-MM-dd"
                className="border border-gray-400 rounded text-xs bg-white px-2 w-28 z-10 h-[24px]"
              />
            </div>
          </div>
        )}
      </div>
      {showAdvancedSearch && (
        <div className="pt-2">
          <button
            onClick={toggleAdvancedSearch}
            className={`advancedSearchButton border border-gray-300 bg-white text-black text-xs w-full flex flex-wrap gap-2 pl-2 pt-2 pb-2 justify-between items-center pr-3 ${
              showAdvanced ? "text-yellow-600" : "text-black"
            }`}
          >
            Advanced Search
            <div className="w-5 h-5 text-gray-600 chevronIcon">
              {showAdvanced ? (
                <ChevronUpIcon className="text-yellow-600" />
              ) : (
                <ChevronDownIcon />
              )}
            </div>
          </button>
          <div
            ref={contentRef}
            className={`advancedSearchContainer ${showAdvanced ? "open" : ""}`}
            style={{ maxHeight: showAdvanced ? `${contentHeight}px` : "0" }}
          >
            <div className="flex flex-wrap pl-2">
              {fields.slice(1).map((field, index) => (
                <div
                  key={field.key}
                  className={`w-1/2 flex pb-2 ${index % 2 === 0 ? "" : "pl-2"}`}
                >
                  <div className="flex w-full items-center text-[10px]">
                    <div className="w-1/4">{field.placeholder}</div>
                    <input
                      key={field.key}
                      type="text"
                      value={searchTerms[field.key] || ""}
                      onChange={(e) =>
                        handleInputChange(field.key, e.target.value)
                      }
                      className="border border-gray-400 rounded bg-white py-1 w-3/5 pl-2 pr-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
