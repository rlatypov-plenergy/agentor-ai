import type { Industry } from "../schema";

export const industries: Industry[] = [
  {
    slug: "construction",
    title: "Construction",
    headline: "AI for construction and field services",
    lead: "Missed calls, scattered documents and manual scheduling cost contractors jobs. AI agents answer, qualify and schedule while crews work.",
    pains: [
      { title: "Lost calls", text: "Calls during site work or after hours go unanswered." },
      { title: "Manual scheduling", text: "Visits and estimates are coordinated by phone and messages." },
      { title: "Document overload", text: "Offers, specs and approvals pile up in email." },
    ],
    services: ["ai-voice-agents", "ai-chatbots", "erp-automation"],
    cases: ["atlanta-construction-voice-agent", "industrial-erp"],
    faq: [
      { q: "Can the agent book site visits?", a: "Yes. It checks free slots and books, reschedules or cancels visits." },
      { q: "Does it work with our CRM?", a: "We integrate with CRMs that have an API, for example Odoo." },
      { q: "What about back-office documents?", a: "We build document workflows and cost calculation tools." },
    ],
  },
  {
    slug: "transport-logistics",
    title: "Transport & logistics",
    headline: "AI for transport and logistics",
    lead: "Requests arrive through chats, groups and email. AI turns them into structured, prioritized work for dispatchers.",
    pains: [
      { title: "Requests in chats", text: "Orders drown in messenger groups." },
      { title: "Route matching", text: "Dispatchers match requests to routes by hand." },
      { title: "Duplicates and noise", text: "The same request appears in many places." },
    ],
    services: ["ai-sales-agents", "custom-interfaces", "integrations"],
    cases: ["airpa-viber-lead-engine"],
    faq: [
      { q: "Can AI read messenger groups?", a: "In the AIRPA case, a desktop app monitors Viber groups and AI extracts route, date and passengers." },
      { q: "Can alerts go to Telegram?", a: "Yes, hot leads are pushed to Telegram." },
      { q: "Do you integrate with TMS or ERP?", a: "Through APIs and workflow tools, case by case." },
    ],
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    headline: "AI and automation for manufacturers",
    lead: "Fleet, documents, calculations and quality records often live in separate tools. We connect them into one back-office.",
    pains: [
      { title: "Disconnected tools", text: "Fleet, documents and costs are tracked separately." },
      { title: "Slow calculation", text: "Cost calculation and offers take days." },
      { title: "Safety records", text: "Incidents and lessons learned are hard to analyze." },
    ],
    services: ["erp-automation", "business-process-mapping", "custom-interfaces"],
    cases: ["industrial-erp", "ioss-hse-incidents"],
    faq: [
      { q: "Can you work with 1C?", a: "Yes, we integrate with 1C." },
      { q: "Can data stay on our servers?", a: "Yes, via private deployment." },
      { q: "Where do we start?", a: "An AI discovery of one department." },
    ],
  },
  {
    slug: "public-procurement",
    title: "Public procurement",
    headline: "AI for tenders and public procurement",
    lead: "Finding tenders and reading long documentation takes days. AI collects, analyzes and drafts offers.",
    pains: [
      { title: "Tender search", text: "Relevant opportunities are spread across portals." },
      { title: "Long documentation", text: "50-page documents must be read for requirements." },
      { title: "Manual offers", text: "Costing and drafting repeat for every tender." },
    ],
    services: ["document-ai", "erp-automation", "integrations"],
    cases: ["tenderiq-tender-ai"],
    faq: [
      { q: "Which portals are supported?", a: "Prozorro and Polish/EU portals in the TenderIQ case." },
      { q: "Can it translate documents?", a: "Translation is built into the platform." },
      { q: "Can it integrate with our CRM?", a: "Yes, for example Bitrix24." },
    ],
  },
  {
    slug: "professional-services",
    title: "Professional services",
    headline: "AI for legal, consulting and professional services",
    lead: "Research-heavy and document-heavy work is where AI saves the most expert time.",
    pains: [
      { title: "Manual research", text: "Experts spend hours searching databases." },
      { title: "Scheduling and email", text: "Coordination eats the partner's week." },
      { title: "Repetitive reports", text: "Similar reports are written from scratch." },
    ],
    services: ["document-ai", "ai-chatbots", "private-llm"],
    cases: ["patent-ai", "ai-personal-assistant"],
    faq: [
      { q: "Can client data stay private?", a: "Yes. We can deploy private LLMs." },
      { q: "Can AI produce structured reports?", a: "Yes, as in Patent AI." },
      { q: "Can it manage calendars?", a: "Yes, as in our Telegram assistant." },
    ],
  },
  {
    slug: "e-commerce-retail",
    title: "E-commerce & retail",
    headline: "AI for e-commerce and retail",
    lead: "Support, sales and operations repeat the same tasks thousands of times. Agents take over the repetitive part.",
    pains: [
      { title: "Support load", text: "Customers ask the same questions all day." },
      { title: "Outbound sales", text: "Reaching new retail partners needs SDR capacity." },
      { title: "Manual operations", text: "Orders and data move between systems by hand." },
    ],
    services: ["ai-chatbots", "ai-sales-agents", "integrations"],
    cases: ["yotta-wallet-ai-sdr", "hi-master-ai-saas"],
    faq: [
      { q: "Which channels do chatbots cover?", a: "Website, Telegram, WhatsApp, Viber and Instagram." },
      { q: "Can AI do outbound to retailers?", a: "Yes, as in the Yotta Wallet case." },
      { q: "Does it connect to our store platform?", a: "Through APIs and workflow tools." },
    ],
  },
];
