import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Pill, Section } from "@/components/ui";
import { CaseCard, Crumbs, FinalCta, OfferBlock, PageHero } from "@/components/blocks";
import { caseImages, getContent } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { Gallery } from "../Gallery";

export const dynamicParams = false;
export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getContent(locale).cases.map((s) => ({ locale, slug: s.slug })));
}

export default async function CasePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ui");
  const c = getContent(locale);
  const x = c.cases.find((i) => i.slug === slug);
  if (!x) notFound();
  const svc = c.services.filter((s) => x.services.includes(s.slug));
  const related = c.cases.filter((i) => i.slug !== x.slug && i.services.some((s) => x.services.includes(s))).slice(0, 2);
  const blocks = [[t("cases.challenge"), x.challenge], [t("cases.solution"), x.solution], [t("cases.result"), x.result]];

  return (
    <>
      <Crumbs items={[{ href: "/", label: t("crumbs.home") }, { href: "/cases", label: t("cases.eyebrow") }, { label: x.client }]} />
      <PageHero eyebrow={`${x.country} · ${x.industry}`} title={x.title} lead={x.promise}>
        {x.note && <Pill>{x.note}</Pill>}
        {svc.map((s) => <Link key={s.slug} href={`/services/${s.slug}`}><Pill>{s.title}</Pill></Link>)}
        {x.link && <a href={x.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-surface-2">{t("visit")} ↗</a>}
      </PageHero>
      {x.logo && (
        <Section className="py-4">
          <div className="inline-block rounded-2xl bg-white px-8 py-5"><Image src={x.logo} alt={x.client} width={359} height={120} className="h-14 w-auto" /></div>
        </Section>
      )}

      <Section className="py-8">
        <div className="grid gap-4 md:grid-cols-3">
          {blocks.map(([h, p]) => (
            <div key={h} className="rounded-card border border-border bg-surface p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-mint-ink">{h}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p}</p>
            </div>
          ))}
        </div>
      </Section>

      {x.images > 0 && <Section className="py-8"><h2 className="text-2xl md:text-3xl">{t("cases.gallery")}</h2><Gallery images={caseImages(x)} alt={x.title} /></Section>}

      <Section className="py-8">
        <h2 className="text-2xl md:text-3xl">{t("cases.arch")}</h2>
        <div className="mt-6 flex flex-col items-stretch gap-2 md:flex-row md:items-center">
          {x.flow.map((f, i) => (
            <div key={f} className="flex flex-1 items-center gap-2">
              <div className="flex-1 rounded-2xl border border-border bg-surface-2 px-4 py-4 text-center text-sm font-semibold">{f}</div>
              {i < x.flow.length - 1 && <span className="hidden text-mint-ink md:block" aria-hidden>→</span>}
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">{x.stack.map((s) => <Pill key={s}>{s}</Pill>)}</div>
      </Section>

      <Section className="py-8">
        <div className="rounded-card border border-violet/40 bg-surface p-8">
          <h2 className="text-2xl md:text-3xl">{t("cases.meaning")}</h2>
          <p className="mt-3 max-w-2xl text-muted">{x.meaning}</p>
        </div>
      </Section>

      <OfferBlock kind="discovery" />
      {related.length > 0 && <Section className="py-8"><h2>{t("related")}</h2><div className="mt-8 grid gap-5 md:grid-cols-2">{related.map((r) => <CaseCard key={r.slug} c={r} />)}</div></Section>}
      <FinalCta />
    </>
  );
}
