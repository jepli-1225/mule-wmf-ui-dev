import React from "react";
import { NotifConfig } from "@/app/lib/definitions";
import Link from "next/link";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import HtmlDialog from "./HtmlDialog";
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
  data: NotifConfig[];
}

const Table = ({ data }: TableProps) => {
  return (
    <table className="table-auto bg-white">
      <thead>
        <tr>
          <th>NOTIFICATION KEY</th>
          <th>INTERFACE/ BUSINESS EVENT / SOURCE SYSTEM</th>
          <th>RECIPIENT TO</th>
          <th>RECIPIENT CC</th>
          <th>EMAIL INFO</th>
          <th>CREATED</th>
          <th>UPDATED</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.NOTIFICATIONKEY}>
            <td>
              <Link
                href={`/configurations/notifConfig/${item.NOTIFICATIONKEY}`}
                className="text-orange-600 hover:text-orange-800"
              >
                {item.NOTIFICATIONKEY}
                <div className="description-info-container">
                  <InformationCircleIcon className="h-5 w-5 text-blue-600" />
                  <div className="description-info-popup">
                    {item.DESCRIPTION}
                  </div>
                </div>
              </Link>
            </td>
            <td>
              {item.INTERFACEID} / {item.BUSINESSEVENT} / {item.SOURCESYSTEM}
            </td>
            <td>{item.RECIPIENTTO}</td>
            <td>{item.RECIPIENTCC}</td>
            <td className="border px-4 text-center relative">
              <div className="email-info-container">
                <InformationCircleIcon className="h-5 w-5 text-blue-600" />
                <div className="email-info-popup">
                  {<HtmlDialog htmlContent={item.EMAILTEMPLATE} />}
                </div>
              </div>
            </td>
            <td>{`${item.CREATEDBY} ${item.CREATEDON}`}</td>
            <td>{`${item.UPDATEDBY} ${formatDate(item.UPDATEDON)}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
