# Task 02 — Seção Hero

Ler antes: `docs/brand.md` (posicionamento), `docs/design.md` (diretrizes de
animação do hero).

## Objetivo
Comunicar em segundos a dualidade inovação + regionalidade, com um CTA único
e claro, e já estabelecer a assinatura de animação da página.

## Passos
1. Criar `components/sections/Hero.tsx` (Server Component) com headline
   placeholder, subtítulo curto e CTA
2. Criar `components/motion/SplitText.tsx` (Client Component, Framer Motion
   ou GSAP SplitText) para animar a entrada do título palavra a palavra
3. Criar `components/motion/ParallaxLayer.tsx` (GSAP ScrollTrigger) e aplicar
   parallax em pelo menos 2 camadas de fundo do hero
4. Criar `components/motion/MagneticButton.tsx` (Framer Motion) e usar no CTA
   principal

## Critérios de aceite
- Título anima palavra a palavra na entrada, sem ser um fade genérico de bloco
- Há pelo menos 2 camadas com velocidades de parallax diferentes
- CTA reage à proximidade do cursor (efeito magnético)
- Com `prefers-reduced-motion: reduce`, o hero aparece estático e legível,
  sem quebrar layout
- Nenhum "blob de gradiente" genérico atrás do título (ver `docs/design.md`)
