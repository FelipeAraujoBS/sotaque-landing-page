import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/motion/SmoothScroll";

// PLACEHOLDER — fontes provisórias, serão substituídas pelo brand kit oficial
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Sotaque",
    template: "%s | Sotaque",
  },
  description:
    "[PLACEHOLDER] Comunicação e marketing 360 com sotaque regional e olhar inovador — foco inicial no setor médico. Branding, conteúdo, mídia e audiovisual para clínicas e profissionais de saúde.",
  keywords: [
    "comunicação médica",
    "marketing médico",
    "marketing para clínicas",
    "branding saúde",
    "agência saúde",
    "comunicação 360 saúde",
    "conteúdo médico",
    "mídia saúde",
    "audiovisual saúde",
    "Sotaque",
    "estúdio 360",
  ],
  authors: [{ name: "Sotaque Estúdio" }],
  creator: "Sotaque",
  category: "Marketing e Comunicação em Saúde",
  metadataBase: new URL("https://sotaque.example.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sotaque — Comunicação 360 para saúde",
    description:
      "Comunicação que entende de gente e de saúde. Branding, conteúdo, mídia e audiovisual com sotaque regional — sem template genérico.",
    locale: "pt_BR",
    type: "website",
    siteName: "Sotaque",
    url: "https://sotaque.example.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sotaque — Comunicação 360 para saúde",
    description:
      "Marketing médico com raiz regional e ferramentas de inovação.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#7A2E1F",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased bg-background text-foreground">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded bg-ink text-cream px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Pular para conteúdo
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
