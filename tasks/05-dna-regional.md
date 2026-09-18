# Task 05 — Seção "Por que Sotaque" (DNA regional)

Ler antes: `docs/brand.md` (tom de voz e posicionamento regional).

## Objetivo
Contar a origem/propósito da marca sem soar institucional/"sobre nós"
genérico. Ritmo de leitura mais lento e pausado que o resto da página.

## Passos
1. Criar `components/sections/RegionalDna.tsx` com narrativa curta placeholder
   (sinalizada como tal) que ancore literalmente a ideia de "sotaque"
2. Aplicar um easing/velocidade de scroll diferenciado nessa seção via Lenis
   (mais lento/orgânico que o portfólio)
3. Revelar o texto progressivamente por linha (não por letra) conforme o
   scroll passa por ele, via GSAP ScrollTrigger
4. Opcional: um pequeno detalhe interativo ligado a uma expressão regional
   (ex: hover revela o significado por extenso) — não obrigatório, mas
   incentivado como o "detalhe de estúdio" desta seção

## Critérios de aceite
- Ritmo de scroll perceptivelmente diferente do restante da página
- Texto revela por linha, não por letra nem em bloco único
- Conteúdo claramente sinalizado como placeholder onde for o caso
