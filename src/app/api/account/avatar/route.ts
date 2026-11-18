import { NextResponse } from "next/server";
import { currentSessionToken, hasSameOrigin, legacyFetch, responseJson, LEGACY_API_BASE } from "@/lib/legacy-api";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) return NextResponse.json({ error: "Недопустимый источник запроса." }, { status: 403 });
  const token = await currentSessionToken();
  if (!token) return NextResponse.json({ error: "Требуется вход." }, { status: 401 });

  try {
    const incoming = await request.formData();
    const file = incoming.get("avatar");
    if (!(file instanceof File)) return NextResponse.json({ error: "Выберите фотографию." }, { status: 400 });
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      return NextResponse.json({ error: "Разрешены JPG, PNG или WebP." }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "Фото должно быть не больше 5 МБ." }, { status: 413 });

    const outgoing = new FormData();
    outgoing.append("avatar", new Blob([await file.arrayBuffer()], { type: file.type }), file.name || "avatar");
    const upstream = await legacyFetch("/api/account/avatar", { method: "POST", body: outgoing }, token);
    const data = await responseJson(upstream);
    if (upstream.ok && typeof data.avatar === "string" && data.avatar.startsWith("/uploads/")) {
      data.avatar = `${LEGACY_API_BASE}${data.avatar}`;
      if (data.user && typeof data.user === "object") data.user.avatar = data.avatar;
    }
    return NextResponse.json(data, { status: upstream.status, headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Не удалось загрузить фотографию. Попробуйте ещё раз." }, { status: 503 });
  }
}
