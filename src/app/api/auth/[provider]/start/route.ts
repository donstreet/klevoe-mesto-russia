import { NextRequest, NextResponse } from "next/server";
import { currentSessionToken, legacyFetch, responseJson } from "@/lib/legacy-api";

export const runtime = "nodejs";

export async function POST(request: NextRequest, context: { params: Promise<{ provider: string }> }) {
  const { provider } = await context.params;
  if (provider !== "telegram" && provider !== "yandex") {
    return NextResponse.json({ error: "Неизвестный провайдер." }, { status: 404 });
  }
  const token = await currentSessionToken();
  if (!token) return NextResponse.json({ error: "Сначала войдите в существующий аккаунт." }, { status: 401 });

  try {
    const upstream = await legacyFetch(`/api/auth/${provider}/start`, {
      method: "POST",
      body: JSON.stringify({ mode: "link" }),
    }, token);
    const data = await responseJson(upstream) as { url?: string; error?: string };
    if (!upstream.ok || !data.url) {
      return NextResponse.json({ error: data.error || "Не удалось начать привязку." }, { status: upstream.status || 502 });
    }
    const target = new URL(data.url);
    if (target.protocol !== "https:" || target.hostname !== "oauth.telegram.org" && target.hostname !== "oauth.yandex.ru") {
      return NextResponse.json({ error: "Провайдер вернул недопустимый адрес авторизации." }, { status: 502 });
    }
    return NextResponse.json({ url: target.toString() }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Сервис авторизации временно недоступен." }, { status: 503 });
  }
}
