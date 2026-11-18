import { NextResponse } from "next/server";
import { currentSessionToken, legacyFetch, SESSION_COOKIE } from "@/lib/legacy-api";

export const runtime = "nodejs";

export async function POST() {
  const token = await currentSessionToken();
  if (token) {
    try { await legacyFetch("/api/account/logout", { method: "POST" }, token); } catch { /* local session is still cleared */ }
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
  return response;
}
