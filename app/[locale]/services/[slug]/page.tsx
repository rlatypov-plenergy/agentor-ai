import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button, Pill, Section } from "@/components/ui";
import { CardGrid, CaseCard, CheckList, Crumbs, Faq, FinalCta, OfferBlock, PageHero, Steps } from "@/components/blocks";
import { getContent } from "@/lib/content";
import { routing } from "@/i18n/routing";

export const dynamicParams = false;
export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getContent(locale).services.map((s) => ({ locale, slug: s.slug })));
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ui");
  const c = getContent(locale);
  const s = c.services.find((x) => x.slug === slug);
  if (!s) notFound();
  const related = c.cases.filter((x) => s.cases.includes(x.slug));
  const ld = { "@context": "https://schema.org", "@type": "Service", name: s.title, description: s.lead, provider: { "@type": "Organization", name: "Agentura Labs" } };

  return (
    <>
      <Crumbs items={[{ href: "/", label: t("crumbs.home") }, { href: "/services", label: t("services.eyebrow") }, { label: s.title }]} />
      <PageHero eyebrow={s.title} title={s.headline} lead={s.lead}>
        <Button href="/free-discovery">{t("offers.discovery.cta")}</Button>
        <Button href="/consultation" variant="ghost">{t("contact.book")}</Button>
      </PageHero>
      <Section className="grid gap-12 py-10 md:grid-cols-2">
        <div><h2 className="text-2xl md:text-3xl">{t("forWho")}</h2><CheckList items={s.forWho} /></div>
        <div><h2 className="text-2xl md:text-3xl">{t("problems")}</h2><CheckList items={s.problems} /></div>
      </Section>
      <Section className="py-10"><h2>{t("build")}</h2><CardGrid items={s.build} /></Section>
      <OfferBlock kind="mvp" />
      <Section className="py-10"><h2>{t("how")}</h2><Steps items={s.steps} /></Section>
      <Section className="grid gap-12 py-10 md:grid-cols-2">
        <div><h2 className="text-2xl md:text-3xl">{t("deliver")}</h2><CheckList items={s.deliverables} /></div>
        <div><h2 className="text-2xl md:text-3xl">{t("stack")}</h2><div className="mt-6 flex flex-wrap gap-2">{s.stack.map((x) => <Pill key={x}>{x}</Pill>)}</div></div>
      </Section>
      {related.length > 0 && (
        <Section className="py-10">
          <h2>{t("related")}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">{related.map((r) => <CaseCard key={r.slug} c={r} />)}</div>
        </Section>
      )}
      <Faq items={s.faq} title={t("faq")} />
      <FinalCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
