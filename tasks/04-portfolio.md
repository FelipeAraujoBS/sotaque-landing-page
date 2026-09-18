# Task 04 — Seção Portfólio (o coração da página)

Ler antes: `docs/architecture.md` (estrutura de dados dos cases).

## Objetivo
Seção navegável e filtrável, visualmente rica, fácil de atualizar com novos
cases sem redesenhar nada.

## Passos
1. Criar `content/cases.json` com 4–6 cases placeholder, seguindo o schema
   de `docs/architecture.md` (slug, cliente, categoria, resumo, mídia)
2. Criar `components/sections/Portfolio.tsx`: Server Component para os dados,
   Client Component interno para o filtro por categoria e o grid
3. Implementar filtro por categoria com `AnimatePresence` + `layout` do
   Framer Motion — ao trocar categoria, os cards se reorganizam com
   movimento fluido, nunca sumindo/aparecendo seco
4. Criar `components/motion/CustomCursor.tsx` — cursor customizado que muda
   ao passar sobre um case (ex: texto "ver case")
5. Se algum case tiver vídeo, autoplay muted no hover com fade suave entre
   thumbnail estático e vídeo

## Critérios de aceite
- Trocar de filtro reorganiza os cards com animação, não corte seco
- Cursor customizado funciona ao passar sobre os cases
- Filtro é navegável por teclado (acessibilidade)
- Adicionar um novo case só exige editar `content/cases.json`, sem tocar em
  código de layout/animação
