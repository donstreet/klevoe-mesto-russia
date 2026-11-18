"use client";

import Link from "next/link";
import { Mail, Users, Rss, Newspaper, ArrowUpRight } from "lucide-react";

const shortcuts = [
  {
    title: "Сообщения",
    description: "Личные переписки",
    icon: Mail,
    href: "/profile?section=messages",
    tone: "from-violet-500/20 to-indigo-500/5",
  },
  {
    title: "Друзья",
    description: "Рыбацкие знакомые",
    icon: Users,
    href: "/profile?section=friends",
    tone: "from-cyan-500/20 to-sky-500/5",
  },
  {
    title: "Лента друзей",
    description: "Публикации сообщества",
    icon: Rss,
    href: "/profile?section=friends-feed",
    tone: "from-fuchsia-500/15 to-violet-500/5",
  },
  {
    title: "Новости",
    description: "Новости портала и водоёмов",
    icon: Newspaper,
    href: "/profile?section=news",
    tone: "from-amber-400/15 to-orange-500/5",
  },
];

export default function HeroCarousel() {
  return (
    <section aria-label="Быстрый доступ" className="grid min-w-0 grid-cols-2 gap-2 sm:gap-3">
      {shortcuts.map(({ title, description, icon: Icon, href, tone }) => (
        <Link
          key={title}
          href={href}
          className={`group flex min-h-[104px] min-w-0 items-center gap-2.5 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br ${tone} p-3 transition hover:border-cyan-200/30 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 sm:min-h-[132px] sm:gap-3 sm:p-4`}
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-[#0b0d14]/50 text-cyan-100 sm:size-12">
            <Icon size={20} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-white sm:text-base">{title}</span>
            <span className="mt-1 block text-[10px] leading-4 text-slate-400 sm:text-xs">{description}</span>
          </span>
          <ArrowUpRight size={15} className="hidden shrink-0 text-slate-500 transition group-hover:text-cyan-200 sm:block" />
        </Link>
      ))}
    </section>
  );
}
