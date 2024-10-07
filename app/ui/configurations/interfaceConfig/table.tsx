import React from "react";
import { InterfaceConfig } from "@/app/lib/definitions";
import Link from "next/link";
import { format, formatDistanceToNow, parseISO } from "date-fns";

const formatDate = (createdOn: string) => {
  const date = parseISO(createdOn);
  // SG(UTC-8)
  date.setHours(date.getHours() - 8);
  const formattedDate = format(date, "dd MMMM yyyy HH:mm:ss");
  const relativeTime = formatDistanceToNow(date, { addSuffix: true });

  return `${formattedDate} (${relativeTime})`;
};

interface TableProps {
  data: InterfaceConfig[];
}

// const formatDate = (createdOn: string) => {
//   const date = new Date(createdOn);
//   const options: Intl.DateTimeFormatOptions = {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   };
//   return date.toLocaleDateString("en-GB", options);
// };

const Table = ({ data }: TableProps) => {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>ID</th>
          <th>INTERFACE</th>
          <th>SOURCE SYSTEM</th>
          <th className="pr-8 break-words">TARGET SYSTEM</th>
          <th>BUSINESS EVENT</th>
          <th>DOMAIN</th>
          <th>DESTINATION VALUE</th>
          <th>DESTINATION TYPE</th>
          <th>CREATED</th>
          <th>UPDATEDBY</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.ID}>
            {/* <td className="transaction-id-column"> */}
            <td>
              <Link
                href={`/configurations/interfaceConfig/${item.ID}`}
                className="text-orange-600 hover:text-orange-800"
              >
                {item.ID}
              </Link>
            </td>
            {/* </td> */}
            <td>{item.INTERFACEID}</td>
            <td>{item.SOURCESYSTEM}</td>
            <td className="break-all">{item.TARGETSYSTEM}</td>
            <td>{item.BUSINESSEVENT}</td>
            <td>{item.DOMAINID}</td>
            <td>{item.DESTINATIONVALUE}</td>
            <td>{item.DESTINATIONTYPE}</td>
            <td>{`${item.CREATEDBY} ${
              // formatDate(item.CREATEDON.split("T")[0]) +
              // " " +
              // item.CREATEDON.split("T")[1]
              formatDate(item.CREATEDON)
            }`}</td>
            <td>{`${item.UPDATEDBY} ${
              // formatDate(item.UPDATEDON.split("T")[0]) +
              // " " +
              // item.UPDATEDON.split("T")[1]
              formatDate(item.UPDATEDON)
            }`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
