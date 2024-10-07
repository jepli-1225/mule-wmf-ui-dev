import { NextResponse } from "next/server";
import models from "@/app/lib/sequelize-setup";
import sequelize from "sequelize/lib/sequelize";

/**
 * Retrieves a domain configuration by its ID.
 *
 * @param {Request} request - The HTTP request object.
 * @param {Object} params - The parameters of the request.
 * @param {string} params.domainId - The ID of the domain.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 */
export async function GET(
  request: Request,
  { params }: { params: { domainId: string } }
) {
  const domainId = params.domainId;
  try {
    const domainConfig = await models.DOMAIN.findOne({
      where: { DOMAINID: domainId },
    });

    if (!domainConfig) {
      return NextResponse.json(
        { error: "Domain Configuration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ domainConfig });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

/**
 * Updates a domain configuration.
 *
 * @param {Request} request - The HTTP request object.
 * @param {Object} params - The parameters of the request.
 * @param {string} params.domainId - The ID of the domain.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 */
export async function PUT(
  request: Request,
  { params }: { params: { domainId: string } }
) {
  const domainId = params.domainId;

  try {
    const body = await request.json();
    const { DOMAINID, DOMAINDESCRIPTION } = body;

    const [updatedCount] = await models.DOMAIN.update(
      {
        DOMAINID: DOMAINID,
        DOMAINDESCRIPTION: DOMAINDESCRIPTION,
        UPDATEDON: sequelize.literal("GETDATE()"),
      },
      {
        where: { DOMAINID: domainId },
        returning: true,
      }
    );

    if (updatedCount === 0) {
      return NextResponse.json(
        { error: "Domain Configuration not found" },
        { status: 404 }
      );
    }

    const updatedDomain = await models.DOMAIN.findOne({
      where: { DOMAINID: domainId },
    });

    return NextResponse.json({ domainConfig: updatedDomain });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      { error: "Failed to update data" },
      { status: 500 }
    );
  }
}

/**
 * Deletes a domain configuration.
 *
 * @param {Request} request - The HTTP request object.
 * @param {Object} params - The parameters of the request.
 * @param {string} params.domainId - The ID of the domain.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { domainId: string } }
) {
  const domainId = params.domainId;
  try {
    const deletedCount = await models.DOMAIN.destroy({
      where: { DOMAINID: domainId },
    });

    if (deletedCount === 0) {
      return NextResponse.json(
        { error: "Domain Configuration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Domain successfully deleted" });
  } catch (error) {
    console.error("Error deleting data:", error);
    return NextResponse.json(
      { error: "Failed to delete data" },
      { status: 500 }
    );
  }
}
