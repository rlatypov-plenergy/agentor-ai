# Agentor.ai — website build brief for Claude Code

> Repo: https://github.com/rlatypov-plenergy/agentor-ai (branches `main` = production, `dev` = working).
> Paste this whole file as the first message in Claude Code opened in the cloned repo.
> Work in phases. After each phase: commit to `dev`, push, give me a short report and the preview URL, and wait for my "OK" before the next phase.

---

## 0. Goal and audience

Build a fast, premium, multi-page marketing website for **Agentor.ai** — an AI agents & business-process automation studio (team in Poland and Ukraine, clients in the US, UK, Poland, Ukraine and Kazakhstan).

- **Primary goal:** generate qualified leads from **mid-size and large companies** (50–5,000 employees).
- **Traffic sources:** SEO, Google Ads (PPC), LinkedIn, YouTube, Instagram, Threads, SMM. Every page must work as a landing page.
- **Languages:** English (default, `/en`) and Ukrainian (`/uk`). Full parity, translated slugs where natural, `hreflang` on every page.
- **Tone:** confident, concrete, engineering-minded, no hype. Short sentences. Numbers only when real.

## 1. Tech stack (decided — do not switch to WordPress/Webflow)

- **Next.js 15 (App Router) + TypeScript + React Server Components**, statically generated wherever possible.
- **Tailwind CSS v4** + **shadcn/ui** (Radix) for accessible primitives; **Framer Motion** for subtle motion only (respect `prefers-reduced-motion`).
- **next-intl** for i18n (`en`, `uk`), locale-prefixed routes, language switcher that keeps the current page.
- **Content as MDX in the repo** (`/content/{en,uk}/cases|services|industries|blog/*.mdx`) with typed frontmatter (Zod schema, build fails on missing fields). This lets me (and Claude) add a case or article by adding one file.
- **Forms:** server actions / route handlers → POST to `LEAD_WEBHOOK_URL` (my n8n) + fallback email via **Resend** (`RESEND_API_KEY`, `LEAD_EMAIL_TO`). Validate with Zod, honeypot + Cloudflare Turnstile (`TURNSTILE_SITE_KEY/SECRET`).
- **Booking:** Cal.com embed (`NEXT_PUBLIC_CAL_LINK`), lazy-loaded.
- **Analytics:** GTM container (`NEXT_PUBLIC_GTM_ID`) loaded only after cookie consent; GA4, Meta Pixel and LinkedIn Insight are configured inside GTM. Push dataLayer events: `cta_click`, `form_start`, `form_submit` (with `form_type`), `calc_complete`, `booking_opened`, `booking_done`.
- **UTM capture:** store `utm_*`, `gclid`, `fbclid`, `li_fat_id`, landing page and referrer in a first-party cookie (30 days) and send them with every form.
- **Cookie consent** banner (GDPR — we sell in the EU): necessary / analytics / marketing.
- **Hosting:** Vercel. `main` → production (agentor.ai), `dev` → preview (dev.agentor.ai or Vercel preview URL).
- Package manager: pnpm. Node 20+.

## 2. Git & CI

- Repo: `rlatypov-plenergy/agentor-ai`. Create `dev` from `main` if missing. Branches: `main` (protected, production) and `dev` (default working branch).
- Conventional commits. Each phase = PR `dev → main` only when I approve.
- GitHub Actions on every push/PR: `pnpm lint`, `pnpm typecheck`, `pnpm build`, Playwright smoke tests (all routes 200 in both locales, forms render), Lighthouse CI (budgets below). Fail the build on broken internal links or missing translations.
- `.env.example` with every variable; never commit secrets.

## 3. Design system ("premium dark tech", matches our sales deck)

- Colors: background `#0B0F1E`, surface `#161B34`, surface-2 `#1D2344`, border `#2A3160`, text `#FFFFFF`, muted `#A3ABCF`, accent mint `#34E3A6`, accent violet `#8B7CFF`. Light sections allowed for long reading pages (blog/case body): white bg, ink `#0B0F1E`.
- Typography: **Manrope** (headings) + **Inter** (body), both with Cyrillic subsets via `next/font`. Fluid type scale (clamp), H1 48–72px desktop.
- Motif: rounded cards (radius 20px), soft glow gradients (mint/violet radial blur) behind hero blocks, product screenshots in browser-window frames with shadow, "pill" tags for tech stack.
- Logo: wordmark `agentor` + mint `.ai` with a mint dot (create an SVG; I may replace it later).
- Components: Header with **mega-menu "Services"** (grouped dropdown, icons, one-line descriptions) + "Cases" + "Industries" + "About" + "Blog" + language switch + primary CTA button; mobile drawer menu; Footer with sitemap, contacts, socials (LinkedIn, YouTube, Instagram, Threads), legal links.
- Quality bar: looks like a top-tier agency site (reference level: Linear, Vercel, Stripe marketing pages). No stock-photo clichés, no generic robot images. Use our real product screenshots (see §9), simple custom SVG diagrams and icons (lucide).
- Accessibility: WCAG 2.2 AA contrast, keyboard navigation, focus states, alt texts.

## 4. Sitemap (both locales)

```
/                                   Home
/services                           Services hub
  /services/ai-discovery            AI Discovery (company / department audit)        ← flagship offer
  /services/business-process-mapping  Business process mapping (AS-IS → TO-BE)
  /services/ai-voice-agents         AI voice agents (inbound/outbound calls)
  /services/ai-chatbots             AI chatbots & assistants (web, Telegram, WhatsApp, Viber)
  /services/ai-sales-agents         AI SDR / sales agents (lead research, outreach)
  /services/erp-automation          ERP & back-office automation (1C, Odoo, Bitrix24, documents)
  /services/integrations            Integrations & workflow automation (n8n, Make, APIs, RPA UiPath)
  /services/custom-interfaces       Custom interfaces: dashboards, internal tools, web & mobile apps
  /services/private-llm             Private / local LLM deployment (on-prem or private cloud)
  /services/document-ai             Document & tender AI (extraction, analysis, offers)
/cases                              Cases hub (filter by service, industry, country)
  /cases/imosta-ai-discovery
  /cases/yotta-wallet-ai-sdr
  /cases/atlanta-construction-voice-agent
  /cases/hi-master-ai-saas
  /cases/airpa-viber-lead-engine
  /cases/tenderiq-tender-ai
  /cases/ai-personal-assistant
  /cases/patent-ai
  /cases/ioss-hse-incidents
  /cases/fitstepper-smart-stepper
  /cases/industrial-erp (NDA, anonymized)
/industries                         Industries hub
  /industries/construction  /industries/transport-logistics  /industries/manufacturing
  /industries/public-procurement  /industries/professional-services  /industries/e-commerce-retail
/about                              Founder, team, geography map, values, how we work
/free-discovery                     Landing for converter #2 (qualification form)
/consultation                       Landing for converter #1 (Cal.com)
/ai-assessment                      Converter #3 (multi-step assessment)
/free-mvp                           Converter #4 (free MVP in 5 days)
/blog  + /blog/[slug]               SEO articles (MDX)
/contact
/privacy  /terms  /cookies
/404
```

## 5. Page templates (content blocks)

**Home:** hero (headline "AI agents that work like your best employees" + sub + 2 CTAs + product screenshot collage) → logos/geography strip (US · UK · PL · UA · KZ) → problem block (3 pains) → services grid (10 cards linking to service pages) → flagship offer banner (Free department discovery) → featured cases (4 cards) → how we work (5 steps timeline) → tech stack pills → founder block with photo → FAQ → final CTA.

**Service page (×10):** hero with outcome headline + CTA → who it's for (company size, departments) → problems we solve → what we build (3–6 feature cards) → how it works (diagram/steps) → related cases (auto from MDX tags) → stack → deliverables & timeline → pricing hint ("from …", optional, placeholder) → FAQ (5–7 Qs, FAQPage schema) → CTA block.

**Case page (×11):** hero (client, country, industry, service tags) → challenge / solution / result → screenshots gallery (lightbox) → architecture diagram (simple SVG: channels → agent → systems) → stack → "what this means for your company" → related cases → CTA. Results only from frontmatter; if a metric is missing, render qualitative text — never invent numbers.

**Industry page (×6):** pains specific to the industry → relevant services → relevant cases → FAQ → CTA.

**About:** founder Roman Latypov (photo, bio), team PL + UA, **geography map** (custom SVG world/Europe map with highlighted KZ, US, UK, PL, UA and project counts), timeline, values.

## 6. Conversion system (on EVERY page) — 4 converters

All four share one design language, are tracked separately (`form_type`: `consultation` | `discovery` | `assessment` | `free_mvp`) and send UTM data with every submission. Companies with fewer than 50 employees are routed (politely) to the free consultation for converters 2 and 4.

1. **Free 30-minute consultation** — primary header button ("Book a free call"), Cal.com modal, sticky bottom bar on mobile. Landing: `/consultation`.

2. **Free AI Discovery of one department** (flagship, mid-size & large companies)
   - Included: up to **5 interviews** with key employees (45–60 min), AS-IS description of the department's business processes (BPMN-style maps + text), analysis of routine, time losses and bottlenecks, a **prioritized automation map** (top-5 opportunities with effort, impact, rough ROI), 60-min results presentation.
   - Client receives: the department's described business processes + automation shortlist with ROI.
   - Value badge: **"Market value ≈ $2,000 — free for qualified companies"** (≈40 h × $50/h ex. VAT: interviews 10 h, process mapping 14 h, analysis & ROI 8 h, report & presentation 5 h, coordination 3 h).
   - Qualification form: name, work email (soft warning on free-mail domains), company, website, company size, industry, department, main pain, country, consent. Landing: `/free-discovery`. Banner on Home + every service/case page; desktop exit-intent modal (max once per 7 days).

3. **AI Automation Assessment** (replaces a simple calculator; it is a smart multi-step form that collects rich company data and shows instant value). Landing: `/ai-assessment` + compact entry widget on service and industry pages.
   - Step 1 — Company: name, website, country, industry (select), company size, annual revenue band (optional), B2B / B2C / both.
   - Step 2 — What the company does: short description, main products/services, typical customers, monthly volume of leads/orders/requests (ranges).
   - Step 3 — Current systems (multi-select + "other"): CRM, ERP/1C/Odoo/SAP, accounting, e-commerce platform, telephony, messengers (Telegram/WhatsApp/Viber), email, document storage, BI, custom software.
   - Step 4 — What to automate (multi-select by department, each with typical tasks): sales, customer support, marketing, operations/logistics, procurement/tenders, finance & accounting, HR/recruiting, production/quality, management reporting + free text "describe the process you'd automate first".
   - Step 5 — Size of the problem: people involved, hours per week each spends on routine, average loaded hourly cost (prefilled by country), error/rework rate (low/med/high), current response time to a client request.
   - Step 6 — Goals & constraints: goals (cut costs, faster response, more leads, fewer errors, scale without hiring, better reporting), data sensitivity (→ suggest private LLM), compliance (GDPR etc.), desired timeline, budget range, role of the person filling the form (decision maker / influencer).
   - Step 7 — Contact: name, work email, phone/Telegram/WhatsApp (optional), consent.
   - Result screen (instant, client-side): estimated hours and money saved per year, payback range, a **readiness score** (0–100), top-3 recommended AI agents/automations for their case, recommended next step (discovery / free MVP / consultation). Promise: "A personalized automation plan in your inbox within 48 hours."
   - UX: progress bar, back/next, autosave in localStorage, 2–3 minutes total, every step skippable except contact; send the full JSON to the webhook. Track `assessment_step_N` events for funnel analysis.

4. **Free MVP in 5 business days — zero risk**. Landing: `/free-mvp`.
   - Offer: we build a working MVP of one AI automation/agent for one clearly defined process in **5 business days**, at no cost. Demo on the client's real (or sample) data.
   - Outcome: **like it → pay a fixed price and take it (code + handover) and/or continue with us; don't like it → pay nothing, no obligations.**
   - Conditions (show clearly): one process, scope agreed on a 30-min kick-off call, client provides access/sample data and a responsible person, limited number of slots per month (`TODO: number`), companies 50+ employees, IP transfers after payment.
   - Form: company, size, process to automate, systems involved, data availability (yes/sample/no), success criteria ("the MVP is a success if…"), desired start date, contact.
   - Page sections: how it works (Day 1 kick-off → Day 2–4 build → Day 5 demo), what you get, examples of 5-day MVPs (voice agent, chatbot on knowledge base, lead parser, document extraction, n8n workflow), FAQ (who owns the code, what if we need more time, security/NDA), CTA.

Optional later: "Call our AI voice agent now" live demo button (Vapi web call) behind `NEXT_PUBLIC_VOICE_DEMO=false`.

CTA placement rule: hero CTA, a mid-page offer block (rotate discovery / free MVP / assessment by page type), and a final CTA section at the bottom of every page; header CTA always visible; thank-you states with next steps and a calendar link.

## 7. SEO (built in from day one)

- Unique `title` / `description` per page and locale, canonical URLs, `hreflang` (en, uk, x-default), `sitemap.xml` with alternates, `robots.txt`, breadcrumbs.
- JSON-LD: `Organization`, `WebSite`, `Service` (service pages), `FAQPage`, `Article` (blog), `BreadcrumbList`, `Person` (founder).
- Dynamic OG images per page (`next/og`) in brand style.
- Semantic headings (one H1), descriptive URLs, internal linking (services ↔ cases ↔ industries ↔ blog), image `alt`, `next/image` with AVIF/WebP.
- Prepare a keyword map file `/docs/seo-keywords.md` (EN + UA) for every page: primary + 3–5 secondary keywords (e.g. "AI voice agent for business", "business process automation with AI", "AI discovery workshop", "private LLM deployment", "голосовий AI-агент", "автоматизація бізнес-процесів", "впровадження ШІ в бізнес").
- Blog: create the template + 3 starter articles per language (draft, `draft: true` until I approve): "How to choose the first process to automate with AI", "Private LLM vs OpenAI API: when local models save money", "What an AI discovery of a department looks like".
- Performance budgets (Lighthouse mobile): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100. LCP < 2.5s, CLS < 0.1, JS per page < 150 KB gz.

## 8. Content (source of truth)

Use the texts below (EN). Write the Ukrainian version yourself in natural business Ukrainian (not literal translation); keep product names in Latin. Mark anything I must confirm with `<!-- TODO: confirm -->` in MDX and list them in the phase report.

**Company:** Agentor.ai — AI agents and business-process automation for mid-size and large companies. Team in Poland and Ukraine. Clients in the US, UK, Poland, Ukraine, Kazakhstan. 16 projects.
**Founder:** Roman Latypov — Founder & CEO, Agentor.ai. 10+ years in business as CEO of Plenergy Europe PLC (e-commerce). PhD in Marine Machines and Devices (National University of Shipbuilding), engineering & mechanical design background.
**Contacts:** email `TODO` (agentor.ai mailbox), phone +38 063 634 20 21, Telegram @latypov_roman, Upwork profile link `TODO`.

**Cases** (challenge → solution → result → stack):
1. **Imosta** (Warsaw, Poland · mid-size business · AI discovery, in progress) — company wants AI but doesn't know where to start → interviews with key employees, AS-IS process mapping, analysis of losses and bottlenecks, scoring processes by automation potential, complexity and ROI → map of company processes + prioritized AI automation roadmap. Stack: interviews, BPMN, AS-IS/TO-BE, ROI model. `<!-- TODO: industry, departments, numbers -->`
2. **Yotta Wallet** (US & UK · fintech/SaaS · AI SDR) — enter US/UK retail market without SDR headcount → Apollo leads → AI enrichment (Perplexity, Google, LinkedIn signals) → lead scoring → Vapi voice calls → 14-day call+email sequence → dashboard with AI script tips → 24/7 outbound pipeline that books meetings. Stack: Vapi, n8n, OpenClaw, Apollo, Perplexity, Supabase. (Screenshots show demo data — label as "interface demo".)
3. **Atlanta Construction** (USA · construction · voice agent) — after-hours/busy-hour calls lost → Vapi voice agent + Crisp AI chat on WordPress sites: qualify, check slots, book/reschedule/cancel site visits, create lead in Odoo CRM via API → every call and chat answered, visits booked automatically. Stack: Vapi, n8n, Crisp, Odoo API, Google Calendar, WordPress.
4. **Hi-Master** (Poland · beauty · our own SaaS) — masters spend half the day as admins → CRM with AI assistant in chat, Instagram booking, online booking link, reminders, UA/RU/EN → launched, 100+ masters onboarded. Stack: Lovable, n8n, Supabase, OpenAI. Link: himaster.space.
5. **AIRPA** (Ukraine ↔ EU · passenger transport) — ride/parcel requests drown in dozens of Viber groups → desktop app monitors carrier Viber groups, AI extracts route/date/passengers, matches to carrier corridors on a map, dedupes, scores priority, pushes hot leads to Telegram → one inbox of verified prioritized requests with route match score. Stack: React, Python, PostgreSQL, LLM, OpenStreetMap, Telegram.
6. **TenderIQ** (UA · PL · EU · public procurement) — finding tenders and reading 50-page docs takes days → collects tenders from Prozorro and PL/EU portals, AI extracts requirements in one click, product matching, cost estimate, commercial offer, translation → 9,639 tenders in the pipeline; requirement analysis in one click (20 requirements in the example). Stack: React, Python, PostgreSQL, Docker, OpenAI, Bitrix24.
7. **AI Personal Assistant** (internal) — scheduling and email routine → Telegram voice/text → n8n AI agent manages Google Calendar, Gmail invites & follow-ups, Google Docs/Drive, Perplexity research, Supabase vector memory → meetings and routine emails from one chat, 24/7. Stack: n8n, Make, OpenAI, Telegram, Google Workspace, Perplexity, Supabase.
8. **Patent AI** (USA · legal/IP) — patentability check needs long manual search → agent searches USPTO API, Google Patents via Perplexity, international DBs; GPT scores 9 criteria → report with success probability, closest prior art, improvement steps. Stack: n8n, USPTO API, Perplexity, OpenAI, Telegram, Supabase.
9. **IOSS HSE** — incident registry, trends, AI root-cause analysis, lessons learned for health & safety teams (MVP). Stack: Lovable, n8n, Supabase.
10. **FitStepper** (Plenergy) — Bluetooth smart stepper, iOS/Android app on Rork, AI fitness consultant on n8n. Stack: Rork, Bluetooth LE, n8n.
11. **Industrial ERP (NDA)** — manufacturer/telecom construction company: fleet of 30+ vehicles (maintenance, repairs, fuel), document workflow with deadline alerts, cost calculation & offers, unified ERP with 1C. Stack: React, Python, PostgreSQL, 1C. Anonymize fully.

**Services short copy** — write from these positions:
- AI Discovery: "Find where AI pays off first" — interviews, AS-IS maps, automation shortlist with ROI. Free for one department (qualified companies).
- Business process mapping: AS-IS/TO-BE, BPMN, roles, systems, documents; foundation for any automation or ERP project.
- AI voice agents: inbound receptionist 24/7, outbound calls, booking, qualification, CRM sync (Vapi, telephony).
- AI chatbots & assistants: website, Telegram, WhatsApp, Viber, Instagram; knowledge base (RAG), handoff to humans.
- AI sales agents: lead research & enrichment, scoring, multichannel outreach, meeting booking.
- ERP & back-office automation: 1C, Odoo, Bitrix24, document workflow, approvals, fleet, cost calculation.
- Integrations & workflow automation: n8n, Make, UiPath RPA, REST APIs, webhooks, legacy systems.
- Custom interfaces: dashboards, internal tools, client portals, web & mobile apps (React, Python, PostgreSQL).
- Private / local LLM: deploy open-weight models (e.g. Llama, Qwen, Mistral) on your servers or private cloud — data stays inside, predictable cost instead of per-token API bills; hybrid routing (local model for routine, frontier API for hard tasks); cost comparison table placeholder.
- Document & tender AI: extraction from PDFs/scans, requirement analysis, matching, drafting offers, translation.

## 9. Assets

Copy from my local folder `~/Downloads/AI-Portfolio/` into `/assets-source` in the repo (gitignored originals; commit only optimized versions):
- `mockups/*.jpg` (1920×1080 framed screenshots) and `deck_images/*.png` (transparent framed screenshots) → optimize to `/public/cases/<slug>/`.
- `deck_images/founder.png` (round) + original founder photo → `/public/team/`.
- `stack_tech.png` for reference only; build the stack section in code.
- Blur/remove any personal data (phones, emails) you notice in screenshots; list what you changed.

## 10. Phases (stop and report after each)

1. **Foundation:** repo, Next.js setup, i18n, design tokens, header with mega-menu, footer, layout, consent, analytics wiring, CI. Deploy `dev`.
2. **Home + design review:** full Home page in EN with real content and screenshots. I review the look before we scale it.
3. **Templates:** service, case, industry, blog, about, contact, legal templates + MDX schema; fill all EN content.
4. **Converters:** consultation (Cal.com), free discovery landing + form, AI assessment wizard, free MVP landing + form, webhook + Resend, thank-you flows, tracking events, UTM capture.
5. **Ukrainian version:** full UA content, translated metadata, hreflang check.
6. **SEO & performance:** schema, sitemap, OG images, keyword map, Lighthouse budgets, Playwright tests, link checker.
7. **Launch:** PR `dev → main`, production on Vercel, domain agentor.ai, final checklist (forms deliver to n8n + email, GTM fires after consent, 404, redirects).

Definition of done: all routes build in both locales, zero console errors, Lighthouse budgets met, forms tested end-to-end, no placeholder text visible on production (TODOs only in MDX comments).
