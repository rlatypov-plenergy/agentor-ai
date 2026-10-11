import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui";
import { Crumbs } from "@/components/blocks";
import { getConv } from "@/lib/conv";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ui");
  const l = getConv(locale).legal;
  return (
    <>
      <Crumbs items={[{ href: "/", label: t("crumbs.home") }, { label: l.privacy }]} />
      <Section className="max-w-3xl pt-12">
        <h1 className="!text-4xl">{l.privacy}</h1>
        <p className="mt-2 text-xs text-muted">{l.updated}</p>
        <p className="mt-6 text-muted">{l.body}</p>
      </Section>
    </>
  );
}
