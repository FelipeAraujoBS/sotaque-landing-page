import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sotaque — Estúdio 360",
    short_name: "Sotaque",
    description:
      "Estúdio 360 de branding, comunicação estratégica e audiovisual autoral.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F1E5",
    theme_color: "#0B1B47",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
