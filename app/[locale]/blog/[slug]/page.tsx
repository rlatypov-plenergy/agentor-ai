import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui";
import { Crumbs, FinalCta, OfferBlock } from "@/components/blocks";
import { visiblePosts } from "@/lib/content";
import { routing } from "@/i18n/routing";

export const dynamicParams = false;
export function generateStaticParams() {
  return routing.locales.flatMap((locale) => visiblePosts(locale).map((p) => ({ locale, slug: p.slug })));
}

export default async function Post({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ui");
  const p = visiblePosts(locale).find((x) => x.slug === slug);
  if (!p) notFound();
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: p.title, datePublished: p.date, author: { "@type": "Person", name: "Roman Latypov" } };
  return (
    <>
      <Crumbs items={[{ href: "/", label: t("crumbs.home") }, { href: "/blog", label: t("blog.eyebrow") }, { label: p.title }]} />
      <article>
        <Section className="max-w-3xl pb-4 pt-12">
          <div className="text-xs text-muted">{p.date} · {p.readMin} {t("blog.read")}</div>
          <h1 className="mt-3 !text-4xl md:!text-5xl">{p.title}</h1>
          <p className="mt-4 text-lg text-muted">{p.excerpt}</p>
        </Section>
        {/* Light reading surface for long-form text */}
        <div className="bg-white text-bg">
          <Section className="max-w-3xl py-12">
            {p.body.map((b, i) => (
              <div key={i} className="mb-6">
                {b.h && <h2 className="mb-2 !text-2xl">{b.h}</h2>}
                <p className="leading-relaxed text-bg/80">{b.p}</p>
              </div>
            ))}
            <Link href="/blog" className="text-sm font-semibold text-bg underline">← {t("blog.back")}</Link>
          </Section>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </article>
      <OfferBlock kind="discovery" />
      <FinalCta />
    </>
  );
}
