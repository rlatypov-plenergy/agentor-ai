"use client";
import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export type CaseItem = { slug: string; title: string; promise: string; country: string; industry: string; services: string[]; img?: string; logo?: string; client: string };

export function CaseFilter({ items, services, allLabel, filterLabel }: { items: CaseItem[]; services: { slug: string; title: string }[]; allLabel: string; filterLabel: string }) {
  const [f, setF] = useState<string>("all");
  const shown = f === "all" ? items : items.filter((i) => i.services.includes(f));
  const chip = (active: boolean) => `rounded-full border px-4 py-1.5 text-sm transition ${active ? "border-mint bg-mint/10 text-mint-ink" : "border-border text-muted hover:text-ink"}`;
  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label={filterLabel}>
        <button className={chip(f === "all")} onClick={() => setF("all")}>{allLabel}</button>
        {services.map((s) => <button key={s.slug} className={chip(f === s.slug)} onClick={() => setF(s.slug)}>{s.title}</button>)}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {shown.map((c) => (
          <Link key={c.slug} href={`/cases/${c.slug}`} className="group flex flex-col overflow-hidden rounded-card border border-border bg-surface transition hover:border-violet/60">
            {c.img ? <Image src={c.img} alt={c.title} width={1600} height={900} sizes="(min-width:768px) 560px, 100vw" className="aspect-video w-full object-cover" />
              : c.logo ? <div className="flex aspect-video items-center justify-center bg-surface-2 p-8"><div className="rounded-2xl bg-white px-8 py-6"><Image src={c.logo} alt={c.client} width={359} height={120} className="h-16 w-auto" /></div></div>
              : <div className="flex aspect-video items-center justify-center bg-surface-2 font-heading text-2xl font-extrabold text-muted">{c.client}</div>}
            <div className="p-6">
              <div className="text-xs text-violet">{c.country} · {c.industry}</div>
              <h3 className="mt-1 text-xl font-bold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted">{c.promise}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
