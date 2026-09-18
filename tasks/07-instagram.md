# Task 07 — Instagram embutido

Ler antes: `docs/architecture.md` (estratégia de fetch/ISR do Instagram).

## Objetivo
Preview ao vivo do feed do Instagram como ponte entre os dois canais, sem
duplicar trabalho de conteúdo.

## Passos
1. Criar `lib/instagram.ts` com a função de fetch via Instagram Graph API
2. Se não houver credenciais configuradas no ambiente da demo, usar
   `content/instagram-mock.json` com posts placeholder, sinalizando
   claramente no código que é um mock temporário
3. Criar `components/sections/InstagramFeed.tsx` (Server Component) que busca
   os posts com `revalidate` (ISR) e renderiza um grid simples
4. Hover leve (zoom sutil) na imagem, sem exagero

## Critérios de aceite
- Nenhum token/credencial exposto no client
- Funciona com dados mock quando não há credenciais configuradas
- Grid é responsivo e legível em mobile
