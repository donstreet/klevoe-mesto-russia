import Link from "next/link";
import { ArrowRight, Compass, Fish, MapPin, MessageCircle, ShieldCheck, Store, TentTree } from "lucide-react";

const sections = [
  { title: "Водоёмы", description: "Карточки водоёмов, виды рыб, условия и точки ловли.", icon: Compass, status: "Основа каталога" },
  { title: "Общение", description: "Региональные чаты, фотоотчёты и опыт рыболовов.", icon: MessageCircle, status: "В разработке" },
  { title: "Магазины", description: "Рыболовные магазины и предложения рядом.", icon: Store, status: "В разработке" },
  { title: "Где отдохнуть", description: "Базы отдыха, домики и места для рыбалки.", icon: TentTree, status: "В разработке" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen pb-16">
      <header className="shell flex items-center justify-between gap-4 py-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Клёвое место — главная">
          <span className="grid size-11 place-items-center rounded-2xl border border-emerald-200/15 bg-emerald-300/10 text-emerald-200">
            <Fish size={23} />
          </span>
          <span>
            <span className="block text-lg font-semibold tracking-tight">Клёвое место</span>
            <span className="block text-xs tracking-wide text-emerald-100/55">ВСЯ РОССИЯ · ОДНО СООБЩЕСТВО</span>
          </span>
        </Link>
        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-emerald-50/75 sm:flex">
          <MapPin size={15} className="text-emerald-300" />
          Выбор региона появится здесь
        </div>
        <a href="#sections" className="rounded-full border border-emerald-200/20 px-4 py-2 text-sm text-emerald-100 transition hover:bg-emerald-200/10">
          Разделы
        </a>
      </header>

      <section className="shell grid gap-8 pb-14 pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pt-20">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200/15 bg-emerald-200/[0.06] px-3 py-1.5 text-xs font-medium tracking-wide text-emerald-200">
            <span className="size-1.5 rounded-full bg-emerald-300" />
            ВСЕРОССИЙСКАЯ ПЛАТФОРМА РЫБОЛОВОВ
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Твоя рыбалка.
            <span className="block text-emerald-300">Вся Россия.</span>
          </h1>
          <p className="muted mt-6 max-w-xl text-base leading-7 sm:text-lg">
            Водоёмы, проверенная информация, общение с рыболовами и места для отдыха.
            Всё в одном месте, с учётом твоего региона.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#sections" className="inline-flex items-center gap-2 rounded-full bg-emerald-300 px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-200">
              Исследовать портал <ArrowRight size={16} />
            </a>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-emerald-50/70">
              <ShieldCheck size={16} className="text-emerald-300" /> Данные с проверкой источников
            </span>
          </div>
        </div>

        <div className="panel relative min-h-[290px] overflow-hidden p-6 sm:p-8">
          <div className="absolute -right-12 -top-16 size-64 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="relative flex h-full min-h-[240px] flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-sm text-emerald-50/65">Карта возможностей</span>
              <span className="rounded-full border border-emerald-200/15 px-3 py-1 text-xs text-emerald-200">Россия</span>
            </div>
            <div className="my-8 grid grid-cols-3 gap-3">
              {["Водоёмы", "Рыба", "Регионы"].map((item, index) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                  <div className="mb-3 text-2xl font-semibold text-emerald-200">{["01", "02", "03"][index]}</div>
                  <div className="text-xs text-emerald-50/65">{item}</div>
                </div>
              ))}
            </div>
            <p className="max-w-sm text-sm leading-6 text-emerald-50/55">
              Региональная структура заложена в основу проекта. Наполнение и интерактивные функции подключаются поэтапно.
            </p>
          </div>
        </div>
      </section>

      <section id="sections" className="shell pt-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-emerald-300">ВОЗМОЖНОСТИ ПЛАТФОРМЫ</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Всё для рыбалки и отдыха</h2>
          </div>
          <p className="muted max-w-sm text-sm">Это стартовый каркас интерфейса. Статусы честно показывают, что ещё не подключено.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {sections.map(({ title, description, icon: Icon, status }) => (
            <article key={title} className="panel group p-5 transition hover:border-emerald-200/25 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-emerald-300/10 text-emerald-200">
                  <Icon size={22} />
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-emerald-50/55">{status}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="muted mt-2 max-w-md text-sm leading-6">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="shell mt-16 border-t border-white/10 pt-6 text-xs text-emerald-50/40">
        © {new Date().getFullYear()} «Клёвое место». Всероссийская ассоциация рыболовов.
      </footer>
    </main>
  );
}
