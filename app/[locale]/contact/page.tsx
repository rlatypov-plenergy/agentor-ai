import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button, Section } from "@/components/ui";
import { Crumbs, FinalCta, PageHero } from "@/components/blocks";
import { site } from "@/lib/site";

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ui");
  const rows = [[t("contact.email"), site.email, `mailto:${site.email}`], [t("contact.phone"), site.phone, `tel:${site.phone.replace(/\s/g, "")}`], [t("contact.telegram"), `@${site.telegram}`, `https://t.me/${site.telegram}`], [t("contact.upwork"), site.upwork, undefined]] as const;
  return (
    <>
      <Crumbs items={[{ href: "/", label: t("crumbs.home") }, { label: t("contact.eyebrow") }]} />
      <PageHero eyebrow={t("contact.eyebrow")} title={t("contact.title")} lead={t("contact.lead")}>
        <Button href="/consultation">{t("contact.book")}</Button>
      </PageHero>
      <Section className="pt-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {rows.map(([k, v, href]) => (
            <div key={k} className="rounded-card border border-border bg-surface p-6">
              <div className="text-xs uppercase tracking-wider text-violet">{k}</div>
              {href ? <a href={href} className="mt-2 block text-lg font-semibold hover:text-mint">{v}</a> : <div className="mt-2 text-lg font-semibold">{v}</div>}
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">{t("contact.hours")}</p>
      </Section>
      <FinalCta />
    </>
  );
}
