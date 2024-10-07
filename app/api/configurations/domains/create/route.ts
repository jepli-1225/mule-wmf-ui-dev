import { NextResponse } from "next/server";
import models from "@/app/lib/sequelize-setup";

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const newDomain = await models.DOMAIN.create({
      DOMAINID: formData.domainId,
      DOMAINDESCRIPTION: formData.domainDescription,
    });

    return NextResponse.json(
      { message: "New Domain created successfully", domain: newDomain },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating Domain:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to create Domain",
    });
  }
}
