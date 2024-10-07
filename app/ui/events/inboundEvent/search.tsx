import { Domains } from "@/app/lib/definitions";
import React, { useEffect, useState } from "react";
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
    interfaceId: "",
    businessEvent: "",
    status: "",
    sourceSystem: "",
    domain: "",
  });
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date(initialStartDate));
  const [endDate, setEndDate] = useState<Date>(new Date(initialEndDate));

  useEffect(() => {
    handleSearch();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setSearchTerm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
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
      interfaceId: "",
      businessEvent: "",
      status: "",
      sourceSystem: "",
      domain: "",
    });
    onSearch({
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm.general}
          onChange={(e) => handleInputChange("general", e.target.value)}
          className="border border-gray-400 rounded bg-white px-2 py-1 text-sm"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-4 rounded text-sm"
        >
          Search
        </button>
        <button
          onClick={resetSearch}
          className="border border-gray-400 ml-2 bg-white-500 hover:bg-gray-200 text-black py-1 px-4 rounded text-sm"
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
      <div>
        <button
          onClick={toggleAdvancedSearch}
          className={`border border-gray-400 bg-white hover:bg-gray-200 text-black py-1 text-sm px-20 rounded ${
            showAdvancedSearch ? `text-yellow-600` : `text-black`
          }`}
        >
          Advanced Search
        </button>
      </div>
      {showAdvancedSearch && (
        <>
          <div className="flex">
            <input
              type="text"
              placeholder="Search Interface ID"
              value={searchTerm.interfaceId}
              onChange={(e) => handleInputChange("interfaceId", e.target.value)}
              className="border border-gray-400 bg-white rounded px-8 py-1 text-sm"
            />
            <input
              type="text"
              placeholder="Search Business Event"
              value={searchTerm.businessEvent}
              onChange={(e) =>
                handleInputChange("businessEvent", e.target.value)
              }
              className="border border-gray-400 rounded bg-white px-8 py-1 ml-2 text-sm"
            />
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Search Status"
              value={searchTerm.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="border border-gray-400 rounded bg-white px-8 py-1 text-sm"
            />
            <input
              type="text"
              placeholder="Search Source System"
              value={searchTerm.sourceSystem}
              onChange={(e) =>
                handleInputChange("sourceSystem", e.target.value)
              }
              className="border border-gray-400 rounded bg-white px-8 py-1 ml-2 text-sm"
            />
          </div>
        </>
      )}
    </div>
  );
}
