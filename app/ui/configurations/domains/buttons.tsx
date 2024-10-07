import Link from "next/link";
import React from "react";

interface ButtonProps {
  onClick?: () => void;
}

export const Delete: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button
      className="border border-gray-300 bg-white hover:bg-[#f6f6f6] hover:border-b text-[#c3a300] text-[11px] py-0.5 font-semibold px-3 rounded border-b-2 border-b-[#d0d1d1]"
      onClick={onClick}
    >
      Delete
    </button>
  );
};
