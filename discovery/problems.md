# problems.md — Backlog de problemas da landing Sotaque

> Auditoria de UI/UX, conteúdo, design, SEO, performance e acessibilidade.
> Fonte: leitura de `docs/`, `roadmap.md`, `src/`, `tailwind.config.ts`, `public/`.

---

## Como usar este arquivo (LEIA ANTES DE CODAR)

1. **Um problema por vez.** Escolha um ID (`P-001`), corrija, valide, marque `[x]`, rode `npm run build`. Só então pegue o próximo.
2. **IDs são estáveis.** Nunca renumere. Novos problemas ganham o próximo ID livre da faixa.
3. **Formato de cada item:** Status → Arquivos → Problema → Como corrigir (passos) → Aceite → Não fazer.
4. **Validação padrão de qualquer fix:**
   - `npm run build` passa sem erro
   - Sem regressão visual no desktop + mobile (375px)
   - `prefers-reduced-motion` continua respeitado
   - Navegação por teclado funciona no que foi tocado

### Regras globais (não negociar)

- `AGENTS.md`: tokens via `src/styles/tokens.css`, nunca hardcodar cor/fonte; não inventar fatos/métricas/cases como reais; usar `[PLACEHOLDER]` / `Concept` / `Demonstração` apenas em código, nunca como copy pública final.
- `discovery/update-001.md` — **COMENTAR, NÃO APAGAR:** efeitos considerados excessivos (custom cursor, Lenis, GSAP pontual, parallax extra, métricas técnicas visíveis, latência artificial do form) devem ser desativados via comentário `// TEMPORARIAMENTE DESATIVADO PARA TESTE` preservando imports/lógica. Vale para `P-008`, `P-105~P-106`, `P-112`, `P-014~P-015`.
- `discovery/update-002.md`: não copiar copy de concorrente; tecnologia é meio, nunca "software house"; equipe com 5 pesos iguais; cases com narrativa `contexto → problema → estratégia/execução → resultado`.
- `update-001 §13`: strings tipo `JSON-driven`, `AnimatePresence`, `Spotlight interativo`, `Lenis`, `ScrollTrigger` **não são copy comercial** — remover da UI visível (comentar), manter em comentário de código se útil.

### Legenda

- **Status:** `[ ]` aberto · `[x]` feito · `[-]` desativado temporariamente (comentado, ver update-001)
- **Severidade:** `P0` bloqueia produção · `P1` degrada muito · `P2` dívida/polimento
- **Esforço:** `F` fácil <1h · `M` médio 2–6h · `D` difícil >1 dia ou depende de terceiros
- **Área:** `UX` · `Conteúdo` · `Design/Tokens` · `SEO` · `A11y` · `Perf` · `Código`

---

## 0. O que está BOM — não regredir

- Direção de arte foge do genérico IA (bento assimétrico, Fraunces + DM Sans, ritmo variado por seção).
- Tokens centralizados (`src/styles/tokens.css` + `tailwind.config.ts`).
- Divisão Server/Client correta (`Portfolio.tsx` → `PortfolioClient.tsx`, `InstagramFeed.tsx` async + ISR 3h sem vazar token em `src/lib/instagram.ts`).
- Form com validação dupla + honeypot (`src/app/api/contact/route.ts` + `ContactForm.tsx`).
- Base a11y: `skip-link` em `layout.tsx`, `:focus-visible` em `globals.css`, `reduced-motion` em Lenis/Three/GSAP/cursor.
- Tom de voz do Hero/DNA alinhado a `docs/brand.md`.

Qualquer fix abaixo **não pode quebrar** esses pontos. Se quebrar, reverta.

---

## 1. FÁCEIS (F) — quick wins

### P-001 `[ ]` Placeholder literal visível ao usuário — P0 · F · Conteúdo
- **Arquivos:** `src/app/layout.tsx:28`, `src/content/cases.json`, `src/content/testimonials.json`, `src/content/instagram-mock.json`
- **Problema:** string `[PLACEHOLDER]` aparece na `description` do metadata e em cards/depoimentos. Vai para o Google e para o usuário.
- **Como corrigir:**
  1. Remover `[PLACEHOLDER]` de `layout.tsx` (re-escrever description sem o prefixo).
  2. Em `cases.json` / `testimonials.json` / `instagram-mock.json`: ou trocar prefixo por copy neutra (`Projeto conceitual — ...`) ou ocultar seção (ver `P-016`).
  3. `grep -r PLACEHOLDER src/` deve retornar só comentários de código, nunca copy renderizada.
- **Aceite:** nenhum `[PLACEHOLDER]` visível na página ou no HTML; `npm run build` ok.
- **Não fazer:** inventar nomes/resultados reais para preencher.

### P-002 `[ ]` Métricas inventadas parecem resultado real — P0 · F · Conteúdo
- **Arquivos:** `src/components/sections/Pillars.tsx:24,35,49,60` (`100% Autoral`, `+240%`, `4K Cinema`, `+180%`)
- **Problema:** viola `AGENTS.md` ("nunca invente fatos") e é sensível em saúde/CFM.
- **Como corrigir:** trocar por labels qualitativos (`Design sem template`, `Foco editorial`, `Padrão documental`, `Captação qualificada`). Manter badge, trocar texto.
- **Aceite:** nenhuma métrica percentual sem fonte; build ok.
- **Não fazer:** criar números novos.

### P-003 `[ ]` Contatos divergentes — P0 · F · Conteúdo/UX
- **Arquivos:** `src/components/sections/ContactForm.tsx:71-73` (`wa.me/5599999999999`), `src/components/layout/SotaqueNavbar.tsx:186-192` (`wa.me/5500000000000`, `contato@sotaqueestudio.com.br` vs `contato@sotaque.com.br`), `src/app/page.tsx:19-29` (footer)
- **Problema:** 2 WhatsApps + 2 e-mails diferentes.
- **Como corrigir:**
  1. Definir 1 WhatsApp + 1 e-mail (perguntar ao dono se ambíguo).
  2. Centralizar em constante (ex: `src/lib/contact.ts`) e importar nos 3 lugares.
- **Aceite:** mesmo número/e-mail nos 3 lugares; links `wa.me` com texto encode correto.
- **Não fazer:** hardcodar em cada arquivo de novo.

### P-004 `[ ]` Footer pobre — P1 · F · Conteúdo/SEO
- **Arquivos:** `src/app/page.tsx:19-29`
- **Problema:** só logo + tagline + copyright. Falta navegação, CNPJ/endereço, links sociais consistentes.
- **Como corrigir:** adicionar nav âncora (`#pilares`, `#work`, `#dna`, `#contact`), linha CNPJ/endereço placeholder neutro (não inventar número real — usar `CNPJ: —` ou omitir), ano dinâmico.
- **Aceite:** footer navegável por teclado; sem e-mail divergente (ver P-003).

### P-005 `[ ]` Metadata com domínio de exemplo + title genérico — P0 · F · SEO
- **Arquivos:** `src/app/layout.tsx:22-68` (`metadataBase: https://sotaque.example.com`, `title: Sotaque`, `url`, `openGraph`)
- **Problema:** link de compartilhamento quebrado; title não rankeia.
- **Como corrigir:**
  1. Trocar `metadataBase` + `openGraph.url` + `alternates.canonical` pelo domínio real (perguntar se ambíguo).
  2. `title.default`: `Sotaque — Marketing médico 360 | Branding para clínicas`.
  3. Re-escrever `description` sem `[PLACEHOLDER]` (ver P-001).
- **Aceite:** `next build` gera `<link rel="canonical">` + OG com domínio real.

### P-006 `[ ]` Sem robots/sitemap/favicon/og-image — P1 · F · SEO
- **Arquivos:** `public/` (só tem `next.svg`, `vercel.svg`), `src/app/` (falta `robots.ts`, `sitemap.ts`, `icon.*`, `opengraph-image.*`)
- **Problema:** sem favicon, sem preview social, sem sitemap.
- **Como corrigir:**
  1. Adicionar `src/app/robots.ts` + `src/app/sitemap.ts` (1 rota `/` + futuras `/cases/[slug]`).
  2. Adicionar `src/app/icon.svg` (ponto goiaba + S) e `src/app/opengraph-image.jpg` (export 1200x630 da paleta atual serve como provisório).
  3. Referenciar em `layout.tsx` via `icons` / OG automático do App Router.
- **Aceite:** `/robots.txt`, `/sitemap.xml`, favicon e OG renderizam; build ok.

### P-007 `[ ]` Badge "mock ativo" exposto ao usuário — P2 · F · Conteúdo
- **Arquivos:** `src/components/sections/InstagramFeed.tsx:27-31,98-104`
- **Problema:** detalhe técnico (`mock ativo`, `content/instagram-mock.json`, `Graph API pronta`) aparece na UI (viola update-001 §13).
- **Como corrigir:** remover badge da UI; manter `isMock` só como comentário de código ou `console.warn` server-side. Manter fallback mock funcionando.
- **Aceite:** usuário vê só `O estúdio no dia a dia` + grid; build ok.
- **Não fazer:** apagar `src/lib/instagram.ts` ou o fallback.

### P-008 `[ ]` Hero com onClick global troca material 3D — P0 · F · UX/A11y
- **Arquivos:** `src/components/sections/Hero.tsx:99-104` (`onClick={handleHeroClick}`, `cursor-pointer`, `select-none` na `<section>`)
- **Problema:** quebra seleção de texto, cliques acidentais; affordance é easter-egg, não ação de negócio.
- **Como corrigir:**
  1. Remover `onClick` + `cursor-pointer` + `select-none` da `<section>`.
  2. Mover `cycleMaterial()` para o badge do material (`Hero.tsx:260-275`) como `<button>` real com `aria-label="Trocar acabamento 3D"`.
  3. Manter dica `Clique para alternar a cor` só no badge.
- **Aceite:** clicar no texto não troca cor; Tab alcança o badge; texto selecionável.
- **Não fazer (update-001):** apagar `Hero3DCanvas.tsx` — só desacoplar a interação.

### P-009 `[ ]` Headline responsiva diminui no desktop — P1 · F · UX
- **Arquivos:** `src/components/sections/Hero.tsx:150` (`text-5xl sm:text-7xl md:text-8xl lg:text-[3.5rem]`)
- **Problema:** `lg` menor que `md`. Quebra hierarquia.
- **Como corrigir:** escala crescente, ex: `text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5.2rem] leading-[0.95]`. Testar 375px e 1440px.
- **Aceite:** sem overflow horizontal; sem diminuição em breakpoint maior.

### P-010 `[ ]` 3 headlines sobrepostas lidas por SR/crawler — P0 · F · A11y/SEO
- **Arquivos:** `src/components/sections/Hero.tsx:139-212` (segmentos `center`/`left`/`right` com `opacity-0` + `pointer-events-none`)
- **Problema:** inativos continuam no accessibility tree; parece 3 H1s.
- **Como corrigir:** adicionar `aria-hidden={segment !== "center"}` (e equivalentes) + `inert` (ou `hidden` quando `opacity-0` após transição). Manter 1 `<h1>` real; demais como `<p>`/`<span>`.
- **Aceite:** leitor anuncia 1 headline; Lighthouse / axe sem violação.

### P-011 `[ ]` Botão "som" fake na navbar — P1 · F · UX
- **Arquivos:** `src/components/layout/SotaqueNavbar.tsx:63-94`
- **Problema:** anima equalizador mas não toca nada = dark pattern.
- **Como corrigir (preferido):** remover bloco inteiro e comentar `// TEMPORARIAMENTE DESATIVADO PARA TESTE — equalizador sonoro` (update-001). Se quiser manter, implementar `<audio>` real com toggle.
- **Aceite:** sem controle que finge função; build ok.

### P-012 `[ ]` Classe Tailwind inválida no portfólio — P2 · F · Código
- **Arquivos:** `src/components/sections/PortfolioClient.tsx:146` (`h-13 w-13`)
- **Problema:** `13` não existe na escala default → classe ignorada.
- **Como corrigir:** trocar por `h-12 w-12`.
- **Aceite:** botão play com tamanho consistente; sem classe inválida.

### P-013 `[ ]` Contrastes de texto corrido abaixo de AA — P1 · F · A11y
- **Arquivos:** `PortfolioClient.tsx:60,173`, `Testimonials.tsx:135`, `ContactForm.tsx:104`, `tokens.css:103-107` (comentário cita cores antigas `#7A2E1F`/`#FFFBF5`)
- **Problema:** `text-cream/40`, `/50`, `/65`, `text-[#102C2B]/50` em corpo pequeno reprovam AA.
- **Como corrigir:** subir corpo para `/70`+ (`/75` ideal); atualizar comentário de contraste em `tokens.css` com pares reais atuais; validar com ferramenta (axe/Lighthouse).
- **Aceite:** corpo ≥ 4.5:1; large ≥ 3:1.

### P-014 `[ ]` Jargão técnico como copy comercial — P2 · F · Conteúdo
- **Arquivos:** `PortfolioClient.tsx:198-199` (`JSON-driven...`, `AnimatePresence...`), `Pillars.tsx:413-416` (`Bento Grid 2D...`, `Spotlight interativo`), `InstagramFeed.tsx:98-104`
- **Problema:** viola update-001 §13 — cliente médico não precisa saber de stack.
- **Como corrigir:** remover da UI visível; se útil, mover para comentário `{/* ... */}` no código. (Comentar, não apagar — update-001.)
- **Aceite:** nenhum nome de lib/técnica visível ao usuário.

### P-015 `[ ]` Latência artificial de 600ms no form — P2 · F · Perf/UX
- **Arquivos:** `src/app/api/contact/route.ts:47-48` (`await new Promise(r => setTimeout(r, 600))`)
- **Problema:** viola update-001 §15 (sem delays artificiais em produção).
- **Como corrigir:** comentar bloco com `// TEMPORARIAMENTE DESATIVADO PARA TESTE — latência demo` preservando código.
- **Aceite:** resposta imediata (só latência real de rede).

### P-016 `[ ]` Depoimentos placeholder apresentados como reais — P0 · F · Conteúdo
- **Arquivos:** `src/components/sections/Testimonials.tsx:99-113` (marquee logos fictícios), `:210-212` (selo `Verificado`), `src/content/testimonials.json`, `src/app/page.tsx:16`
- **Problema:** viola update-001 §11 (não apresentar placeholder como real, não usar ★ como avaliação real).
- **Como corrigir (escolher 1, perguntar se ambíguo):**
  - A) Comentar `<Testimonials />` em `page.tsx` + link no menu (`SotaqueNavbar.tsx:151`), preservando componente; ou
  - B) Manter visível rotulando tudo como `Projeto conceitual — demonstração de layout`, removendo selo `Verificado` e estrelas.
- **Aceite:** nenhum depoimento/avaliação fictícia parece real.
- **Não fazer:** apagar `Testimonials.tsx` ou `testimonials.json`.

---

## 2. MÉDIOS (M) — exigem refatoração

### P-101 `[ ]` Hero sem CTA primário — P0 · M · UX
- **Arquivos:** `src/components/sections/Hero.tsx:240-283` (rodapé só com parágrafo + badge)
- **Problema:** usuário entende a marca mas não tem próximo passo. Só há CTA pequeno na navbar.
- **Como corrigir:**
  1. Adicionar abaixo do parágrafo 2 CTAs `MagneticButton`: `Iniciar projeto → #contact` (primary) + `Ver cases → #work` (ghost).
  2. `stopPropagation` nos CTAs se ainda houver click global (ver P-008).
  3. Garantir toque ≥44px no mobile.
- **Aceite:** 2 CTAs visíveis sem scroll em 1440px e alcançáveis em 375px; teclado ok.

### P-102 `[ ]` Portfólio promete navegação que não existe — P0 · M · UX
- **Arquivos:** `src/components/sections/PortfolioClient.tsx:128-186`, `src/content/cases.json` (campo `midia` nunca usado), `CustomCursor.tsx` (label `ver case`)
- **Problema:** covers são gradiente CSS, ▶ não toca, `Ver detalhes ↗` não navega, cursor diz `ver case`.
- **Como corrigir (escolher 1):**
  - A) Funcional: usar `next/image` com `midia`, criar `app/cases/[slug]/page.tsx` com narrativa `contexto → problema → estratégia/execução → resultado` (update-002 §6), linkar card + cursor.
  - B) Honesto: remover ▶, `Ver detalhes`, cursor `ver case`; card vira `<article>` estático rotulado `Projeto conceitual`.
- **Aceite:** nenhum controle sugere ação que não existe; se rota criada, `generateStaticParams` + `generateMetadata` por case.
- **Não fazer:** manter play/dead-link.

### P-103 `[ ]` Pilares hover-only + altura fixa — P1 · M · UX
- **Arquivos:** `src/components/sections/Pillars.tsx:379-410` (`lg:h-[720px]`, `flexGrow` por hover), `:219` (`onClick` toggle sem affordance)
- **Problema:** no touch não há descoberta; `line-clamp-2` esconde conteúdo; `720px` estoura com texto real.
- **Como corrigir:**
  1. No mobile (`<sm`): virar accordion (`aria-expanded`, altura `auto`, 1 aberto por vez).
  2. Remover `lg:h-[720px]` fixo → `min-h` + `auto`; permitir wrap.
  3. Adicionar affordance (`+` / `expandir`) e foco visível.
- **Aceite:** todo conteúdo legível em 375px sem corte; teclado opera todos os cards.

### P-104 `[ ]` Ritmo zebrado dark/light cansa — P2 · M · Design
- **Arquivos:** `src/app/page.tsx:12-18` (Hero dark → Pilares light → Portfolio dark → DNA light → Depoimentos dark → Insta light → Contato dark)
- **Problema:** 7 alternâncias seguidas causam fadiga.
- **Como corrigir:** agrupar (ex: DNA + Pilares em bloco claro contínuo; Depoimentos + Portfolio em bloco escuro) ou inserir transição suave. Validar com design antes.
- **Aceite:** máximo 4 blocos de fundo; sem quebra de contraste em bordas.

### P-105 `[ ]` Drawer sem dialog/focus-trap — P1 · M · A11y
- **Arquivos:** `src/components/layout/SotaqueNavbar.tsx:107-197`
- **Problema:** sem `role="dialog"`, sem trap, sem retorno de foco; backdrop sem `aria-hidden`.
- **Como corrigir:**
  1. `role="dialog" aria-modal="true" aria-label="Menu"`.
  2. Trap simples (Tab circula nos links + fechar), ESC já existe; ao fechar, focar botão `Menu`.
  3. `body overflow hidden` já existe — manter; opcional integrar com Lenis `stop()/start()`.
- **Aceite:** Tab não escapa do drawer aberto; SR anuncia dialog; build ok.

### P-106 `[ ]` Marquee sem controle de pausa — P2 · M · A11y
- **Arquivos:** `src/components/sections/Testimonials.tsx:99-113`, `src/app/globals.css:164-182` (`.animate-marquee`)
- **Problema:** movimento contínuo 30s sem botão pausa (só hover).
- **Como corrigir:** botão `Pausar/Retomar letreiro` (`aria-pressed`) que alterna `animation-play-state`; respeitar `reduced-motion` (já há global em `tokens.css:110-119`, manter).
- **Aceite:** pausa por botão + teclado; sem autoplay forçado com `reduced-motion`.

### P-107 `[ ]` Tokens sujos + hex hardcoded — P1 · M · Design/Código
- **Arquivos:** `src/styles/tokens.css`, `src/app/globals.css:66-146` (utils `earth/clay/accent` referenciam `--sotaque-*` inexistentes), `tailwind.config.ts:57-76` (aliases `midnight/obsidian/clay/earth/...`), componentes com `bg-[#102C2B]`/`text-[#F3EBDD]`
- **Problema:** troca futura pelo brand kit não é trivial; utils mortos geram CSS inútil; sombras teal `#0D9488` fora da paleta.
- **Como corrigir:**
  1. Remover vars/aliases/sombras fora da paleta oficial (petróleo/areia/goiaba/solar/folha/terracota).
  2. Trocar hex espalhado por tokens (`bg-petroleo text-areia`, etc.).
  3. `grep -r "#102C2B\|#F3EBDD\|#D63A2F\|#E7A92B" src/components` deve tender a zero (exceto `tokens.css`).
- **Aceite:** `npm run build` ok; visual idêntico; `grep` de utils mortos retorna zero.

### P-108 `[ ]` Código morto de animação — P2 · M · Código
- **Arquivos:** `src/components/motion/SplitText.tsx`, `src/components/motion/ParallaxLayer.tsx` (não importados), `Hero.tsx:12-59` (`CharacterFlip` duplicado), `package.json` (`@types/three` em deps)
- **Problema:** duplicação + bundle desnecessário.
- **Como corrigir:** se `CharacterFlip` é o padrão, mover para `motion/` e remover `SplitText.tsx` **ou** comentar import não usado (update-001: preferir comentar se houver dúvida de reuso). Mover `@types/three` para `devDependencies`.
- **Aceite:** sem import não usado (`next lint` limpo); build ok.

### P-109 `[ ]` Form sem e-mail/telefone + LGPD — P0 · M · UX/Conteúdo
- **Arquivos:** `src/components/sections/ContactForm.tsx`, `src/app/api/contact/route.ts:12-28`
- **Problema:** sem canal de retorno; `Sigilo médico garantido` solto não é consentimento.
- **Como corrigir:**
  1. Adicionar campo opcional `email ou telefone` + checkbox `Concordo em ser contatado` (obrigatório).
  2. Validar nos dois lados (client + `validate()` no route).
  3. Copy curta PT-BR; erro com `role="alert"`.
- **Aceite:** submit sem consentimento bloqueia com mensagem; payload inclui novo campo; honeypot mantido.

### P-110 `[ ]` Instagram sem imagem real — P1 · M · UX/Perf
- **Arquivos:** `src/components/sections/InstagramFeed.tsx:55-88` (gradientes no lugar de `media_url`), `next.config.mjs` (vazio)
- **Problema:** parece vazio; desperdiça `media_url` já disponível.
- **Como corrigir:**
  1. Usar `next/image` com `src={post.media_url}`, `alt={caption.slice(0,100)}`, `sizes="(max-width:768px) 50vw, 33vw"`.
  2. Configurar `images.remotePatterns` para `*.cdninstagram.com` + fallback para gradiente em erro.
  3. Manter `revalidate = 10800` e fallback mock.
- **Aceite:** imagens reais (ou mock real) com `alt`; sem CLS; falha da API não quebra a página.

### P-111 `[ ]` SEO estruturado ausente — P1 · M · SEO
- **Arquivos:** `src/app/layout.tsx`, `src/app/page.tsx` (sem JSON-LD)
- **Problema:** sem `MedicalBusiness/LocalBusiness`, sem canonical real, hierarquia H1/H2 frágil (ver P-010).
- **Como corrigir:**
  1. Adicionar `<script type="application/ld+json">` com nome, área, especialidades, `sameAs` (Instagram/LinkedIn).
  2. Garantir 1 H1 por página + H2 por seção (`#pilares`, `#work`, `#dna`, `#depoimentos`, `#instagram`, `#contact` já existem — manter).
  3. Revisar `alternates.canonical`.
- **Aceite:** validador Schema.org passa; 1 H1 no HTML.

### P-112 `[ ]` Three.js sem lazy + pesado — P1 · M · Perf
- **Arquivos:** `src/components/sections/Hero.tsx:111-116` (import direto), `src/components/motion/Hero3DCanvas.tsx:97,90` (`TorusKnotGeometry(1.85,0.52,220,36)`, `pixelRatio min(dpr,2)`, 3 point lights)
- **Problema:** ~600KB+ no critical path; mobile sofre no LCP/bateria; sem poster.
- **Como corrigir:**
  1. `next/dynamic(() => import("@/components/motion/Hero3DCanvas"), { ssr: false, loading: () => <div poster estático /> })`.
  2. Reduzir segmentos (`220,36` → `128,24`), `pixelRatio` → `min(dpr,1.5)`, pausar fora da viewport (já há `IntersectionObserver` — manter).
  3. Desativar em `reduced-motion` (só poster) e opcionalmente em `max-width:768px` se LCP ruim. (Comentar, não apagar — update-001.)
- **Aceite:** LCP mobile melhora; sem tela preta sem WebGL; animação congela com `reduced-motion`.

---

## 3. DIFÍCEIS (D) — roadmap / dependem de terceiros

### P-201 `[ ]` Prova social real — P0 · D · Conteúdo
- **Arquivos:** `testimonials.json`, `Testimonials.tsx`, `cases.json`
- **Problema:** tudo fictício; em saúde, isso destrói confiança.
- **Como corrigir:** coletar 2–3 depoimentos + autorização de uso; substituir 1 por 1; remover selo `Verificado` até ter critério. Enquanto sem real, manter `P-016` (oculto/conceitual).
- **Aceite:** cada depoimento com nome/cargo/foto autorizados; sem estrela fake.
- **Bloqueio:** externo (clientes).

### P-202 `[ ]` Fotos/vídeos reais (covers, bastidores) — P0 · D · Design/Perf
- **Arquivos:** `cases.json:midia`, `InstagramFeed.tsx`, `Hero.tsx` (poster)
- **Problema:** 100% gradiente CSS.
- **Como corrigir:** produção audiovisual → `/public/cases/.../cover.jpg` (1600w) + `next/image` com `priority` no 1º case; `alt` descritivo.
- **Bloqueio:** time design/audiovisual.

### P-203 `[ ]` 3D a 60fps no mobile — P1 · D · Perf
- **Arquivos:** `Hero3DCanvas.tsx:140-158` (luzes), `:197-229` (loop)
- **Problema:** `MeshPhysicalMaterial` + clearcoat + 3 lights é caro.
- **Como corrigir:** perfilar (Chrome DevTools → GPU), considerar `MeshStandardMaterial` no mobile, reduzir lights, `powerPreference: low-power` em mobile. Se inviável, poster estático no mobile.
- **Bloqueio:** teste em device real.

### P-204 `[ ]` Audit AA completo da paleta oficial — P1 · D · A11y/Design
- **Arquivos:** `tokens.css:8-38` (folha `#58734A` sobre petróleo `#102C2B` ~3:1)
- **Problema:** P-013 resolve texto corrido; mas a combinação folha/petróleo como identidade pode reprovar em larga escala.
- **Como corrigir:** audit com Stark/axe em todos os pares; se reprovar, propor ajuste ao design (clarear folha ou reservá-la para grandes áreas/ícones, nunca corpo).
- **Bloqueio:** decisão de design.

### P-205 `[ ]` SEO local que rankeia — P1 · D · SEO/Conteúdo
- **Problema:** metadata sozinha não rankeia `marketing para clínicas em [cidade]`.
- **Como corrigir:** páginas `/servicos/*`, cases indexáveis (P-102A), blog editorial, NAP consistente, Google Business. Ver update-002 §8 (seção saúde curta, sem dominar).
- **Bloqueio:** estratégia + produção contínua.

### P-206 `[ ]` Instagram Graph API em prod — P2 · D · Código
- **Arquivos:** `src/lib/instagram.ts:15-36` (código pronto, falta credencial)
- **Problema:** sem `INSTAGRAM_ACCESS_TOKEN`/`INSTAGRAM_USER_ID` cai sempre em mock.
- **Como corrigir:** token longa duração + refresh + monitoramento; manter fallback mock; nunca expor no client.
- **Bloqueio:** credenciais Meta + aprovação.

### P-207 `[ ]` Jornada de conversão (processo/FAQ) — P1 · D · Conteúdo/UX
- **Problema:** sem `Como trabalhamos`, sem FAQ CFM/LGPD, sem CTAs intermediários.
- **Como corrigir:** aplicar update-002 §2 (seção Problema), §4 (processo 6 etapas), §11 (CTAs após serviços/cases). Copy 100% original na voz Sotaque, nunca adaptada de concorrente.
- **Bloqueio:** decisão de negócio + copy.

---

## 4. Ordem sugerida de execução

1. **Hoje (vira demo honesta):** `P-001`, `P-002`, `P-016`, `P-005`, `P-008`, `P-010`, `P-003`, `P-015`, `P-014`, `P-007`
2. **Próximo sprint (vira publicável):** `P-101`, `P-102`, `P-111`, `P-006`, `P-109`, `P-112`, `P-110`, `P-105`, `P-103`, `P-107`, `P-009`, `P-012`, `P-013`, `P-004`, `P-106`, `P-108`
3. **Roadmap com design/negócio:** `P-201`, `P-202`, `P-203`, `P-204`, `P-205`, `P-206`, `P-207`

Ao concluir qualquer item: marcar `[x]`, rodar `npm run build`, citar o ID no commit (ex: `fix(P-008): remove clique global do hero`).
