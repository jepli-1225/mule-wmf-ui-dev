import { NextResponse } from "next/server";
import models from "@/app/lib/sequelize-setup";
import { Op } from "sequelize";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300 });

/**
 * Retrieves data from the NOTIFICATIONCONFIG table based on the provided search parameters.
 *
 * @param {Request} request - The request object.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "10");
  const general = searchParams.get("general") || "";

  const cacheKey = `domains_${page}_${limit}_${general}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return NextResponse.json(cachedData);
  }

  try {
    const whereClause = general
      ? {
          [Op.or]: [
            { NOTIFICATIONKEY: { [Op.like]: `%${general}%` } },
            { INTERFACEID: { [Op.like]: `%${general}%` } },
            { BUSINESSEVENT: { [Op.like]: `%${general}%` } },
            { SOURCESYSTEM: { [Op.like]: `%${general}%` } },
            { RECIPIENTTO: { [Op.like]: `%${general}%` } },
            { RECIPIENTCC: { [Op.like]: `%${general}%` } },
          ],
        }
      : {};

    const [rows, count] = await Promise.all([
      models.NOTIFICATIONCONFIG.findAll({
        where: whereClause,
        offset: (page - 1) * limit,
        limit,
        order: [["INTERFACEID", "ASC"]],
      }),
      models.NOTIFICATIONCONFIG.count({ where: whereClause }),
    ]);

    const result = {
      data: rows,
      pagination: {
        page,
        limit,
        total: count,
        totalPage: Math.ceil(count / limit),
      },
    };

    cache.set(cacheKey, result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
