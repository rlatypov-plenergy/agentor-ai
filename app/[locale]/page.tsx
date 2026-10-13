import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import * as Icons from "lucide-react";
import { Link } from "@/i18n/navigation";
import { BrowserFrame, Button, Pill, Section } from "@/components/ui";
import { featuredCases, services, stack } from "@/lib/site";

type IconName = keyof typeof Icons;

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations();
  const pains = t.raw("pains.items") as string[][];
  const steps = t.raw("process.steps") as string[][];
  const faq = t.raw("faq.items") as string[][];

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="glow-mint pointer-events-none absolute -left-40 -top-40 size-[560px]" />
        <div className="glow-violet pointer-events-none absolute -right-40 top-0 size-[560px]" />
        <Section className="relative grid items-center gap-12 pt-20 lg:grid-cols-2">
          <div>
            <Pill>{t("hero.badge")}</Pill>
            <h1 className="mt-6">{t("hero.title")}</h1>
            <p className="mt-6 max-w-xl text-lg text-muted">{t("hero.sub")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/free-discovery">{t("hero.cta1")}</Button>
              <Button href="/free-mvp" variant="ghost">{t("hero.cta2")}</Button>
            </div>
          </div>
          <div className="relative">
            <BrowserFrame>
              <Image src="/cases/yotta-wallet-ai-sdr/01.webp" alt="AI SDR dashboard (interface demo)" width={1600} height={900} priority sizes="(min-width:1024px) 560px, 100vw" />
            </BrowserFrame>
            <div className="absolute -bottom-6 -left-6 hidden w-1/2 sm:block">
              <BrowserFrame>
                <Image src="/cases/atlanta-construction-voice-agent/01.webp" alt="Voice agent setup" width={1600} height={900} sizes="280px" />
              </BrowserFrame>
            </div>
          </div>
        </Section>
      </div>

      {/* Geography */}
      <div className="border-y border-border bg-surface/40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-sm text-muted">
          <span>{t("geo.label")}: <b className="text-ink">{t("geo.list")}</b></span>
          <span className="text-mint-ink">{t("geo.projects")}</span>
        </div>
      </div>

      {/* Pains */}
      <Section>
        <h2 className="max-w-2xl">{t("pains.title")}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pains.map(([title, text]) => (
            <div key={title} className="rounded-card border border-border bg-surface p-6">
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section>
        <h2>{t("services.title")}</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = Icons[s.icon as IconName] as React.ComponentType<{ className?: string }>;
            return (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group rounded-card border border-border bg-surface p-6 transition hover:border-mint/60 hover:bg-surface-2">
                <Icon className="size-6 text-mint-ink" />
                <h3 className="mt-4 text-lg font-bold">{t(`services.items.${s.key}.title`)}</h3>
                <p className="mt-2 text-sm text-muted">{t(`services.items.${s.key}.desc`)}</p>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Flagship offer */}
      <Section className="py-8">
        <div className="relative overflow-hidden rounded-[28px] border border-mint/40 bg-night p-8 text-white md:p-12">
          <div className="glow-mint pointer-events-none absolute -right-20 -top-20 size-96" />
          <div className="relative max-w-2xl">
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-[#C9F8E6]">{t("offer.badge")}</span>
            <h2 className="mt-5">{t("offer.title")}</h2>
            <p className="mt-4 text-night-muted">{t("offer.text")}</p>
            <Button href="/free-discovery" className="mt-6">{t("offer.cta")}</Button>
          </div>
        </div>
      </Section>

      {/* Cases */}
      <Section>
        <div className="flex items-end justify-between gap-4">
          <h2>{t("cases.title")}</h2>
          <Link href="/cases" className="text-sm text-mint-ink">{t("cases.all")} →</Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {featuredCases.map((c) => (
            <Link key={c.slug} href={`/cases/${c.slug}`} className="group overflow-hidden rounded-card border border-border bg-surface transition hover:border-violet/60">
              <Image src={`/cases/${c.slug}/${c.img}.webp`} alt={t(`cases.items.${c.key}.title`)} width={1600} height={900} sizes="(min-width:768px) 560px, 100vw" className="aspect-video w-full object-cover transition group-hover:scale-[1.02]" />
              <div className="p-6">
                <div className="text-xs text-violet">{t(`cases.items.${c.key}.meta`)}</div>
                <h3 className="mt-1 text-xl font-bold">{t(`cases.items.${c.key}.title`)}</h3>
                <p className="mt-2 text-sm text-muted">{t(`cases.items.${c.key}.desc`)}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section>
        <h2>{t("process.title")}</h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-5">
          {steps.map(([title, text], i) => (
            <li key={title} className="rounded-card border border-border bg-surface p-5">
              <div className="font-heading text-3xl font-extrabold text-mint-ink">0{i + 1}</div>
              <h3 className="mt-3 font-bold">{title}</h3>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Stack */}
      <Section className="py-8">
        <h2 className="text-2xl md:text-3xl">{t("stack.title")}</h2>
        <div className="mt-6 flex flex-wrap gap-2">{stack.map((s) => <Pill key={s}>{s}</Pill>)}</div>
      </Section>

      {/* Founder */}
      <Section>
        <div className="grid items-center gap-8 rounded-[28px] border border-border bg-surface p-8 md:grid-cols-[220px_1fr]">
          <Image src="/team/roman-latypov.webp" alt="Roman Latypov" width={220} height={220} className="size-[220px] rounded-full border-2 border-mint object-cover" />
          <div>
            <div className="text-xs uppercase tracking-wider text-violet">{t("founder.title")}</div>
            <h2 className="mt-1 text-3xl">{t("founder.name")}</h2>
            <div className="text-mint-ink">{t("founder.role")}</div>
            <p className="mt-3 max-w-xl text-muted">{t("founder.bio")}</p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="max-w-3xl">
        <h2>{t("faq.title")}</h2>
        <div className="mt-8 divide-y divide-border rounded-card border border-border bg-surface">
          {faq.map(([q, a]) => (
            <details key={q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                {q}<Icons.Plus className="size-4 transition group-open:rotate-45" />
              </summary>
              <p className="mt-3 text-sm text-muted">{a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-[28px] border border-border bg-surface-2 p-10 text-center md:p-16">
          <div className="glow-violet pointer-events-none absolute left-1/2 top-0 size-96 -translate-x-1/2 -translate-y-1/2" />
          <h2 className="relative mx-auto max-w-2xl">{t("final.title")}</h2>
          <p className="relative mt-3 text-muted">{t("final.text")}</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/consultation">{t("final.c1")}</Button>
            <Button href="/free-discovery" variant="ghost">{t("final.c2")}</Button>
            <Button href="/ai-assessment" variant="ghost">{t("final.c3")}</Button>
            <Button href="/free-mvp" variant="ghost">{t("final.c4")}</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
