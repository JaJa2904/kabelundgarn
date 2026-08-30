import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz | Kabel und Garn",
};

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-primaryDark">
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-20">
        <h1 className="text-3xl font-bold text-accent md:text-4xl">Datenschutz</h1>
        <p className="mt-4 text-surface/90 leading-relaxed">
          Datenschutzhinweise folgen. Bitte ergänzen Sie hier Ihre Datenschutzerklärung.
        </p>
      </div>
    </main>
  );
}
