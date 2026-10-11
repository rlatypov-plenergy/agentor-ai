import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui";
import { Crumbs, FinalCta, OfferBlock, PageHero } from "@/components/blocks";

const countries = [
  { code: "US", x: 90, y: 110 }, { code: "UK", x: 292, y: 82 }, { code: "PL", x: 330, y: 92 }, { code: "UA", x: 355, y: 100 }, { code: "KZ", x: 440, y: 105 },
];

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
            <div className="text-mint">{t("founder.role")}</div>
            <p className="mt-3 max-w-xl text-muted">{t("ui.about.founderBio")}</p>
          </div>
        </div>
      </Section>

      <Section className="grid gap-8 py-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl md:text-3xl">{t("ui.about.team")}</h2>
          <p className="mt-4 text-muted">{t("ui.about.teamText")}</p>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl">{t("ui.about.geo")}</h2>
          <p className="mt-4 text-muted">{t("ui.about.geoText")}</p>
          {/* Simplified geography map; project counts per country: TODO confirm */}
          <svg viewBox="0 0 520 200" role="img" aria-label={t("ui.about.geoText")} className="mt-6 w-full rounded-card border border-border bg-surface">
            <g fill="#2A3160">{Array.from({ length: 13 }).flatMap((_, r) => Array.from({ length: 52 }).map((_, c) => <circle key={`${r}-${c}`} cx={c * 10 + 5} cy={r * 15 + 8} r="1.4" />))}</g>
            {countries.map((c) => (
              <g key={c.code}>
                <circle cx={c.x} cy={c.y} r="14" fill="#34E3A6" opacity="0.2" />
                <circle cx={c.x} cy={c.y} r="5" fill="#34E3A6" />
                <text x={c.x} y={c.y - 14} textAnchor="middle" fontSize="11" fill="#fff" fontWeight="700">{c.code}</text>
              </g>
            ))}
          </svg>
        </div>
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
