import type { Locale } from "@/lib/translations";
import { getTranslations } from "@/lib/getTranslations";
import { Section, SectionContainer } from "@/components/Section";
import { EmailIcon, PhoneIcon, InstagramIcon } from "@/components/ContactIcons";

const CONTACT_EMAIL = "info@kabelundgarn.de";
const CONTACT_PHONE_DISPLAY = "+49 155 11334960";
const CONTACT_PHONE_TEL = "+4915511334960";
const CONTACT_INSTAGRAM_HANDLE = "@kabelundgarn";
const CONTACT_INSTAGRAM_URL = "https://instagram.com/kabelundgarn";

export function ContactSection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  const channelClass =
    "rounded-xl border border-onAccent/25 bg-onAccent/[0.08] px-4 py-3.5 shadow-sm backdrop-blur-sm";

  const labelClass =
    "text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-onAccent/70";

  const iconTileClass =
    "flex h-9 w-9 items-center justify-center rounded-lg bg-onAccent/[0.12] text-onAccent/95";

  const valueLinkClass =
    "mt-1.5 block text-lg font-semibold leading-snug text-onAccent transition-colors hover:text-[#ffffcc] focus:outline-none focus-visible:ring-2 focus-visible:ring-onAccent/80 focus-visible:ring-offset-2 focus-visible:ring-offset-accent";

  return (
    <Section
      id="contact-section"
      className="bg-accent text-onAccent/95"
      ariaLabelledBy="contact-heading"
      padding="none"
    >
      <SectionContainer className="pt-8 pb-5 md:pt-10 md:pb-6">
        <h2
          id="contact-heading"
          className="mb-6 text-3xl font-bold leading-tight tracking-tight text-onAccent md:text-4xl"
        >
          {t.contact.title}
        </h2>
        <dl className="mb-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <div className={channelClass}>
            <dt className={`${labelClass} flex items-center gap-3`}>
              <span className={iconTileClass} aria-hidden>
                <EmailIcon />
              </span>
              {t.contact.email}
            </dt>
            <dd className="m-0">
              <a href={`mailto:${CONTACT_EMAIL}`} className={valueLinkClass}>
                {CONTACT_EMAIL}
              </a>
            </dd>
          </div>
          <div className={channelClass}>
            <dt className={`${labelClass} flex items-center gap-3`}>
              <span className={iconTileClass} aria-hidden>
                <PhoneIcon />
              </span>
              {t.contact.phone}
            </dt>
            <dd className="m-0">
              <a href={`tel:${CONTACT_PHONE_TEL}`} className={valueLinkClass}>
                {CONTACT_PHONE_DISPLAY}
              </a>
            </dd>
          </div>
          <div className={`${channelClass} sm:col-span-2 lg:col-span-1`}>
            <dt className={`${labelClass} flex items-center gap-3`}>
              <span className={iconTileClass} aria-hidden>
                <InstagramIcon />
              </span>
              {t.contact.instagram}
            </dt>
            <dd className="m-0">
              <a
                href={CONTACT_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={valueLinkClass}
              >
                {CONTACT_INSTAGRAM_HANDLE}
              </a>
            </dd>
          </div>
        </dl>
      </SectionContainer>
    </Section>
  );
}
