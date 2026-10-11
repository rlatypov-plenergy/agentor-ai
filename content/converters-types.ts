export type Option = { v: string; label: string };
export type Field = {
  name: string;
  label: string;
  type: "text" | "email" | "url" | "tel" | "date" | "number" | "select" | "textarea" | "multi" | "radio";
  required?: boolean;
  options?: Option[];
  placeholder?: string;
  hint?: string;
};

export type FormCopy = {
  fields: Field[];
  submit: string;
};

export type Common = {
  sending: string;
  error: string;
  consent: string;
  freeMail: string;
  smallCompany: string;
  thanksTitle: string;
  thanksText: string;
  thanksSmall: string;
  nextSteps: string[];
  bookCall: string;
  required: string;
  back: string;
  next: string;
  skip: string;
  step: string;
  of: string;
  devNote: string;
};

export type Assessment = {
  title: string;
  lead: string;
  start: string;
  steps: { title: string; fields: Field[]; skippable: boolean }[];
  result: {
    title: string;
    savedHours: string;
    savedMoney: string;
    payback: string;
    readiness: string;
    top: string;
    next: string;
    assumptions: string;
    promise: string;
    months: string;
    perYear: string;
    hoursYear: string;
    nextLabels: { discovery: string; mvp: string; consultation: string };
    recs: Record<string, { title: string; text: string }>;
    bands: { low: string; mid: string; high: string };
  };
  restart: string;
};

export type Converters = {
  common: Common;
  consultation: { title: string; lead: string; bullets: string[]; form: FormCopy; calNote: string };
  discovery: {
    title: string;
    lead: string;
    badge: string;
    included: { title: string; items: string[] };
    receive: { title: string; items: string[] };
    value: { title: string; text: string; rows: [string, string][] };
    who: string;
    form: FormCopy;
  };
  mvp: {
    title: string;
    lead: string;
    badge: string;
    how: { title: string; steps: { title: string; text: string }[] };
    get: { title: string; items: string[] };
    outcome: { title: string; like: string; dislike: string };
    conditions: { title: string; items: string[] };
    examples: { title: string; items: string[] };
    faq: { q: string; a: string }[];
    form: FormCopy;
  };
  assessment: Assessment;
  exit: { title: string; text: string; cta: string; close: string };
  sticky: string;
  legal: { privacy: string; terms: string; cookies: string; body: string; updated: string };
};
