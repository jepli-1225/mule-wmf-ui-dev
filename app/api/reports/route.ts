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
  const pieEndDate =
    searchParams.get("pieEndDate") ||
    new Date().toISOString().split("T")[0] + "T23:59:59.999Z";
  const pieStartDate = pieEndDate.split("T")[0] + "T00:00:00.000Z";
  const domainId = searchParams.get("domainId") || "";

  const params = {
    StartDate: startDate,
    EndDate: endDate,
    PieStartDate: pieStartDate,
    DomainId: domainId,
    PieEndDate: pieEndDate,
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

  //can improve query for convert
  const pieQuery = `
    SELECT TOP (21) [INBOUNDEVENT].[SOURCESYSTEM], COUNT([INBOUNDEVENT].[TRANSACTIONID]) 
    FROM [INBOUNDEVENT]
  WHERE [INBOUNDEVENT].[CREATEDON] > @PieStartDate 
    AND [INBOUNDEVENT].[CREATEDON] < @PieEndDate 
    AND ([INBOUNDEVENT].[DOMAINID] = @DomainId OR @DomainId = '')
    GROUP BY [INBOUNDEVENT].[SOURCESYSTEM]
    ORDER BY [INBOUNDEVENT].[SOURCESYSTEM] ASC
  `;

  const pieQuerySourceSystems = `
  SELECT DISTINCT [INTERFACECONFIG].[SOURCESYSTEM] from [INTERFACECONFIG] ORDER BY [INTERFACECONFIG].[SOURCESYSTEM] ASC`;

  try {
    const [barData, pieData, allSourceSystems] = await Promise.all([
      executeQuery(barQuery, params),
      executeQuery(pieQuery, params),
      executeQuery(pieQuerySourceSystems),
    ]);

    return NextResponse.json({ barData, pieData, allSourceSystems });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
