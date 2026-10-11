"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { LangSwitch } from "./LangSwitch";
import { Button } from "./ui";
import { services } from "@/lib/site";

export function Header() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const links = [
    ["/cases", t("nav.cases")],
    ["/industries", t("nav.industries")],
    ["/about", t("nav.about")],
    ["/blog", t("nav.blog")],
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/"><Logo /></Link>

        <nav className="hidden items-center gap-6 text-sm text-muted lg:flex">
          <div className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
            <button className="flex items-center gap-1 hover:text-white" aria-expanded={mega} onClick={() => setMega(!mega)}>
              {t("nav.services")} <ChevronDown size={14} />
            </button>
            {mega && (
              <div className="absolute left-1/2 top-full w-[720px] -translate-x-1/2 pt-3">
                <div className="grid grid-cols-2 gap-1 rounded-card border border-border bg-surface p-3 shadow-2xl">
                  {services.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMega(false)} className="rounded-xl p-3 hover:bg-surface-2">
                      <div className="text-sm font-semibold text-white">{t(`services.items.${s.key}.title`)}</div>
                      <div className="mt-0.5 text-xs leading-snug">{t(`services.items.${s.key}.desc`)}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-white">{label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitch />
          <Button href="/consultation" className="hidden !py-2 sm:inline-flex">{t("nav.cta")}</Button>
          <button className="lg:hidden" aria-label={t("nav.menu")} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-bg px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-3 text-sm">
            <Link href="/services" onClick={() => setOpen(false)}>{t("nav.services")}</Link>
            {links.map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
            ))}
            <Button href="/consultation" onClick={() => setOpen(false)}>{t("nav.cta")}</Button>
          </div>
        </div>
      )}
    </header>
  );
}
