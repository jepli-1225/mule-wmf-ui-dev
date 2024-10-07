import { NextResponse } from "next/server";
import models from "@/app/lib/sequelize-setup";
import { UniqueConstraintError } from "sequelize";

/**
 * Creates a new Mule Notification Config in the database and returns a JSON response with the created notification config object.
 *
 * @param {Request} request - The HTTP request object containing the form data for creating a new notification config.
 * @return {Promise<NextResponse>} A Promise that resolves to a NextResponse object with a JSON response containing
 * the message "New Mule Notification Config created successfully" and the created notification config object. If an error occurs during the process,
 * a NextResponse object with a status code of 500 is returned. If an UniqueConstraintError is caught, a NextResponse object with a status code of 409
 * is returned with a message indicating that a notification config with the same details already exists.
 */
export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const newNotifConfig = await models.NOTIFICATIONCONFIG.create({
      NOTIFICATIONKEY: formData.notifKey,
      INTERFACEID: formData.interfaceId,
      BUSINESSEVENT: formData.businessEvent,
      SOURCESYSTEM: formData.sourceSystem,
      DOMAINID: formData.domainId,
      RECIPIENTTO: formData.recipientTo,
      RECIPIENTCC: formData.recipientCc,
      EMAILSUBJECT: formData.emailSubject,
      DESCRIPTION: formData.description,
    });

    return NextResponse.json(
      {
        message: "New Interface Config created successfully",
        notifConfig: newNotifConfig,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating Interface Config:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to create Interface Config",
    });
  }
}
