import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sotaque — Marketing Médico 360",
    short_name: "Sotaque",
    description:
      "Comunicação e marketing 360 com sotaque regional e olhar contemporâneo — foco no setor médico e saúde.",
    start_url: "/",
    display: "standalone",
    background_color: "#102C2B",
    theme_color: "#102C2B",
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
