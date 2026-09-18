# Sotaque — Landing page 360 para o setor médico (demo/protótipo)

> **Estado: demo funcional — 9/9 passos concluídos.** Identidade visual final
> (paleta, fontes, imagens, cases reais) ainda **não** está pronta. Tudo aqui usa
> **design tokens provisórios** e **conteúdo claramente marcado como `[PLACEHOLDER]`**,
> para que a troca pelos assets oficiais seja tarefa de configuração, não reescrita.

---

## 1. O que é este projeto

A **Sotaque** é uma empresa de comunicação e marketing 360 com foco inicial no
setor médico (clínicas, consultórios, profissionais de saúde e marcas de saúde).
A landing page funciona como **portfólio vivo** — primeiro contato de muitos
clientes com o trabalho do estúdio.

O posicionamento central da marca (a "bússola" de qualquer decisão):

> **Inovação nas ferramentas, raiz na escuta.** Uma tensão equilibrada entre
> regionalidade/origem e inovação. Nada genérico, nada "global padronizado".

O requisito mais importante de produto deste projeto é **fugir do "genérico
gerado por IA"** (blobs de gradiente roxo, glassmorphism decorativo, grids de
features simétricos, animação de entrada idêntica em tudo, tipografia
"seguríssima"). Toda decisão de layout, cor e animação foi tomada contra esses
padrões (detalhes em `docs/design.md`).

---

## 2. Tecnologias

| Tecnologia | Versão | Onde entra |
|---|---|---|
| **Next.js 14 (App Router)** | `14.2.5` | Estrutura da página, Server/Client Components, SSG, Route Handler do contato, ISR |
| **TypeScript** | `^5` | Todo o código |
| **Tailwind CSS** | `^3.4.1` | Estilos utilitários + tokens customizados |
| **Framer Motion** | `^13.4.0` | Animações de componentes React (entrada, `AnimatePresence`, layout animations, drag) |
| **GSAP + ScrollTrigger** | `^3.15.0` | Timelines amarradas ao scroll (parallax, reveal por linha, clip-path reveal) |
| **Lenis** | `^1.3.26` | Smooth scroll global, sincronizado com o ticker do GSAP |
| **next/font** | (intrínseco) | Fraunces (display) + DM Sans (body) |
| **React / React DOM** | `^18` | Runtime |

Scripts (`package.json`):

```
npm run dev    # servidor de desenvolvimento
npm run build  # build de produção (SSG)
npm run start  # serve o build
npm run lint   # next lint (ESLint)
```

> Nota: o `name` do pacote ainda é `temp-setup` — renomear quando quiser
> publicar de verdade.

---

## 3. Estrutura do projeto

```
sotaque-scaffold/
├── AGENTS.md                  # instruções de operação para agentes de IA
├── roadmap.md                 # 9 passos do desenvolvimento (todos [x])
├── docs/
│   ├── brand.md               # quem é a Sotaque, tom de voz, público
│   ├── design.md              # diretrizes visuais e de animação
│   └── architecture.md        # arquitetura e onde cada lib entra
├── tasks/                     # detalhamento de cada passo do roadmap
├── tailwind.config.ts         # theme mapeando tokens (var(--hex) puros)
└── src/
    ├── app/
    │   ├── layout.tsx         # fontes (next/font), metadata/SEO, skip-link, <SmoothScroll>
    │   ├── page.tsx           # Server Component: compõe as seções + footer
    │   ├── globals.css        # @layer base/utilities + utilitários alpha (color-mix)
    │   └── api/contact/route.ts  # POST do formulário (validação + log simulado)
    ├── components/
    │   ├── sections/          # Hero, Pillars, Portfolio, PortfolioClient,
    │   │                      # RegionalDna, Testimonials, InstagramFeed, ContactForm
    │   └── motion/            # SplittText(+SplitLines), MagneticButton,
    │                          # CustomCursor, ParallaxLayer, SmoothScroll
    ├── content/               # dados edição-sem-código
    │   ├── cases.json         # portfólio (filtrável)
    │   ├── testimonials.json  # depoimentos do carrossel
    │   └── instagram-mock.json# fallback do feed quando não há credenciais
    ├── lib/instagram.ts       # fetch Graph API (ISR 3h) ou fallback mock
    └── styles/tokens.css      # design tokens provisórios (TODAS as cores/fontes)
```

### Divisão Server / Client

- **Server Components (padrão):** `page.tsx`, `layout.tsx`, `Hero`, `Portfolio`
  (wrapper), `InstagramFeed`. Contêm o conteúdo estrutural — bom para SEO.
- **Client Components (`"use client"`):** todos os de `motion/` e todo mundo
  que precisa de estado/efeito de browser: `Pillars`, `PortfolioClient`,
  `RegionalDna`, `Testimonials`, `ContactForm`.
- O modo Server → Client é sempre via **props** de dados, nunca misturando
  import no mesmo arquivo (ex.: `Portfolio.tsx` lê `cases.json` e passa para
  `PortfolioClient`).

---

## 4. Design system — tokens provisórios

**Filosofia da paleta:** base terrosa/quente (regionalidade) + um teal saturado
de contraste (inovação). Todos em `src/styles/tokens.css`, comentados como
`/* PLACEHOLDER — substituir com brand kit oficial */`, e referenciados no
`tailwind.config.ts` como `var(--sotaque-X)` puros.

| Token | Hex | Uso |
|---|---|---|
| `--sotaque-cream` | `#FFFBF5` | Fundo principal |
| `--sotaque-cream-soft` | `#FDF6E8` | Fundo de seções alternadas / topbars |
| `--sotaque-ink` | `#1A1A1E` | Texto principal / fundo escuro (RegionalDna) |
| `--sotaque-ink-soft` | `#2E2E33` | Texto secundário |
| `--sotaque-earth` | `#7A2E1F` | **Primária** — terrosa (regional), CTAs, destaques |
| `--sotaque-earth-hover` | `#5E2317` | Hover da primária |
| `--sotaque-clay` | `#C17A54` | Terracota secundária (formas, badges) |
| `--sotaque-clay-light` | `#E8C4A8` | Variante clara do clay |
| `--sotaque-accent` | `#0E7C7B` | **Teal/inovação** — acentos, links, bordas de foco |
| `--sotaque-accent-hover` | `#095E5D` | Hover do accent |
| `--sotaque-accent-soft` | `#D1EDEB` | Fundos de destaque (sucesso, hover cards) |
| `--sotaque-muted` | `#F2E8DC` | Áreas neutras / placeholders visuais |
| `--sotaque-border` | `#E8DDD0` | Bordas |
| `--sotaque-surface` | `#FFFFFF` | Cards / inputs |
| `--sotaque-surface-elevated` | `#FFFEFC` | Superfície elevada |

**Aliases semânticos:** `background`=cream, `foreground`=ink,
`primary`=earth (+foreground cream), `accent` (+foreground cream),
`muted`, `border`, `surface`.

**Contraste AA (verificado no tokens.css):**

- `earth #7A2E1F` sobre `cream #FFFBF5` → **~9.2:1**
- `ink #1A1A1E` sobre `cream` → **~16.5:1**
- `cream` sobre `earth` → **~9.2:1**

**Tipografia** (via `next/font`, com display `swap`, sem layout shift):

- **Display:** Fraunces (serif com personalidade — antídoto ao Inter/Poppins)
  → `--font-display`
- **Corpo:** DM Sans (neutra legível) → `--font-body`

**Escala, espaçamento, raios, sombras:** também tokenizados em `tokens.css`
(`--text-hero/section-title/card-title`, `--space-xs…3xl`, `--radius-*`,
`--shadow-soft/medium/accent`).

### Como os tokens aparecem no Tailwind

As cores do `theme` são **`var(--hex)` puras** — o que significa que o Tailwind v3
**não gera variantes de opacidade** (`text-ink/65`, `bg-clay/10`, `text-clay/[0.06]`…)
automaticamente. Por isso:

- os utilitários alpha usados no projeto estão **declarados manualmente** em
  `globals.css` (`@layer utilities`) via `color-mix(in srgb, var(--sotaque-X) N%, transparent)`;
- gradientes com alpha custom foram feitos com `backgroundImage` + `color-mix`
  **inline** no componente (não dependem de geração do Tailwind).

> Gatilho crítico documentado no `AGENTS.md`: **nunca** usar `<alpha-value>`
> dentro do `tailwind.config.ts` (nem `rgb(var(...)/<alpha-value>)` nem
> `color-mix(... <alpha-value> ...)`) — o loader de config (sucrase/jiti)
> quebra o build com `SyntaxError: Unexpected token, expected ","`.
> Ver seção 9.

---

## 5. Sistema de animação (motion)

### Onde cada biblioteca entra

| Lib | Papel |
|---|---|
| **Lenis** | Smooth scroll global; inicializado em `SmoothScroll` (Client no `layout`) com `duration: 1.1`, easing exponencial; desativado se `prefers-reduced-motion` |
| **GSAP + ScrollTrigger** | Paralaxe amarrado ao scroll, reveal de texto por linha, clip-path reveal dos pilares, sync do scroll |
| **Framer Motion** | Split-text, botões magnéticos, cursor custom, drag do carrossel, layout animations do filtro, validação animada do formulário |

### `SmoothScroll` (`src/components/motion/SmoothScroll.tsx`)

- Cria `new Lenis(...)` dentro de `Promise.all([import("gsap"), import("gsap/ScrollTrigger")])`
  — **import dinâmico** evita crash de SSR (ScrollTrigger acessa `window`).
- Sincronização: `lenis.on("scroll", ScrollTrigger.update)` + `gsap.ticker.add(raf do lenis)`
  com `lagSmoothing(0)`. `ScrollTrigger.refresh()` no `load` da página.
- Respeita uma mudança de `prefers-reduced-motion` **em tempo real**: se ativar
  no meio da sessão, o Lenis é destruído e a página volta ao scroll nativo.

### `ParallaxLayer` (`src/components/motion/ParallaxLayer.tsx`)

Wrapper reutilizável para qualquer conteúdo:

- **API:** `speed` (0 = estático; ~0.15 = profundo/lento; ~0.4 = médio),
  `trigger` (seletor opcional; default = `<section>` ancestral) e `className`.
- **Mapeamento:** `yPercent = -(speed * 35)` — mantém o movimento **sutil**
  (ex.: 0.14 → ~4.9%, 0.38 → ~13.3%) e nunca quebra o layout.
- **Trigger:** `start: "top bottom"` / `end: "bottom top"`, `scrub: 0.6`
  (lag orgânico), `invalidateOnRefresh: true`.
- **Acessibilidade:** checa `prefers-reduced-motion` via `matchMedia` (com
  listener de mudança) e não cria nenhum tween nesse caso; lê `aria-hidden`.

**Parallax no Hero (3 profundidades):**

| Camada | `speed` | Conteúdo |
|---|---|---|
| Profunda (lenta) | `0.14` | Palavras gigantes "SOTAQUE" em `text-clay/[0.06]` (22vw, −6%left) e `text-earth/[0.04]` (18vw, +3° rotate) |
| Média | `0.38` | Formas geométricas terrosas + teal (faixa vertical `earth/[0.07]`, retângulo `accent/[0.07]`, círculo `clay/10`), linha pontilhada orgânica |
| Estática | — | Grid sutil de 80×80px a `opacity-[0.035]` (não parallax, dá textura) |

**Parallax no RegionalDna:** fundo inteiro com `yPercent: -6` e **`scrub: 1.2`**
(mais lento/orgânico que o Hero, propositalmente — seções institucionais têm
ritmo mais lento, ver `docs/design.md`).

### `SplitText` / `SplitLines` (`src/components/motion/SplitText.tsx`)

- **SplitText** — entrada palavra a palavra com `mask` (`overflow-hidden`),
  `y: 110% → 0%` + `rotate 3 → 0` + `opacity`, ease custom `[0.25, 1, 0.5, 1]`,
  `stagger` default 0.07s. **A11y:** mantém `aria-label` + texto `sr-only` e
  renderiza sem animação sob reduced-motion.
- **SplitLines** — variante por **linha** (`y: 100% → 0%`, stagger 0.12s,
  `duration` 0.8). Exportada e disponível para uso (o RegionalDna, hoje, faz o
  reveal por linha direto no GSAP — ver seção 5 "RegionalDna").

### `MagneticButton` (`src/components/motion/MagneticButton.tsx`)

- CTA reage à proximidade do cursor: `delta = (cursor - centro) * 0.28/0.32`,
  suavizado por `useSpring` (stiffness 180, damping 18, mass 0.6); retorna ao
  centro no `mouseleave`; `whileTap scale 0.97`.
- Variantes `primary` (earth), `accent` (teal), `ghost` (surface+border).
- Renderiza `<a>` se `href`, senão `<button>`; foco visível garantido; inativo
  sob reduced-motion.

### `CustomCursor` (`src/components/motion/CustomCursor.tsx`)

- Só aparece em desktop (`pointer: fine`), nunca com reduced-motion.
- Segue o mouse via `useSpring` (stiffness 260, damping 22); pill "ver case ↗"
  que surge sobre os cards do portfólio (`active` controlado por
  mouseenter/focus dos cards). `pointer-events-none`, `aria-hidden`.

### Movimentos específicos por seção

- **Pillars:** entrada com **clip-path por card** — cada pilar tem um `clipFrom`
  diferente (inset à direita, inset de baixo, polígono do centro, círculo,
  inset de cima) + fade + `y:14`, com `scrollTrigger` sem scrub
  (`start: "top 88%"`, `toggleActions: "play none none reverse"`, delay 0.06×i).
  No hover: ícone rotaciona, underline "Entender →" desliza, radial-gradient de
  cor do pilar acende (via variantes do Framer Motion).
- **Portfolio:** filtro por categorias com **layout animation do Framer Motion**
  — `AnimatePresence mode="popLayout"` + `motion.article layout`, cards entram
  e saem com spring (stiffness 280, damping 26) e os demais **reorganizam em
  fluido**; a borda do botão ativo desliza com `layoutId="portfolio-active"`.
- **RegionalDna:** revela a narrativa **linha a linha** com ScrollTrigger + scrub
  (`start: "top 92%"`, `end: "top 72%"`, `scrub: 0.8`) — a leitura "viaja" com o
  scroll, ritmo orgânico.
- **Testimonials:** carrossel com **arraste real** (`drag="x"`,
  `dragConstraints` calculados por `ResizeObserver`), **snap** para o card mais
  próximo no fim do drag, **setas** ‹ › e **teclado** (←/→), dots `role="tab"`.
- **ContactForm:** validação com **shake** (`x: [0,-6,6,-4,4,0]`) em campos com
  erro, mensagens de sucesso/erro com `AnimatePresence`, `aria-live="polite"`.

### Acessibilidade de movimento (global)

- `prefers-reduced-motion: reduce` → todo o CSS zera
  `animation-duration`/`transition-duration` (`tokens.css`, `@media` final) **e**
  cada componente motion checa em runtime e não cria tweens/springs.
- Lenis e CustomCursor são desativados por essa media query.
- `globals.css` define foco visível (`:focus-visible` outline accent) e seleção
  com cor de marca.

---

## 6. As seções (divisão e conteúdo)

A página única é montada na ordem do roadmap em `page.tsx` (7 seções + footer).

| # | Seção | Arquivo | ID âncora |
|---|---|---|---|
| 1 | Hero | `sections/Hero.tsx` (+ `motion/`) | `#hero` |
| 2 | O que fazemos (5 pilares 360) | `sections/Pillars.tsx` | `#pilares` |
| 3 | Portfólio vivo | `sections/Portfolio.tsx` + `PortfolioClient.tsx` | `#work` |
| 4 | Por que Sotaque — DNA regional | `sections/RegionalDna.tsx` | `#dna` |
| 5 | Depoimentos | `sections/Testimonials.tsx` | `#depoimentos` |
| 6 | Instagram (preview do feed) | `sections/InstagramFeed.tsx` | `#instagram` |
| 7 | Contato / CTA final | `sections/ContactForm.tsx` | `#contact` |
| — | Rodapé | inline em `page.tsx` | — |

### 1. Hero — `#hero`
Grid assimétrico de 12 colunas (7 + 5), **não** centralizado.

- Nav minimalista dentro do hero (logo SOTAQUE., badge "Estúdio 360 • Saúde",
  links âncora Portfólio / Por que Sotaque / Contato, "Fale com a gente").
- Headline **split-text palavra a palavra**: *"Sua marca tem voz. Nós damos o
  sotaque."* (Fraunces, `clamp(2.6rem, 6.2vw, 5.2rem)`).
- Eyebrow com traço assimétrico + bullet accent ("Comunicação com origem").
- **CTAs magnéticos** (primary "Conversar sobre meu caso ↗" → `#contact`;
  ghost "Ver portfólio vivo" → `#work`).
- Prova social minimalista (avatares iniciais + texto placeholder).
- **Card editorial inclinado** na coluna direita ("Preview — Portfólio vivo"):
  topbar com status pulse, lista vertical de cases mock (01/02/03), footer
  "Atualizado semanalmente — ↗ portfólio vivo", etiqueta flutuante "360 • sem template
  genérico" e citação lateral assimétrica. Nada de blob/glassmorphism.
- Scroll indicator minimalista + nota "Animação respeita prefers-reduced-motion".
- Background: 2 camadas parallax (SOTAQUE clay 6% + earth 4%; formas earth/accent)
  + grid estático sutil.

### 2. Pilares — `#pilares` ("O que fazemos")
Bento grid **assimétrico custom** (12 col): células `7/5` na linha 1 e
`4/5/3` na linha 2, alturas variadas. 5 pilares:

1. **Branding** (earth) — "sem jargão genérico"
2. **Conteúdo** (accent) — "rotina editorial que educa e aproxima"
3. **Mídia** (clay) — "tráfego pago com leitura local"
4. **Audiovisual** (ink) — "transmissem cuidado, não filtro genérico"
5. **Estratégia** (earth) — "em 1 página, não 40 slides"

Cada card: barra de cor no topo, número (01–05) em ícone que rotaciona no
hover, badge "0N — accent", número gigante de marca d'água
(`text-ink/[0.04]`) e footer "Entender →". Entrada com clip-path diferenciado
por card (ver seção 5).

### 3. Portfólio vivo — `#work`
- Filtros: Todos / Branding / Conteúdo / Mídia / Audiovisual (botões com
  `aria-pressed`, borda ativa deslizando via `layoutId`).
- Cards (`motion.article`, `layout`): imagem simulada por gradiente por
  categoria (inline `color-mix`), badge da categoria, slug em `font-mono`,
  cliente + resumo (`line-clamp-3`), "Ver case ↗". Chips placeholder de
  média (`/cases/*/cover.jpg` — imagens reais substituem o gradiente).
- Hover/focus ativam o **cursor customizado** "ver case".
- Conta + atualiza o nº de cases do filtro. Vazio → "Nenhum case nesta categoria."
- Dados 100% de `content/cases.json` — adicionar case **sem mexer no layout**.

### 4. DNA regional — `#dna`
Seção escura (`bg-ink`, texto `cream`) com ritmo **mais lento e orgânico**
proposital. Grid 7 + 5; coluna direita **sticky** (`lg:sticky lg:top-24`).

- Fundo parallax: radial-gradients sutis (clay e teal a 7%), linhas horizontais
  `cream/10`, marca d'água "360" a `20vw`.
- H2: *"Inovação sem perder o chão onde pisa."*
- Narrativa revelada **por linha** com scrub (6 + 5 linhas).
- **Detalhe interativo "feito à mão":** botão "“com sotaque, com jeito”" abre um
  mini-glossário (expansão em grid `1fr→0fr`) — acessível por mouse **e**
  teclado (focus).
- Card "Manifesto curto" com citação (*"fala com quem vive de saúde"*),
  assinatura placeholder da fundadora, rodapé metadados ("Leitura lenta •
  scrub 1.2", "orgânico ↓"), etiqueta "Lenis • ritmo diferenciado".
- Métricas editoriais laterais: "02 camadas parallax", "11 linhas reveladas",
  "≠ ritmo próprio".

### 5. Depoimentos — `#depoimentos`
- **Carrossel com drag real** + snap, setas e teclado; cards `width` responsiva
  (84% mobile → 32% desktop), notas em ★, blockquote em `text-ink/80`.
- Dots tablist animados (ativo vira pill larga `w-8`).
- Grid de **logos de clientes placeholder** em escala de cinza com hover que
  "acende" (grayscale→0 + borda/hover accent).
- Dados de `content/testimonials.json`.

### 6. Instagram — `#instagram`
- Server Component com `export const revalidate = 10800` (**ISR 3h**).
- `lib/instagram.ts`: se existirem `INSTAGRAM_ACCESS_TOKEN` e `INSTAGRAM_USER_ID`
  no ambiente, busca na Graph API (`next: { revalidate: 60*60*3 }`); **sem
  credenciais ou em erro → fallback para `instagram-mock.json`** com badge
  "mock ativo — sem credenciais". Token nunca vai ao client.
- Grid responsivo 2/3/3; cada post: gradiente placeholder (por `media_type`:
  VIDEO/CARROSSEL/FOTO), badge do tipo, caption no hover com gradiente `ink`,
  hover com zoom sutil (`scale` do bg), link para o `permalink` (target blank).

### 7. Contato — `#contact`
- Coluna esquerda: copy + **WhatsApp magnético** com link `wa.me` de exemplo,
  card de e-mail placeholder (`contato@sotaque.estudio`).
- Formulário (3 campos): **validação com shake** por campo, mensagens
  ao vivo (⚠ erro / ✓ ok), `noValidate` + validação client e **servidor**
  (`/api/contact`): nome ≥ 2, clínica ≥ 2, mensagem ≥ 10, **honeypot** ("email"
  oculto = bot), latência simulada de 600ms, estados idle/loading/success/error
  com `aria-live="polite"`. Sem integração real de e-mail/CRM — o envio é
  logado no servidor (rota `POST` em `app/api/contact/route.ts`).

### Rodapé
Logo SOTAQUE., © 2026, aviso de demo/tokens provisórios.

---

## 7. Conteúdo e os `[PLACEHOLDER]`

Regra do projeto (AGENTS.md): **nunca inventar fato de marca como se fosse real.**
Todo conteúdo institucional é placeholder e está **explicitamente marcado** com
`[PLACEHOLDER: ...]`, para que nenhuma AI de revisão confunda com copy final.

Onde estão:

- `content/cases.json` — 6 cases inventados como estrutura (Clínica Aurora,
  Instituto Vital, Odonto Prime, Hospital Santa Clara, Derma Essence, Cardio
  Vida) com resumos placeholder e mídia `/cases/*/cover.jpg`.
- `content/testimonials.json` — 4 depoimentos placeholder, nota 5.
- `content/instagram-mock.json` — 6 posts mock (imagens em
  `/instagram/mock-*.jpg`, ainda sem arquivo real — fora renderizado com
  gradiente).
- On-page (Hero, Pillars, RegionalDna, Portfolio, Testimonials, Contact) —
  copy placeholder sinalizada no próprio texto.

Presentes **reais** que não são placeholder: tom/narrativa aprovada para validar
layout (ex.: manifesto "com sotaque, com jeito" está marcado como tom aprovado,
mas pendente de copy final da fundadora).

---

## 8. Roadmap executado

Checkboxes **todos `[x]`** em `roadmap.md`:

1. Setup do projeto — Next + TS + Tailwind + tokens + libs de animação.
2. Hero — headline split-text, parallax multi-camada, CTA magnético.
3. Pilares — layout assimétrico, entrada animada variada por bloco.
4. Portfólio vivo — filtro com transição de layout animada, cursor custom, dados em JSON.
5. DNA regional — narrativa com ritmo de scroll diferenciado e reveal por linha.
6. Depoimentos — carrossel com drag real e logos placeholder.
7. Instagram — fetch server-side com ISR (ou mock).
8. Contato — validação animada + WhatsApp magnético.
9. Performance/SEO/a11y — imagens (next/image), fontes (next/font), metadados, reduced-motion, teclado.

Verificação ao fim: `npm run build` **ok** (6/6 páginas estáticas geradas),
`npm run lint` **sem erros**, servidor `next start` respondendo 200.

---

## 9. Decisões técnicas significativas (e o erro que custou caro)

1. **Cores como `var(--hex)`:** Tailwind v3 não deriva opacidade de valores
   `var(...)`, então **nenhuma** classe `text-ink/65` era gerada — era esse o
   bug do SOTAQUE "cobrindo" o conteúdo (as palavras gigantes ficavam com o ink
   sólido). Solução: utilitários alpha manuais em `globals.css` via
   `color-mix` (ver seção 4).
2. **Nunca usar `<alpha-value>` no `tailwind.config.ts`:** a tentativa de
   "consertar" via `rgb(var(--X-rgb)/<alpha-value>)` e depois
   `color-mix(... <alpha-value> ...)` **quebra o build** — o loader de config
   (jiti → sucrase) falha com `SyntaxError: Unexpected token, expected ","
   (35:12)`. Ao quebrar, parecia culpa do css-loader/globals.css (a linha do
   erro apontava para o módulo do CSS), mas a causa real é o **parse do
   config**. Documentado em `AGENTS.md`.
3. **Gradientes com alpha custom** são `backgroundImage` inline no componente
   (não dependem da geração do Tailwind e não passam pelo bug acima).
4. **GSAP importado dinamicamente** em todos os Client Components — evita
   referência a `window` no SSR (Lenis + ScrollTrigger).
5. **Testimonials não usa `scrollTo` nativo** (conflitava com o drag) — o
   snap é feito animando a motion value `x` com spring do Framer Motion.
6. **Server/Client separados por arquivo** (ex.: Portfolio → PortfolioClient)
   para manter o conteúdo no servidor e a interação no client.

---

## 10. Acessibilidade e SEO

**A11y**
- `prefers-reduced-motion` respeitado em TODOS os componentes (runtime) + CSS global.
- Contraste AA (verificado nos tokens, seção 4).
- Navegação por teclado: filtro de portfólio, carrossel (←/→ + dots + botões),
  glossário regional (focus), formulário (campos + foco visível), custom cursor
  **não** substitui o cursor nativo (é um elemento a mais).
- `aria-*` em tudo que é interativo (pressed, tablist, roledescription, live,
  invalid, describedby, expanded/controls, labels) + skip-link no layout.

**SEO/perf**
- `metadata` completo no `layout.tsx`: title/template, description, keywords
  regionais + "comunicação/marketing médico", OpenGraph, Twitter, robots,
  canonical, `themeColor`.
- `next/font` (sem CLS), página estática (SSG), ISR só no Instagram,
  `Route Handler` sem backend externo.

---

## 11. O que ainda é placeholder (checklist de troca quando os assets chegarem)

- [ ] Paleta e fontes do brand kit oficial (trocar apenas `tokens.css` + `layout.tsx`).
- [ ] Copy institucional real (Hero, Pillars, RegionalDna, depoimentos).
- [ ] Cases reais em `content/cases.json` + imagens em `/public/cases/*`.
- [ ] Logos de clientes reais (grid de depoimentos).
- [ ] Número de WhatsApp real (`ContactForm` → `wa.me/55...`).
- [ ] E-mail real (`contato@sotaque.estudio`).
- [ ] Credenciais do Instagram (`INSTAGRAM_ACCESS_TOKEN` + `INSTAGRAM_USER_ID`)
      para tirar o mock.
- [ ] Integração real do formulário (hoje loga no servidor).
- [ ] Renomear `package.json` (`temp-setup` → `sotaque`).

---

## 12. Como rodar a validação (para a AI juíza)

Sugestão de protocolo para validar a landing page:

1. **Sanidade do código:** rode `npm run build` e `npm run lint`. Devem passar.
2. **Responsividade:** `npm run dev` e verifique as seções em mobile, tablet e
   desktop — o Hero muda de grid 7/5 → 12, pilares empilham, carrossel muda
   largura dos cards, logos 2→6 colunas.
3. **Anti-opacidade:** confirme via DevTools que `text-clay/[0.06]`,
   `text-ink/65`, `bg-earth/[0.07]` etc. **existem** no CSS compilado (bloqueio
   histórico) — grep em `.next/static/css/*.css` por `text-clay` e `color-mix`.
4. **Motion com propósito:** o parallax tem 3 velocidades no Hero e ritmo mais
   lento no RegionalDna; o filtro reorganiza em fluido; o drag do carrossel é
   real e faz snap; nada é smoke/mirror genérico.
5. **Reduced motion:** ative `prefers-reduced-motion: reduce` — Lenis, tweens,
   springs e custom cursor desligam; conteúdo permanece legível.
6. **A11y:** teclado navega filtro/carrossel/formulário; foco visível; contraste
   dos tokens principais ≥ 4.5:1.
7. **Placeholders honestos:** todo conteúdo de marca está marcado com
   `[PLACEHOLDER]`; nenhum case/depoimento/logo é apresentado como real.
8. **Checklist anti-"genérico de IA":** sem blob central, sem glassmorphism
   decorativo, sem grid de features simétrico, sem fade-slide uniforme em toda
   a página, tipografia com personalidade (Fraunces).