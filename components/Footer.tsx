import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { site, services } from "@/lib/site";

export function Footer() {
  const t = useTranslations();
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted">{t("footer.tag")}</p>
        </div>
        <div className="text-sm text-muted">
          <div className="mb-3 font-semibold text-white">{t("nav.services")}</div>
          <ul className="space-y-2">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-white">{t(`services.items.${s.key}.title`)}</Link></li>
            ))}
          </ul>
        </div>
        <div className="text-sm text-muted">
          <ul className="space-y-2">
            <li><Link href="/cases" className="hover:text-white">{t("nav.cases")}</Link></li>
            <li><Link href="/industries" className="hover:text-white">{t("nav.industries")}</Link></li>
            <li><Link href="/about" className="hover:text-white">{t("nav.about")}</Link></li>
            <li><Link href="/blog" className="hover:text-white">{t("nav.blog")}</Link></li>
          </ul>
        </div>
        <div className="text-sm text-muted">
          <ul className="space-y-2">
            <li>{site.email}</li>
            <li>{site.phone}</li>
            <li>Telegram @{site.telegram}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-5 py-5 text-xs text-muted">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3">
          <span>© {new Date().getFullYear()} Agentor.ai. {t("footer.rights")}</span>
          <span className="flex gap-4">
            <Link href="/privacy">{t("footer.privacy")}</Link>
            <Link href="/terms">{t("footer.terms")}</Link>
            <Link href="/cookies">{t("footer.cookies")}</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
