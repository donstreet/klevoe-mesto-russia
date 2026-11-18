"use client";

import { useEffect, useMemo, useState } from "react";
import AuthPanel from "./auth-panel";
import Link from "next/link";
import {
  Activity, Award, Bell, BookOpen, Camera, CircleUserRound,
  Fish, Home, Link2, Mail, MapPin, Newspaper, Rss, Settings, ShieldCheck, Users
} from "lucide-react";

const sections = [
  { id: "overview", label: "Обзор", icon: CircleUserRound },
  { id: "fishing", label: "Моя рыбалка", icon: Fish },
  { id: "diary", label: "Дневник", icon: BookOpen },
  { id: "trophies", label: "Трофеи", icon: Award },
  { id: "reports", label: "Фотоотчёты", icon: Camera },
  { id: "friends", label: "Друзья", icon: Users },
  { id: "followers", label: "Подписчики", icon: Activity },
  { id: "settings", label: "Настройки", icon: Settings },
] as const;

type SectionId = (typeof sections)[number]["id"] | "messages" | "friends-feed" | "news";

const quickSections = [
  { id: "messages", label: "Сообщения", description: "Личные переписки" },
  { id: "friends-feed", label: "Лента друзей", description: "Публикации друзей" },
  { id: "news", label: "Новости", description: "Новости портала и водоёмов" },
] as const;


function Avatar({ label, size = "md", src = "" }: { label: string; size?: "sm" | "md" | "lg"; src?: string }) {
  const dimensions = size === "lg" ? "h-20 w-20 text-2xl" : size === "sm" ? "h-9 w-9 text-xs" : "h-12 w-12 text-base";
  return <div aria-label="Аватар профиля" className={`grid ${dimensions} shrink-0 place-items-center overflow-hidden rounded-full border border-violet-300/30 bg-gradient-to-br from-violet-500/40 to-cyan-400/20 bg-cover bg-center font-semibold text-white`} style={src ? { backgroundImage: `url("${src.replace(/["\\]/g, "")}")` } : undefined}>{src ? <span className="sr-only">{label}</span> : label}</div>;
}

function SectionContent({ active }: { active: SectionId }) {
  const selected = sections.find((item) => item.id === active);
  const selectedSection = selected!;
  if (active === "overview") {
    return (
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["12", "Выезды на рыбалку", Fish],
            ["8", "Записи в дневнике", BookOpen],
            ["4", "Трофея", Award],
          ].map(([value, label, Icon]) => {
            const MetricIcon = Icon as typeof Fish;
            return <div key={String(label)} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
              <div className="flex items-center justify-between text-slate-400"><span className="text-xs">{String(label)}</span><MetricIcon size={16} /></div>
              <div className="mt-2 text-2xl font-semibold text-white">{String(value)}</div>
            </div>;
          })}
        </div>
        <div className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold text-white">Последняя активность</h3>
            <span className="text-xs text-slate-500">Демо-предпросмотр</span>
          </div>
          <div className="mt-4 flex gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300"><Fish size={19} /></div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-slate-200">Первый выезд на водоём</p>
              <p className="mt-1 text-xs text-slate-500">Здесь будут реальные записи пользователя после подключения профиля.</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-4 sm:p-5">
          <h3 className="font-semibold text-white">Мои фото</h3>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["Первый улов", "На берегу", "Снасти"].map((item) => <div key={item} className="flex aspect-[1.35] items-end rounded-xl border border-white/[0.06] bg-gradient-to-br from-violet-500/15 via-slate-800 to-cyan-500/10 p-2"><span className="text-[11px] text-slate-300">{item}</span></div>)}
          </div>
          <p className="mt-3 text-xs text-slate-500">Фотографии-заглушки. Реальные изображения и загрузка появятся после подключения хранилища.</p>
        </div>
      </div>
    );
  }

  if (active === "settings") {
    return <div className="space-y-3">
      <div id="account-auth" className="scroll-mt-24"><AuthPanel /></div>
      <div className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-4">
        <h3 className="font-semibold text-white">Безопасность аккаунта</h3>
        <p className="mt-2 text-sm text-slate-400">Управление входом, сессиями и восстановлением доступа подключим отдельно. Существующие аккаунты портала не заменяются этим макетом.</p>
      </div>
    </div>;
  }

  return <div className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-5 sm:p-6">
    <div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-400/10 text-violet-300"><selectedSection.icon size={21} /></div><div><h3 className="font-semibold text-white">{selectedSection.label}</h3><p className="text-xs text-slate-500">Раздел личного кабинета</p></div></div>
    <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">Здесь будет содержимое раздела «{selectedSection.label}»: записи, фотографии, управление и действия пользователя. Навигация уже переключается, наполнение подключим к данным профиля.</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"><p className="text-sm text-slate-300">Личные материалы</p><p className="mt-1 text-xs text-slate-500">Появятся после подключения данных</p></div>
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"><p className="text-sm text-slate-300">Управление разделом</p><p className="mt-1 text-xs text-slate-500">Действия будут доступны с телефона и ПК</p></div>
    </div>
  </div>;
}

export default function ProfilePage() {
  const [active, setActive] = useState<SectionId>("overview");
  const [profileName, setProfileName] = useState("");
  const [profileRegionId, setProfileRegionId] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [profileAvatar, setProfileAvatar] = useState("");
  const [profileUser, setProfileUser] = useState<{ nickname: string; telegramLinked: boolean; yandexLinked: boolean } | null>(null);
  const [regions, setRegions] = useState<{ id: string; name: string }[]>([]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRegion = useMemo(() => regions.find((region) => region.id === profileRegionId)?.name || "", [regions, profileRegionId]);
  const profileCompletion = [profileName.trim(), profileRegionId.trim(), profileBio.trim()].filter(Boolean).length * 33;
  const current = sections.find((item) => item.id === active) || quickSections.find((item) => item.id === active) || sections[0];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const openedForAuth = params.get("auth") === "1";
    const requestedSection = params.get("section");
    if (requestedSection && (sections.some((item) => item.id === requestedSection) || quickSections.some((item) => item.id === requestedSection))) setActive(requestedSection as SectionId);
    else if (openedForAuth) setActive("settings");
    let alive = true;
    const loadAccount = async () => {
      try {
        const response = await fetch("/api/account/me", { cache: "no-store" });
        if (!alive) return;
        if (!response.ok) {
          setProfileUser(null);
          return;
        }
        const data = await response.json();
        const user = data.user;
        if (!user) return;
        setProfileUser(user);
        if (openedForAuth) setActive("overview");
        setProfileName(user.displayName || user.nickname || "");
        setProfileBio(user.about || "");
        setProfileAvatar(user.avatar || "");
        setProfileRegionId(user.homeRegionId || "");
      } catch {
        if (alive) setProfileMessage("Не удалось загрузить данные аккаунта.");
      }
    };
    fetch("/api/regions", { cache: "no-store" }).then(async (response) => {
      if (!alive || !response.ok) return;
      const catalog = await response.json();
      if (alive && Array.isArray(catalog.regions)) setRegions(catalog.regions);
    }).catch(() => undefined);
    loadAccount();
    const refreshAccount = () => { loadAccount(); };
    const handleAuthSuccess = () => { setActive("overview"); };
    window.addEventListener("klevoe:account-updated", refreshAccount);
    window.addEventListener("klevoe:auth-success", handleAuthSuccess);
    return () => {
      alive = false;
      window.removeEventListener("klevoe:account-updated", refreshAccount);
      window.removeEventListener("klevoe:auth-success", handleAuthSuccess);
    };
  }, []);

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setProfileMessage("Выберите фото JPG, PNG или WebP.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setProfileMessage("Фото должно быть не больше 5 МБ.");
      return;
    }
    setUploadingAvatar(true);
    setProfileMessage("");
    try {
      const form = new FormData();
      form.append("avatar", file);
      const response = await fetch("/api/account/avatar", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Не удалось загрузить фотографию.");
      setProfileAvatar(data.avatar || data.user?.avatar || "");
      if (data.user) setProfileUser(data.user);
      setProfileMessage("Фотография загружена и сохранена.");
    } catch (error) {
      setProfileMessage(error instanceof Error ? error.message : "Ошибка загрузки фотографии.");
    } finally {
      setUploadingAvatar(false);
    }
  }

  async function saveProfile() {
    setSavingProfile(true);
    setProfileMessage("");
    try {
      const response = await fetch("/api/account/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: profileName, about: profileBio, avatar: profileAvatar, homeRegionId: profileRegionId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Не удалось сохранить профиль.");
      const user = data.user;
      setProfileUser(user);
      setProfileName(user.displayName || user.nickname || profileName);
      setProfileBio(user.about || "");
      setProfileAvatar(user.avatar || "");
      setProfileRegionId(user.homeRegionId || "");
      setEditingProfile(false);
      setProfileMessage("Профиль сохранён на сервере.");
    } catch (error) {
      setProfileMessage(error instanceof Error ? error.message : "Ошибка сохранения профиля.");
    } finally {
      setSavingProfile(false);
    }
  }

  useEffect(() => {
    if (active === "settings") document.getElementById("account-auth")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [active]);

  return (
    <main className="min-h-screen bg-[#0b0d14] text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#0e111a]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-400/20 text-cyan-200"><Fish size={19} /></span>
            <span><span className="block text-sm font-semibold">Клёвое место</span><span className="block text-[10px] tracking-[0.16em] text-slate-500">ЛИЧНЫЙ КАБИНЕТ</span></span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" aria-label="Главная" title="Главная" className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/[0.09] px-3 text-xs text-slate-300 transition hover:border-cyan-300/30 hover:text-white"><Home size={16}/><span className="hidden sm:inline">Главная</span></Link>
            <button aria-label="Уведомления" className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/[0.08] text-slate-300"><Bell size={17}/><span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-violet-400"/></button>
            <div className="relative">
              <button type="button" aria-label="Меню профиля" aria-expanded={profileMenuOpen} onClick={() => setProfileMenuOpen((value) => !value)} className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.09] bg-white/[0.03] text-cyan-200 hover:border-cyan-300/30"><Avatar label={(profileName.trim()[0] || "Р").toUpperCase()} size="sm" src={profileAvatar}/></button>
              {profileMenuOpen && <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-white/10 bg-[#151a27] p-2 shadow-2xl">
                <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Мой профиль</p>
                {sections.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => { setActive(id); setProfileMenuOpen(false); }} className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm transition ${active === id ? "bg-cyan-300/10 text-cyan-100" : "text-slate-300 hover:bg-white/[0.05]"}`}><Icon size={16}/><span>{label}</span></button>)}
                {!profileUser && <button onClick={() => { setActive("settings"); setProfileMenuOpen(false); }} className="mt-1 flex min-h-11 w-full items-center gap-3 rounded-xl border-t border-white/[0.07] px-3 pt-2 text-left text-sm text-amber-200"><CircleUserRound size={16}/>Войти / регистрация</button>}
              </div>}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-4 px-3 py-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_250px] lg:gap-4 lg:py-6">

        <section className="min-w-0 space-y-4">
          <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#11141e]">
            <div className="h-24 bg-gradient-to-r from-violet-700/50 via-[#27344a] to-cyan-700/35 sm:h-32"/>
            <div className="px-4 pb-4 sm:px-6">
              <div className="-mt-10 flex flex-wrap items-end justify-between gap-3">
                <Avatar label={(profileName.trim()[0] || "Р").toUpperCase()} size="lg" src={profileAvatar}/>
                {profileUser ? <span className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-emerald-300/15 bg-emerald-300/[0.07] px-3 py-1.5 text-[11px] text-emerald-200"><span className="h-1.5 w-1.5 rounded-full bg-current"/>Аккаунт подключён</span> : <button type="button" onClick={() => setActive("settings")} className="mb-1 inline-flex min-h-9 items-center gap-1.5 rounded-full border border-amber-300/20 bg-amber-300/[0.07] px-3 py-1.5 text-[11px] text-amber-200 transition hover:bg-amber-300/[0.14]"><span className="h-1.5 w-1.5 rounded-full bg-current"/>Требуется вход</button>}
              </div>
              <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
                <div><h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{profileName || "Без имени"}</h1><p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500"><MapPin size={13}/> {profileRegion || "Регион не выбран"}</p></div>
                {profileUser && <button onClick={() => setEditingProfile((value) => !value)} className="rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-300 transition hover:border-violet-300/30 hover:text-white"><Settings size={14} className="mr-1.5 inline"/> {editingProfile ? "Закрыть редактор" : "Редактировать профиль"}</button>}
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{profileBio || "Добавьте информацию о себе."}</p>{profileMessage && <p role="status" className="mt-3 text-xs text-cyan-200">{profileMessage}</p>}{!profileUser && <p className="mt-3 text-xs text-amber-200">Нажмите «Требуется вход», чтобы открыть вход и регистрацию.</p>}
              {editingProfile && <div className="mt-4 grid min-w-0 w-full max-w-full gap-3 overflow-hidden rounded-xl border border-violet-300/15 bg-[#0c1019] p-3 sm:grid-cols-2">
                <label className="grid min-w-0 w-full gap-1.5 text-xs text-slate-400">Имя в профиле<input value={profileName} onChange={(event) => setProfileName(event.target.value)} maxLength={40} minLength={2} required className="box-border min-h-11 w-full min-w-0 max-w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none focus:border-cyan-300/50" /><span className="min-w-0 break-words text-[10px] text-slate-500">Это отображаемое имя. Логин для входа не меняется.</span></label>
                <label className="grid min-w-0 w-full gap-1.5 text-xs text-slate-400">Регион<select value={profileRegionId} onChange={(event) => setProfileRegionId(event.target.value)} className="box-border min-h-11 w-full min-w-0 max-w-full rounded-lg border border-white/10 bg-[#171b27] px-3 text-sm text-white outline-none focus:border-cyan-300/50"><option value="">Регион не выбран</option>{regions.map((region) => <option key={region.id} value={region.id}>{region.name}</option>)}</select></label>
                <label className="grid gap-1.5 text-xs text-slate-400 sm:col-span-2">Фотография профиля<input type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadAvatar} disabled={uploadingAvatar} className="min-h-11 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white file:mr-3 file:rounded-lg file:border-0 file:bg-violet-500/20 file:px-3 file:py-1.5 file:text-xs file:text-violet-100 disabled:opacity-50" /><span className="text-[10px] text-slate-500">{uploadingAvatar ? "Загружаем фотографию…" : "Выберите фото прямо из галереи телефона или файлов компьютера. JPG, PNG, WebP, до 5 МБ."}</span></label>
                <label className="grid gap-1.5 text-xs text-slate-400 sm:col-span-2">О себе<textarea value={profileBio} onChange={(event) => setProfileBio(event.target.value)} maxLength={500} rows={3} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/50" /></label>
                <div className="flex flex-wrap items-center justify-between gap-2 sm:col-span-2"><span className="text-[11px] text-slate-500">Изменения сохраняются в аккаунте портала.</span><button onClick={saveProfile} disabled={savingProfile} className="min-h-11 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 px-4 text-xs font-semibold text-white disabled:opacity-50">{savingProfile ? "Сохраняем…" : "Сохранить профиль"}</button></div>
              </div>}
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/[0.06] pt-4 text-xs text-slate-400"><span><b className="text-white">0</b> друзей</span><span><b className="text-white">0</b> подписчиков</span><span><b className="text-white">0</b> публикаций</span></div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 px-1">
            <div><p className="text-[10px] font-semibold tracking-[0.18em] text-cyan-300">ЛИЧНОЕ ПРОСТРАНСТВО</p><h2 className="mt-1 text-lg font-semibold text-white">{current.label}</h2></div>
            <span className="text-[11px] text-slate-500">Единые функции на телефоне и ПК</span>
          </div>
          <SectionContent active={active}/>
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Моя карточка</h3>
            <div className="mt-4 flex items-center gap-3"><Avatar label={(profileName.trim()[0] || "Р").toUpperCase()} src={profileAvatar}/><div><p className="text-sm font-medium text-white">{profileName || "Без имени"}</p><p className="mt-0.5 text-[11px] text-slate-500">{profileUser ? "Участник портала" : "Гость"}</p></div></div>
            <div className="mt-4 rounded-xl bg-white/[0.035] p-3"><div className="flex items-center justify-between text-xs"><span className="text-slate-400">Заполнение профиля</span><span className="text-cyan-300">{profileCompletion}%</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan-300 transition-all" style={{ width: `${profileCompletion}%` }}/></div><p className="mt-2 text-[10px] text-slate-500">Добавьте регион и информацию о себе.</p></div>
          </div>
          <div className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-4">
            <div className="flex items-center gap-2"><Link2 size={15} className="text-violet-300"/><h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Связанные сервисы</h3></div>
            {([["Telegram", profileUser?.telegramLinked], ["Яндекс ID", profileUser?.yandexLinked]] as const).map(([name, linked]) => <div key={name} className="mt-3 flex items-center justify-between border-b border-white/[0.05] pb-3 last:border-0 last:pb-0"><span className="text-xs text-slate-300">{name}</span><span className={`text-[10px] ${linked ? "text-emerald-300" : "text-slate-500"}`}>{linked ? "Привязан" : "Не привязан"}</span></div>)}
          </div>
          <div className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.035] p-4"><div className="flex items-center gap-2 text-cyan-200"><ShieldCheck size={16}/><span className="text-xs font-semibold">Защита аккаунта</span></div><p className="mt-2 text-xs leading-5 text-slate-400">Способы входа, восстановление доступа и активные сессии будут доступны в настройках.</p></div>
        </aside>
      </div>
      <footer className="mx-auto max-w-[1600px] px-6 pb-8 text-[10px] text-slate-600">Профиль и настройки аккаунта загружаются из общей системы пользователей портала.</footer>
    </main>
  );
}
