import * as Icons from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui";
import { Crumbs, FinalCta, OfferBlock, PageHero } from "@/components/blocks";
import { getContent } from "@/lib/content";
import { services as meta } from "@/lib/site";

export default async function ServicesHub({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ui");
  const items = getContent(locale).services;
  return (
    <>
      <Crumbs items={[{ href: "/", label: t("crumbs.home") }, { label: t("services.eyebrow") }]} />
      <PageHero eyebrow={t("services.eyebrow")} title={t("services.title")} lead={t("services.lead")} />
      <Section className="pt-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => {
            const icon = meta.find((m) => m.slug === s.slug)?.icon ?? "Compass";
            const Icon = Icons[icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
            return (
              <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-card border border-border bg-surface p-6 transition hover:border-mint/60 hover:bg-surface-2">
                <Icon className="size-6 text-mint" />
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.headline}</p>
              </Link>
            );
          })}
        </div>
      </Section>
      <OfferBlock kind="discovery" />
      <FinalCta />
    </>
  );
}
