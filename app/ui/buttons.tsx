import React from "react";

interface ButtonProps {
  onClick?: () => void;
}

export const SaveDetails: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button
      className="border bg-[#cba900] hover:bg-[#cba900] hover:border-b text-white py-1 px-5 rounded border-b-2 border-b-[#a68c05] text-xs"
      onClick={onClick}
    >
      Save
    </button>
  );
};

export function CancelDetails({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-gray-300 bg-white hover:bg-[#f6f6f6] hover:border-b text-[#c3a300] text-xs py-1 px-4 rounded border-b-2 border-b-[#d0d1d1]"
    >
      Cancel
    </button>
  );
}

interface ButtonProps {
  onClick?: () => void;
}

export function CreateNew({
  onClick,
  name,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  name: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border bg-[#cba900] hover:bg-[#cba900] hover:border-b text-white py-1 px-4 rounded border-b-2 border-b-[#a68c05] text-[10px]"
    >
      {`Create a new Mule ${name}`}
    </button>
  );
}
