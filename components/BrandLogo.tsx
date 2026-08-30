import type { Locale } from "@/lib/translations";

const LOGO = {
  light: "/brand/logo/kabelxgarn.svg",
  dark: "/brand/logo/logo-inverted.svg",
} as const;

const SIZE_CLASS = {
  sm: "h-8",
  md: "h-9 md:h-10",
  lg: "h-10 md:h-12",
} as const;

type BrandLogoProps = {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  locale: Locale;
};

export function BrandLogo({
  variant = "light",
  size = "md",
  className = "",
  locale,
}: BrandLogoProps) {
  const src = LOGO[variant];
  const sizeClass = SIZE_CLASS[size];

  return (
    <img
      src={src}
      alt="kabelundgarn"
      width={undefined}
      height={undefined}
      className={`${sizeClass} w-auto object-contain ${className}`.trim()}
      style={{ maxHeight: "3.5rem" }}
    />
  );
}
