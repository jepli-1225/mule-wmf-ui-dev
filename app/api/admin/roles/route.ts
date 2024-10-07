import { NextResponse } from "next/server";
import roleBasedAccess from "@/app/lib/roleBasedAccess.json";

export async function GET() {
  return NextResponse.json(roleBasedAccess);
}
