import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LangSetter } from "@/components/LangSetter";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kabel und Garn – Stickerei Augsburg",
  description:
    "Stickerei und Textilveredelung in Augsburg. Stickerei-Service, B2B Stickerei, Siebdruck.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="de" className={inter.variable}>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased`}>
        <LangSetter />
        {children}
      </body>
    </html>
  );
}
