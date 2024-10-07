import { NextResponse } from "next/server";
import { Op } from "sequelize";
import models from "@/app/lib/sequelize-setup";

/**
 * Retrieves data from the INTERFACECONFIG table based on the provided search parameters.
 *
 * @param {Request} request - The request object.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "10");
  const general = searchParams.get("general") || "";

  try {
    const whereClause: any = {};
    if (general) {
      whereClause[Op.or] = [
        { INTERFACEID: { [Op.like]: `%${general}%` } },
        { SOURCESYSTEM: { [Op.like]: `%${general}%` } },
        { BUSINESSEVENT: { [Op.like]: `%${general}%` } },
        { DOMAINID: { [Op.like]: `%${general}%` } },
        { DESTINATIONTYPE: { [Op.like]: `%${general}%` } },
        { DESTINATIONVALUE: { [Op.like]: `%${general}%` } },
        { TARGETSYSTEM: { [Op.like]: `%${general}%` } },
      ];
    }

    const { count, rows } = await models.INTERFACECONFIG.findAndCountAll({
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
