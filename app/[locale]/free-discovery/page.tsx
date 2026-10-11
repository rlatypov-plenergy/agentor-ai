import { getTranslations, setRequestLocale } from "next-intl/server";
import { Pill, Section } from "@/components/ui";
import { CheckList, Crumbs, FinalCta, PageHero } from "@/components/blocks";
import { LeadForm } from "@/components/LeadForm";
import { getConv } from "@/lib/conv";

export default async function FreeDiscovery({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ui");
  const c = getConv(locale);
  const d = c.discovery;
  return (
    <>
      <Crumbs items={[{ href: "/", label: t("crumbs.home") }, { label: d.title }]} />
      <PageHero eyebrow={d.badge} title={d.title} lead={d.lead} />
      <Section className="grid gap-10 pt-4 lg:grid-cols-[1fr_440px]">
        <div className="space-y-10">
          <div><h2 className="text-2xl">{d.included.title}</h2><CheckList items={d.included.items} /></div>
          <div><h2 className="text-2xl">{d.receive.title}</h2><CheckList items={d.receive.items} /></div>
          <div className="rounded-card border border-border bg-surface p-6">
            <h2 className="text-2xl">{d.value.title}</h2>
            <p className="mt-2 text-sm text-muted">{d.value.text}</p>
            <div className="mt-4 flex flex-wrap gap-2">{d.value.rows.map(([k, h]) => <Pill key={k}>{k}: {h}</Pill>)}</div>
          </div>
          <p className="text-sm text-muted">{d.who}</p>
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start"><LeadForm type="discovery" copy={d.form} common={c.common} locale={locale} /></div>
      </Section>
      <FinalCta />
    </>
  );
}
