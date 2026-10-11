import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui";
import { Crumbs, FinalCta, OfferBlock, PageHero } from "@/components/blocks";
import { caseImages, getContent } from "@/lib/content";
import { CaseFilter } from "./CaseFilter";

export default async function CasesHub({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ui");
  const c = getContent(locale);
  const items = c.cases.map((x) => ({ slug: x.slug, title: x.title, promise: x.promise, country: x.country, industry: x.industry, services: x.services, client: x.client, img: caseImages(x)[0], logo: x.logo }));
  return (
    <>
      <Crumbs items={[{ href: "/", label: t("crumbs.home") }, { label: t("cases.eyebrow") }]} />
      <PageHero eyebrow={t("cases.eyebrow")} title={t("cases.title")} lead={t("cases.lead")} />
      <Section className="pt-4">
        <CaseFilter items={items} services={c.services.map((s) => ({ slug: s.slug, title: s.title }))} allLabel={t("cases.all")} filterLabel={t("cases.filter")} />
      </Section>
      <OfferBlock kind="assessment" />
      <FinalCta />
    </>
  );
}
