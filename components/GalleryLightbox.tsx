"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type GalleryImage = {
  src?: string;
  alt: string;
};

function clampIndex(i: number, len: number) {
  return ((i % len) + len) % len;
}

const overlayMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

const modalMotion = {
  initial: { opacity: 0, scale: 0.96, y: 18 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 18 },
} as const;

export function GalleryLightbox({
  images,
  className,
}: {
  images: GalleryImage[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [dimsBySrc, setDimsBySrc] = useState<Record<string, { w: number; h: number }>>({});
  const [renderBox, setRenderBox] = useState<{ w: number; h: number } | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const clickable = useMemo(
    () => images.filter((i): i is { src: string; alt: string } => Boolean(i.src)),
    [images]
  );
  const hasImages = clickable.length > 0;

  const openAt = useCallback(
    (idx: number) => {
      if (!hasImages) return;
      setActive(clampIndex(idx, clickable.length));
      setOpen(true);
    },
    [hasImages, clickable.length]
  );

  const close = useCallback(() => setOpen(false), []);

  const prev = useCallback(() => {
    setActive((a) => clampIndex(a - 1, clickable.length));
  }, [clickable.length]);

  const next = useCallback(() => {
    setActive((a) => clampIndex(a + 1, clickable.length));
  }, [clickable.length]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close, prev, next]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [open]);

  // Preload natural image sizes so the mask stays correct when switching quickly.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;

    clickable.forEach(({ src }) => {
      if (dimsBySrc[src]) return;
      const img = new window.Image();
      img.decoding = "async";
      img.onload = () => {
        if (cancelled) return;
        const w = img.naturalWidth || 0;
        const h = img.naturalHeight || 0;
        if (!w || !h) return;
        setDimsBySrc((prev) =>
          prev[src]?.w === w && prev[src]?.h === h ? prev : { ...prev, [src]: { w, h } }
        );
      };
      img.src = src;
    });

    return () => {
      cancelled = true;
    };
  }, [clickable, dimsBySrc]);

  const activeImage = useMemo(() => clickable[active], [clickable, active]);
  const activeDims = activeImage ? dimsBySrc[activeImage.src] : undefined;
  const activeAspectRatio = activeDims ? `${activeDims.w} / ${activeDims.h}` : "16 / 10";
  const containedRect = useMemo(() => {
    if (!renderBox || !activeDims) return null;
    const cw = renderBox.w;
    const ch = renderBox.h;
    const iw = activeDims.w;
    const ih = activeDims.h;
    if (!cw || !ch || !iw || !ih) return null;

    // next/image with object-contain will letterbox; compute the real rendered image rect.
    const scale = Math.min(cw / iw, ch / ih);
    const w = iw * scale;
    const h = ih * scale;
    const left = (cw - w) / 2;
    const top = (ch - h) / 2;
    return { left, top, w, h };
  }, [renderBox, activeDims]);

  const radiusBasis = containedRect ? { w: containedRect.w, h: containedRect.h } : renderBox;
  const activeRadiusPx = radiusBasis
    ? Math.max(18, Math.min(36, Math.round(Math.min(radiusBasis.w, radiusBasis.h) * 0.06)))
    : 24;

  useEffect(() => {
    if (!open) return;
    const el = boxRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setRenderBox({ w: rect.width, h: rect.height });
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [open]);

  return (
    <div className={className}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, idx) => (
          <motion.button
            key={img.src ?? `empty-${idx}`}
            type="button"
            onClick={() => {
              if (!img.src) return;
              const clickIndex = clickable.findIndex((c) => c.src === img.src);
              if (clickIndex < 0) return;
              openAt(clickIndex);
            }}
            className={[
              "group relative overflow-hidden rounded-2xl border-2 border-accent/25 bg-surface/5 shadow-sm transition-[border-color,transform,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/25",
              img.src ? "hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md" : "cursor-default",
            ].join(" ")}
            whileTap={img.src ? { scale: 0.985 } : undefined}
            aria-label={img.alt}
            aria-disabled={!img.src}
          >
            <div className="relative aspect-[4/3] w-full">
              {img.src ? (
                <>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition duration-500 ease-out group-hover:scale-[1.03]"
                    quality={85}
                    priority={idx < 3}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0 opacity-0 transition duration-300 group-hover:opacity-100" />
                </>
              ) : (
                <div className="absolute inset-0 bg-accent/[0.03]" />
              )}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-accent/15" />
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open && activeImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
            {...overlayMotion}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <div className="absolute inset-0 bg-primaryDark/90" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,153,0.18)_0%,rgba(0,0,0,0)_60%)]" />
            <div className="absolute inset-0 backdrop-blur-[6px]" />

            <motion.div
              className="relative z-[101] w-full max-w-6xl"
              {...modalMotion}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* floating close + counter */}
              <div className="pointer-events-none absolute -top-3 right-0 z-[104] flex w-full items-center justify-between px-2 md:px-4">
                <div className="pointer-events-auto inline-flex items-center rounded-full bg-primaryDark/85 px-3 py-1.5 text-xs font-medium text-surface/80 shadow-lg backdrop-blur">
                  <span className="font-semibold text-surface">{active + 1}</span>
                  <span className="mx-1 text-surface/60">/</span>
                  <span className="text-surface/60">{clickable.length}</span>
                </div>

                <motion.button
                  type="button"
                  onClick={close}
                  className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-primaryDark/85 p-3 text-accent shadow-lg backdrop-blur transition hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/25"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                    aria-hidden
                  >
                    <path d="M6 6L18 18M6 18L18 6" />
                  </svg>
                </motion.button>
              </div>

              <div className="relative">
                {/* floating arrows */}
                <motion.button
                  type="button"
                  onClick={prev}
                  className="absolute -left-3 inset-y-0 my-auto z-[103] h-fit rounded-full bg-primaryDark/80 p-3 text-accent shadow-lg backdrop-blur hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/25 md:-left-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Previous image"
                  disabled={!hasImages}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                    aria-hidden
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={next}
                  className="absolute -right-3 inset-y-0 my-auto z-[103] h-fit rounded-full bg-primaryDark/80 p-3 text-accent shadow-lg backdrop-blur hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/25 md:-right-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Next image"
                  disabled={!hasImages}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                    aria-hidden
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </motion.button>

                {/* floating image (no background card) */}
                <div
                  ref={boxRef}
                  className="relative mx-auto w-full max-w-6xl"
                  style={{
                    aspectRatio: activeAspectRatio,
                    maxHeight: "78vh",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage.src}
                      className="absolute inset-0"
                      initial={{ opacity: 0.0, scale: 0.99 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.0, scale: 0.99 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      style={{
                        filter:
                          "drop-shadow(0 26px 80px rgba(0,0,0,0.70)) drop-shadow(0 8px 24px rgba(0,0,0,0.45))",
                      }}
                    >
                      <div
                        className="relative h-full w-full"
                      >
                        {containedRect ? (
                          <div
                            className="absolute overflow-hidden"
                            style={{
                              left: containedRect.left,
                              top: containedRect.top,
                              width: containedRect.w,
                              height: containedRect.h,
                              borderRadius: `${activeRadiusPx}px`,
                              clipPath: `inset(0 round ${activeRadiusPx}px)`,
                            }}
                          >
                            <Image
                              src={activeImage.src}
                              alt={activeImage.alt}
                              fill
                              sizes="(max-width: 1024px) 100vw, 1100px"
                              className="object-cover object-center"
                              quality={95}
                              priority
                              onLoadingComplete={(img) => {
                                const w = img.naturalWidth || 0;
                                const h = img.naturalHeight || 0;
                                if (!w || !h) return;
                                setDimsBySrc((prev) =>
                                  prev[activeImage.src]?.w === w && prev[activeImage.src]?.h === h
                                    ? prev
                                    : { ...prev, [activeImage.src]: { w, h } }
                                );
                              }}
                            />
                          </div>
                        ) : (
                          <div
                            className="absolute inset-0 overflow-hidden"
                            style={{
                              borderRadius: `${activeRadiusPx}px`,
                              clipPath: `inset(0 round ${activeRadiusPx}px)`,
                            }}
                          >
                            <Image
                              src={activeImage.src}
                              alt={activeImage.alt}
                              fill
                              sizes="(max-width: 1024px) 100vw, 1100px"
                              className="object-contain object-center"
                              quality={95}
                              priority
                              onLoadingComplete={(img) => {
                                const w = img.naturalWidth || 0;
                                const h = img.naturalHeight || 0;
                                if (!w || !h) return;
                                setDimsBySrc((prev) =>
                                  prev[activeImage.src]?.w === w && prev[activeImage.src]?.h === h
                                    ? prev
                                    : { ...prev, [activeImage.src]: { w, h } }
                                );
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

