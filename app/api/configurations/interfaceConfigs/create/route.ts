import { NextResponse } from "next/server";
import models from "@/app/lib/sequelize-setup";
import { UniqueConstraintError } from "sequelize";

/**
 * Creates a new Mule Interface Config in the database and returns a JSON response with the created interface config object.
 *
 * @param {Request} request - The HTTP request object containing the form data for creating a new interface config.
 * @return {Promise<NextResponse>} A Promise that resolves to a NextResponse object with a JSON response containing
 * the message "New Mule Interface Config created successfully" and the created interface config object. If an error occurs during the process,
 * a NextResponse object with a status code of 500 is returned. If an UniqueConstraintError is caught, a NextResponse object with a status code of 409
 * is returned with a message indicating that an interface config with the same details already exists.
 */
export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const newInterfaceConfig = await models.INTERFACECONFIG.create({
      INTERFACEID: formData.interfaceId,
      SOURCESYSTEM: formData.sourceSystem,
      TARGETSYSTEM: formData.targetSystem,
      DESTINATIONVALUE: formData.destinationValue,
      DESTINATIONTYPE: formData.destinationType,
      BUSINESSEVENT: formData.businessEvent,
      MESSAGEPROPERTIES: formData.messageProperties,
      DESCRIPTION: formData.description,
      DOMAINID: formData.domainId,
      REPLAYABLE: formData.replayable,
    });

    return NextResponse.json(
      {
        message: "New Mule Interface Config created successfully",
        interfaceConfig: newInterfaceConfig,
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
