import { ErrorEvent } from "@/app/lib/definitions";
import Link from "next/link";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { Download } from "./buttons";

interface TableProps {
  data: ErrorEvent[];
}

const formatDate = (createdOn: string) => {
  const date = parseISO(createdOn);
  // SG(UTC-8)
  date.setHours(date.getHours() - 8);
  const formattedDate = format(date, "dd MMMM yyyy HH:mm:ss");
  const relativeTime = formatDistanceToNow(date, { addSuffix: true });

  return `${formattedDate} (${relativeTime})`;
};

const Table = ({ data }: TableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ERROR ID</th>
          <th>ERROR TITLE</th>
          <th>ERROR DETAIL</th>
          <th>STATUS</th>
          <th>CREATED</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="transaction-id-column">
              <Link
                href={`/events/errorEvent/${item.ERRORID}`}
                className="text-orange-600 hover:text-orange-800"
              >
                {item.ERRORID}
              </Link>
            </td>
            <td>{item.ERRORTITLE}</td>
            <td>{item.ERRORDETAIL}</td>
            <td>{item.STATUS}</td>
            <td>{`${item.CREATEDBY} ${
              // formatDate(item.CREATEDON.split("T")[0]) +
              // " " +
              // item.CREATEDON.split("T")[1]
              formatDate(item.CREATEDON)
            }`}</td>
            <td>
              <Download errorId={item.ERRORID} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
