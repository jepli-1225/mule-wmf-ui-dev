import Link from "next/link";
import React from "react";

export const Download = () => {
  return (
    <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
      Download
    </button>
  );
};

export const View = () => {
  return (
    <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
      View
    </button>
  );
};

export const Replay = () => {
  return (
    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
      Replay
    </button>
  );
};

export const SaveNewDetails = () => {
  return (
    <button className="bg-white-500 text-yellow-600 px-3 py-1 rounded hover:bg-gray-300 border border-gray-400">
      <Link href={`/configurations/interfaceConfig`}>Save & New</Link>
    </button>
  );
};
