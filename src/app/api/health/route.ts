import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "klevoe-mesto-russia",
    timestamp: new Date().toISOString(),
  });
}
