import React, { useState } from "react";
import DatePicker from "react-datepicker";

interface PieDateSearchProps {
  onSearch?: (date: Date | null) => void;
  dateSearch?: string;
}

export default function PieDateSearch({
  onSearch,
  dateSearch,
}: PieDateSearchProps) {
  const [date, setDate] = useState<Date | null>(
    dateSearch ? new Date(dateSearch) : null
  );

  const handleDateChange = (date: Date | null) => {
    setDate(date);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center pb-4">
      <div className="flex items-center pr-2 pl-4">
        <DatePicker
          selected={date}
          onChange={(date) => handleDateChange(date)}
          dateFormat="yyyy-MM-dd"
          className="border border-gray-400 rounded text-xs bg-white px-2 w-28 h-[24px]"
        />
      </div>
      <div className="text-sm">
        <button
          onClick={() => onSearch && onSearch(date)}
          className="border border-gray-300 bg-white hover:bg-[#f6f6f6] hover:border-b text-[#c3a300] text-xs px-6 rounded border-b-2 border-b-[#d0d1d1] h-[24px]"
        >
          Ok
        </button>
      </div>
    </div>
  );
}
