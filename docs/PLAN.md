# PLAN — Agentor.ai website

Source of truth: `docs/BRIEF.md`. Work branch: `dev`. Stop after every phase and wait for "OK".

## Phase 1 — Foundation
- `pnpm create next-app` (Next 15, TS, App Router, Tailwind v4), shadcn/ui, Framer Motion, next-intl, Zod, next-mdx-remote/contentlayer-free MDX loader.
- `app/[locale]/layout.tsx`, `middleware.ts` (locale prefix `/en`, `/uk`), `messages/{en,uk}.json`, language switcher keeping the current path.
- `app/globals.css` design tokens (bg, surface, surface-2, border, muted, mint, violet), Manrope + Inter (latin + cyrillic) via `next/font`.
- Components: `Header` (mega-menu Services, Cases, Industries, About, Blog, lang switch, CTA), mobile drawer, `Footer`, `Logo` (SVG), `Button`, `Pill`, `Card`, `BrowserFrame`, `Section`.
- `CookieConsent` (necessary / analytics / marketing), `Analytics` (GTM after consent, dataLayer helpers), UTM capture cookie (30 d).
- `lib/content.ts` + Zod frontmatter schemas for cases/services/industries/blog; `.env.example`.
- CI: GitHub Actions (lint, typecheck, build), Vercel preview from `dev`.
- Tests: smoke build check; placeholder routes 200 in both locales.

## Phase 2 — Home + design review
- Home sections: hero + screenshot collage, geography strip, 3 pains, 10 service cards, discovery banner, 4 featured cases, 5-step timeline, stack pills, founder block, FAQ, final CTA.
- Optimize assets from `assets-source/` into `public/cases/<slug>/`, `public/team/` (AVIF/WebP via sharp script `scripts/optimize-assets.ts`); list any personal data blurred.
- Stop for design review.

## Phase 3 — Templates + EN content
- Pages: services hub + 10 services, cases hub (filters) + 11 cases, industries hub + 6, about (geo SVG map), contact, blog template, privacy/terms/cookies, 404.
- MDX files in `content/en/{services,cases,industries,blog}`; every page: hero CTA, mid offer block, final CTA.
- Components: `ServiceTemplate`, `CaseTemplate` (gallery lightbox, architecture SVG), `IndustryTemplate`, `FAQ` + FAQPage JSON-LD.
- TODOs from brief logged as `<!-- TODO: confirm -->`.

## Phase 4 — Converters
- `/consultation` (Cal.com lazy embed, mobile sticky bar), `/free-discovery` form, `/ai-assessment` 7-step wizard (localStorage autosave, client-side result + readiness score), `/free-mvp` landing + form.
- Server actions: Zod validation, honeypot, Turnstile, POST to `LEAD_WEBHOOK_URL`, Resend fallback; free-mail soft warning; <50 employees routing.
- Exit-intent modal (desktop, 1×/7 days), thank-you states, dataLayer events (`cta_click`, `form_start`, `form_submit`, `calc_complete`, `booking_*`, `assessment_step_N`).
- Tests: Playwright form flows with mocked webhook.

## Phase 5 — Ukrainian version
- `messages/uk.json` + `content/uk/**` for everything in EN, natural business Ukrainian, translated slugs where natural, parity check script in CI.

## Phase 6 — SEO & performance
- Metadata per page/locale, canonical, hreflang, sitemap with alternates, robots, breadcrumbs, JSON-LD (Organization, WebSite, Service, FAQPage, Article, BreadcrumbList, Person), `next/og` images.
- `docs/seo-keywords.md`, 3 draft blog posts × 2 languages.
- Lighthouse CI budgets, Playwright all-routes test, internal link checker.

## Phase 7 — Launch
- PR `dev → main` (only after approval), Vercel prod + domain agentor.ai, checklist: forms → n8n + email, GTM after consent, 404, redirects.

## Open questions (blocking Phase 1)
1. GitHub repo `rlatypov-plenergy/agentor-ai` is **empty** (no `main`). May I make an initial commit (CLAUDE.md, docs, .gitignore) on `main` so `dev` can branch from it, or should I only push `dev`?
2. Vercel: do you have an account/project linked to the repo, or should I only prepare config and you connect it?
3. Contact email for agentor.ai mailbox, Upwork link, free-MVP slot count, Cal.com link, and Turnstile/Resend/GTM keys — placeholders for now?
4. Founder photo: only `founder.png` (round) exists in `deck_images/`; is there an original?
5. Brief says 16 projects but lists 11 cases — keep "16 projects" claim or use 11?
