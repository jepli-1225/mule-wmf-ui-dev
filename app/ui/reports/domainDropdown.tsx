import React from "react";
import { Domains } from "../../lib/definitions";

interface DomainDropdownProps {
  domains: Domains[];
  onChange: (value: string) => void;
}

export default function DomainDropdown({
  domains,
  onChange,
}: DomainDropdownProps) {
  return (
    <>
      <span className="text-[10px] pr-2">Domain</span>
      <select
        onChange={(e) => onChange(e.target.value)}
        className="text-[10px] border border-gray-400 rounded bg-white py-1 pl-1"
      >
        <option value="">All</option>
        {domains.map((domain) => (
          <option key={domain.DOMAINID} value={domain.DOMAINID}>
            {domain.DOMAINID}
          </option>
        ))}
      </select>
    </>
  );
}
