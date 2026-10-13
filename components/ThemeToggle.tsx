"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const KEY = "agentor_theme";

// Light is the default. The inline script in the layout applies a stored "dark" choice before first paint.
export function ThemeToggle({ label }: { label: string }) {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.dataset.theme === "dark"); }, []);
  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(KEY, next); } catch {}
    setDark(!dark);
  };
  return (
    <button onClick={toggle} aria-label={label} title={label} className="grid size-9 place-items-center rounded-full border border-border bg-surface text-muted transition hover:text-ink">
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
