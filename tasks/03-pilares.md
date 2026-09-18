# Task 03 — Seção "O que fazemos" (pilares do 360)

## Objetivo
Listar as frentes de atuação da Sotaque sem virar grid genérico de
ícone+título+parágrafo repetido.

## Passos
1. Definir 4–6 pilares placeholder (branding, conteúdo, mídia, audiovisual,
   estratégia — ajustar conforme `docs/brand.md`), cada um com uma frase
   curta de impacto, não parágrafo longo
2. Criar `components/sections/Pillars.tsx` (Server Component) com layout
   assimétrico (bento grid customizado — blocos de tamanhos/alturas variadas,
   não grid simétrico 3x2)
3. Animar a entrada de cada bloco com GSAP ScrollTrigger usando um
   `clip-path` diferente por bloco (não todos entrando da mesma forma)
4. Hover state com transição de cor/textura de fundo do card (Framer Motion),
   não apenas sombra

## Critérios de aceite
- Layout não é um grid perfeitamente simétrico
- Cada bloco tem uma animação de entrada distinta dos vizinhos
- Hover muda visualmente o card além de sombra/escala básica
