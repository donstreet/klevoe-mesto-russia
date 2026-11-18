import { NextRequest, NextResponse } from "next/server";
import { hasSameOrigin, legacyFetch, responseJson, SESSION_COOKIE } from "@/lib/legacy-api";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: "Недопустимый источник запроса." }, { status: 403 });
  }

  const body = await request.json().catch(() => null) as {
    nickname?: string;
    password?: string;
    repeatPassword?: string;
  } | null;
  const nickname = String(body?.nickname || "").trim();
  const password = String(body?.password || "");
  const repeatPassword = String(body?.repeatPassword || "");

  if (!/^[\p{L}\p{N} ._'-]{3,20}$/u.test(nickname) || !/[\p{L}\p{N}]/u.test(nickname)) {
    return NextResponse.json({ error: "Ник: от 3 до 20 символов. Используйте буквы, цифры, пробелы, точку, дефис или подчёркивание." }, { status: 400 });
  }
  if (password.length < 6 || password.length > 128) {
    return NextResponse.json({ error: "Пароль должен содержать от 6 до 128 символов." }, { status: 400 });
  }
  if (password !== repeatPassword) {
    return NextResponse.json({ error: "Пароли не совпадают." }, { status: 400 });
  }

  try {
    const upstream = await legacyFetch("/api/account/register", {
      method: "POST",
      body: JSON.stringify({ nickname, password, repeatPassword }),
    });
    const data = await responseJson(upstream) as { token?: string; user?: unknown; error?: string };
    if (!upstream.ok || !data.token || !data.user) {
      return NextResponse.json({ error: data.error || "Не удалось создать аккаунт." }, { status: upstream.status || 502 });
    }

    const response = NextResponse.json({ user: data.user }, {
      status: 201,
      headers: { "Cache-Control": "no-store" },
    });
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
