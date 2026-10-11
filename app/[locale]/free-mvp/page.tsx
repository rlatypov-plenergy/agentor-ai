import { getTranslations, setRequestLocale } from "next-intl/server";
import { Pill, Section } from "@/components/ui";
import { CheckList, Crumbs, Faq, FinalCta, PageHero, Steps } from "@/components/blocks";
import { LeadForm } from "@/components/LeadForm";
import { getConv } from "@/lib/conv";

export default async function FreeMvp({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ui");
  const c = getConv(locale);
  const m = c.mvp;
  return (
    <>
      <Crumbs items={[{ href: "/", label: t("crumbs.home") }, { label: m.title }]} />
      <PageHero eyebrow={m.badge} title={m.title} lead={m.lead} />
      <Section className="py-8"><h2>{m.how.title}</h2><Steps items={m.how.steps} /></Section>
      <Section className="grid gap-10 py-8 md:grid-cols-2">
        <div><h2 className="text-2xl">{m.get.title}</h2><CheckList items={m.get.items} /></div>
        <div className="space-y-4">
          <h2 className="text-2xl">{m.outcome.title}</h2>
          <p className="rounded-card border border-mint/40 bg-surface p-5 text-sm">{m.outcome.like}</p>
          <p className="rounded-card border border-border bg-surface p-5 text-sm text-muted">{m.outcome.dislike}</p>
        </div>
      </Section>
      <Section className="grid gap-10 py-8 md:grid-cols-2">
        <div><h2 className="text-2xl">{m.conditions.title}</h2><CheckList items={m.conditions.items} /></div>
        <div><h2 className="text-2xl">{m.examples.title}</h2><div className="mt-6 flex flex-wrap gap-2">{m.examples.items.map((x) => <Pill key={x}>{x}</Pill>)}</div></div>
      </Section>
      <Section id="apply" className="max-w-2xl py-8"><LeadForm type="free_mvp" copy={m.form} common={c.common} locale={locale} /></Section>
      <Faq items={m.faq} title={t("faq")} />
      <FinalCta />
    </>
  );
}
