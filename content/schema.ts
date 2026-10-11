import { z } from "zod";

const faq = z.array(z.object({ q: z.string().min(3), a: z.string().min(3) })).min(3);
const card = z.object({ title: z.string(), text: z.string() });

export const serviceSchema = z.object({
  slug: z.string(),
  title: z.string(),
  headline: z.string(),
  lead: z.string(),
  forWho: z.array(z.string()).min(2),
  problems: z.array(z.string()).min(3),
  build: z.array(card).min(3).max(6),
  steps: z.array(card).min(3),
  deliverables: z.array(z.string()).min(3),
  stack: z.array(z.string()),
  cases: z.array(z.string()),
  faq,
});

export const caseSchema = z.object({
  slug: z.string(),
  title: z.string(),
  client: z.string(),
  country: z.string(),
  industry: z.string(),
  services: z.array(z.string()),
  promise: z.string(),
  challenge: z.string(),
  solution: z.string(),
  result: z.string(),
  meaning: z.string(),
  flow: z.array(z.string()).min(3), // architecture: channels -> agent -> systems
  stack: z.array(z.string()),
  images: z.number().int().min(0),
  note: z.string().optional(), // e.g. "interface demo", "NDA"
  link: z.string().optional(),
  logo: z.string().optional(), // client logo (shown on a light plate)
  todo: z.array(z.string()).optional(), // facts to confirm (shown only in docs)
});

export const industrySchema = z.object({
  slug: z.string(),
  title: z.string(),
  headline: z.string(),
  lead: z.string(),
  pains: z.array(card).min(3),
  services: z.array(z.string()),
  cases: z.array(z.string()),
  faq,
});

export const postSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  date: z.string(),
  readMin: z.number(),
  draft: z.boolean(),
  tags: z.array(z.string()),
  body: z.array(z.object({ h: z.string().optional(), p: z.string() })).min(3),
});

export type Service = z.infer<typeof serviceSchema>;
export type Case = z.infer<typeof caseSchema>;
export type Industry = z.infer<typeof industrySchema>;
export type Post = z.infer<typeof postSchema>;
