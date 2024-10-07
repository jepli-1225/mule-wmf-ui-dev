import { NextResponse } from "next/server";
import { Op } from "sequelize";
import models from "@/app/lib/sequelize-setup";

/**
 * Retrieves inbound events based on the provided search parameters and pagination.
 *
 * @param {Request} request - The HTTP request object.
 * @return {Promise<NextResponse>} A promise that resolves to a JSON response containing the fetched data and pagination information.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const general = searchParams.get("general") || "";
  const sourceSystem = searchParams.get("sourceSystem") || "";
  const interfaceId = searchParams.get("interfaceId") || "";
  const businessEvent = searchParams.get("businessEvent") || "";
  const status = searchParams.get("status") || "";
  const domain = searchParams.get("domain") || "";

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const startDate =
    searchParams.get("startDate") ||
    today.toISOString().split("T")[0] + "T00:00:00.000Z";
  const endDate =
    searchParams.get("endDate") ||
    tomorrow.toISOString().split("T")[0] + "T00:00:00.000Z";

  try {
    const whereClause: any = {
      [Op.and]: [
        {
          createdOn: {
            [Op.gte]: startDate,
            [Op.lt]: endDate,
          },
        },
      ],
    };

    if (general) {
      whereClause[Op.and].push({
        [Op.or]: [
          { instanceId: { [Op.like]: `%${general}%` } },
          { interfaceId: { [Op.like]: `%${general}%` } },
          { domainId: { [Op.like]: `%${general}%` } },
          { targetSystem: { [Op.like]: `%${general}%` } },
          { status: { [Op.like]: `%${general}%` } },
          { businessEvent: { [Op.like]: `%${general}%` } },
          { sourceSystem: { [Op.like]: `%${general}%` } },
        ],
      });
    }

    if (interfaceId) {
      whereClause.interfaceId = { [Op.like]: `%${interfaceId}%` };
    }

    if (businessEvent) {
      whereClause.businessEvent = { [Op.like]: `%${businessEvent}%` };
    }

    if (status) {
      whereClause.status = { [Op.like]: `%${status}%` };
    }

    if (sourceSystem) {
      whereClause.sourceSystem = { [Op.like]: `%${sourceSystem}%` };
    }

    if (domain) {
      whereClause.domainId = { [Op.like]: `%${domain}%` };
    }

    const [count, rows] = await Promise.all([
      models.INBOUNDEVENT.count({ where: whereClause }),
      models.INBOUNDEVENT.findAll({
        attributes: [
          "TRANSACTIONID",
          "STATUS",
          "INTERFACEID",
          "SOURCESYSTEM",
          "INSTANCEID",
          "BUSINESSEVENT",
          "DOMAINID",
          "TARGETSYSTEM",
          "CREATEDBY",
          "CREATEDON",
        ],
        where: whereClause,
        offset: (page - 1) * limit,
        limit: limit,
        order: [["CREATEDON", "DESC"]],
      }),
    ]);

    return NextResponse.json({
      data: rows,
      pagination: {
        page,
        limit,
        total: count,
        totalPage: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
