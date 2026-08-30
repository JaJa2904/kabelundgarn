"use client";

import Image from "next/image";
import type { Locale } from "@/lib/translations";
import { getTranslations } from "@/lib/getTranslations";
import { RevealStagger } from "@/components/motion/RevealStagger";

const cardClass =
  "group flex h-full flex-col overflow-hidden rounded-xl border-2 border-accent/30 bg-surface/5 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-accent/50 hover:shadow-md cursor-default";

const imageWrapClass =
  "relative aspect-[5/3] w-full overflow-hidden bg-accent/[0.06]";

export function ServicesCards({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  const cards = [
    {
      key: "embroidery",
      title: t.services.embroidery.title,
      description: t.services.embroidery.description,
      alt: t.services.embroidery.imageAlt,
      src: "/services/stickerei-service.png",
    },
    {
      key: "b2b",
      title: t.services.b2b.title,
      description: t.services.b2b.description,
      alt: t.services.b2b.imageAlt,
      src: "/services/b2b-embroidery-service.png",
    },
    {
      key: "screenprint",
      title: t.services.screenprint.title,
      description: t.services.screenprint.description,
      alt: t.services.screenprint.imageAlt,
      src: "/services/siebdruck-service.png",
    },
  ] as const;

  return (
    <RevealStagger className="mt-6 grid gap-6 md:grid-cols-3 md:gap-8">
      {cards.map(({ key, title, description, alt, src }) => (
        <article key={key} className={cardClass}>
          <div className={imageWrapClass}>
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transition duration-500 ease-out group-hover:scale-[1.045]"
              quality={85}
            />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-xl font-semibold text-accent">{title}</h3>
            <p className="mt-2 text-surface/90 leading-relaxed">{description}</p>
          </div>
        </article>
      ))}
    </RevealStagger>
  );
}
