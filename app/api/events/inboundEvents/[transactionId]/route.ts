import { NextResponse } from "next/server";
import models from "@/app/lib/sequelize-setup";
import sequelize from "sequelize/lib/sequelize";

/**
 * Retrieves an inbound event by its transaction ID.
 *
 * @param {Request} request - The request object.
 * @param {{ params: { transactionId: string } }} params - The parameters object.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 */
export async function GET(
  request: Request,
  { params }: { params: { transactionId: string } }
) {
  const transactionId = params.transactionId;

  try {
    const inboundEvent = await models.INBOUNDEVENT.findOne({
      where: { TRANSACTIONID: transactionId },
    });

    if (!inboundEvent) {
      return NextResponse.json(
        { error: "Inbound Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ inboundEvent });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

/**
 * Updates an inbound event.
 *
 * @param {Request} request - The request object.
 * @param {{ params: { transactionId: string } }} params - The parameters object.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 */
export async function PUT(
  request: Request,
  { params }: { params: { transactionId: string } }
) {
  const id = params.transactionId;

  try {
    const body = await request.json();
    const {
      INSTANCEID,
      INTERFACEID,
      BUSINESSEVENT,
      SOURCESYSTEM,
      TARGETSYSTEM,
      INBOUNDPROPERTIES,
      DOMAINID,
      STATUS,
    } = body;

    const [updatedCount] = await models.INBOUNDEVENT.update(
      {
        INSTANCEID: INSTANCEID,
        INTERFACEID: INTERFACEID,
        BUSINESSEVENT: BUSINESSEVENT,
        SOURCESYSTEM: SOURCESYSTEM,
        TARGETSYSTEM: TARGETSYSTEM,
        INBOUNDPROPERTIES: INBOUNDPROPERTIES,
        DOMAINID: DOMAINID,
        STATUS: STATUS,
        UPDATEDON: sequelize.literal("GETDATE()"),
      },
      { where: { TRANSACTIONID: id }, returning: true }
    );

    if (updatedCount === 0) {
      return NextResponse.json(
        { error: "Inbound Event not found" },
        { status: 404 }
      );
    }

    const updatedInboundEvent = await models.INBOUNDEVENT.findOne({
      where: { TRANSACTIONID: id },
    });

    return NextResponse.json({ inboundEvent: updatedInboundEvent });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      { error: "Failed to update data" },
      { status: 500 }
    );
  }
}
