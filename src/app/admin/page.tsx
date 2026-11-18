"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity, AlertTriangle, ArrowUpRight, Bell, BookOpen, Camera, CheckCircle2,
  ChevronRight, Compass, Fish, Flag, Home, Image, LayoutDashboard, MapPin,
  MessageCircle, Newspaper, Settings, Shield, ShoppingBag, TentTree, Users, Waves
} from "lucide-react";

const adminSections = [
  { id: "overview", label: "Главная страница", icon: LayoutDashboard, group: "Рабочее место" },
  { id: "carousel", label: "Карусель главной", icon: Image, group: "Рабочее место" },
  { id: "announcements", label: "Объявления администрации", icon: Bell, group: "Контент" },
  { id: "waters", label: "Водоёмы", icon: Waves, group: "Водоёмы" },
  { id: "add-water", label: "Добавить водоём", icon: Compass, group: "Водоёмы" },
  { id: "fishing-spots", label: "Точки клёва", icon: MapPin, group: "Водоёмы" },
  { id: "fish-species", label: "Виды рыб", icon: Fish, group: "Водоёмы" },
  { id: "recreation", label: "Базы отдыха", icon: TentTree, group: "Справочники" },
  { id: "base-owners", label: "Владельцы баз", icon: Users, group: "Справочники" },
  { id: "shops", label: "Магазины", icon: ShoppingBag, group: "Справочники" },
  { id: "market-moderation", label: "Модерация торговой площадки", icon: Shield, group: "Модерация" },
  { id: "premium", label: "Премиум-разделы", icon: CheckCircle2, group: "Коммерция" },
  { id: "support", label: "Техническая приёмная", icon: MessageCircle, group: "Модерация" },
  { id: "chat-moderation", label: "Модерация чата", icon: MessageCircle, group: "Модерация" },
  { id: "users", label: "Участники сайта", icon: Users, group: "Сообщество" },
  { id: "regalia", label: "Рыбацкие регалии", icon: Flag, group: "Сообщество" },
  { id: "settings", label: "Настройки и права", icon: Settings, group: "Система" },
] as const;

type AdminSection = (typeof adminSections)[number]["id"];

const sectionDescriptions: Record<AdminSection, string> = {
  overview: "Главная страница старой админки: сводка состояния портала и быстрые переходы.",
  carousel: "Дополнительный редактор слайдов главной страницы: тексты, изображения и порядок показа.",
  announcements: "Создание, редактирование и публикация объявлений администрации портала.",
  waters: "Список водоёмов, поиск, проверка карточек и редактирование существующих записей.",
  "add-water": "Создание карточки водоёма: регион, описание, фотографии, виды рыб, условия ловли и координаты.",
  "fishing-spots": "Карта и редактор точек клёва, маркеров, глубин и заметок по местам ловли.",
  "fish-species": "Справочник видов рыб и сведения для карточек водоёмов.",
  recreation: "Каталог баз отдыха: карточки, фотографии, услуги, цены и условия размещения.",
  "base-owners": "Заявки владельцев баз, проверка данных и управление доступом к кабинетам.",
  shops: "Каталог рыболовных магазинов и управление доступом к кабинетам организаций.",
  "market-moderation": "Проверка объявлений торговой площадки, жалобы, снятие публикаций и блокировки.",
  premium: "Управление платными разделами, постоянным доступом и кодами активации.",
  support: "Технические обращения пользователей, ответы и история решения проблем.",
  "chat-moderation": "Жалобы на сообщения, удаление нарушений и временные ограничения участников чата.",
  users: "Участники сайта, аккаунты, роли, блокировки и административные рассылки.",
  regalia: "Правила, список наград и выдача рыбацких регалий участникам.",
  settings: "Настройки портала, администраторы, модераторы, временные пароли и права доступа по разделам.",
};



function PlaceholderPanel({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200"><Settings size={20}/></div>
        <div className="min-w-0">
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
        </div>
      </div>
      <div className="mt-5 rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-4">
        <p className="text-xs font-medium text-slate-300">Рабочая область раздела</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">Здесь появятся реальные данные и инструменты управления после подключения серверных функций и проверки административных прав.</p>
      </div>
    </div>
  );
}

function CarouselEditorPreview() {
  const slides = [
    ["01", "Водоёмы России", "Исследуй реки, озёра и водохранилища"],
    ["02", "Уловы и впечатления", "Фотоотчёты и трофеи участников"],
    ["03", "Новости водоёмов", "События и важная информация"],
    ["04", "Места для отдыха", "Базы, домики и кемпинги"],
    ["05", "Снасти и общение", "Сообщество и рыболовная барахолка"],
  ];
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><h3 className="font-semibold text-white">Слайды главной страницы</h3><p className="mt-1 text-xs text-slate-500">Предварительная структура редактора</p></div>
          <span className="rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-3 py-1.5 text-[10px] text-amber-200">Только макет</span>
        </div>
        <div className="mt-4 space-y-2">
          {slides.map(([number, title, description]) => (
            <div key={number} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cyan-300/10 text-xs font-semibold text-cyan-200">{number}</span>
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-slate-200">{title}</p><p className="mt-0.5 truncate text-xs text-slate-500">{description}</p></div>
              <span className="hidden rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-slate-500 sm:inline-flex">В макете</span>
              <ChevronRight size={16} className="shrink-0 text-slate-600"/>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-4"><div className="flex items-center gap-2 text-cyan-200"><Image size={16}/><span className="text-xs font-semibold">Изображения</span></div><p className="mt-2 text-xs leading-5 text-slate-500">Загрузка с телефона и компьютера, кадрирование и предпросмотр.</p></div>
        <div className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-4"><div className="flex items-center gap-2 text-cyan-200"><Activity size={16}/><span className="text-xs font-semibold">Публикация</span></div><p className="mt-2 text-xs leading-5 text-slate-500">Порядок слайдов, регионы показа и даты публикации.</p></div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [active, setActive] = useState<AdminSection>("overview");
  const current = adminSections.find((item) => item.id === active)!;
  const groups = ["Рабочее место", "Контент", "Водоёмы", "Справочники", "Модерация", "Коммерция", "Сообщество", "Система"];

  return (
    <main className="min-h-screen bg-[#0b0d14] text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#0e111a]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-400/20 text-cyan-200"><Fish size={19}/></span>
            <span className="min-w-0"><span className="block truncate text-sm font-semibold">Клёвое место</span><span className="block text-[10px] tracking-[0.16em] text-slate-500">АДМИНИСТРАТИВНАЯ ПАНЕЛЬ</span></span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-amber-300/15 bg-amber-300/[0.05] px-3 py-2 text-[10px] text-amber-200 sm:inline-flex"><AlertTriangle size={13}/> Предпросмотр макета</span>
            <Link href="/" aria-label="На главную" title="На главную" className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.09] text-slate-300 transition hover:border-cyan-300/30 hover:text-white"><Home size={17}/></Link>
            <button type="button" aria-label="Уведомления" className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/[0.09] text-slate-300"><Bell size={17}/></button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid min-w-0 max-w-[1600px] gap-3 overflow-x-hidden px-3 py-3 sm:px-6 lg:grid-cols-[250px_minmax(0,1fr)_250px] lg:gap-4 lg:py-6">
        <div className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-2 lg:hidden">
          <label htmlFor="admin-mobile-section" className="mb-1 block px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Раздел админки</label>
          <select id="admin-mobile-section" value={active} onChange={(event) => setActive(event.target.value as AdminSection)} className="min-h-11 w-full min-w-0 rounded-xl border border-white/10 bg-[#171b27] px-3 text-sm text-white outline-none focus:border-cyan-300/40">
            {adminSections.map(({id,label}) => <option key={id} value={id}>{label}</option>)}
          </select>
        </div>
        <nav aria-label="Навигация админки" className="hidden h-fit min-w-0 rounded-2xl border border-white/[0.07] bg-[#11141e] p-2 lg:sticky lg:top-[5.5rem] lg:block">
          <div className="px-3 pb-3 pt-2"><p className="text-[10px] font-semibold tracking-[0.16em] text-slate-500">УПРАВЛЕНИЕ ПОРТАЛОМ</p></div>
          <div className="flex min-w-0 flex-col">
            {groups.map((group) => {
              const items = adminSections.filter((item) => item.group === group);
              return <div key={group} className="contents lg:block">
                <p className="hidden px-3 pb-1 pt-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-600 lg:block">{group}</p>
                {items.map(({id,label,icon:Icon}) => <button key={id} type="button" onClick={() => setActive(id)} aria-current={active === id ? "page" : undefined} className={`flex min-h-11 shrink-0 items-center gap-2.5 rounded-xl px-3 text-left text-xs transition lg:w-full ${active === id ? "bg-cyan-300/10 text-cyan-100 ring-1 ring-inset ring-cyan-300/10" : "text-slate-400 hover:bg-white/[0.04] hover:text-white"}`}><Icon size={16}/><span>{label}</span></button>)}
              </div>;
            })}
          </div>
        </nav>

        <section className="min-w-0 space-y-4">
          <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#11141e]">
            <div className="h-24 bg-gradient-to-r from-violet-700/45 via-[#27344a] to-cyan-700/35 sm:h-32"/>
            <div className="px-4 pb-4 sm:px-6">
              <div className="-mt-8 flex flex-wrap items-end justify-between gap-3">
                <div className="grid h-16 w-16 place-items-center rounded-2xl border border-[#11141e] bg-gradient-to-br from-violet-500/40 to-cyan-400/25 text-cyan-100"><Shield size={28}/></div>
                <span className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-3 py-1.5 text-[10px] text-amber-200"><span className="h-1.5 w-1.5 rounded-full bg-current"/>Доступ не подключён</span>
              </div>
              <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
                <div><h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">Управление порталом</h1><p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500"><MapPin size={13}/> Вся Россия · Клёвое место</p></div>
                <span className="rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-400">Панель администратора</span>
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">Единое рабочее место для управления содержимым и сообществом портала. Внешний вид повторяет личный кабинет и адаптирован для телефона и компьютера.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 px-1">
            <div><p className="text-[10px] font-semibold tracking-[0.18em] text-cyan-300">АДМИНИСТРИРОВАНИЕ</p><h2 className="mt-1 text-lg font-semibold text-white">{current.label}</h2></div>
            <span className="text-[11px] text-slate-500">Макет интерфейса</span>
          </div>

          {active === "overview" ? (
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  [Waves, "Водоёмы", "Подключить данные"],
                  [Users, "Участники", "Подключить данные"],
                  [Newspaper, "Публикации", "Подключить данные"],
                  [Flag, "На модерации", "Подключить данные"],
                ].map(([Icon, label, value]) => {
                  const MetricIcon = Icon as typeof Waves;
                  return <div key={String(label)} className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-4"><div className="flex items-center justify-between text-slate-400"><span className="text-xs">{String(label)}</span><MetricIcon size={17} className="text-cyan-200"/></div><p className="mt-3 text-sm font-medium text-slate-200">{String(value)}</p></div>;
                })}
              </div>
              <div className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-4 sm:p-5">
                <h3 className="font-semibold text-white">Быстрый переход</h3>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {adminSections.slice(1,6).map(({id,label,icon:Icon}) => <button key={id} type="button" onClick={() => setActive(id)} className="flex min-h-12 items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 text-left text-sm text-slate-300 transition hover:border-cyan-300/20 hover:bg-cyan-300/[0.04]"><Icon size={17} className="text-cyan-200"/><span className="flex-1">{label}</span><ArrowUpRight size={15} className="text-slate-600"/></button>)}
                </div>
              </div>
            </div>
          ) : active === "carousel" ? <CarouselEditorPreview/> : <PlaceholderPanel title={current.label} description={sectionDescriptions[active]}/>}
        </section>

        <aside className="hidden min-w-0 space-y-4 lg:block">
          <div className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Состояние панели</h3>
            <div className="mt-4 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-300/10 text-amber-200"><Shield size={19}/></div><div><p className="text-sm font-medium text-white">Режим макета</p><p className="mt-0.5 text-[11px] text-slate-500">Без административных действий</p></div></div>
            <div className="mt-4 rounded-xl bg-white/[0.035] p-3"><p className="text-xs text-slate-300">Серверная проверка прав</p><p className="mt-1 text-[11px] leading-5 text-amber-200/80">Ещё не подключена. Реальные инструменты появятся только после настройки проверки роли на сервере.</p></div>
          </div>
          <div className="rounded-2xl border border-white/[0.07] bg-[#11141e] p-4">
            <div className="flex items-center gap-2"><CheckCircle2 size={15} className="text-cyan-200"/><h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Единый интерфейс</h3></div>
            <p className="mt-3 text-xs leading-5 text-slate-400">Та же структура, что в личном кабинете: верхняя панель, навигация, центральная рабочая область и боковой блок.</p>
          </div>
          <div className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.035] p-4"><div className="flex items-center gap-2 text-cyan-200"><Compass size={16}/><span className="text-xs font-semibold">Следующий этап</span></div><p className="mt-2 text-xs leading-5 text-slate-400">Подключить защищённые API, роли администратора и модератора, затем наполнить разделы реальными данными.</p></div>
        </aside>
      </div>
      <footer className="mx-auto hidden max-w-[1600px] px-6 pb-8 text-[10px] text-slate-600 lg:block">Предварительный интерфейс административной панели. Реальные операции не выполняются.</footer>
    </main>
  );
}
