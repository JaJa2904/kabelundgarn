import type { Metadata } from "next";
import { getTranslations } from "@/lib/getTranslations";
import { ContactForm } from "@/components/ContactForm";
import { MotionLinkWithAnimation } from "@/components/motion/MotionLink";
import { Section, SectionContainer } from "@/components/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as "de" | "en");
  return {
    title: `${t.contact.title} | Kabel und Garn`,
    description:
      locale === "de"
        ? "Kontaktieren Sie uns für Stickerei, Siebdruck und Textilveredelung in Augsburg."
        : "Contact us for embroidery, screen printing and textile finishing in Augsburg.",
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as "de" | "en");

  return (
    <Section
      as="main"
      padding="none"
      className="bg-primaryDark"
    >
      <SectionContainer
        size="tight"
        className="flex min-h-[calc(100vh-9rem)] flex-col justify-center py-8 md:min-h-[calc(100vh-10rem)] md:py-10"
      >
        <MotionLinkWithAnimation
          href={`/${locale}`}
          className="mb-6 inline-block text-sm font-medium text-textPrimary/90 transition-colors hover:text-accent"
        >
          ← {locale === "de" ? "Zurück zur Startseite" : "Back to home"}
        </MotionLinkWithAnimation>
        <h1 className="mb-6 text-3xl font-bold text-accent md:text-4xl">
          {t.contact.title}
        </h1>
        <p className="mb-4 text-textPrimary/90">
          {locale === "de"
            ? "Schicken Sie uns Ihre Anfrage – wir melden uns bei Ihnen."
            : "Send us your enquiry – we will get back to you."}
        </p>
        <div className="mt-6">
          <ContactForm locale={locale as "de" | "en"} />
        </div>
      </SectionContainer>
    </Section>
  );
}
