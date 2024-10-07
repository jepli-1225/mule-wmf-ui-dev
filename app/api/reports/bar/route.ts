import { NextResponse } from "next/server";
import { executeQuery } from "@/app/lib/placeholderFiles/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startDate =
    searchParams.get("startDate") ||
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] +
      "T00:00:00.000Z";

  const endDate =
    searchParams.get("endDate") ||
    new Date().toISOString().split("T")[0] + "T23:59:59.999Z";
  const domainId = searchParams.get("domainId") || "";

  const params = {
    StartDate: startDate,
    EndDate: endDate,
    DomainId: domainId,
  };

  const barQuery = `
  SELECT COUNT([INBOUNDEVENT].[TRANSACTIONID]), [Status], 
         YEAR([INBOUNDEVENT].[CREATEDON]), 
         MONTH([INBOUNDEVENT].[CREATEDON]), 
         DAY([INBOUNDEVENT].[CREATEDON])
  FROM [INBOUNDEVENT]
  WHERE [INBOUNDEVENT].[CREATEDON] > @StartDate 
    AND [INBOUNDEVENT].[CREATEDON] < @EndDate 
    AND ([INBOUNDEVENT].[DOMAINID] = @DomainId OR @DomainId = '')
  GROUP BY [INBOUNDEVENT].[STATUS], 
           YEAR([INBOUNDEVENT].[CREATEDON]), 
           MONTH([INBOUNDEVENT].[CREATEDON]), 
           DAY([INBOUNDEVENT].[CREATEDON])
  `;

  try {
    const barData = await executeQuery(barQuery, params);
    return NextResponse.json({ barData });
  } catch (error) {
    console.error("Error fetching bar data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
