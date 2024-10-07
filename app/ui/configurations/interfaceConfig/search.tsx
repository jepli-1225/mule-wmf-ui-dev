import React, { useState } from "react";

interface SearchProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

export default function Search({ placeholder, onSearch }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const resetSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <div className="w-64">
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleInputChange}
            className="border border-gray-400 rounded bg-white px-3 py-1 text-sm w-full"
          />
        </div>
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
      </div>
    </div>
  );
}
