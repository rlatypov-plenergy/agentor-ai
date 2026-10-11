import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Manrope } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { Boot } from "@/components/Boot";
import { getConv } from "@/lib/conv";
import "../globals.css";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope", display: "swap" });
const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Agentor.ai — AI agents & business process automation",
  description: "AI agents, voice bots and automations for mid-size and large companies.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return (
    <html lang={locale} className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <NextIntlClientProvider>
          <Header />
          <main className="pb-16 sm:pb-0">{children}</main>
          <Footer />
          <CookieConsent />
          <Boot copy={{ sticky: getConv(locale).sticky, exit: getConv(locale).exit }} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
