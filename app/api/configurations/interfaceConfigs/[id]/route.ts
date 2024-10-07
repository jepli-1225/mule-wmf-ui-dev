import { NextResponse } from "next/server";
import models from "@/app/lib/sequelize-setup";
import interfacePermissionData from "@/app/lib/placeholderFiles/interfacePermissionData.json";
import { users } from "@/app/lib/placeholder-data";
import sequelize from "sequelize/lib/sequelize";

/**
 * Retrieves an interface configuration by its ID.
 *
 * @param {Request} request - The request object.
 * @param {Object} params - The parameters object.
 * @param {string} params.id - The ID of the interface configuration.
 * @return {Promise<NextResponse>} A promise that resolves to the NextResponse object.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const interfaceConfig = await models.INTERFACECONFIG.findByPk(id);

    if (!interfaceConfig) {
      return NextResponse.json(
        { error: "Interface Configuration not found" },
        { status: 404 }
      );
    }

    //temporarily using data from json file for permissions
    const permissions = interfacePermissionData
      .filter(
        (permission: { INTERFACECONFIG: number }) =>
          permission.INTERFACECONFIG.toString() === id
      )
      .map(
        (permission: {
          USER: number;
          VIEW: boolean;
          DOWNLOAD: boolean;
          REPLAY: boolean;
        }) => {
          const user = users.find(
            (u) => u.userID === permission.USER.toString()
          );
          return {
            ...permission,
            userName: user ? user.userName : "Unknown User",
          };
        }
      );

    return NextResponse.json({
      interfaceConfig,
      permissions: permissions,
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
 * Updates an interface configuration.
 *
 * @param {Request} request - The request object.
 * @param {{ params: { id: string } }} params - The parameters object.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const body = await request.json();
    const {
      INTERFACEID,
      SOURCESYSTEM,
      TARGETSYSTEM,
      DESTINATIONVALUE,
      DESTINATIONTYPE,
      BUSINESSEVENT,
      MESSAGEPROPERTIES,
      DESCRIPTION,
      DOMAINID,
      REPLAYABLE,
    } = body;

    const [updatedCount] = await models.INTERFACECONFIG.update(
      {
        INTERFACEID: INTERFACEID,
        SOURCESYSTEM: SOURCESYSTEM,
        TARGETSYSTEM: TARGETSYSTEM,
        DESTINATIONVALUE: DESTINATIONVALUE,
        DESTINATIONTYPE: DESTINATIONTYPE,
        BUSINESSEVENT: BUSINESSEVENT,
        MESSAGEPROPERTIES: MESSAGEPROPERTIES,
        DESCRIPTION: DESCRIPTION,
        DOMAINID: DOMAINID,
        REPLAYABLE: REPLAYABLE,
        UPDATEDON: sequelize.literal("GETDATE()"),
      },
      {
        where: { ID: id },
        returning: true,
      }
    );

    if (updatedCount === 0) {
      return NextResponse.json(
        { error: "Interface Configuration not found" },
        { status: 404 }
      );
    }

    const updatedInterfaceConfig = await models.INTERFACECONFIG.findOne({
      where: { ID: id },
    });

    return NextResponse.json({ interfaceConfig: updatedInterfaceConfig });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      { error: "Failed to update data" },
      { status: 500 }
    );
  }
}
