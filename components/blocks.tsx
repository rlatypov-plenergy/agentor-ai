import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button, Pill, Section } from "./ui";
import type { Case } from "@/content/schema";
import { caseImages } from "@/lib/content";

export function PageHero({ eyebrow, title, lead, children }: { eyebrow?: string; title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <div className="glow-mint pointer-events-none absolute -left-40 -top-40 size-[480px]" />
      <div className="glow-violet pointer-events-none absolute -right-40 -top-20 size-[480px]" />
      <Section className="relative pb-10 pt-16 md:pt-24">
        {eyebrow && <Pill>{eyebrow}</Pill>}
        <h1 className="mt-5 max-w-4xl !text-4xl md:!text-6xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg text-muted">{lead}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </Section>
    </div>
  );
}

export function Crumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-5 pt-6 text-xs text-muted">
      {items.map((it, i) => (
        <span key={i}>
          {it.href ? <Link href={it.href} className="hover:text-white">{it.label}</Link> : <span className="text-white">{it.label}</span>}
          {i < items.length - 1 && " / "}
        </span>
      ))}
    </nav>
  );
}

export function CardGrid({ items, cols = 3 }: { items: { title: string; text: string }[]; cols?: 2 | 3 }) {
  return (
    <div className={`mt-8 grid gap-4 sm:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : ""}`}>
      {items.map((c) => (
        <div key={c.title} className="rounded-card border border-border bg-surface p-6">
          <h3 className="text-lg font-bold">{c.title}</h3>
          <p className="mt-2 text-sm text-muted">{c.text}</p>
        </div>
      ))}
    </div>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-muted"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-mint" />{it}</li>
      ))}
    </ul>
  );
}

export function Steps({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className="mt-8 grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
      {items.map((s, i) => (
        <li key={s.title} className="rounded-card border border-border bg-surface p-5">
          <div className="font-heading text-2xl font-extrabold text-mint">0{i + 1}</div>
          <h3 className="mt-2 font-bold">{s.title}</h3>
          <p className="mt-1 text-sm text-muted">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function Faq({ items, title }: { items: { q: string; a: string }[]; title: string }) {
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })) };
  return (
    <Section className="max-w-3xl">
      <h2>{title}</h2>
      <div className="mt-8 divide-y divide-border rounded-card border border-border bg-surface">
        {items.map((i) => (
          <details key={i.q} className="group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">{i.q}<span className="text-mint transition group-open:rotate-45">+</span></summary>
            <p className="mt-3 text-sm text-muted">{i.a}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </Section>
  );
}

export async function CaseCard({ c }: { c: Case }) {
  const imgs = caseImages(c);
  return (
    <Link href={`/cases/${c.slug}`} className="group flex flex-col overflow-hidden rounded-card border border-border bg-surface transition hover:border-violet/60">
      {imgs[0] ? (
        <Image src={imgs[0]} alt={c.title} width={1600} height={900} sizes="(min-width:768px) 560px, 100vw" className="aspect-video w-full object-cover" />
      ) : c.logo ? (
        <div className="flex aspect-video items-center justify-center bg-surface-2 p-8"><div className="rounded-2xl bg-white px-8 py-6"><Image src={c.logo} alt={c.client} width={359} height={120} className="h-16 w-auto" /></div></div>
      ) : (
        <div className="flex aspect-video items-center justify-center bg-surface-2 font-heading text-2xl font-extrabold text-muted">{c.client}</div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="text-xs text-violet">{c.country} · {c.industry}</div>
        <h3 className="mt-1 text-xl font-bold">{c.title}</h3>
        <p className="mt-2 text-sm text-muted">{c.promise}</p>
      </div>
    </Link>
  );
}

type Offer = "discovery" | "mvp" | "assessment";
const offerHref = { discovery: "/free-discovery", mvp: "/free-mvp", assessment: "/ai-assessment" } as const;

export async function OfferBlock({ kind = "discovery" }: { kind?: Offer }) {
  const t = await getTranslations("ui.offers");
  return (
    <Section className="py-8">
      <div className="relative overflow-hidden rounded-[28px] border border-mint/40 bg-surface p-8 md:p-12">
        <div className="glow-mint pointer-events-none absolute -right-20 -top-20 size-96" />
        <div className="relative max-w-2xl">
          <Pill>{t(`${kind}.badge`)}</Pill>
          <h2 className="mt-5">{t(`${kind}.title`)}</h2>
          <p className="mt-4 text-muted">{t(`${kind}.text`)}</p>
          <Button href={offerHref[kind]} className="mt-6">{t(`${kind}.cta`)}</Button>
        </div>
      </div>
    </Section>
  );
}

export async function FinalCta() {
  const t = await getTranslations("final");
  return (
    <Section>
      <div className="relative overflow-hidden rounded-[28px] border border-border bg-surface-2 p-10 text-center md:p-16">
        <div className="glow-violet pointer-events-none absolute left-1/2 top-0 size-96 -translate-x-1/2 -translate-y-1/2" />
        <h2 className="relative mx-auto max-w-2xl">{t("title")}</h2>
        <p className="relative mt-3 text-muted">{t("text")}</p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/consultation">{t("c1")}</Button>
          <Button href="/free-discovery" variant="ghost">{t("c2")}</Button>
          <Button href="/ai-assessment" variant="ghost">{t("c3")}</Button>
          <Button href="/free-mvp" variant="ghost">{t("c4")}</Button>
        </div>
      </div>
    </Section>
  );
}
