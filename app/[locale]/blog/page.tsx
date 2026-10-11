import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Pill, Section } from "@/components/ui";
import { Crumbs, FinalCta, PageHero } from "@/components/blocks";
import { visiblePosts } from "@/lib/content";

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ui");
  const posts = visiblePosts(locale);
  return (
    <>
      <Crumbs items={[{ href: "/", label: t("crumbs.home") }, { label: t("blog.eyebrow") }]} />
      <PageHero eyebrow={t("blog.eyebrow")} title={t("blog.title")} lead={t("blog.lead")} />
      <Section className="pt-4">
        {posts.length === 0 && <p className="text-muted">{t("blog.empty")}</p>}
        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-card border border-border bg-surface p-6 transition hover:border-mint/60">
              <div className="flex items-center gap-2 text-xs text-muted">{p.date} · {p.readMin} {t("blog.read")}{p.draft && <Pill>{t("blog.draft")}</Pill>}</div>
              <h3 className="mt-3 text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
