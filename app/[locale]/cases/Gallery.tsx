"use client";
import { useState } from "react";
import Image from "next/image";

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {images.map((src, i) => (
          <button key={src} onClick={() => setOpen(i)} className="overflow-hidden rounded-card border border-border bg-surface" aria-label={`${alt} ${i + 1}`}>
            <Image src={src} alt={`${alt} ${i + 1}`} width={1600} height={900} sizes="(min-width:640px) 560px, 100vw" className="w-full transition hover:scale-[1.02]" />
          </button>
        ))}
      </div>
      {open !== null && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" onClick={() => setOpen(null)} onKeyDown={(e) => e.key === "Escape" && setOpen(null)}>
          <Image src={images[open]} alt={`${alt} ${open + 1}`} width={1600} height={900} className="max-h-[90vh] w-auto rounded-xl" />
          <button className="absolute right-5 top-5 rounded-full bg-surface px-3 py-1 text-sm" onClick={() => setOpen(null)} autoFocus>✕</button>
        </div>
      )}
    </>
  );
}
