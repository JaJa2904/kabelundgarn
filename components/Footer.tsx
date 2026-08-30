import Link from "next/link";
import type { Locale } from "@/lib/translations";
import { translations } from "@/lib/translations";
import { Section, SectionContainer } from "@/components/Section";

export function Footer({ locale }: { locale: Locale }) {
  const t = translations[locale];

  const linkClass =
    "rounded-md px-1 text-[#F8F8F2]/90 transition-colors hover:bg-[#F8F8F2]/10 hover:text-[#F8F8F2]";

  return (
    <Section as="footer" className="bg-accent text-[#F8F8F2]/90" padding="none">
      <SectionContainer className="pb-10 pt-4 md:pb-14 md:pt-5">
        <div className="border-t border-[#F8F8F2]/20 pt-5 text-sm md:pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
            <p className="text-center text-[#F8F8F2]/90 md:max-w-md md:text-left">
              {t.footer.tagline}
            </p>
            <nav
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-end"
              aria-label="Footer"
            >
              <Link href={`/${locale}/faq`} className={linkClass}>
                {t.nav.faq}
              </Link>
              <Link href={`/${locale}/contact`} className={linkClass}>
                {t.nav.contact}
              </Link>
              <Link href={`/${locale}/it-services`} className={linkClass}>
                {t.footer.itServices}
              </Link>
              <Link href={`/${locale}/impressum`} className={linkClass}>
                {t.footer.legal}
              </Link>
              <Link href={`/${locale}/datenschutz`} className={linkClass}>
                {t.footer.privacy}
              </Link>
            </nav>
          </div>
        </div>
      </SectionContainer>
    </Section>
  );
}
