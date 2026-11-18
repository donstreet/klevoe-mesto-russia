import { cookies } from "next/headers";

export const SESSION_COOKIE = "klevoe_session";
export const LEGACY_API_BASE = (process.env.KLEVOE_LEGACY_API_BASE || "https://fishrusss.duckdns.org/preview").replace(/\/$/, "");

export async function legacyFetch(path: string, init: RequestInit = {}, token?: string) {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (token) headers.set("x-user-token", token);
  return fetch(`${LEGACY_API_BASE}${path}`, {
    ...init,
    headers,
    cache: "no-store",
    redirect: "manual",
    signal: AbortSignal.timeout(12000),
  });
}

export async function currentSessionToken() {
  const jar = await cookies();
  return jar.get(SESSION_COOKIE)?.value || "";
}

export async function responseJson(response: Response) {
  return response.json().catch(() => ({} as Record<string, unknown>));
}

export function hasSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try { return new URL(origin).origin === new URL(request.url).origin; }
  catch { return false; }
}
