import React from "react";
import { Domains } from "@/app/lib/definitions";
import Link from "next/link";
import { format, formatDistanceToNow, parseISO } from "date-fns";

const formatDate = (createdOn: string) => {
  if (createdOn != null) {
    const date = parseISO(createdOn);
    // SG(UTC-8)
    date.setHours(date.getHours() - 8);
    const formattedDate = format(date, "dd MMMM yyyy HH:mm:ss");
    const relativeTime = formatDistanceToNow(date, { addSuffix: true });

    return `${formattedDate} (${relativeTime})`;
  } else {
    return createdOn;
  }
};

interface TableProps {
  data: Domains[];
}

const Table = ({ data }: TableProps) => {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>DOMAINID</th>
          <th>DOMAINDESCRIPTION</th>
          <th>CREATEDBY</th>
          <th>CREATEDON</th>
          <th>UPDATEDBY</th>
          <th>UPDATEDON</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.DOMAINID}>
            <td>
              <Link
                href={`/configurations/domains/${item.DOMAINID}`}
                className="text-orange-600 hover:text-orange-800"
              >
                {item.DOMAINID}
              </Link>
            </td>
            <td>{item.DOMAINDESCRIPTION}</td>
            <td>{item.CREATEDBY}</td>
            <td>{item.CREATEDON}</td>
            <td>{item.UPDATEDBY}</td>
            <td>{formatDate(item.UPDATEDON)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
