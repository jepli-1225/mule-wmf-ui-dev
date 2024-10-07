import React from "react";
import SideNav from "../ui/sidenav/sidenav";
import Header from "../ui/header";
import { DetailPage } from "./skeleton";

interface DetailsLayoutProps {
  children?: React.ReactNode;
  header: string;
  extraButton?: React.ReactNode;
  isLoading?: Boolean;
}

export default function DetailsPageLayout({
  children,
  header,
  extraButton,
  isLoading,
}: DetailsLayoutProps) {
  return (
    <>
      <div className="text-sm flex flex-col h-full">
        <div className="bg-white shadow pt-4 pb-4 h-[72px] flex justify-between items-center">
          <Header header={header} />
          {extraButton && <div className="mr-4">{extraButton}</div>}
        </div>
        {isLoading ? <DetailPage /> : <div className="pl-6">{children}</div>}
      </div>
    </>
  );
}
