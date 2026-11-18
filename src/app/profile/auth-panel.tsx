"use client";

import { useEffect, useState } from "react";
import { LogIn, LogOut, ShieldCheck, UserPlus } from "lucide-react";

type AccountUser = {
  id: string;
  nickname: string;
  telegramLinked?: boolean;
  yandexLinked?: boolean;
};

type ProviderStatus = {
  telegram: { enabled: boolean };
  yandex: { enabled: boolean };
  unavailable?: boolean;
};

export default function AuthPanel() {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [status, setStatus] = useState<ProviderStatus | null>(null);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    Promise.all([
      fetch("/api/account/me", { cache: "no-store" }),
      fetch("/api/auth/status", { cache: "no-store" }),
    ]).then(async ([accountResponse, statusResponse]) => {
      if (!alive) return;
      if (accountResponse.ok) {
        const data = await accountResponse.json();
        setUser(data.user || null);
      }
      if (statusResponse.ok) setStatus(await statusResponse.json());
      else setStatus({ telegram: { enabled: false }, yandex: { enabled: false }, unavailable: true });
    }).catch(() => setMessage("Не удалось связаться с сервисом аккаунтов."))
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  async function submitAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const isRegister = mode === "register";
      const response = await fetch(isRegister ? "/api/account/register" : "/api/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isRegister
          ? { nickname, password, repeatPassword }
          : { nickname, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || (isRegister ? "Не удалось зарегистрироваться." : "Не удалось войти."));
      setUser(data.user);
      setPassword("");
      setRepeatPassword("");
      setMessage(isRegister
        ? "Аккаунт создан. Добро пожаловать в «Клёвое место»!"
        : "Вход выполнен. Используется существующий аккаунт портала.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Ошибка аккаунта.");
    } finally {
      setBusy(false);
    }
  }

  async function linkProvider(provider: "telegram" | "yandex") {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`/api/auth/${provider}/start`, { method: "POST" });
      const data = await response.json();
      if (!response.ok || !data.url) throw new Error(data.error || "Не удалось начать привязку.");
      window.location.assign(data.url);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Ошибка авторизации.");
      setBusy(false);
    }
  }

  async function logout() {
    setBusy(true);
    try {
      await fetch("/api/account/logout", { method: "POST" });
      setUser(null);
      setMessage("Вы вышли из аккаунта.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-4 sm:p-5">
        <div className="flex items-center gap-2"><ShieldCheck size={17} className="text-cyan-300"/><h3 className="font-semibold text-white">Аккаунт «Клёвое место»</h3></div>
        <p className="mt-2 text-xs leading-5 text-slate-400">Новый кабинет работает с общей базой пользователей портала. Старые аккаунты сохраняются, новые создаются в той же системе.</p>
        {loading ? <p className="mt-4 text-sm text-slate-400">Проверяем сессию…</p> : user ? (
          <div className="mt-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-300/15 bg-emerald-300/[0.05] p-3">
              <div><p className="text-[11px] text-emerald-200">Вы вошли в аккаунт</p><p className="mt-1 font-medium text-white">{user.nickname}</p></div>
              <button onClick={logout} disabled={busy} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs text-slate-300 disabled:opacity-50"><LogOut size={14}/> Выйти</button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {([
                ["telegram", "Telegram", user.telegramLinked],
                ["yandex", "Яндекс ID", user.yandexLinked],
              ] as const).map(([provider, label, linked]) => {
                const enabled = status?.[provider].enabled === true;
                return <div key={provider} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
                  <div className="flex items-center justify-between gap-2"><span className="text-sm text-white">{label}</span><span className={`rounded-full px-2 py-1 text-[10px] ${linked ? "bg-emerald-300/10 text-emerald-200" : "bg-white/[0.05] text-slate-400"}`}>{linked ? "Привязан" : enabled ? "Доступен" : "Не настроен"}</span></div>
                  <button onClick={() => linkProvider(provider)} disabled={busy || linked || !enabled} className="mt-3 min-h-10 w-full rounded-lg bg-gradient-to-r from-violet-500/90 to-cyan-500/90 px-3 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">{linked ? "Аккаунт связан" : "Привязать " + label}</button>
                </div>;
              })}
            </div>
            <p className="mt-3 text-[11px] text-slate-500">Telegram и Яндекс ID можно привязать к этому аккаунту. Уже привязанный к другому пользователю профиль не переносится.</p>
          </div>
        ) : (
          <>
            <div className="mt-4 grid grid-cols-2 rounded-xl border border-white/10 bg-black/20 p-1">
              <button type="button" onClick={() => { setMode("login"); setMessage(""); }} className={`min-h-10 rounded-lg text-sm font-medium transition ${mode === "login" ? "bg-white/10 text-white shadow" : "text-slate-400"}`}>Войти</button>
              <button type="button" onClick={() => { setMode("register"); setMessage(""); }} className={`min-h-10 rounded-lg text-sm font-medium transition ${mode === "register" ? "bg-gradient-to-r from-violet-500/30 to-cyan-500/30 text-white shadow" : "text-slate-400"}`}>Зарегистрироваться</button>
            </div>
            <form onSubmit={submitAccount} className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5 text-xs text-slate-400 sm:col-span-2">{mode === "register" ? "Придумайте никнейм" : "Логин / никнейм"}<input autoComplete="username" value={nickname} onChange={(event) => setNickname(event.target.value)} minLength={mode === "register" ? 3 : undefined} maxLength={mode === "register" ? 20 : 80} required className="min-h-11 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none focus:border-cyan-300/50"/></label>
              <label className="grid gap-1.5 text-xs text-slate-400 sm:col-span-2">{mode === "register" ? "Придумайте пароль (от 6 символов)" : "Пароль"}<input type="password" autoComplete={mode === "register" ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} minLength={mode === "register" ? 6 : undefined} maxLength={mode === "register" ? 128 : 256} required className="min-h-11 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none focus:border-cyan-300/50"/></label>
              {mode === "register" && <label className="grid gap-1.5 text-xs text-slate-400 sm:col-span-2">Повторите пароль<input type="password" autoComplete="new-password" value={repeatPassword} onChange={(event) => setRepeatPassword(event.target.value)} minLength={6} maxLength={128} required className="min-h-11 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none focus:border-cyan-300/50"/></label>}
              <button disabled={busy} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 px-4 text-sm font-semibold text-white disabled:opacity-50 sm:col-span-2">
                {mode === "register" ? <UserPlus size={16}/> : <LogIn size={16}/>}
                {busy ? "Подождите…" : mode === "register" ? "Создать аккаунт" : "Войти в аккаунт"}
              </button>
              <p className="text-[11px] leading-5 text-slate-500 sm:col-span-2">{mode === "register" ? "Ник должен быть уникальным. После регистрации вы автоматически войдёте в новый аккаунт." : "Используйте тот же логин и пароль, что и на действующем портале."}</p>
            </form>
          </>
        )}
        {message && <p role="status" className="mt-3 rounded-lg border border-cyan-300/10 bg-cyan-300/[0.05] px-3 py-2 text-xs text-cyan-100">{message}</p>}
        {status?.unavailable && <p className="mt-2 text-[11px] text-amber-200">Не удалось проверить доступность провайдеров.</p>}
      </div>
    </div>
  );
}
