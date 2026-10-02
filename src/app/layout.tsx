import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/motion/SmoothScroll";
import SotaquePreloader from "@/components/ui/SotaquePreloader";
import { CONTACT_INFO } from "@/lib/contact";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sotaquecom.com.br";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Sotaque — Estúdio 360 | Branding, Estratégia & Audiovisual",
    template: "%s | Sotaque",
  },
  description:
    "Comunicação e estratégia 360 com sotaque autoral, raiz regional e acabamento contemporâneo. Branding, redes, audiovisual e presença digital para marcas e criadores.",
  keywords: [
    "comunicação 360",
    "branding",
    "estratégia de marca",
    "design autoral",
    "audiovisual",
    "produção cultural",
    "redes sociais",
    "estúdio criativo",
    "Sotaque",
    "Salvador",
    "Bahia",
  ],
  authors: [{ name: "Sotaque Estúdio" }],
  creator: "Sotaque",
  category: "Design, Branding e Comunicação",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sotaque — Estúdio 360 | Branding, Estratégia & Audiovisual",
    description:
      "Comunicação com alma e sotaque regional. Branding, conteúdo, audiovisual e design autoral sem templates genéricos.",
    locale: "pt_BR",
    type: "website",
    siteName: "Sotaque",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sotaque — Estúdio 360 | Branding, Estratégia & Audiovisual",
    description:
      "Design e estratégia com raiz regional, olhar contemporâneo e voz própria.",
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
  themeColor: "#F4F1E5",
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
    <html lang="pt-BR" className={dmSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Sotaque Estúdio",
              alternateName: "Sotaque Estúdio 360",
              description:
                "Comunicação estratégica, branding autoral e produção audiovisual 360 com raiz regional e acabamento contemporâneo para marcas, criadores e empresas.",
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
                "Comunicação Estratégica 360",
                "Branding e Identidade Visual",
                "Design Autoral",
                "Produção Audiovisual e Videocast",
                "Gestão de Redes Sociais e Mídia",
              ],
              sameAs: [CONTACT_INFO.instagram, CONTACT_INFO.linkedin],
            }),
          }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <SotaquePreloader />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded bg-ink text-cream px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Pular para conteúdo
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
