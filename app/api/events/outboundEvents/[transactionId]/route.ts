import { NextResponse } from "next/server";
import models from "@/app/lib/sequelize-setup";
import sequelize from "sequelize/lib/sequelize";

/**
 * Retrieves an outbound event by its transaction ID.
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
    const outboundEvent = await models.OUTBOUNDEVENT.findOne({
      where: { TRANSACTIONID: transactionId },
    });

    if (!outboundEvent) {
      return NextResponse.json(
        { error: "Outbound Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ outboundEvent });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

/**
 * Updates an outbound event by its transaction ID.
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
      BUSINESSEVENT,
      STATUS,
      INSTANCEID,
      INTERFACEID,
      TARGETSYSTEM,
      DOMAINID,
      CREATEDBY,
      CREATEDON,
      UPDATEDBY,
    } = body;

    const [updatedCount] = await models.OUTBOUNDEVENT.update(
      {
        BUSINESSEVENT: BUSINESSEVENT,
        STATUS: STATUS,
        INSTANCEID: INSTANCEID,
        INTERFACEID: INTERFACEID,
        TARGETSYSTEM: TARGETSYSTEM,
        DOMAINID: DOMAINID,
        CREATEDBY: CREATEDBY,
        CREATEDON: CREATEDON,
        UPDATEDBY: UPDATEDBY,
        UPDATEDON: sequelize.literal("GETDATE()"),
      },
      { where: { TRANSACTIONID: id } }
    );

    if (updatedCount === 0) {
      return NextResponse.json(
        { error: "Inbound Event not found" },
        { status: 404 }
      );
    }

    const updatedOutboundEvent = await models.OUTBOUNDEVENT.findOne({
      where: { TRANSACTIONID: id },
    });

    return NextResponse.json({ outboundEvent: updatedOutboundEvent });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      { error: "Failed to update data" },
      { status: 500 }
    );
  }
}
