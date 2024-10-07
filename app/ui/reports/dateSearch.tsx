import React, { useState } from "react";
import DatePicker from "react-datepicker";

interface DateRangeSearchProps {
  onSearch?: (startDate: Date | null, endDate: Date | null) => void;
  initialStartDate?: string;
  initialEndDate?: string;
}

export default function DateRangeSearch({
  onSearch,
  initialStartDate,
  initialEndDate,
}: DateRangeSearchProps) {
  const [startDate, setStartDate] = useState<Date | null>(
    initialStartDate ? new Date(initialStartDate) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    initialEndDate ? new Date(initialEndDate) : null
  );

  const handleDateChange = (date: Date | null, isStartDate: boolean) => {
    if (isStartDate) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center">
      <div className="flex items-center">
        <span className="text-[10px] mr-2">Start Date</span>
        <DatePicker
          selected={startDate}
          onChange={(date) => handleDateChange(date, true)}
          dateFormat="yyyy-MM-dd"
          className="border border-gray-400 rounded text-xs bg-white px-2 w-34 h-[24px]"
        />
      </div>
      <div className="flex items-center pl-16 pr-2">
        <span className="text-[10px] mr-2">End Date</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => handleDateChange(date, false)}
          dateFormat="yyyy-MM-dd"
          className="border border-gray-400 rounded text-xs bg-white px-2 w-34 h-[24px]"
        />
      </div>
      <div className="text-sm">
        <button
          onClick={() => onSearch && onSearch(startDate, endDate)}
          className="bg-[#cba900] hover:bg-[#a68c05] text-white text-xs px-3 rounded border-b-2 border-b-[#a68c05] h-[24px]"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
