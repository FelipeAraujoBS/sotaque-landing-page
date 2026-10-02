// Conteúdo do Hero — centralizado para edição e revisão humana

export interface HeroContent {
  headlinePrefix: string;
  headlineHighlight: string;
  // TODO(humano): Lista candidata de palavras rotativas para a manchete
  // Alterna suavemente entre as palavras e repousa em "sotaque"
  rotatingWords: string[];
  // TODO(humano): Subtítulo de posicionamento pendente de validação humana
  subtitle: string;
  ctaPrimary: {
    label: string;
    href: string;
  };
  ctaSecondary: {
    label: string;
    href: string;
  };
  location: string;
}

export const HERO_CONTENT: HeroContent = {
  headlinePrefix: "Sua marca tem voz.\nNós damos o",
  headlineHighlight: "sotaque",
  // TODO(humano): Palavras candidatas para rotação da manchete (evitando regionalismos caricatos)
  rotatingWords: ["sotaque", "ritmo", "tempero", "jeito"],
  // TODO(humano): Frase de posicionamento editorial proposta para validação
  subtitle:
    "Comunicação 360° para negócios brasileiros que querem uma marca com identidade própria.",
  ctaPrimary: {
    label: "Ver cases",
    href: "#work",
  },
  ctaSecondary: {
    label: "Falar com a gente",
    href: "#contact",
  },
  location: "Salvador · Bahia",
};
