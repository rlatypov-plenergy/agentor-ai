// Mock data for preview. Real values must be confirmed — see docs/TODO-REPLACE.md
export const site = {
  name: "Agentor.ai",
  email: "hello@agentor.ai", // TODO: confirm
  phone: "+38 063 634 20 21",
  telegram: "latypov_roman",
  calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? "#", // TODO: Cal.com link
  upwork: "#", // TODO: Upwork link
  socials: { linkedin: "#", youtube: "#", instagram: "#", threads: "#" }, // TODO: real URLs
};

export const services = [
  { slug: "ai-discovery", key: "discovery", icon: "Compass" },
  { slug: "business-process-mapping", key: "mapping", icon: "Workflow" },
  { slug: "ai-voice-agents", key: "voice", icon: "Phone" },
  { slug: "ai-chatbots", key: "chatbots", icon: "MessagesSquare" },
  { slug: "ai-sales-agents", key: "sales", icon: "Target" },
  { slug: "erp-automation", key: "erp", icon: "Database" },
  { slug: "integrations", key: "integrations", icon: "Plug" },
  { slug: "custom-interfaces", key: "interfaces", icon: "LayoutDashboard" },
  { slug: "private-llm", key: "llm", icon: "Lock" },
  { slug: "document-ai", key: "docs", icon: "FileSearch" },
] as const;

export const featuredCases = [
  { slug: "yotta-wallet-ai-sdr", key: "yotta", img: "01" },
  { slug: "atlanta-construction-voice-agent", key: "atlanta", img: "01" },
  { slug: "tenderiq-tender-ai", key: "tenderiq", img: "02" },
  { slug: "airpa-viber-lead-engine", key: "airpa", img: "01" },
] as const;

export const stack = [
  "n8n", "Make", "Vapi", "OpenAI", "Supabase", "React", "Python", "PostgreSQL",
  "Odoo", "1C", "Bitrix24", "UiPath", "Telegram", "Perplexity", "Docker",
];
