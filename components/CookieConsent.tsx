"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const KEY = "agentor_consent";

export function CookieConsent() {
  const t = useTranslations("cookie");
  const [show, setShow] = useState(false);

  useEffect(() => {
    try { setShow(!localStorage.getItem(KEY)); } catch { setShow(true); }
  }, []);

  const choose = (v: "all" | "necessary") => {
    try { localStorage.setItem(KEY, v); } catch {}
    setShow(false);
    // TODO: load GTM here when v === "all" and NEXT_PUBLIC_GTM_ID is set
  };

  if (!show) return null;
  return (
    <div role="dialog" aria-label="Cookies" className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-2xl flex-col gap-3 rounded-card border border-border bg-surface p-4 text-sm shadow-2xl sm:flex-row sm:items-center">
      <p className="flex-1 text-muted">{t("text")}</p>
      <div className="flex gap-2">
        <button onClick={() => choose("necessary")} className="rounded-full border border-border px-4 py-2">{t("decline")}</button>
        <button onClick={() => choose("all")} className="rounded-full bg-mint px-4 py-2 font-semibold text-bg">{t("accept")}</button>
      </div>
    </div>
  );
}
