import type { Locale } from "@/lib/translations";
import { getTranslations } from "@/lib/getTranslations";
import { Reveal } from "@/components/motion/Reveal";
import { accentCtaMotionLinkClassName, MotionLinkWithAnimation } from "@/components/motion/MotionLink";
import { Section, SectionContainer, SECTION_PB } from "@/components/Section";

export function PricingSection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  const factors = [t.pricing.item1, t.pricing.item2, t.pricing.item3, t.pricing.item4];

  return (
    <Section
      id="pricing"
      padding="topOnly"
      className="bg-section text-surface/90"
      ariaLabelledBy="pricing-heading"
    >
      <div className={SECTION_PB}>
        <SectionContainer>
          <Reveal>
            <div className="max-w-3xl space-y-6">
              <header>
                <h2
                  id="pricing-heading"
                  className="mb-3 text-3xl font-bold tracking-tight text-accent md:text-4xl"
                >
                  {t.pricing.title}
                </h2>
                <p className="text-lg leading-relaxed text-surface/85 md:text-xl">
                  {t.pricing.intro}
                </p>
              </header>

              <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-surface/90">
                {factors.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="space-y-2 text-sm leading-relaxed text-surface/85 md:text-base">
                <p>{t.pricing.transparency}</p>
                <p>{t.pricing.volume}</p>
              </div>

              <div>
                <MotionLinkWithAnimation
                  href={`/${locale}/contact`}
                  className={accentCtaMotionLinkClassName}
                >
                  {t.pricing.cta}
                </MotionLinkWithAnimation>
              </div>
            </div>
          </Reveal>
        </SectionContainer>
      </div>
    </Section>
  );
}
