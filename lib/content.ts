import { z } from "zod";
import { caseSchema, industrySchema, postSchema, serviceSchema } from "@/content/schema";
import * as enSvc from "@/content/en/services";
import * as enCases from "@/content/en/cases";
import * as enInd from "@/content/en/industries";
import * as enBlog from "@/content/en/blog";
import * as ukSvc from "@/content/uk/services";
import * as ukCases from "@/content/uk/cases";
import * as ukInd from "@/content/uk/industries";
import * as ukBlog from "@/content/uk/blog";

// Build fails here if any content file misses a required field.
const parse = <T extends z.ZodTypeAny>(s: T, v: unknown) => z.array(s).parse(v) as z.infer<T>[];

const data = {
  en: { services: parse(serviceSchema, enSvc.services), cases: parse(caseSchema, enCases.cases), industries: parse(industrySchema, enInd.industries), posts: parse(postSchema, enBlog.posts) },
  uk: { services: parse(serviceSchema, ukSvc.services), cases: parse(caseSchema, ukCases.cases), industries: parse(industrySchema, ukInd.industries), posts: parse(postSchema, ukBlog.posts) },
};

export type Locale = "en" | "uk";
export const getContent = (locale: string) => data[(locale === "uk" ? "uk" : "en") as Locale];

export const showDrafts = process.env.NEXT_PUBLIC_SHOW_DRAFTS === "1";
export const visiblePosts = (locale: string) => getContent(locale).posts.filter((p) => showDrafts || !p.draft);

export const caseImages = (c: { slug: string; images: number }) =>
  Array.from({ length: c.images }, (_, i) => `/cases/${c.slug}/${String(i + 1).padStart(2, "0")}.webp`);
