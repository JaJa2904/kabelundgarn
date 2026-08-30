import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | Kabel und Garn",
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-primaryDark">
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-20">
        <h1 className="text-3xl font-bold text-accent md:text-4xl">Impressum</h1>
        <p className="mt-4 text-surface/90 leading-relaxed">
          Angaben gemäß § 5 TMG folgen. Bitte ergänzen Sie hier Ihre rechtlichen Angaben.
        </p>
      </div>
    </main>
  );
}
