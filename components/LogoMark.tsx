// Concept 3: "[a]" monogram in code brackets with a mint cursor. Uses currentColor for the strokes.
export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M14 10 H7 V54 H14" />
        <path d="M50 10 H57 V54 H50" />
        <circle cx="27" cy="36" r="10" />
        <line x1="37" y1="25" x2="37" y2="46" />
      </g>
      <rect x="42" y="40" width="7" height="7" rx="1.5" fill="#34E3A6" />
    </svg>
  );
}
