import React from "react";

export default function Header({ header }: { header: string }) {
  return (
    <div>
      <h1 className={`text-[24px] text-black pl-6 font-bold`}>{header}</h1>
    </div>
  );
}
