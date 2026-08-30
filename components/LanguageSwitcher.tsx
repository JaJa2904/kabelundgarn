"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/translations";

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname() ?? "";
  const basePath = pathname.replace(/^\/(de|en)/, "") || "";

  const dePath = `/de${basePath}`;
  const enPath = `/en${basePath}`;

  return (
    <div
      className="flex items-center gap-1 rounded-md border-2 border-accent/30 bg-accent/10 p-0.5"
      role="group"
      aria-label="Sprache wechseln"
    >
      <Link
        href={dePath}
        className={`rounded px-2 py-1 text-sm transition-colors ${
          currentLocale === "de"
            ? "bg-accent font-medium text-white hover:text-[#ffffcc]"
            : "font-medium text-accent hover:bg-accent/15 hover:opacity-90"
        }`}
        aria-current={currentLocale === "de" ? "true" : undefined}
      >
        DE
      </Link>
      <Link
        href={enPath}
        className={`rounded px-2 py-1 text-sm transition-colors ${
          currentLocale === "en"
            ? "bg-accent font-medium text-white hover:text-[#ffffcc]"
            : "font-medium text-accent hover:bg-accent/15 hover:opacity-90"
        }`}
        aria-current={currentLocale === "en" ? "true" : undefined}
      >
        EN
      </Link>
    </div>
  );
}
