import "./globals.css";
import SideNav from "./ui/sidenav/sidenav";
import UserAvatar from "@/app/components/user/user-avatar";
import { SignOut } from "@/app/components/user/sign-out";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="min-h-screen">
      <body className="flex flex-col">
        <div className="flex fixed z-50 w-full justify-between items-center bg-[#2d323c]">
          <SideNav />
          <div className="flex-grow flex z-60 justify-end items-center pr-6 text-[10px] h-[38px] text-white gap-x-4">
            <UserAvatar />
            <SignOut />
            <Link href="/UserPages/userProfile">
              <button className="text-white">Profile</button>
            </Link>
          </div>
        </div>
        <div className="flex-grow bg-[#edf1f3] w-full mt-9">
          <div className="bg-transparent flex-grow">{children}</div>
        </div>
      </body>
    </html>
  );
}
