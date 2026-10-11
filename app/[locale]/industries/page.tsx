import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui";
import { Crumbs, FinalCta, OfferBlock, PageHero } from "@/components/blocks";
import { getContent } from "@/lib/content";

export default async function IndustriesHub({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ui");
  return (
    <>
      <Crumbs items={[{ href: "/", label: t("crumbs.home") }, { label: t("industries.eyebrow") }]} />
      <PageHero eyebrow={t("industries.eyebrow")} title={t("industries.title")} lead={t("industries.lead")} />
      <Section className="pt-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {getContent(locale).industries.map((i) => (
            <Link key={i.slug} href={`/industries/${i.slug}`} className="rounded-card border border-border bg-surface p-6 transition hover:border-mint/60 hover:bg-surface-2">
              <h3 className="text-lg font-bold">{i.title}</h3>
              <p className="mt-2 text-sm text-muted">{i.headline}</p>
            </Link>
          ))}
        </div>
      </Section>
      <OfferBlock kind="assessment" />
      <FinalCta />
    </>
  );
}
