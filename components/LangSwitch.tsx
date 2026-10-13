"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LangSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex rounded-full border border-border p-0.5 text-xs font-semibold" role="group" aria-label="Language">
      {(["en", "uk"] as const).map((l) => (
        <button
          key={l}
          onClick={() => router.replace(pathname, { locale: l })}
          aria-pressed={l === locale}
          className={`rounded-full px-2.5 py-1 uppercase ${l === locale ? "bg-surface-2 text-mint-ink" : "text-muted"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
