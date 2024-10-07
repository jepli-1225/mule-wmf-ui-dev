import { NextResponse } from "next/server";
import models from "@/app/lib/sequelize-setup";
import sequelize from "sequelize/lib/sequelize";

/**
 * Retrieves a notification configuration by its key.
 *
 * @param {Request} request - The HTTP request object.
 * @param {Object} params - The route parameters.
 * @param {string} params.notifKey - The key of the notification configuration.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 * If the notification configuration is found, the response contains the notification configuration.
 * If the notification configuration is not found, the response has a status code of 404 and an error message.
 * If there is an error fetching the data, the response has a status code of 500 and an error message.
 */
export async function GET(
  request: Request,
  { params }: { params: { notifKey: string } }
) {
  const notifKey = params.notifKey;
  try {
    const notifConfig = await models.NOTIFICATIONCONFIG.findOne({
      where: { NOTIFICATIONKEY: notifKey },
    });

    if (!notifConfig) {
      return NextResponse.json(
        { error: "Notification Configuration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      notifConfig,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

/**
 * Updates a notification configuration by its key.
 *
 * @param {Request} request - The HTTP request object.
 * @param {Object} params - The route parameters.
 * @param {string} params.notifKey - The key of the notification configuration.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 * If the notification configuration is updated successfully, the response contains the updated notification configuration.
 * If the notification configuration is not found, the response has a status code of 404 and an error message.
 * If there is an error updating the data, the response has a status code of 500 and an error message.
 */
export async function PUT(
  request: Request,
  { params }: { params: { notifKey: string } }
) {
  const notifKey = params.notifKey;

  try {
    const body = await request.json();
    const {
      NOTIFICATIONKEY,
      INTERFACEID,
      BUSINESSEVENT,
      SOURCESYSTEM,
      DOMAINID,
      RECIPIENTTO,
      RECIPIENTCC,
      EMAILSUBJECT,
      EMAILTEMPLATE,
      TRIGGERCONDITION,
      DESCRIPTION,
    } = body;

    const [updatedCount] = await models.NOTIFICATIONCONFIG.update(
      {
        NOTIFICATIONKEY: NOTIFICATIONKEY,
        INTERFACEID: INTERFACEID,
        BUSINESSEVENT: BUSINESSEVENT,
        SOURCESYSTEM: SOURCESYSTEM,
        DOMAINID: DOMAINID,
        RECIPIENTTO: RECIPIENTTO,
        RECIPIENTCC: RECIPIENTCC,
        EMAILSUBJECT: EMAILSUBJECT,
        EMAILTEMPLATE: EMAILTEMPLATE,
        TRIGGERCONDITION: TRIGGERCONDITION,
        DESCRIPTION: DESCRIPTION,
        UPDATEDON: sequelize.literal("GETDATE()"),
      },
      { where: { NOTIFICATIONKEY: notifKey }, returning: true }
    );

    if (updatedCount === 0) {
      return NextResponse.json(
        { error: "Notification Configuration not found" },
        { status: 404 }
      );
    }

    const updatedNotifConfiguration = await models.NOTIFICATIONCONFIG.findOne({
      where: { NOTIFICATIONKEY: notifKey },
    });

    return NextResponse.json({ notifConfig: updatedNotifConfiguration });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      { error: "Failed to update data" },
      { status: 500 }
    );
  }
}
