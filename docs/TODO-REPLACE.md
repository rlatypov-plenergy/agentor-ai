# Mock data to replace before launch

- [ ] Email `hello@agentor.ai` (lib/site.ts) — real agentor.ai mailbox
- [ ] Upwork link, LinkedIn / YouTube / Instagram / Threads URLs (lib/site.ts)
- [ ] Cal.com link (`NEXT_PUBLIC_CAL_LINK`)
- [ ] Free-MVP slots per month
- [ ] GTM id, Turnstile keys, Resend key + `LEAD_EMAIL_TO`, `LEAD_WEBHOOK_URL` (n8n)
- [ ] Founder photo: original saved in assets-source/founder-original.jpg (not committed); optimized public/team/roman-latypov.webp. Confirm crop.
- [ ] Case screenshots: check for personal data (phones/emails) before public launch
- [ ] "11 projects" (brief said 16; owner confirmed 11)
- [ ] Home copy: pains / FAQ texts are drafts, owner to review
- [ ] Hosting: auto-deploy to owner's server (test-agentor.plenergy.ua) — need SSH/FTP access details

## Converters (phase 4)
- [ ] Visible "TODO:" strings in UI to remove before launch: Free-MVP slots number (content/*/converters.ts, mvp.conditions), assessment assumptions note, legal pages body (privacy/terms/cookies are placeholders)
- [ ] Assessment assumptions (components/Assessment.tsx): 40% of routine hours automatable, implementation cost $8k–$25k, hourly cost by country (US 45, UK 35, PL 20, UA 10, KZ 10, other 25) — owner must confirm or replace with real figures
- [ ] Lead backend: `public/api/lead.php` needs `agentor-config.php` on the server one level above the web root (`/plenergy.ua/agentor-config.php`): LEAD_WEBHOOK_URL (n8n), LEAD_EMAIL_TO, TURNSTILE_SECRET. See public/api/config.sample.php. Until then leads go to R.latypov@plenergy.co.uk via PHP mail() and, if mail fails, to agentor-leads.log
- [ ] Cloudflare Turnstile: set NEXT_PUBLIC_TURNSTILE_SITE_KEY at build + TURNSTILE_SECRET on server
- [ ] Cal.com link (NEXT_PUBLIC_CAL_LINK) — consultation page shows the embed only when set
- [ ] GTM: events are pushed to dataLayer; GTM script loads after consent once NEXT_PUBLIC_GTM_ID is set (consent hook is a TODO in CookieConsent.tsx)
- [ ] Verify PHP is enabled for test-agentor.plenergy.ua (nginx) so /api/lead.php runs
