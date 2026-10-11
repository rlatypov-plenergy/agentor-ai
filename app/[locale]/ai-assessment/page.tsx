import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui";
import { Crumbs, PageHero } from "@/components/blocks";
import { Assessment } from "@/components/Assessment";
import { getConv } from "@/lib/conv";

export default async function AiAssessment({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ui");
  const c = getConv(locale);
  return (
    <>
      <Crumbs items={[{ href: "/", label: t("crumbs.home") }, { label: c.assessment.title }]} />
      <PageHero eyebrow="2–3 min" title={c.assessment.title} lead={c.assessment.lead} />
      <Section className="max-w-3xl pt-4"><Assessment copy={c.assessment} common={c.common} locale={locale} /></Section>
    </>
  );
}
