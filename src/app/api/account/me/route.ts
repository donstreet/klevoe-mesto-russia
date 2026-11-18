import { NextResponse } from "next/server";
import { currentSessionToken, legacyFetch, responseJson } from "@/lib/legacy-api";

export const runtime = "nodejs";

export async function GET() {
  const token = await currentSessionToken();
  if (!token) return NextResponse.json({ error: "Требуется вход." }, { status: 401 });
  try {
    const upstream = await legacyFetch("/api/account/me", {}, token);
    const data = await responseJson(upstream);
    return NextResponse.json(data, { status: upstream.status, headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Сервис аккаунтов временно недоступен." }, { status: 503 });
  }
}
