"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/translations";
import { translations } from "@/lib/translations";
import { CONTAINER_MAX, SECTION_PX } from "@/components/Section";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BrandLogo } from "@/components/BrandLogo";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Header({ locale }: { locale: Locale }) {
  const t = translations[locale];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="stroke-header sticky top-0 z-50 bg-primaryDark text-accent">
      <div className={`mx-auto flex ${CONTAINER_MAX} items-center justify-between gap-3 ${SECTION_PX} py-3`}>
        <Link href={`/${locale}`} className="logo-wrap shrink-0" aria-label="Kabel und Garn – Start">
          <BrandLogo variant="light" size="lg" locale={locale} />
        </Link>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border-2 border-accent/30 p-2 text-accent md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Menue schliessen" : "Menue oeffnen"}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">{menuOpen ? "Menue schliessen" : "Menue oeffnen"}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
            aria-hidden
          >
            {menuOpen ? (
              <path d="M6 6L18 18M6 18L18 6" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        <nav className="hidden items-center gap-4 md:flex md:gap-6" aria-label="Hauptnavigation">
          <Link
            href={`/${locale}#services`}
            className="text-sm font-medium text-accent transition duration-200 ease-out hover:-translate-y-0.5 hover:opacity-90"
          >
            {t.nav.services}
          </Link>
          <Link
            href={`/${locale}#process`}
            className="text-sm font-medium text-accent transition duration-200 ease-out hover:-translate-y-0.5 hover:opacity-90"
          >
            {t.nav.process}
          </Link>
          <Link
            href={`/${locale}/gallerie`}
            className="text-sm font-medium text-accent transition duration-200 ease-out hover:-translate-y-0.5 hover:opacity-90"
          >
            {t.nav.gallerie}
          </Link>
          <Link
            href={`/${locale}/faq`}
            className="text-sm font-medium text-accent transition duration-200 ease-out hover:-translate-y-0.5 hover:opacity-90"
          >
            {t.nav.faq}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="text-sm font-medium text-accent transition duration-200 ease-out hover:-translate-y-0.5 hover:opacity-90"
          >
            {t.nav.contact}
          </Link>
          <ThemeToggle />
          <LanguageSwitcher currentLocale={locale} />
        </nav>
      </div>
      {menuOpen && (
        <div id="mobile-nav" className={`${SECTION_PX} pb-3 md:hidden`}>
          <nav className="mx-auto grid max-w-6xl gap-1 rounded-lg border-2 border-accent/20 bg-primaryDark p-2" aria-label="Mobile Navigation">
            <Link href={`/${locale}#services`} className="rounded px-3 py-2 text-sm font-medium text-accent hover:bg-accent/10" onClick={() => setMenuOpen(false)}>
              {t.nav.services}
            </Link>
            <Link href={`/${locale}#process`} className="rounded px-3 py-2 text-sm font-medium text-accent hover:bg-accent/10" onClick={() => setMenuOpen(false)}>
              {t.nav.process}
            </Link>
            <Link href={`/${locale}/gallerie`} className="rounded px-3 py-2 text-sm font-medium text-accent hover:bg-accent/10" onClick={() => setMenuOpen(false)}>
              {t.nav.gallerie}
            </Link>
            <Link href={`/${locale}/faq`} className="rounded px-3 py-2 text-sm font-medium text-accent hover:bg-accent/10" onClick={() => setMenuOpen(false)}>
              {t.nav.faq}
            </Link>
            <Link href={`/${locale}/contact`} className="rounded px-3 py-2 text-sm font-medium text-accent hover:bg-accent/10" onClick={() => setMenuOpen(false)}>
              {t.nav.contact}
            </Link>
            <div className="px-2 py-1">
              <ThemeToggle />
            </div>
            <div className="px-2 py-1">
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </nav>
        </div>
      )}
      <div className="h-[2px] w-full bg-[#006699]" aria-hidden />
    </header>
  );
}
