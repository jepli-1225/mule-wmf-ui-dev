import React from "react";

export const Download = ({ errorId }: { errorId: string }) => {
  return (
    <button
      className="border border-gray-300 bg-white-500 hover:bg-[#f6f6f6] hover:border-b text-[#c3a300] py-1 px-4 rounded border-b-2 border-b-[#d0d1d1] text-xs"
      data-error-id={errorId}
    >
      Download
    </button>
  );
};

export function ViewPopup({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-black bg-[#0074c1] px-1 text-[10px] py-1 text-white font-bold"
    >
      View
    </button>
  );
}

export const SaveDetailsPopup = () => {
  return (
    <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-orange-600">
      Save
    </button>
  );
};
