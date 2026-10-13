import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui";
import { Crumbs, FinalCta, OfferBlock, PageHero } from "@/components/blocks";
import { WorldMap } from "@/components/WorldMap";

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const values = t.raw("ui.about.valuesItems") as string[][];
  return (
    <>
      <Crumbs items={[{ href: "/", label: t("ui.crumbs.home") }, { label: t("ui.about.eyebrow") }]} />
      <PageHero eyebrow={t("ui.about.eyebrow")} title={t("ui.about.title")} lead={t("ui.about.lead")} />

      <Section className="py-8">
        <div className="grid items-center gap-8 rounded-[28px] border border-border bg-surface p-8 md:grid-cols-[260px_1fr]">
          <Image src="/team/roman-latypov.webp" alt="Roman Latypov" width={260} height={260} className="size-[260px] rounded-full border-2 border-mint object-cover" />
          <div>
            <div className="text-xs uppercase tracking-wider text-violet">{t("founder.title")}</div>
            <h2 className="mt-1 text-3xl">Roman Latypov</h2>
            <div className="text-mint-ink">{t("founder.role")}</div>
            <p className="mt-3 max-w-xl text-muted">{t("ui.about.founderBio")}</p>
          </div>
        </div>
      </Section>

      <Section className="py-8">
        <h2 className="text-2xl md:text-3xl">{t("ui.about.team")}</h2>
        <p className="mt-4 max-w-3xl text-muted">{t("ui.about.teamText")}</p>
      </Section>

      <Section className="py-8">
        <h2 className="text-2xl md:text-3xl">{t("ui.about.geo")}</h2>
        <p className="mb-8 mt-4 max-w-3xl text-muted">{t("ui.about.geoText")}</p>
        {/* Project counts per country: TODO confirm before showing numbers */}
        <WorldMap names={t.raw("ui.geoMap.names") as Record<string, string>} label={t("ui.about.geoText")} />
      </Section>

      <Section className="py-8">
        <h2>{t("ui.about.values")}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {values.map(([h, p]) => <div key={h} className="rounded-card border border-border bg-surface p-6"><h3 className="font-bold">{h}</h3><p className="mt-2 text-sm text-muted">{p}</p></div>)}
        </div>
      </Section>
      <OfferBlock kind="discovery" />
      <FinalCta />
    </>
  );
}
