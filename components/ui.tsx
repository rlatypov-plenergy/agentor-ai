import { Link } from "@/i18n/navigation";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

export function Button({ variant = "primary", className, ...p }: ComponentProps<typeof Link> & { variant?: "primary" | "ghost" }) {
  return (
    <Link
      {...p}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition",
        variant === "primary" ? "bg-mint text-bg hover:brightness-110" : "border border-border text-white hover:bg-surface-2",
        className,
      )}
    />
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">{children}</span>;
}

export function Section({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={clsx("mx-auto w-full max-w-6xl px-5 py-16 md:py-24", className)}>
      {children}
    </section>
  );
}

export function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/50">
      <div className="flex gap-1.5 border-b border-border px-4 py-3">
        <i className="size-2.5 rounded-full bg-[#ff5f57]" />
        <i className="size-2.5 rounded-full bg-[#febc2e]" />
        <i className="size-2.5 rounded-full bg-[#28c840]" />
      </div>
      {children}
    </div>
  );
}
