import { NextResponse } from "next/server";
import { executeQuery } from "@/app/lib/placeholderFiles/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pieStartDate =
    searchParams.get("pieStartDate") ||
    new Date().toISOString().split("T")[0] + "T00:00:00.000Z";
  const endDate = new Date().toISOString().split("T")[0] + "T23:59:59.999Z";
  const domainId = searchParams.get("domainId") || "";

  const params = {
    PieStartDate: pieStartDate,
    EndDate: endDate,
    DomainId: domainId,
  };

  const pieQuery = `
    SELECT TOP (21) [INBOUNDEVENT].[SOURCESYSTEM], COUNT([INBOUNDEVENT].[TRANSACTIONID]) 
    FROM [INBOUNDEVENT]
    WHERE [INBOUNDEVENT].[CREATEDON] > @PieStartDate 
      AND [INBOUNDEVENT].[CREATEDON] < @EndDate 
      AND ([INBOUNDEVENT].[DOMAINID] = @DomainId OR @DomainId = '')
    GROUP BY [INBOUNDEVENT].[SOURCESYSTEM]
    ORDER BY [INBOUNDEVENT].[SOURCESYSTEM] ASC
  `;

  const pieQuerySourceSystems = `
    SELECT DISTINCT [INTERFACECONFIG].[SOURCESYSTEM] from [INTERFACECONFIG] ORDER BY [INTERFACECONFIG].[SOURCESYSTEM] ASC
  `;

  try {
    const [pieData, allSourceSystems] = await Promise.all([
      executeQuery(pieQuery, params),
      executeQuery(pieQuerySourceSystems),
    ]);

    return NextResponse.json({ pieData, allSourceSystems });
  } catch (error) {
    console.error("Error fetching pie data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
