import { LogoMark } from "./LogoMark";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-heading text-xl tracking-tight ${className}`} aria-label="Agentura Labs">
      <LogoMark className="size-8" />
      <span><b className="font-extrabold">agentura</b> <span className="font-semibold text-mint-ink">labs</span></span>
    </span>
  );
}
