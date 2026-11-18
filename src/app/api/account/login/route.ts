import { NextRequest, NextResponse } from "next/server";
import { hasSameOrigin, legacyFetch, responseJson, SESSION_COOKIE } from "@/lib/legacy-api";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {\n  if (!hasSameOrigin(request)) return NextResponse.json({ error: "Недопустимый источник запроса." }, { status: 403 });
  const body = await request.json().catch(() => null) as { nickname?: string; password?: string } | null;
  const nickname = String(body?.nickname || "").trim();
  const password = String(body?.password || "");
  if (!nickname || !password || nickname.length > 80 || password.length > 256) {
    return NextResponse.json({ error: "Введите логин и пароль." }, { status: 400 });
  }

  try {
    const upstream = await legacyFetch("/api/account/login", {
      method: "POST",
      body: JSON.stringify({ nickname, password }),
    });
    const data = await responseJson(upstream) as { token?: string; user?: unknown; error?: string };
    if (!upstream.ok || !data.token || !data.user) {
      return NextResponse.json({ error: data.error || "Не удалось войти." }, { status: upstream.status || 502 });
    }

    const response = NextResponse.json({ user: data.user }, { headers: { "Cache-Control": "no-store" } });
    response.cookies.set(SESSION_COOKIE, data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 180,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Сервис аккаунтов временно недоступен. Попробуйте позже." }, { status: 503 });
  }
}
