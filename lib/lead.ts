import { readUtm, track } from "./track";

export type FormType = "consultation" | "discovery" | "assessment" | "free_mvp";

export const FREE_MAIL = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "mail.ru", "yandex.ru", "ukr.net", "i.ua", "proton.me", "protonmail.com", "wp.pl", "o2.pl", "onet.pl"];
export const isFreeMail = (email: string) => FREE_MAIL.includes(email.split("@")[1]?.toLowerCase() ?? "");

// Company sizes below 50 employees (values are the English option labels).
export const isSmall = (size?: string) => size === "1–10" || size === "11–49";

export async function submitLead(formType: FormType, data: Record<string, unknown>, locale: string): Promise<{ ok: boolean; dev?: boolean }> {
  const payload = { form_type: formType, locale, page: window.location.pathname, ts: new Date().toISOString(), utm: readUtm(), ...data };
  try {
    const res = await fetch("/api/lead.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!res.ok) return { ok: false };
    const json = await res.json().catch(() => ({}));
    track("form_submit", { form_type: formType });
    return { ok: json.ok !== false, dev: !!json.dev };
  } catch {
    return { ok: false };
  }
}
