# Task 09 — Performance, SEO e acessibilidade (revisão final)

## Objetivo
Garantir que toda a animação e riqueza visual não comprometam performance,
SEO nem acessibilidade — especialmente relevante já que Next.js foi escolhido
por causa do SEO.

## Passos
1. Revisar todas as imagens: devem usar `next/image`, com `priority` apenas
   no hero
2. Revisar fontes: devem usar `next/font`, sem layout shift perceptível
3. Adicionar `generateMetadata` com foco em termos regionais + "comunicação/
   marketing médico" (ver `docs/architecture.md`)
4. Rodar `next build` e Lighthouse (ou equivalente); reportar no console os
   scores de Performance, SEO e Acessibilidade
5. Testar a página inteira com `prefers-reduced-motion: reduce` ativado —
   nenhuma seção pode quebrar ou ficar ilegível
6. Testar navegação completa por teclado (Tab) em todas as seções
   interativas (filtro do portfólio, carrossel de depoimentos, formulário)

## Critérios de aceite
- `next build` sem erros nem warnings críticos
- Lighthouse Performance e Acessibilidade acima de um patamar razoável para
  uma demo (reportar os números obtidos, não é necessário nota máxima)
- Página inteira navegável por teclado
- Página inteira utilizável com `prefers-reduced-motion: reduce`
