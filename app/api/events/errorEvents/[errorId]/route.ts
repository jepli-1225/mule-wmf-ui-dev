import { NextResponse } from "next/server";
import models from "@/app/lib/sequelize-setup";
import sequelize from "sequelize/lib/sequelize";

/**
 * Retrieves a single error event by its ID.
 *
 * @param {Request} request - The request object.
 * @param {Object} params - The parameters object.
 * @param {string} params.errorId - The ID of the error event.
 * @return {Promise<NextResponse>} A Promise that resolves to a NextResponse object.
 */
export async function GET(
  request: Request,
  { params }: { params: { errorId: string } }
) {
  const errorId = params.errorId;

  try {
    const errorEvent = await models.ERROREVENT.findOne({
      where: { ERRORID: errorId },
    });

    if (!errorEvent) {
      return NextResponse.json(
        { error: "Error Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ errorEvent });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

/**
 * Updates an error event with the given ID.
 *
 * @param {Request} request - The request object containing the updated error event data.
 * @param {Object} params - The parameters object containing the error event ID.
 * @param {string} params.errorId - The ID of the error event to update.
 * @return {Promise<NextResponse>} A Promise that resolves to a NextResponse object containing the updated error event data or an error message.
 */
export async function PUT(
  request: Request,
  { params }: { params: { errorId: string } }
) {
  const id = params.errorId;

  try {
    const body = await request.json();
    const { ERRORTITLE, ERRORDETAIL, STATUS } = body;

    const [updatedCount] = await models.ERROREVENT.update(
      {
        ERRORTITLE: ERRORTITLE,
        ERRORDETAIL: ERRORDETAIL,
        STATUS: STATUS,
        UPDATEDON: sequelize.literal("GETDATE()"),
      },
      { where: { ERRORID: id }, returning: true }
    );

    if (updatedCount === 0) {
      return NextResponse.json(
        { error: "Error Event not found after update" },
        { status: 404 }
      );
    }

    const updatedErrorEvent = await models.ERROREVENT.findOne({
      where: { ERRORID: id },
    });

    return NextResponse.json({ errorEvent: updatedErrorEvent });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      { error: "Failed to update data" },
      { status: 500 }
    );
  }
}
