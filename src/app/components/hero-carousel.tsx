"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Compass, Fish, MapPin, MessageCircle,
  Newspaper, ShoppingBag, TentTree
} from "lucide-react";

const slides = [
  {
    eyebrow: "ИССЛЕДУЙ РОССИЮ",
    title: "Водоёмы, где начинается рыбалка",
    description: "Изучай озёра, реки и водохранилища: виды рыб, условия ловли, особенности и точки доступа.",
    tag: "Каталог водоёмов",
    icon: Compass,
    number: "01",
    tone: "from-emerald-300/20 via-teal-400/10 to-transparent",
  },
  {
    eyebrow: "УЛОВЫ И ВПЕЧАТЛЕНИЯ",
    title: "Покажи, что сегодня на крючке",
    description: "Фотоотчёты, трофеи и рыболовные истории участников. Настоящие публикации сообщества, а не выдуманные рекорды.",
    tag: "Фотоотчёты и трофеи",
    icon: Fish,
    number: "02",
    tone: "from-cyan-300/20 via-emerald-400/10 to-transparent",
  },
  {
    eyebrow: "ЧТО ПРОИСХОДИТ НА ВОДОЁМАХ",
    title: "Новости, которые важны рыболову",
    description: "Сообщения о зарыблении, состоянии водоёмов, ограничениях, заморах и других важных событиях с указанием источников.",
    tag: "Новости и объявления",
    icon: Newspaper,
    number: "03",
    tone: "from-lime-300/15 via-teal-400/10 to-transparent",
  },
  {
    eyebrow: "РЫБАЛКА С КОМФОРТОМ",
    title: "Найди место для отдыха у воды",
    description: "Базы отдыха, домики, кемпинги и условия размещения. Полезная информация для поездки на рыбалку.",
    tag: "Места для отдыха",
    icon: TentTree,
    number: "04",
    tone: "from-teal-300/20 via-cyan-400/10 to-transparent",
  },
  {
    eyebrow: "СНАРЯЖЕНИЕ И ОБЩЕНИЕ",
    title: "Всё рыболовное в одном сообществе",
    description: "Общайся с рыболовами, делись опытом и находи снасти, лодки и экипировку в тематических разделах.",
    tag: "Общение и барахолка",
    icon: ShoppingBag,
    number: "05",
    tone: "from-emerald-300/20 via-lime-400/10 to-transparent",
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const current = slides[active];
  const Icon = current.icon;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const previous = () => setActive((index) => (index - 1 + slides.length) % slides.length);
  const next = () => setActive((index) => (index + 1) % slides.length);

  return (
    <section
      aria-label="Возможности Клёвого места"
      className="panel relative min-h-[330px] overflow-hidden p-6 sm:min-h-[370px] sm:p-8"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${current.tone} transition-colors duration-500`} />
      <div className="absolute -right-16 -top-20 size-72 rounded-full border border-emerald-100/10" />
      <div className="absolute -right-5 -top-9 size-52 rounded-full border border-emerald-100/[0.07]" />
      <div className="relative flex min-h-[278px] flex-col justify-between sm:min-h-[306px]">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold tracking-[0.18em] text-emerald-200">{current.eyebrow}</span>
          <span className="rounded-full border border-emerald-100/15 bg-black/10 px-3 py-1 text-xs text-emerald-100/75">
            {current.number} / 05
          </span>
        </div>

        <div key={active} className="my-7 animate-[fadeIn_.35s_ease-out]">
          <div className="mb-5 grid size-14 place-items-center rounded-2xl border border-emerald-100/15 bg-emerald-200/10 text-emerald-200">
            <Icon size={27} strokeWidth={1.7} />
          </div>
          <h2 className="max-w-lg text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            {current.title}
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-emerald-50/65 sm:text-base">
            {current.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="#sections"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-200/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-200/15"
          >
            {current.tag} <MapPin size={15} />
          </Link>
          <div className="flex items-center gap-2">
            <div className="mr-2 hidden items-center gap-1.5 sm:flex" aria-label={`Слайд ${active + 1} из ${slides.length}`}>
              {slides.map((slide, index) => (
                <button
                  key={slide.number}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Показать слайд ${index + 1}`}
                  aria-current={index === active ? "true" : undefined}
                  className={`h-1.5 rounded-full transition-all ${index === active ? "w-7 bg-emerald-200" : "w-1.5 bg-emerald-100/30 hover:bg-emerald-100/60"}`}
                />
              ))}
            </div>
            <button type="button" onClick={previous} aria-label="Предыдущий слайд" className="grid size-11 place-items-center rounded-full border border-white/10 bg-black/10 text-emerald-100 transition hover:bg-white/10">
              <ArrowLeft size={18} />
            </button>
            <button type="button" onClick={next} aria-label="Следующий слайд" className="grid size-11 place-items-center rounded-full border border-white/10 bg-black/10 text-emerald-100 transition hover:bg-white/10">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-2 sm:hidden">
          {slides.map((slide, index) => (
            <button
              key={slide.number}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Показать слайд ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all ${index === active ? "w-7 bg-emerald-200" : "w-1.5 bg-emerald-100/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
