import { users } from "@/app/lib/placeholder-data";
import { NextResponse } from "next/server";

export async function GET() {
  const userNames = users.map((user) => user.userName);
  return NextResponse.json(userNames);
}
