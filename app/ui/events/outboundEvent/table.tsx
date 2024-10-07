import { OutboundEvent } from "@/app/lib/definitions";
import Link from "next/link";
import { format, formatDistanceToNow, parseISO } from "date-fns";

interface TableProps {
  data: OutboundEvent[];
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
          <th>STATUS</th>
          <th>TARGET SYSTEM</th>
          <th>CREATED</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="transaction-id-column">
              <Link
                href={`/events/outboundEvent/${item.TRANSACTIONID}`}
                className="text-orange-600 hover:text-orange-800"
              >
                {item.TRANSACTIONID}
              </Link>
            </td>
            <td>{item.INSTANCEID}</td>
            <td>{item.INTERFACEID}</td>
            <td>{item.BUSINESSEVENT}</td>
            <td>{item.DOMAINID}</td>
            <td>{item.STATUS}</td>
            <td>{item.TARGETSYSTEM}</td>
            <td>{`${item.CREATEDBY} ${formatDate(item.CREATEDON)}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
