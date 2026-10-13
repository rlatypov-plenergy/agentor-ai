import { worldMap } from "@/lib/world-map";

// Pins: label position (lx, ly) with a leader line, so the close European pins don't overlap.
const labels: Record<string, { lx: number; ly: number }> = {
  US: { lx: 247.8, ly: 118 },
  UK: { lx: 470, ly: 66 },
  PL: { lx: 548, ly: 58 },
  UA: { lx: 612, ly: 74 },
  KZ: { lx: 690, ly: 96 },
};

export function WorldMap({ names, label }: { names: Record<string, string>; label: string }) {
  const codes = Object.keys(labels);
  return (
    <figure className="overflow-hidden rounded-[28px] border border-border bg-surface p-4 md:p-8">
      <svg viewBox={worldMap.viewBox} role="img" aria-label={label} className="h-auto w-full">
        <path d={worldMap.land} fill="var(--color-border)" stroke="var(--color-surface)" strokeWidth="0.6" />
        {worldMap.countries.map((c) => (
          <path key={c.code} d={c.d} fill="var(--color-mint)" fillOpacity="0.75" stroke="var(--color-mint-ink)" strokeWidth="0.8" />
        ))}
        {codes.map((code) => {
          const [x, y] = worldMap.pins[code as keyof typeof worldMap.pins];
          const { lx, ly } = labels[code];
          return (
            <g key={code}>
              <line x1={x} y1={y} x2={lx} y2={ly + 6} stroke="var(--color-ink)" strokeOpacity="0.45" strokeWidth="0.8" />
              <circle cx={x} cy={y} r="9" fill="var(--color-mint)" opacity="0.35" />
              <circle cx={x} cy={y} r="4" fill="var(--color-mint-ink)" stroke="var(--color-surface)" strokeWidth="1.5" />
              <text x={lx} y={ly} textAnchor="middle" fontSize="15" fontWeight="800" fill="var(--color-ink)" fontFamily="var(--font-heading)">{code}</text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-5 flex flex-wrap gap-2">
        {codes.map((code) => (
          <span key={code} className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-1 text-xs text-muted">
            <i className="size-2 rounded-full bg-mint" />{names[code]}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
