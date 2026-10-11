// Client-side tracking helpers: dataLayer events and first-party UTM cookie (30 days).
type DL = Record<string, unknown>;
declare global { interface Window { dataLayer?: DL[] } }

export function track(event: string, data: DL = {}) {
  if (typeof window === "undefined") return;
  (window.dataLayer = window.dataLayer || []).push({ event, ...data });
}

const COOKIE = "agentor_utm";
const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "li_fat_id"];

export function captureUtm() {
  try {
    const q = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    KEYS.forEach((k) => { const v = q.get(k); if (v) found[k] = v; });
    const existing = readUtm();
    if (Object.keys(found).length || !existing.landing) {
      const data = { ...existing, ...found, landing: existing.landing ?? window.location.href, referrer: existing.referrer ?? document.referrer };
      document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(data))}; max-age=${30 * 86400}; path=/; SameSite=Lax`;
    }
  } catch {}
}

export function readUtm(): Record<string, string> {
  try {
    const m = document.cookie.split("; ").find((c) => c.startsWith(COOKIE + "="));
    return m ? JSON.parse(decodeURIComponent(m.split("=")[1])) : {};
  } catch { return {}; }
}
