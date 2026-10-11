import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button, Section } from "@/components/ui";
import { CardGrid, CaseCard, Crumbs, Faq, FinalCta, OfferBlock, PageHero } from "@/components/blocks";
import { getContent } from "@/lib/content";
import { routing } from "@/i18n/routing";

export const dynamicParams = false;
export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getContent(locale).industries.map((s) => ({ locale, slug: s.slug })));
}

export default async function IndustryPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ui");
  const c = getContent(locale);
  const x = c.industries.find((i) => i.slug === slug);
  if (!x) notFound();
  const svc = c.services.filter((s) => x.services.includes(s.slug));
  const cs = c.cases.filter((i) => x.cases.includes(i.slug));
  return (
    <>
      <Crumbs items={[{ href: "/", label: t("crumbs.home") }, { href: "/industries", label: t("industries.eyebrow") }, { label: x.title }]} />
      <PageHero eyebrow={x.title} title={x.headline} lead={x.lead}>
        <Button href="/free-discovery">{t("offers.discovery.cta")}</Button>
        <Button href="/ai-assessment" variant="ghost">{t("offers.assessment.cta")}</Button>
      </PageHero>
      <Section className="py-10"><h2>{t("industries.pains")}</h2><CardGrid items={x.pains} /></Section>
      <Section className="py-10">
        <h2>{t("industries.services")}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {svc.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-card border border-border bg-surface p-6 transition hover:border-mint/60">
              <h3 className="font-bold">{s.title}</h3><p className="mt-2 text-sm text-muted">{s.headline}</p>
            </Link>
          ))}
        </div>
      </Section>
      <OfferBlock kind="discovery" />
      {cs.length > 0 && <Section className="py-10"><h2>{t("industries.cases")}</h2><div className="mt-8 grid gap-5 md:grid-cols-2">{cs.map((r) => <CaseCard key={r.slug} c={r} />)}</div></Section>}
      <Faq items={x.faq} title={t("faq")} />
      <FinalCta />
    </>
  );
}
