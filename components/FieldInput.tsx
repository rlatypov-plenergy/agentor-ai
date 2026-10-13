"use client";
import type { Field } from "@/content/converters-types";

const base = "mt-1 w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-mint focus:outline-none";

export function FieldInput({ f, value, onChange, error }: { f: Field; value: unknown; onChange: (v: unknown) => void; error?: string }) {
  const id = `f-${f.name}`;
  const str = (value as string) ?? "";
  const label = (
    <label htmlFor={id} className="block text-sm font-medium">
      {f.label}{f.required && <span className="text-mint-ink"> *</span>}
    </label>
  );
  let control: React.ReactNode;
  if (f.type === "select") {
    control = (
      <select id={id} name={f.name} value={str} onChange={(e) => onChange(e.target.value)} className={base} required={f.required}>
        <option value="">—</option>
        {f.options!.map((o) => <option key={o.v} value={o.v}>{o.label}</option>)}
      </select>
    );
  } else if (f.type === "textarea") {
    control = <textarea id={id} name={f.name} value={str} onChange={(e) => onChange(e.target.value)} rows={3} className={base} required={f.required} placeholder={f.placeholder} />;
  } else if (f.type === "multi") {
    const arr = (value as string[]) ?? [];
    return (
      <fieldset>
        <legend className="block text-sm font-medium">{f.label}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {f.options!.map((o) => {
            const on = arr.includes(o.v);
            return (
              <button type="button" key={o.v} aria-pressed={on} onClick={() => onChange(on ? arr.filter((x) => x !== o.v) : [...arr, o.v])}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${on ? "border-mint bg-mint/10 text-mint-ink" : "border-border text-muted hover:text-ink"}`}>
                {o.label}
              </button>
            );
          })}
        </div>
      </fieldset>
    );
  } else {
    control = <input id={id} name={f.name} type={f.type} value={str} onChange={(e) => onChange(e.target.value)} className={base} required={f.required} placeholder={f.placeholder} min={f.type === "number" ? 0 : undefined} />;
  }
  return (
    <div>
      {label}
      {control}
      {f.hint && <p className="mt-1 text-xs text-muted">{f.hint}</p>}
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
}
