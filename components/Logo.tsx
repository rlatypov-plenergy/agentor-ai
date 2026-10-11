export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-heading text-xl font-extrabold tracking-tight ${className}`} aria-label="agentor.ai">
      agentor<span className="text-mint">.ai</span>
      <span className="ml-0.5 inline-block size-1.5 rounded-full bg-mint align-baseline" />
    </span>
  );
}
