import React, { useEffect, useState } from "react";
import { Domains } from "@/app/lib/definitions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SearchProps {
  placeholder: string;
  onSearch: (queries: Record<string, string>) => void;
  domains: Domains[];
  initialStartDate: string;
  initialEndDate: string;
}

export default function Search({
  placeholder,
  onSearch,
  domains,
  initialStartDate,
  initialEndDate,
}: SearchProps) {
  const [searchTerm, setSearchTerm] = useState({
    general: "",
    domain: "",
  });
  const [startDate, setStartDate] = useState<Date>(new Date(initialStartDate));
  const [endDate, setEndDate] = useState<Date>(new Date(initialEndDate));

  useEffect(() => {
    handleSearch();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setSearchTerm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    onSearch({
      ...searchTerm,
      startDate: startDate ? startDate.toISOString() : "",
      endDate: endDate ? endDate.toISOString() : "",
    });
  };

  const resetSearch = () => {
    const end = new Date();
    const start = new Date();
    end.setDate(end.getDate() + 1);
    setStartDate(start);
    setEndDate(end);
    setSearchTerm({
      general: "",
      domain: "",
    });
    onSearch({
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    });
  };

  return (
    <div className="flex flex-col gap-4 text-sm">
      <div className="flex">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm.general}
          onChange={(e) => handleInputChange("general", e.target.value)}
          className="border border-gray-400 rounded bg-white px-2 py-1"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-4 rounded"
        >
          Search
        </button>
        <button
          onClick={resetSearch}
          className="border border-gray-400 ml-2 bg-white-500 hover:bg-gray-200 text-black py-1 px-4 rounded"
        >
          Reset
        </button>
        <select
          value={searchTerm.domain}
          onChange={(e) => handleInputChange("domain", e.target.value)}
          className="border border-gray-400 rounded bg-white px-2 py-1 ml-10 text-sm w-24"
        >
          <option value="">All</option>
          {domains.map((domain) => (
            <option key={domain.DOMAINID} value={domain.DOMAINID}>
              {domain.DOMAINID}
            </option>
          ))}
        </select>
        <div className="ml-10 flex items-center">
          <span className="mr-2 text-sm">Start Date:</span>
          <div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date || new Date())}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select start date"
              className="border border-gray-400 rounded bg-white px-2 py-1 text-sm"
            />
          </div>
        </div>
        <div className="ml-4 flex items-center">
          <span className="mr-2 text-sm">End Date:</span>
          <div>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date || new Date())}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select end date"
              className="border border-gray-400 rounded bg-white px-2 py-1 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
