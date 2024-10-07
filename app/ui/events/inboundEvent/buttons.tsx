import Link from "next/link";
import React from "react";

export const ViewErrors = ({ transactionId }: { transactionId: string }) => {
  return (
    <Link href={`/events/errorEvent?relatedInboundInstance=${transactionId}`}>
      <button className="bg-orange-500 text-white px-1 h-[26px] border border-black hover:bg-orange-600 whitespace-nowrap">
        View Errors
      </button>
    </Link>
  );
};

export const Download = () => {
  return (
    <button className="bg-blue-500 text-white px-1 h-[26px] border border-black hover:bg-blue-600 whitespace-nowrap">
      Download
    </button>
  );
};

export const View = () => {
  return (
    <button className="bg-blue-500 text-white px-1 h-[26px] border border-black hover:bg-blue-600 whitespace-nowrap">
      View
    </button>
  );
};

export const Replay = () => {
  return (
    <button className="bg-red-600 text-white px-1 h-[26px] border border-black hover:bg-red-700 whitespace-nowrap">
      Replay
    </button>
  );
};
