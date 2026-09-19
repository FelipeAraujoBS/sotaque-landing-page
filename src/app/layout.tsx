import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import SmoothScroll from "@/components/motion/SmoothScroll";
import { CONTACT_INFO } from "@/lib/contact";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sotaquecom.com.br";

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

const chromaVenue = localFont({
  src: "../../public/fonts/chroma-avenue.woff2",
  variable: "--font-chroma",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sotaque — Marketing Médico 360 | Branding & Estratégia para Clínicas",
    template: "%s | Sotaque",
  },
  description:
    "Comunicação e marketing 360 com sotaque regional e olhar contemporâneo — foco no setor médico e saúde. Branding, conteúdo, mídia e audiovisual para clínicas e profissionais de saúde.",
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
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sotaque — Marketing Médico 360 | Branding & Estratégia para Clínicas",
    description:
      "Comunicação que entende de gente e de saúde. Branding, conteúdo, mídia e audiovisual com sotaque regional — sem template genérico.",
    locale: "pt_BR",
    type: "website",
    siteName: "Sotaque",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sotaque — Marketing Médico 360 | Branding & Estratégia para Clínicas",
    description:
      "Marketing médico com raiz regional e ferramentas de inovação.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png?v=3", sizes: "48x48", type: "image/png" },
      { url: "/favicon-16x16.png?v=3", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico?v=3" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=3", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=3",
  },
};

export const viewport = {
  themeColor: "#102C2B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${dmSans.variable} ${chromaVenue.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Sotaque Estúdio",
              alternateName: "Sotaque Comunicação e Marketing em Saúde",
              description:
                "Comunicação e marketing médico 360 com foco em especialistas e clínicas médicas. Branding autoral, estratégia de conteúdo ético, tráfego qualificado e produção audiovisual de alto padrão.",
              url: siteUrl,
              logo: `${siteUrl}/android-chrome-512x512.png`,
              image: `${siteUrl}/android-chrome-512x512.png`,
              telephone: CONTACT_INFO.phoneDisplay,
              email: CONTACT_INFO.email,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Salvador",
                addressRegion: "BA",
                addressCountry: "BR",
              },
              areaServed: {
                "@type": "Country",
                name: "Brasil",
              },
              serviceType: [
                "Marketing Médico 360",
                "Branding para Clínicas",
                "Posicionamento Médico",
                "Produção Audiovisual em Saúde",
                "Gestão de Tráfego e Mídia Ética CFM",
              ],
              sameAs: [CONTACT_INFO.instagram, CONTACT_INFO.linkedin],
            }),
          }}
        />
      </head>
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
