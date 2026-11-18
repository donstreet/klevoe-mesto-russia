import { NextResponse } from "next/server";
import { currentSessionToken, hasSameOrigin, legacyFetch, responseJson } from "@/lib/legacy-api";

export const runtime = "nodejs";

export async function PUT(request: Request) {
  if (!hasSameOrigin(request)) return NextResponse.json({ error: "Недопустимый источник запроса." }, { status: 403 });
  const token = await currentSessionToken();
  if (!token) return NextResponse.json({ error: "Требуется вход." }, { status: 401 });
  try {
    const body = await request.json();
    const upstream = await legacyFetch("/api/account/profile", {
      method: "PUT",
      body: JSON.stringify({
        about: typeof body.about === "string" ? body.about : "",
        avatar: typeof body.avatar === "string" ? body.avatar : "",
        homeRegionId: typeof body.homeRegionId === "string" ? body.homeRegionId : "",
      }),
    }, token);
    const data = await responseJson(upstream);
    return NextResponse.json(data, { status: upstream.status, headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Не удалось сохранить профиль. Попробуйте ещё раз." }, { status: 503 });
  }
}
