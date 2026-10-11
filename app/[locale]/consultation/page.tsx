import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui";
import { CheckList, Crumbs, FinalCta, PageHero } from "@/components/blocks";
import { LeadForm } from "@/components/LeadForm";
import { getConv } from "@/lib/conv";
import { site } from "@/lib/site";

export default async function Consultation({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ui");
  const c = getConv(locale);
  const hasCal = site.calLink !== "#";
  return (
    <>
      <Crumbs items={[{ href: "/", label: t("crumbs.home") }, { label: c.consultation.title }]} />
      <PageHero eyebrow="30 min" title={c.consultation.title} lead={c.consultation.lead} />
      <Section className="grid gap-10 pt-4 lg:grid-cols-2">
        <div>
          <CheckList items={c.consultation.bullets} />
          {hasCal && (
            <div className="mt-8">
              <p className="mb-3 text-sm text-muted">{c.consultation.calNote}</p>
              <iframe src={`https://cal.com/${site.calLink}?embed=true&theme=dark`} title="Cal.com" loading="lazy" className="h-[640px] w-full rounded-card border border-border bg-surface" />
            </div>
          )}
        </div>
        <LeadForm type="consultation" copy={c.consultation.form} common={c.common} locale={locale} />
      </Section>
      <FinalCta />
    </>
  );
}
