"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CircleUserRound, LogIn } from "lucide-react";

export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/account/me", { cache: "no-store" })
      .then(async (response) => {
        if (!alive) return;
        if (!response.ok) { setSignedIn(false); return; }
        const data = await response.json();
        if (alive) setSignedIn(Boolean(data.user));
      })
      .catch(() => { if (alive) setSignedIn(false); });
    const refresh = () => {
      fetch("/api/account/me", { cache: "no-store" }).then(async (response) => {
        const data = response.ok ? await response.json() : null;
        if (alive) setSignedIn(Boolean(data?.user));
      }).catch(() => undefined);
    };
    window.addEventListener("klevoe:account-updated", refresh);
    return () => { alive = false; window.removeEventListener("klevoe:account-updated", refresh); };
  }, []);

  return <div className="relative">
    <button type="button" aria-label="Открыть меню профиля" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="grid h-10 w-10 place-items-center rounded-full border border-emerald-200/20 bg-emerald-200/[0.06] text-emerald-100 transition hover:bg-emerald-200/10"><CircleUserRound size={20}/></button>
    {open && <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-white/10 bg-[#101a19] p-2 shadow-2xl">
      <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-100/45">Аккаунт</p>
      <Link href="/profile" onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-emerald-50 transition hover:bg-white/[0.06]"><CircleUserRound size={16}/>Мой профиль</Link>
      {!signedIn && <Link href="/profile?auth=1" onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-emerald-200 transition hover:bg-white/[0.06]"><LogIn size={16}/>Войти / регистрация</Link>}
    </div>}
  </div>;
}
