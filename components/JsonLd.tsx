export function JsonLdLocalBusiness({ locale }: { locale: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Kabel und Garn",
    description:
      locale === "de"
        ? "Stickerei und Textilveredelung in Augsburg. Stickerei-Service, B2B Stickerei, Siebdruck."
        : "Embroidery and textile finishing in Augsburg. Embroidery service, B2B embroidery, screen printing.",
    url: "https://kabelundgarn.de",
    telephone: "+4915511334960",
    email: "info@kabelundgarn.de",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Augsburg",
      addressCountry: "DE",
    },
    sameAs: ["https://instagram.com/kabelundgarn"],
    priceRange: "€€",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
