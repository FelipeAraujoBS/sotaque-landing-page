# Task 01 — Setup do projeto

## Objetivo
Preparar a base técnica do projeto antes de qualquer seção visual.

## Passos
1. Criar projeto Next.js 14+ com App Router e TypeScript
   (`create-next-app` com flags `--typescript --app --tailwind`)
2. Configurar Tailwind com os design tokens provisórios de `docs/design.md`
   em `styles/tokens.css` (ou estendendo `tailwind.config.ts`)
3. Instalar dependências: `framer-motion`, `gsap`, `lenis`
4. Criar a estrutura de pastas descrita em `docs/architecture.md`
5. Configurar `next/font` com as fontes provisórias escolhidas
6. Criar `app/layout.tsx` com um provider de Lenis (Client Component) e
   suporte a `prefers-reduced-motion` (desabilitar Lenis smooth scroll nesse
   caso)

## Critérios de aceite
- `npm run build` roda sem erros
- Estrutura de pastas bate com `docs/architecture.md`
- Nenhuma cor/fonte hardcoded fora de `styles/tokens.css`
- Rodar com `prefers-reduced-motion: reduce` no navegador não quebra nada
