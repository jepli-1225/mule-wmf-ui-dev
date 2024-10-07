import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.user.primaryRole !== "Admin") {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }
    return NextResponse.json({ message: "Access granted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
