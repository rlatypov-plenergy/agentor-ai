"use client";
import { useRef, useState } from "react";
import Script from "next/script";
import { Link } from "@/i18n/navigation";
import type { Common, FormCopy } from "@/content/converters-types";
import { FieldInput } from "./FieldInput";
import { isFreeMail, isSmall, submitLead, type FormType } from "@/lib/lead";
import { track } from "@/lib/track";
import { site } from "@/lib/site";

const TS_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function LeadForm({ type, copy, common, locale }: { type: FormType; copy: FormCopy; common: Common; locale: string }) {
  const [v, setV] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [dev, setDev] = useState(false);
  const started = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (name: string, val: unknown) => {
    if (!started.current) { started.current = true; track("form_start", { form_type: type }); }
    setV((p) => ({ ...p, [name]: val }));
  };

  const email = (v.email as string) ?? "";
  const free = email.includes("@") && isFreeMail(email);
  const small = (type === "discovery" || type === "free_mvp") && isSmall(v.size as string);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    copy.fields.forEach((f) => { if (f.required && !v[f.name]) errs[f.name] = common.required; });
    if (!consent) errs.consent = common.required;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState("sending");
    const fd = new FormData(formRef.current!);
    const res = await submitLead(type, { ...v, routed_to: small ? "consultation" : undefined, hp: fd.get("hp"), turnstile: fd.get("cf-turnstile-response") }, locale);
    setDev(!!res.dev);
    setState(res.ok ? "done" : "error");
  }

  if (state === "done") {
    return (
      <div className="rounded-card border border-mint/40 bg-surface p-8" role="status">
        <h2 className="text-2xl">{common.thanksTitle}</h2>
        <p className="mt-2 text-muted">{small ? common.thanksSmall : common.thanksText}</p>
        <ol className="mt-5 list-decimal space-y-1 pl-5 text-sm text-muted">{common.nextSteps.map((s) => <li key={s}>{s}</li>)}</ol>
        <div className="mt-6 flex flex-wrap gap-3">
          {site.calLink !== "#" ? <a href={`https://cal.com/${site.calLink}`} className="rounded-full bg-mint px-6 py-3 text-sm font-semibold text-bg" onClick={() => track("booking_opened")}>{common.bookCall}</a>
            : <Link href="/consultation" className="rounded-full bg-mint px-6 py-3 text-sm font-semibold text-bg">{common.bookCall}</Link>}
        </div>
        {dev && <p className="mt-4 text-xs text-muted">{common.devNote}</p>}
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-4 rounded-card border border-border bg-surface p-6 md:p-8">
      {copy.fields.map((f) => <FieldInput key={f.name} f={f} value={v[f.name]} onChange={(val) => set(f.name, val)} error={errors[f.name]} />)}
      {free && <p className="text-xs text-violet">{common.freeMail}</p>}
      {small && <p className="rounded-xl border border-violet/40 bg-violet/10 p-3 text-xs text-muted">{common.smallCompany}</p>}
      {/* Honeypot: hidden from people, bots fill it */}
      <input name="hp" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      {TS_KEY && (<><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" /><div className="cf-turnstile" data-sitekey={TS_KEY} data-theme="dark" /></>)}
      <label className="flex items-start gap-3 text-xs text-muted">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-[#34E3A6]" />
        <span>{common.consent}{errors.consent && <span className="ml-1 text-[#ff8a8a]">{errors.consent}</span>}</span>
      </label>
      {state === "error" && <p role="alert" className="text-sm text-[#ff8a8a]">{common.error}</p>}
      <button disabled={state === "sending"} className="w-full rounded-full bg-mint px-6 py-3 text-sm font-semibold text-bg transition hover:brightness-110 disabled:opacity-60">
        {state === "sending" ? common.sending : copy.submit}
      </button>
    </form>
  );
}
