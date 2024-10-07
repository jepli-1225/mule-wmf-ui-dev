import { InboundEvent } from "@/app/lib/definitions";
import { ViewErrors } from "./buttons";
import Link from "next/link";
import { format, formatDistanceToNow, parseISO } from "date-fns";

interface TableProps {
  data: InboundEvent[];
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
    <table className="table-auto">
      <thead>
        <tr>
          <th>TRANSACTION</th>
          <th>INSTANCE</th>
          <th>INTERFACE</th>
          <th>BUSINESS EVENT</th>
          <th>DOMAIN</th>
          <th>SOURCE SYSTEM</th>
          <th>TARGET SYSTEM</th>
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
                href={`/events/inboundEvent/${item.TRANSACTIONID}`}
                className="text-orange-600 hover:text-orange-800"
              >
                {item.TRANSACTIONID}
              </Link>
            </td>
            <td>{item.INSTANCEID}</td>
            <td>{item.INTERFACEID}</td>
            <td>{item.BUSINESSEVENT}</td>
            <td>{item.DOMAINID}</td>
            <td>{item.SOURCESYSTEM}</td>
            <td>{item.TARGETSYSTEM}</td>
            <td>{item.STATUS}</td>
            <td>{`${item.CREATEDBY} ${formatDate(item.CREATEDON)}`}</td>
            <td>
              <ViewErrors transactionId={item.TRANSACTIONID} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
