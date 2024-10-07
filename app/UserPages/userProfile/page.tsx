"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import DetailsPageLayout from "@/app/ui/detailsPageLayout";

export default function UserCard() {
  const [email, setEmail] = useState<string>("");
  const [primaryRole, setPrimaryRole] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessionAndRoles = async () => {
      try {
        setIsLoading(true);
        const session = await getSession();
        if (session && session.user) {
          setEmail(session.user.email ?? "");
          setPrimaryRole(session.user.primaryRole ?? "");
        } else {
          console.error("No session found");
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessionAndRoles();
  }, []);

  return (
    <DetailsPageLayout header="User Profile" isLoading={isLoading}>
      <ul className="text-sm grid grid-cols-[auto,1fr] gap-x-14 gap-y-0.5 w-full max-w-2xl mt-4">
        <div className="pb-2">Email:</div>
        <div className="w-full">{email}</div>
        <div className="pb-2">Primary Role:</div>
        <div className="w-full">{primaryRole}</div>
      </ul>
    </DetailsPageLayout>
  );
}
