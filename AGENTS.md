# AGENTS.md — Como trabalhar neste projeto

Este arquivo define como você (o agente de IA) deve operar dentro deste repositório.
Leia-o por completo antes de escrever qualquer código.

## 0. Contexto em uma frase

Você está construindo uma **demo/protótipo funcional** da landing page da **Sotaque**,
uma empresa de comunicação e marketing 360 focada inicialmente no setor médico.
Ainda **não temos os assets finais de identidade visual** (paleta, tipografia, ilustrações)
do time de design — então tudo aqui é construído com **design tokens provisórios**,
fáceis de substituir depois. Leia `docs/brand.md` e `docs/design.md` antes de tomar
qualquer decisão visual.

## 1. Ordem de leitura obrigatória

Antes de escrever a primeira linha de código, leia nesta ordem:
1. `docs/brand.md` — quem é a Sotaque, tom de voz, público
2. `docs/design.md` — diretrizes visuais e de animação (mesmo sem assets finais)
3. `docs/architecture.md` — como o projeto é estruturado tecnicamente
4. `roadmap.md` — a sequência de passos que você deve seguir
5. `tasks/` — o detalhamento de cada passo do roadmap

Nunca pule direto para `tasks/` sem ter absorvido o contexto de `docs/`.

## 2. Regras de ouro

- **Siga o roadmap na ordem.** Não implemente a seção 4 antes de terminar a seção 2,
  mesmo que pareça mais fácil ou mais interessante.
- **Uma task por vez.** Ao concluir uma task, pare, reporte o progresso (ver seção 4)
  e só então siga para a próxima.
- **Não invente conteúdo de marca.** Textos institucionais reais (histórico da empresa,
  cases reais, depoimentos reais) ainda não existem — use conteúdo placeholder
  claramente identificável (ex: `[PLACEHOLDER: case de cliente X]`), nunca invente
  fatos como se fossem reais.
- **Não invente identidade visual definitiva.** Cores, fontes e imagens finais virão
  do time de design. Tudo deve ser implementado via tokens (ver `docs/design.md`),
  nunca hardcoded, para que a troca futura seja trivial.
- **Priorize fugir do "genérico gerado por IA".** Isso é um requisito de produto,
  não só estético — está detalhado em `docs/design.md`. Se uma escolha (layout,
  animação, componente) parecer um template SaaS padrão, reconsidere.
- **Acessibilidade não é opcional.** Toda animação precisa respeitar
  `prefers-reduced-motion`. Contraste de cor mínimo AA mesmo nos tokens provisórios.
- **Pergunte quando ambíguo.** Se uma task não deixar claro o suficiente o que fazer,
  pare e pergunte em vez de assumir — especialmente em decisões de conteúdo de marca.

## 3. Stack técnica (não fugir sem justificativa)

- **Next.js 14+ (App Router)** com TypeScript
- **Tailwind CSS** para estilos, com tokens customizados (ver `docs/design.md`)
- **Framer Motion** para animação de componentes e transições de página
- **GSAP + ScrollTrigger** para animações amarradas ao scroll (parallax, timelines)
- **Lenis** para smooth scroll
- Conteúdo de portfólio/cases em **MDX ou JSON local** em `content/` (sem CMS externo
  nesta fase de demo)
- Sem backend separado: formulário de contato via **Route Handler** do próprio Next.js

## Gatilhos técnicos conhecidos (não repetir)

- **NUNCA use `<alpha-value>` no `tailwind.config.ts`** (nem `rgb(var(...)/<alpha-value>)`
  nem `color-mix(... <alpha-value> ...)`). O loader de config (sucrase/jiti) falha com
  `SyntaxError: Unexpected token, expected ","` e derruba o build inteiro.
  As cores do theme ficam como `var(--hex)` puras.
- Cores com opacidade (`text-ink/65`, `bg-clay/10`, `text-clay/[0.06]`, etc.) não são
  geradas pelo Tailwind v3 para cores `var(--hex)`. Elas estão declaradas manualmente
  em `src/app/globals.css` via `color-mix(in srgb, var(--sotaque-X) N%, transparent)`.
  Ao adicionar uma classe com alpha, adicione o utilitário correspondente lá (confira
  a lista por `grep` antes de buildar). Gradientes com alpha custom (via `from-`/`via-`) usam `backgroundImage` + `color-mix`
  inline no componente — não classes do Tailwind.

## 4. Como reportar progresso

Ao concluir cada passo do `roadmap.md`:
1. Marque o checkbox correspondente em `roadmap.md` (`[ ]` → `[x]`)
2. Imprima no console uma linha no formato:
   ```
   ✅ [ROADMAP] Passo N — <nome do passo> concluído
   ```
3. Rode `npm run build` (ou `next build`) e confirme que não há erros antes de
   considerar o passo concluído. Se houver erro, ele **não** está concluído.
4. Se o passo tiver critérios de aceite explícitos na task correspondente em
   `tasks/`, confirme cada um antes de marcar como feito.

## 5. Convenções de código

- Componentes de seção da página em `components/sections/` (ex: `Hero.tsx`,
  `Portfolio.tsx`)
- Componentes de animação/interação reutilizáveis em `components/motion/`
  (ex: `MagneticButton.tsx`, `SplitText.tsx`)
- Todo componente com hooks/interação de browser é **Client Component**
  (`"use client"`) — mantenha os Server Components (conteúdo estático, SEO)
  o mais "puros" possível, passando dados como props para os wrappers animados
- Nomeação em inglês para código (variáveis, componentes, arquivos), conteúdo/copy
  em português (é o idioma da marca e do público)
- Commits pequenos e descritivos, um por task concluída quando possível

## 6. O que NÃO fazer

- Não adicionar CMS externo, autenticação, banco de dados ou API própria — está
  fora de escopo desta demo
- Não usar bibliotecas de UI genéricas de componentes prontos (ex: kits de
  "landing page templates") — o objetivo é fugir do genérico
- Não hardcodar textos de marca fora de um arquivo central de conteúdo
  (facilita revisão e troca posterior)
