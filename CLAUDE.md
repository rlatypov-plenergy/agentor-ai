# Agentor.ai website — project rules for Claude Code

- Full brief: `docs/BRIEF.md` (source of truth). Read it before any task.
- Stack: Next.js 15 App Router, TypeScript, Tailwind v4, shadcn/ui, next-intl (en, uk), MDX content in `/content`.
- Branches: work on `dev`; `main` = production. Never push to `main` directly — open a PR `dev → main` only when the owner approves.
- Before every commit: `pnpm lint && pnpm typecheck && pnpm build`.
- Content honesty: never invent metrics, clients or testimonials. Unknown facts → `<!-- TODO: confirm -->` in MDX and list them in the report.
- Every page: hero CTA + mid-page offer block + final CTA; header CTA always visible. Four converters: consultation, free-discovery, ai-assessment, free-mvp.
- i18n parity: any text added in `en` must be added in `uk` in the same commit.
- Design tokens live in `app/globals.css`. Light theme is the default (`--bg #FBFBF8`, `--surface #FFFFFF`, `--ink #0B0F1E`, `--mint #34E3A6`, `--violet #6D5DFC`); dark theme overrides them under `[data-theme="dark"]` (`--bg #0B0F1E`, `--surface #161B34`, `--violet #8B7CFF`). Never hard-code colors in components, use tokens. Do not introduce new colors without a reason.
- Performance budget (Lighthouse mobile): Perf ≥ 90, A11y ≥ 95, SEO 100. JS per page < 150 KB gz.
- After each phase: push to `dev`, post a short report (what's done, preview URL, TODOs, questions) and wait for "OK".
