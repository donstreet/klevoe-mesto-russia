"use client";

import { useState } from "react";
import {
  Activity, Award, Bell, BookOpen, Camera, ChevronRight, CircleUserRound,
  Compass, Fish, Link2, MapPin, MessageCircle, Settings, ShieldCheck,
  ShoppingBag, Users, Waves
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

type SectionId = (typeof sections)[number]["id"];

const quickLinks = [
  { label: "Водоёмы", icon: Waves },
  { label: "Общение", icon: MessageCircle, count: "3" },
  { label: "Магазин", icon: ShoppingBag },
  { label: "Исследовать", icon: Compass },
];

function Avatar({ label, size = "md" }: { label: string; size?: "sm" | "md" | "lg" }) {
  const dimensions = size === "lg" ? "h-20 w-20 text-2xl" : size === "sm" ? "h-9 w-9 text-xs" : "h-12 w-12 text-base";
  return <div className={`grid ${dimensions} shrink-0 place-items-center rounded-full border border-violet-300/30 bg-gradient-to-br from-violet-500/40 to-cyan-400/20 font-semibold text-white`}>{label}</div>;
}

function SectionContent({ active }: { active: SectionId }) {
  const selected = sections.find((item) => item.id === active)!;
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
      <div className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-4">
        <h3 className="font-semibold text-white">Способы входа и связи</h3>
        <p className="mt-1 text-xs text-slate-500">Пока это макет. Статусы не имитируют реальное подключение.</p>
        {["Telegram", "MAX", "Яндекс"].map((name) => <div key={name} className="mt-3 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-3">
          <span className="text-sm text-slate-200">{name}</span><span className="rounded-full border border-slate-600/40 px-2.5 py-1 text-[11px] text-slate-400">Не подключено</span>
        </div>)}
      </div>
      <div className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-4">
        <h3 className="font-semibold text-white">Безопасность аккаунта</h3>
        <p className="mt-2 text-sm text-slate-400">Управление входом, сессиями и восстановлением доступа подключим отдельно. Существующие аккаунты портала не заменяются этим макетом.</p>
      </div>
    </div>;
  }

  return <div className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-5 sm:p-6">
    <div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-400/10 text-violet-300"><selected.icon size={21} /></div><div><h3 className="font-semibold text-white">{selected.label}</h3><p className="text-xs text-slate-500">Раздел личного кабинета</p></div></div>
    <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">Здесь будет содержимое раздела «{selected.label}»: записи, фотографии, управление и действия пользователя. Навигация уже переключается, наполнение подключим к данным профиля.</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"><p className="text-sm text-slate-300">Личные материалы</p><p className="mt-1 text-xs text-slate-500">Появятся после подключения данных</p></div>
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"><p className="text-sm text-slate-300">Управление разделом</p><p className="mt-1 text-xs text-slate-500">Действия будут доступны с телефона и ПК</p></div>
    </div>
  </div>;
}

export default function ProfilePage() {
  const [active, setActive] = useState<SectionId>("overview");
  const current = sections.find((item) => item.id === active)!;

  return (
    <main className="min-h-screen bg-[#0b0d14] text-slate-100">
      <header className="border-b border-white/[0.07] bg-[#0e111a]">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-400/20 text-cyan-200"><Fish size={19} /></span>
            <span><span className="block text-sm font-semibold">Клёвое место</span><span className="block text-[10px] tracking-[0.16em] text-slate-500">ЛИЧНЫЙ КАБИНЕТ</span></span>
          </a>
          <div className="flex items-center gap-2">
            <button aria-label="Уведомления" className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/[0.08] text-slate-300"><Bell size={17}/><span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-violet-400"/></button>
            <Avatar label="Р" size="sm" />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-4 px-3 py-4 sm:px-6 lg:grid-cols-[62px_210px_minmax(0,1fr)_250px] lg:gap-4 lg:py-6">
        <nav aria-label="Основная навигация" className="flex gap-2 overflow-x-auto rounded-2xl border border-white/[0.07] bg-[#11141e] p-2 lg:sticky lg:top-5 lg:h-fit lg:flex-col lg:overflow-visible">
          {quickLinks.map(({ label, icon: Icon, count }) => <a key={label} href="#" aria-label={label} title={label} className="relative grid h-11 min-w-11 place-items-center rounded-xl text-slate-400 transition hover:bg-violet-400/10 hover:text-violet-200 lg:h-12 lg:min-w-0"><Icon size={19}/>{count && <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-violet-500 px-1 text-[9px] text-white">{count}</span>}<span className="sr-only">{label}</span></a>)}
        </nav>

        <aside className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-3">
          <div className="flex items-center justify-between px-2 pb-3 pt-1"><span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Мой профиль</span><span className="text-[10px] text-slate-600">8 разделов</span></div>
          <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {sections.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => setActive(id)} aria-current={active === id ? "page" : undefined} className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition lg:w-full ${active === id ? "bg-gradient-to-r from-violet-500/20 to-cyan-400/10 text-white ring-1 ring-violet-300/15" : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"}`}><Icon size={17} className={active === id ? "text-cyan-300" : "text-slate-500"}/><span>{label}</span>{active === id && <ChevronRight size={14} className="ml-auto hidden text-violet-300 lg:block"/>}</button>)}
          </div>
        </aside>

        <section className="min-w-0 space-y-4">
          <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#11141e]">
            <div className="h-24 bg-gradient-to-r from-violet-700/50 via-[#27344a] to-cyan-700/35 sm:h-32"/>
            <div className="px-4 pb-4 sm:px-6">
              <div className="-mt-10 flex flex-wrap items-end justify-between gap-3">
                <Avatar label="Р" size="lg"/>
                <span className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-emerald-300/15 bg-emerald-300/[0.07] px-3 py-1.5 text-[11px] text-emerald-200"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300"/> Макет профиля</span>
              </div>
              <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
                <div><h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">Рыбак</h1><p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500"><MapPin size={13}/> Регион не выбран</p></div>
                <button onClick={() => setActive("settings")} className="rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-300 transition hover:border-violet-300/30 hover:text-white"><Settings size={14} className="mr-1.5 inline"/> Настроить профиль</button>
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">Здесь будет ваша рыболовная история: выезды, уловы, любимые водоёмы и люди, с которыми вы делитесь опытом.</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/[0.06] pt-4 text-xs text-slate-400"><span><b className="text-white">0</b> друзей</span><span><b className="text-white">0</b> подписчиков</span><span><b className="text-white">0</b> публикаций</span></div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 px-1">
            <div><p className="text-[10px] font-semibold tracking-[0.18em] text-cyan-300">ЛИЧНОЕ ПРОСТРАНСТВО</p><h2 className="mt-1 text-lg font-semibold text-white">{current.label}</h2></div>
            <span className="text-[11px] text-slate-500">Мобильная и ПК-версии · единые функции</span>
          </div>
          <SectionContent active={active}/>
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Моя карточка</h3>
            <div className="mt-4 flex items-center gap-3"><Avatar label="Р"/><div><p className="text-sm font-medium text-white">Рыбак</p><p className="mt-0.5 text-[11px] text-slate-500">Новый участник</p></div></div>
            <div className="mt-4 rounded-xl bg-white/[0.035] p-3"><div className="flex items-center justify-between text-xs"><span className="text-slate-400">Заполнение профиля</span><span className="text-cyan-300">0%</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-0 rounded-full bg-cyan-300"/></div><p className="mt-2 text-[10px] text-slate-500">Добавьте регион и информацию о себе.</p></div>
          </div>
          <div className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-4">
            <div className="flex items-center gap-2"><Link2 size={15} className="text-violet-300"/><h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Связанные сервисы</h3></div>
            {["Telegram", "MAX", "Яндекс"].map((name) => <div key={name} className="mt-3 flex items-center justify-between border-b border-white/[0.05] pb-3 last:border-0 last:pb-0"><span className="text-xs text-slate-300">{name}</span><span className="text-[10px] text-slate-500">Не подключено</span></div>)}
          </div>
          <div className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.035] p-4"><div className="flex items-center gap-2 text-cyan-200"><ShieldCheck size={16}/><span className="text-xs font-semibold">Защита аккаунта</span></div><p className="mt-2 text-xs leading-5 text-slate-400">Способы входа, восстановление доступа и активные сессии будут доступны в настройках.</p></div>
        </aside>
      </div>
      <footer className="mx-auto max-w-[1600px] px-6 pb-8 text-[10px] text-slate-600">Демонстрационный макет. Не подключён к реальным аккаунтам и данным.</footer>
    </main>
  );
}
