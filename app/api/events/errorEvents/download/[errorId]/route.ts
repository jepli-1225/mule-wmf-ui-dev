import { NextResponse } from "next/server";
import models from "@/app/lib/sequelize-setup";

export async function GET(
  request: Request,
  { params }: { params: { errorId: string } }
) {
  try {
    const errorEvent = await models.ERROREVENT.findByPk(params.errorId, {
      attributes: ["ERRORCONTENT", "ERRORID"],
    });

    if (!errorEvent) {
      return NextResponse.json(
        { error: "Error event not found" },
        { status: 404 }
      );
    }

    const errorContent = errorEvent.ERRORCONTENT.toString("utf8");
    return new NextResponse(errorContent, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Content-Disposition": `attachment;"`,
      },
    });
  } catch (error) {
    console.error("Error downloading error content:", error);
    return NextResponse.json(
      { error: "Failed to download error content" },
      { status: 500 }
    );
  }
}
