# docs/architecture.md — Arquitetura da landing page (demo)

## Visão geral

Next.js 14+ com App Router e TypeScript. Site majoritariamente estático
(SSG/ISR) — não há necessidade de servidor rodando 24/7 nem backend separado
nesta fase de demo. O único ponto "dinâmico" real é o envio do formulário de
contato e a atualização periódica do preview do Instagram.

## Estrutura de pastas sugerida

```
app/
  layout.tsx              # fontes, providers globais (Lenis, tema)
  page.tsx                # monta as seções na ordem do roadmap
  api/
    contact/route.ts      # Route Handler do formulário de contato
components/
  sections/
    Hero.tsx
    Pillars.tsx            # "O que fazemos"
    Portfolio.tsx
    RegionalDna.tsx        # "Por que Sotaque"
    Testimonials.tsx
    InstagramFeed.tsx
    ContactForm.tsx
  motion/
    SplitText.tsx
    MagneticButton.tsx
    CustomCursor.tsx
    ParallaxLayer.tsx
  ui/                      # botões, inputs, etc. genéricos e reutilizáveis
content/
  cases.json               # (ou .mdx individuais) — dados do portfólio
  testimonials.json
lib/
  instagram.ts             # fetch do feed do Instagram
styles/
  tokens.css                # design tokens provisórios (ver docs/design.md)
docs/
tasks/
roadmap.md
AGENTS.md
```

## Divisão Server / Client Components

- **Server Components (padrão):** todo o conteúdo textual e estrutural das
  seções — bom para SEO e performance. Recebem os dados (de `content/*.json`
  ou fetch) e passam para os wrappers de animação via props.
- **Client Components (`"use client"`):** apenas os componentes em
  `components/motion/` e qualquer seção que precise de estado de interação
  (filtro de portfólio, formulário, cursor customizado, smooth scroll).

Regra prática: se o componente não usa hooks de estado/efeito nem eventos de
browser, ele deve ser Server Component.

## Conteúdo do portfólio ("portfólio vivo")

Nesta fase de demo, sem CMS externo: os cases vivem em `content/cases.json`
(ou arquivos `.mdx` individuais em `content/cases/`), cada um com:
```json
{
  "slug": "case-exemplo",
  "cliente": "Clínica Exemplo",
  "categoria": "branding | conteudo | midia | audiovisual",
  "resumo": "problema → o que a Sotaque fez → resultado, em 1-2 frases",
  "midia": "/cases/exemplo/cover.jpg"
}
```
Isso mantém o requisito de "fácil de atualizar sem redesenhar" mesmo sem CMS —
trocar por um CMS headless (Sanity, por exemplo) fica para uma fase posterior,
fora do escopo desta demo.

## Instagram embutido

- Buscar posts recentes via Instagram Graph API em um Server Component,
  com `revalidate` (ISR) — por exemplo a cada algumas horas.
- Nunca expor token de acesso no client — toda chamada deve ocorrer no
  servidor.
- Nesta demo, se não houver credenciais configuradas, usar dados mock em
  `content/instagram-mock.json` e sinalizar claramente com um comentário
  `// PLACEHOLDER: substituir por fetch real quando houver credenciais`.

## Formulário de contato

- Route Handler em `app/api/contact/route.ts` recebendo POST, validando os
  campos no servidor, e (nesta demo) apenas logando/simulando o envio —
  sem integração real de e-mail/CRM ainda (fora de escopo).
- Validação client-side com feedback visual imediato (ver `docs/design.md`).

## Performance e SEO

- `next/image` para toda imagem (otimização automática, `priority` no hero)
- `next/font` para carregar as fontes escolhidas sem layout shift
- Metadados de SEO (`generateMetadata`) com foco em termos regionais +
  "comunicação/marketing médico" (SEO local é uma oportunidade real aqui)
- Rodar Lighthouse/`next build` antes de marcar qualquer seção como concluída;
  animações não podem prejudicar Core Web Vitals (especialmente CLS)

## Animação — onde cada biblioteca entra

- **Framer Motion**: animação de componentes React (entrada de elementos,
  `AnimatePresence` no filtro do portfólio, botões magnéticos)
- **GSAP + ScrollTrigger**: timelines mais complexas amarradas ao scroll
  (parallax multi-camada, pinning de seção, split-text no hero)
- **Lenis**: smooth scroll global, inicializado no `layout.tsx` dentro de um
  Client Component provider
