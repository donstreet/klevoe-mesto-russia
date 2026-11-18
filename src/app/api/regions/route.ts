import { NextResponse } from "next/server";
import { legacyFetch, responseJson } from "@/lib/legacy-api";

export const runtime = "nodejs";

export async function GET() {
  try {
    const upstream = await legacyFetch("/api/regions");
    const data = await responseJson(upstream);
    return NextResponse.json(data, { status: upstream.status, headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" } });
  } catch {
    return NextResponse.json({ error: "Справочник регионов временно недоступен." }, { status: 503 });
  }
}
