"use client";

import type { Locale } from "@/lib/translations";
import { getTranslations } from "@/lib/getTranslations";
import { MotionButton } from "@/components/motion/MotionButton";
import { EmailIcon, PhoneIcon, WhatsAppIcon, InstagramIcon } from "@/components/ContactIcons";

const EMAIL = "info@kabelundgarn.de";
const PHONE = "+4915511334960";
const INSTAGRAM = "https://instagram.com/kabelundgarn";

const buttonClass =
  "inline-flex items-center justify-center gap-x-3 rounded-xl border-2 border-accent/30 bg-primaryDark px-6 py-3 text-base font-semibold text-surface/90 transition duration-300 ease-out hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primaryDark sm:gap-x-4";

/** Same CTA language as hero primary button (on blue band). */
const buttonOnAccentClass =
  "inline-flex items-center justify-center gap-x-3 rounded-xl border-2 border-[#F8F8F2]/50 bg-[#F8F8F2] px-6 py-3 text-base font-semibold text-accent shadow-lg transition duration-300 ease-out hover:bg-[#F8F8F2]/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#F8F8F2]/80 focus:ring-offset-2 focus:ring-offset-accent sm:gap-x-4";

const iconOnlyClass =
  "inline-flex items-center justify-center rounded-xl border-2 border-accent/30 bg-[#F8F8F2] p-3 text-surface/90 transition duration-300 ease-out hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primaryDark";

const iconOnlyOnAccentClass =
  "inline-flex items-center justify-center rounded-xl border-2 border-[#F8F8F2]/40 bg-[#F8F8F2] p-3 text-accent transition duration-300 ease-out hover:bg-[#F8F8F2]/90 focus:outline-none focus:ring-2 focus:ring-[#F8F8F2]/80 focus:ring-offset-2 focus:ring-offset-accent";

export function ContactButtons({
  locale,
  iconsOnly = false,
  /** Hero-style blue section: off-white controls + readable focus rings. */
  onAccent = false,
}: {
  locale: Locale;
  iconsOnly?: boolean;
  onAccent?: boolean;
}) {
  const t = getTranslations(locale);
  const cls = iconsOnly
    ? onAccent
      ? iconOnlyOnAccentClass
      : iconOnlyClass
    : onAccent
      ? buttonOnAccentClass
      : buttonClass;

  return (
    <div className="flex flex-wrap gap-3">
      <MotionButton href={`mailto:${EMAIL}`} className={cls} aria-label={t.contact.emailLabel}>
        <EmailIcon />
        {!iconsOnly && t.contact.emailLabel}
      </MotionButton>
      <MotionButton href={`tel:${PHONE}`} className={cls} aria-label={t.contact.phoneLabel}>
        <PhoneIcon />
        {!iconsOnly && t.contact.phoneLabel}
      </MotionButton>
      <MotionButton
        href={`https://wa.me/${PHONE.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        aria-label={t.contact.whatsappLabel}
      >
        <WhatsAppIcon />
        {!iconsOnly && t.contact.whatsappLabel}
      </MotionButton>
      <MotionButton
        href={INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        aria-label={t.contact.instagramLabel}
      >
        <InstagramIcon />
        {!iconsOnly && t.contact.instagramLabel}
      </MotionButton>
    </div>
  );
}
