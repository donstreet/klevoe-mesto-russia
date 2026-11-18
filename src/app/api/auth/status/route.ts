import { NextResponse } from "next/server";
import { legacyFetch, responseJson } from "@/lib/legacy-api";

export const runtime = "nodejs";

export async function GET() {
  try {
    const [telegram, yandex] = await Promise.all([
      legacyFetch("/api/auth/telegram/status"),
      legacyFetch("/api/auth/yandex/status"),
    ]);
    const [telegramData, yandexData] = await Promise.all([responseJson(telegram), responseJson(yandex)]);
    return NextResponse.json({
      telegram: { enabled: telegram.ok && telegramData.enabled === true },
      yandex: { enabled: yandex.ok && yandexData.enabled === true },
    }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ telegram: { enabled: false }, yandex: { enabled: false }, unavailable: true }, { status: 503 });
  }
}
