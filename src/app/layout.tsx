import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--f-mark" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--f-display",
});
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--f-body" });

export const metadata: Metadata = {
  title: "Ekveera Infra Projects LLP — Luxury in Every Structure",
  description:
    "Complete construction solutions in Pune — from earthwork and RCC structure to finishes, services, facade and final handover. Residential, commercial and turnkey.",
  openGraph: {
    title: "Ekveera Infra Projects LLP",
    description: "Luxury in every structure. From groundwork to final handover.",
    images: ["/images/hero-tower.webp"],
  },
};

export const viewport: Viewport = { themeColor: "#f9f6ef" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
