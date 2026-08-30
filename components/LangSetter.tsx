"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function LangSetter() {
  const pathname = usePathname();
  useEffect(() => {
    const segment = pathname?.split("/")[1];
    const lang = segment === "en" ? "en" : "de";
    document.documentElement.lang = lang;
  }, [pathname]);
  return null;
}
