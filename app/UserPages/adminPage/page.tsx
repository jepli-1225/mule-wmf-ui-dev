"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import React from "react";

const DeniedPage = React.lazy(() => import("@/app/UserPages/denied/page"));

export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (session && session.user.primaryRole === "Admin") {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    };

    fetchData();
  }, [router]);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-12 items-center">
      {isAuthorized ? (
        <>
          <h1>Welcome, Admin!</h1>
        </>
      ) : (
        <React.Suspense fallback={<div>Loading...</div>}>
          <DeniedPage />
        </React.Suspense>
      )}
    </div>
  );
}
