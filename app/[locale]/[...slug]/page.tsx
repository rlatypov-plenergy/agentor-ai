import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Button, Section } from "@/components/ui";
import { placeholderPaths } from "@/lib/site";
import { routing } from "@/i18n/routing";

export const dynamicParams = false;
export function generateStaticParams() {
  return routing.locales.flatMap((locale) => placeholderPaths.map((slug) => ({ locale, slug })));
}

// Placeholder for pages built in later phases (templates, converters).
export default function Soon({ params }: { params: Promise<{ locale: string; slug: string[] }> }) {
  const { locale, slug } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("soon");
  return (
    <Section className="min-h-[60vh]">
      <p className="text-sm text-muted">/{slug.join("/")}</p>
      <h1 className="mt-3 !text-4xl">{t("title")}</h1>
      <p className="mt-3 text-muted">{t("text")}</p>
      <Button href="/" className="mt-6">{t("home")}</Button>
    </Section>
  );
}
