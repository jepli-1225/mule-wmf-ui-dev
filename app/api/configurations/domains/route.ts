import { NextResponse } from "next/server";
import { Op } from "sequelize";
import models from "@/app/lib/sequelize-setup";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 });

/**
 * Retrieves data from the database based on the provided search parameters.
 *
 * @param {Request} request - The request object.
 * @return {Promise<NextResponse>} A promise that resolves to the NextResponse object.
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
            { DOMAINID: { [Op.like]: `%${general}%` } },
            { CREATEDBY: { [Op.like]: `%${general}%` } },
            { UPDATEDBY: { [Op.like]: `%${general}%` } },
            { DOMAINDESCRIPTION: { [Op.like]: `%${general}%` } },
          ],
        }
      : {};

    const [rows, count] = await Promise.all([
      models.DOMAIN.findAll({
        where: whereClause,
        offset: (page - 1) * limit,
        limit,
        order: [["DOMAINID", "ASC"]],
      }),
      models.DOMAIN.count({ where: whereClause }),
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
