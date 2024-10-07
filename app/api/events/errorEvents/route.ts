import { NextResponse } from "next/server";
import { Op } from "sequelize";
import models from "@/app/lib/sequelize-setup";

/**
 * Retrieves error events based on the provided search parameters.
 *
 * @param {Request} request - The request object.
 * @return {Promise<NextResponse>} A promise that resolves to the response object.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const general = searchParams.get("general") || "";
  const relatedInboundInstance =
    searchParams.get("relatedInboundInstance") || "";

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
          { errorTitle: { [Op.like]: `%${general}%` } },
          { errorDetail: { [Op.like]: `%${general}%` } },
          { status: { [Op.like]: `%${general}%` } },
        ],
      });
    }

    if (relatedInboundInstance) {
      whereClause.relatedInboundInstance = {
        [Op.like]: `%${relatedInboundInstance}`,
      };
    }

    const { count, rows } = await models.ERROREVENT.findAndCountAll({
      attributes: [
        "ERRORID",
        "ERRORTITLE",
        "ERRORDETAIL",
        "STATUS",
        "CREATEDBY",
        "CREATEDON",
      ],
      where: whereClause,
      offset: (page - 1) * limit,
      limit: limit,
      order: [["CREATEDON", "DESC"]],
    });

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
