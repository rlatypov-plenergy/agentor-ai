"use client";
import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { captureUtm, track } from "@/lib/track";

const CONVERTER_PATHS = ["/consultation", "/free-discovery", "/ai-assessment", "/free-mvp"];
const EXIT_KEY = "agentor_exit_shown";

export type BootCopy = { sticky: string; exit: { title: string; text: string; cta: string; close: string } };

// UTM capture, mobile sticky CTA bar and desktop exit-intent modal (max once per 7 days).
export function Boot({ copy }: { copy: BootCopy }) {
  const path = usePathname();
  const [exit, setExit] = useState(false);
  const onConverter = CONVERTER_PATHS.includes(path);

  useEffect(() => { captureUtm(); }, []);

  useEffect(() => {
    if (onConverter || window.matchMedia("(pointer: coarse)").matches) return;
    let last = 0;
    try { last = Number(localStorage.getItem(EXIT_KEY) || 0); } catch {}
    if (Date.now() - last < 7 * 86400000) return;
    const h = (e: MouseEvent) => {
      if (e.clientY <= 0) { setExit(true); try { localStorage.setItem(EXIT_KEY, String(Date.now())); } catch {} document.removeEventListener("mouseout", h); }
    };
    document.addEventListener("mouseout", h);
    return () => document.removeEventListener("mouseout", h);
  }, [onConverter]);

  return (
    <>
      {!onConverter && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 p-3 backdrop-blur sm:hidden">
          <Link href="/consultation" onClick={() => track("cta_click", { cta: "sticky_bar" })} className="block rounded-full bg-mint py-3 text-center text-sm font-semibold text-on-mint">{copy.sticky}</Link>
        </div>
      )}
      {exit && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setExit(false)}>
          <div className="max-w-md rounded-card border border-mint/40 bg-surface p-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl">{copy.exit.title}</h2>
            <p className="mt-3 text-sm text-muted">{copy.exit.text}</p>
            <div className="mt-6 flex gap-3">
              <Link href="/free-discovery" onClick={() => { track("cta_click", { cta: "exit_intent" }); setExit(false); }} className="rounded-full bg-mint px-6 py-3 text-sm font-semibold text-on-mint">{copy.exit.cta}</Link>
              <button onClick={() => setExit(false)} className="px-3 text-sm text-muted" autoFocus>{copy.exit.close}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
