import type { Locale } from "@/lib/translations";
import { getTranslations } from "@/lib/getTranslations";
import { ContactButtons } from "@/components/ContactButtons";
import { Reveal } from "@/components/motion/Reveal";
import { heroLightCtaMotionLinkClassName, MotionLinkWithAnimation } from "@/components/motion/MotionLink";
import { Section, SectionContainer } from "@/components/Section";

export function Hero({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <Section
      id="hero"
      className="hero-container bg-accent text-[#F8F8F2]/95"
      ariaLabelledBy="hero-heading"
      padding="none"
    >
      {/* Split hero layout: content left, product image right. */}
      <SectionContainer className="flex min-h-[340px] flex-col gap-10 pt-12 pb-0 md:min-h-[420px] md:flex-row md:items-stretch md:gap-8 md:pt-14 md:pb-0">
        <Reveal className="hero-content flex w-full flex-[1.35] flex-col items-start pb-12 text-left md:pb-16">
          <h1
            id="hero-heading"
            className="mb-4 max-w-none text-3xl font-bold leading-tight tracking-tight text-[#F8F8F2] sm:text-4xl lg:text-5xl"
          >
            {t.hero.headline}
          </h1>
          <p className="mb-3 max-w-none text-base leading-relaxed text-[#F8F8F2]/90 sm:text-lg">
            {t.hero.description}
          </p>
          <div className="mt-6">
            <MotionLinkWithAnimation
              href={`/${locale}/contact`}
              className={heroLightCtaMotionLinkClassName}
            >
              Jetzt unverbindlich anfragen
            </MotionLinkWithAnimation>
          </div>
          <div className="mt-4 flex shrink-0 flex-wrap items-center justify-start gap-3">
            <ContactButtons locale={locale} iconsOnly onAccent />
          </div>
        </Reveal>
        <div className="hero-image-wrapper flex w-full flex-[0.85] items-end justify-center md:min-h-0 md:self-stretch md:justify-end">
          <div
            className="relative aspect-square w-full max-w-[240px] overflow-visible sm:max-w-[290px] md:max-w-[320px]"
            style={{
              /* top/left: keep overflow; right: open (no crop); bottom: 0 = flush with SectionContainer row bottom */
              WebkitClipPath: "inset(-420px -100vw 0 -140px)",
              clipPath: "inset(-420px -100vw 0 -140px)",
            }}
          >
            <img
              src="/hero-hoodie.png"
              alt="Sweatshirt mockup"
              className="hero-hoodie-image absolute left-[calc(50%-38px)] -top-[48%] z-10 h-[255%] w-auto max-w-none -translate-x-[44%] object-contain"
              loading="eager"
            />
            <div
              aria-hidden
              className="hero-stitch-logo pointer-events-none absolute left-[calc(60%-23px)] top-1/2 z-[20] h-[33%] w-[78%] -translate-x-1/2 -translate-y-1/2"
              style={{
                backgroundColor: "rgb(var(--hero-logo-rgb))",
                backgroundImage:
                  "repeating-linear-gradient(135deg, rgba(255,255,255,0.2) 0 1px, transparent 1px 3px), repeating-linear-gradient(45deg, rgba(0,0,0,0.14) 0 1px, transparent 1px 4px)",
                WebkitMaskImage: "url(/brand/logo/kabelxgarn.svg)",
                maskImage: "url(/brand/logo/kabelxgarn.svg)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
          </div>
        </div>
      </SectionContainer>
    </Section>
  );
}
