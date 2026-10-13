"use client";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { Assessment as A, Common } from "@/content/converters-types";
import { FieldInput } from "./FieldInput";
import { isFreeMail, submitLead } from "@/lib/lead";
import { track } from "@/lib/track";

const KEY = "agentor_assessment";
// Assumptions (flagged in the UI and docs/TODO-REPLACE.md)
const AUTOMATABLE = 0.4;
const COST_MIN = 8000;
const COST_MAX = 25000;
const HOURLY: Record<string, number> = { "United States": 45, "United Kingdom": 35, Poland: 20, Ukraine: 10, Kazakhstan: 10, Other: 25 };
const REC_ORDER = ["sales", "support", "procurement", "operations", "finance", "marketing", "reporting", "production", "hr"];

type Vals = Record<string, unknown>;

function compute(v: Vals) {
  const people = Number(v.people) || 0;
  const hours = Number(v.hours) || 0;
  const cost = Number(v.cost) || HOURLY[v.country as string] || 25;
  const saved = Math.round(people * hours * 52 * AUTOMATABLE);
  const money = saved * cost;
  const pbMin = money > 0 ? Math.max(1, Math.round((COST_MIN / money) * 12)) : 0;
  const pbMax = money > 0 ? Math.max(pbMin, Math.round((COST_MAX / money) * 12)) : 0;
  const deps = ((v.departments as string[]) ?? []);
  let score = 20;
  score += Math.min(20, ((v.systems as string[])?.length ?? 0) * 4);
  score += deps.length ? 10 : 0;
  score += (v.firstProcess as string)?.length > 20 ? 10 : 0;
  score += v.role === "decision" ? 15 : v.role === "influencer" ? 8 : 0;
  score += v.timeline === "ASAP" || v.timeline === "1–3 months" ? 10 : v.timeline === "3–6 months" ? 5 : 0;
  score += saved > 500 ? 10 : saved > 100 ? 5 : 0;
  score += v.errors === "high" ? 5 : 0;
  score = Math.min(100, score);
  const recs = [...deps].sort((a, b) => REC_ORDER.indexOf(a) - REC_ORDER.indexOf(b)).slice(0, 3);
  while (recs.length < 3 && !recs.includes("default")) recs.push("default");
  const small = ["1–10", "11–49"].includes(v.size as string);
  const next: "discovery" | "mvp" | "consultation" = small ? "consultation" : score >= 65 ? "mvp" : "discovery";
  return { saved, money, pbMin, pbMax, score, recs: recs.slice(0, 3), next };
}

export function Assessment({ copy, common, locale }: { copy: A; common: Common; locale: string }) {
  const [started, setStarted] = useState(false);
  const [i, setI] = useState(0);
  const [v, setV] = useState<Vals>({});
  const [err, setErr] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<"form" | "sending" | "result" | "error">("form");
  const total = copy.steps.length;

  useEffect(() => {
    try { const s = JSON.parse(localStorage.getItem(KEY) || "null"); if (s) { setV(s.v ?? {}); setI(Math.min(s.i ?? 0, total - 1)); setStarted(!!s.started); } } catch {}
  }, [total]);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify({ v, i, started })); } catch {} }, [v, i, started]);

  const step = copy.steps[i];
  const set = (name: string, val: unknown) => {
    setV((p) => {
      const n = { ...p, [name]: val };
      // prefill hourly cost by country unless the user edited it
      if (name === "country" && !p.costEdited) n.cost = HOURLY[val as string] ?? 25;
      if (name === "cost") n.costEdited = true;
      return n;
    });
  };

  const go = (n: number) => { setI(n); track(`assessment_step_${n + 1}`); window.scrollTo({ top: 0, behavior: "smooth" }); };

  async function next() {
    const errs: Record<string, string> = {};
    step.fields.forEach((f) => { if (f.required && !v[f.name]) errs[f.name] = common.required; });
    setErr(errs);
    if (Object.keys(errs).length) return;
    if (i < total - 1) return go(i + 1);
    track("calc_complete");
    setPhase("sending");
    const res = await submitLead("assessment", { ...v, result: compute(v) }, locale);
    if (res.ok) { try { localStorage.removeItem(KEY); } catch {} setPhase("result"); } else setPhase("error");
  }

  if (!started) {
    return <button onClick={() => { setStarted(true); track("assessment_step_1"); }} className="rounded-full bg-mint px-8 py-3 text-sm font-semibold text-on-mint">{copy.start}</button>;
  }

  if (phase === "result") {
    const r = compute(v);
    const band = r.score >= 70 ? copy.result.bands.high : r.score >= 45 ? copy.result.bands.mid : copy.result.bands.low;
    const nextHref = r.next === "discovery" ? "/free-discovery" : r.next === "mvp" ? "/free-mvp" : "/consultation";
    const fmt = (n: number) => n.toLocaleString(locale === "uk" ? "uk-UA" : "en-US");
    return (
      <div className="rounded-card border border-mint/40 bg-surface p-6 md:p-8" role="status">
        <h2 className="text-2xl">{copy.result.title}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label={copy.result.savedHours} value={fmt(r.saved)} sub={copy.result.hoursYear} />
          <Stat label={copy.result.savedMoney} value={`$${fmt(r.money)}`} sub={copy.result.perYear} />
          <Stat label={copy.result.payback} value={r.money ? `${r.pbMin}–${r.pbMax}` : "—"} sub={copy.result.months} />
          <Stat label={copy.result.readiness} value={`${r.score}/100`} sub={band} />
        </div>
        <h3 className="mt-8 font-bold">{copy.result.top}</h3>
        <ul className="mt-3 grid gap-3 md:grid-cols-3">
          {r.recs.map((k) => { const rec = copy.result.recs[k] ?? copy.result.recs.default; return <li key={k} className="rounded-2xl border border-border bg-surface-2 p-4"><div className="font-semibold">{rec.title}</div><div className="mt-1 text-sm text-muted">{rec.text}</div></li>; })}
        </ul>
        <h3 className="mt-8 font-bold">{copy.result.next}</h3>
        <Link href={nextHref} className="mt-3 inline-flex rounded-full bg-mint px-6 py-3 text-sm font-semibold text-on-mint">{copy.result.nextLabels[r.next]}</Link>
        <p className="mt-6 text-sm text-mint-ink">{copy.result.promise}</p>
        <p className="mt-3 text-xs text-muted">{copy.result.assumptions}</p>
        <button onClick={() => { setV({}); setI(0); setPhase("form"); setStarted(false); }} className="mt-4 text-xs text-muted underline">{copy.restart}</button>
      </div>
    );
  }

  const last = i === total - 1;
  const email = (v.email as string) ?? "";
  return (
    <div className="rounded-card border border-border bg-surface p-6 md:p-8">
      <div className="flex items-center justify-between text-xs text-muted"><span>{common.step} {i + 1} {common.of} {total}</span><span>{step.title}</span></div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-valuenow={i + 1} aria-valuemin={1} aria-valuemax={total}><div className="h-full bg-mint transition-all" style={{ width: `${((i + 1) / total) * 100}%` }} /></div>
      <div className="mt-6 space-y-4">
        {step.fields.map((f) => <FieldInput key={f.name} f={f} value={v[f.name]} onChange={(val) => set(f.name, val)} error={err[f.name]} />)}
        {last && email.includes("@") && isFreeMail(email) && <p className="text-xs text-violet">{common.freeMail}</p>}
      </div>
      {phase === "error" && <p role="alert" className="mt-4 text-sm text-danger">{common.error}</p>}
      <div className="mt-8 flex items-center justify-between gap-3">
        <button type="button" disabled={i === 0} onClick={() => go(i - 1)} className="rounded-full border border-border px-5 py-2.5 text-sm disabled:opacity-30">{common.back}</button>
        <div className="flex gap-2">
          {step.skippable && !last && <button type="button" onClick={() => go(i + 1)} className="px-3 text-sm text-muted">{common.skip}</button>}
          <button type="button" onClick={next} disabled={phase === "sending"} className="rounded-full bg-mint px-6 py-2.5 text-sm font-semibold text-on-mint disabled:opacity-60">{phase === "sending" ? common.sending : last ? copy.result.title : common.next}</button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return <div className="rounded-2xl border border-border bg-surface-2 p-4"><div className="text-xs text-muted">{label}</div><div className="mt-1 font-heading text-2xl font-extrabold text-mint-ink">{value}</div><div className="text-xs text-muted">{sub}</div></div>;
}
