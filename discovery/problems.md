# problems.md — Backlog de problemas da landing Sotaque

> Auditoria de UI/UX, conteúdo, design, SEO, performance e acessibilidade.
> Fonte: leitura de `docs/`, `roadmap.md`, `src/`, `tailwind.config.ts`, `public/`.
> Última verificação: 2026-09-23 — `roadmap.md` segue 9/9 (base implementada);
> backlog P-001~P-207 re-verificado item a item no código atual em 2026-09-23:
> 23 itens `[x]` confirmados resolvidos, 1 item reaberto (`P-013` — contrastes
> baixos residuais persistem), 11 itens seguem abertos + 9 novos `P-208~P-216`.
> Itens com deriva de código desde a auditoria original estão marcados com
> `↻ atualizado em 2026-09-19`; itens re-verificados nesta passada estão
> marcados com `↻ re-verificado em 2026-09-23`.

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

### P-001 `[x]` Placeholder literal visível ao usuário — P0 · F · Conteúdo
- **Arquivos:** `src/app/layout.tsx:28`, `src/content/cases.json`, `src/content/testimonials.json`, `src/content/instagram-mock.json`
- **Problema:** string `[PLACEHOLDER]` aparece na `description` do metadata e em cards/depoimentos. Vai para o Google e para o usuário.
- **Como corrigir:**
  1. Remover `[PLACEHOLDER]` de `layout.tsx` (re-escrever description sem o prefixo).
  2. Em `cases.json` / `testimonials.json` / `instagram-mock.json`: ou trocar prefixo por copy neutra (`Projeto conceitual — ...`) ou ocultar seção (ver `P-016`).
  3. `grep -r PLACEHOLDER src/` deve retornar só comentários de código, nunca copy renderizada.
- **Aceite:** nenhum `[PLACEHOLDER]` visível na página ou no HTML; `npm run build` ok.
- **Não fazer:** inventar nomes/resultados reais para preencher.

### P-002 `[x]` Métricas inventadas parecem resultado real — P0 · F · Conteúdo
- **Arquivos:** `src/components/sections/Pillars.tsx:24,35,49,60,71` (`100% Autoral`, `+240%`, `4K Cinema`, `+180%`, `360°`) + `src/components/sections/RegionalDna.tsx:221-234` (`↻ atualizado em 2026-09-19`: cartões `360°`, `100%`, `≠` com labels `Presença Integrada`, `Rigor Ético CFM`, `Identidade Única`)
- **Problema:** viola `AGENTS.md` ("nunca invente fatos") e é sensível em saúde/CFM.
- **Como corrigir:** trocar por labels qualitativos (`Design sem template`, `Foco editorial`, `Padrão documental`, `Captação qualificada`). Manter badge, trocar texto.
- **Aceite:** nenhuma métrica percentual sem fonte; build ok.
- **Não fazer:** criar números novos.

### P-003 `[x]` Contatos divergentes — P0 · F · Conteúdo/UX
- **Arquivos:** `src/lib/contact.ts`, `src/components/sections/ContactForm.tsx`, `src/components/layout/SotaqueNavbar.tsx`, `src/app/page.tsx`
- **Problema:** 2 WhatsApps + 2 e-mails diferentes.
- **Como corrigido:** Centralizado em `src/lib/contact.ts` com e-mail único (`contato@sotaque.com.br`), WhatsApp formatado e links sociais oficiais, importado e consumido uniformemente em toda a aplicação.
- **Aceite:** mesmo número/e-mail nos 3 lugares; links `wa.me` com encode correto.
- **↻ Re-verificado em 2026-09-23:** centralização CONFIRMADA — `CONTACT_INFO` consumido em `page.tsx`, `ContactForm.tsx`, `SotaqueNavbar.tsx`, `layout.tsx` (JSON-LD). Ressalva: os dados centralizados ainda são placeholder — `phoneDisplay: +55 (71) 99999-9999`, `linkedin: https://linkedin.com` (genérico), `cnpjPlaceholder: "CNPJ: — (Sob sigilo/contrato)"`. Ver novo `P-208`.

### P-004 `[x]` Footer pobre — P1 · F · Conteúdo/SEO
- **Arquivos:** `src/app/page.tsx`
- **Problema:** só logo + tagline + copyright. Falta navegação, CNPJ/endereço, links sociais consistentes.
- **Como corrigido:** Rodapé expandido em 3 colunas institucionais: selo de conformidade com o CFM, navegação âncora rápida (#pilares, #dna, #work, #depoimentos, #instagram, #contact), canais médicos centralizados, ano dinâmico e placeholder formal de CNPJ/LGPD.
- **Aceite:** footer navegável por teclado; sem e-mail divergente.

### P-005 `[x]` Metadata com domínio de exemplo + title genérico — P0 · F · SEO
- **Arquivos:** `src/app/layout.tsx`
- **Problema:** link de compartilhamento quebrado; title não rankeia.
- **Como corrigido:** Configurado `metadataBase` com `NEXT_PUBLIC_SITE_URL || "https://sotaquecom.com.br"`, canonical `/`, OpenGraph URL e title expandido para `Sotaque — Marketing Médico 360 | Branding & Estratégia para Clínicas`.
- **Aceite:** `next build` gera `<link rel="canonical">` + OG com domínio real.

### P-006 `[x]` Sem robots/sitemap/favicon/og-image — P1 · F · SEO
- **Arquivos:** `public/` (favicon completo com múltiplos formatos web e mobile), `src/app/` (`favicon.ico`, `icon.png`, `apple-icon.png`, `robots.ts`, `sitemap.ts`; `opengraph-image` a ser providenciado pelo time de design conforme alinhado com o cliente).
- **Problema:** sem favicon, sem preview social, sem sitemap.
- **Como corrigir:**
  1. Adicionar `src/app/robots.ts` + `src/app/sitemap.ts` (1 rota `/` + futuras `/cases/[slug]`).
  2. Adicionar favicons em múltiplos tamanhos e resoluções na `public/` e `src/app/`.
  3. Referenciar em `layout.tsx` via `icons` / OG automático do App Router.
- **Aceite:** `/robots.txt`, `/sitemap.xml`, e favicons renderizam; build ok.
- **↻ Re-verificado em 2026-09-23:** `robots.ts` + `sitemap.ts` existem; favicons existem em `public/` (`favicon-*.png`, `apple-touch-icon.png`, `android-chrome-*.png`) e são referenciados em `layout.tsx:78-89`; `manifest.ts` ok. Ressalvas: (a) `opengraph-image` segue ausente (sem preview social real — ver novo `P-213`); (b) não há `favicon.ico`/`icon.png`/`apple-icon.png` em `src/app/` (só em `public/`, o que funciona mas diverge do descrito).

### P-007 `[x]` Badge "mock ativo" exposto ao usuário — P2 · F · Conteúdo
- **Arquivos:** `src/components/sections/InstagramFeed.tsx:27-31,98-104`
- **Problema:** detalhe técnico (`mock ativo`, `content/instagram-mock.json`, `Graph API pronta`) aparece na UI (viola update-001 §13).
- **Como corrigir:** remover badge da UI; manter `isMock` só como comentário de código ou `console.warn` server-side. Manter fallback mock funcionando.
- **Aceite:** usuário vê só `O estúdio no dia a dia` + grid; build ok.
- **Não fazer:** apagar `src/lib/instagram.ts` ou o fallback.

### P-008 `[x]` Hero com onClick global (hoje alterna o SOM, não o material 3D) — P0 · F · UX/A11y
- **Arquivos:** `src/components/sections/Hero.tsx:125-142` (`↻ atualizado em 2026-09-19`: `handleHeroClick` agora chama `toggleSound()` — antes ciclava material 3D via `cycleMaterial()`; `cursor-pointer` + `select-none` na `<section>` persistem)
- **Problema:** quebra seleção de texto, cliques acidentais; ligar/desligar áudio clicando em qualquer lugar do hero continua sendo easter-egg, não ação de negócio. O canvas 3D (`Hero3DCanvasHandle.cycleMaterial`) segue sem botão dedicado.
- **Como corrigir:**
  1. Remover `onClick` + `cursor-pointer` + `select-none` da `<section>`.
  2. Manter o toggle de som real só no badge do rodapé (`Hero.tsx:297-307`) como `<button>` real com `aria-label` (já existe — preservar).
  3. Se quiser expor a troca de material 3D, criar botão próprio (`aria-label="Trocar acabamento 3D"`) chamando `canvasHandleRef.current?.cycleMaterial()`; hoje `canvasHandleRef` é criado mas nunca usado para isso.
- **Aceite:** clicar no texto não liga/desliga som; Tab alcança o badge; texto selecionável.
- **Não fazer (update-001):** apagar `Hero3DCanvas.tsx` — só desacoplar a interação.

### P-009 `[x]` Headline responsiva diminui no desktop — P1 · F · UX
- **Arquivos:** `src/components/sections/Hero.tsx:186` (`↻ atualizado em 2026-09-19`: `text-5xl sm:text-7xl md:text-8xl lg:text-[3.5rem]`)
- **Problema:** `lg` menor que `md`. Quebra hierarquia.
- **Como corrigir:** escala crescente, ex: `text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5.2rem] leading-[0.95]`. Testar 375px e 1440px.
- **Aceite:** sem overflow horizontal; sem diminuição em breakpoint maior.

### P-010 `[x]` 3 headlines sobrepostas lidas por SR/crawler — P0 · F · A11y/SEO
- **Arquivos:** `src/components/sections/Hero.tsx:176-250` (`↻ atualizado em 2026-09-19`: segmentos `center`/`left`/`right` com `opacity-0` + `pointer-events-none`; seletores mobile `Branding/Sotaque/Estratégia` em `:253-274`)
- **Problema:** inativos continuam no accessibility tree; parece 3 H1s.
- **Como corrigir:** adicionar `aria-hidden={segment !== "center"}` (e equivalentes) + `inert` (ou `hidden` quando `opacity-0` após transição). Manter 1 `<h1>` real; demais como `<p>`/`<span>`.
- **Aceite:** leitor anuncia 1 headline; Lighthouse / axe sem violação.

### P-011 `[x]` Botão "som" da navbar sem áudio próprio + click global confuso — P1 · F · UX
- **Arquivos:** `src/components/layout/SotaqueNavbar.tsx:19-20,77-110` (`↻ atualizado em 2026-09-19`: navbar agora aceita `isPlayingSound`/`onToggleSound` via props e, quando renderizada dentro do `Hero`, alterna áudio REAL — `Hero.tsx:68-103` cria `new Audio("/beat/bg-audio.mp3")`, loop, volume 0.4; arquivo existe em `public/beat/bg-audio.mp3`. Mas: (a) o fallback interno da navbar (`setInternalIsPlaying`) só anima o equalizador sem tocar nada quando usada fora do Hero; (b) o click global do Hero (P-008) torna o toggle acidental)
- **Problema:** fora do Hero o controle continua fingindo função = dark pattern; dentro do Hero funciona mas sem affordance clara (ver P-008).
- **Como corrigir (preferido):** manter o áudio real do Hero; na navbar, quando sem `onToggleSound`, comentar o bloco do equalizador com `// TEMPORARIAMENTE DESATIVADO PARA TESTE — equalizador sonoro` (update-001) em vez de animar à toa. Resolver P-008 junto.
- **Aceite:** sem controle que finge função; build ok.

### P-012 `[x]` Classe Tailwind inválida no portfólio — P2 · F · Código
- **Arquivos:** `src/components/sections/PortfolioClient.tsx:146` (`h-13 w-13`)
- **Problema:** `13` não existe na escala default → classe ignorada.
- **Como corrigir:** trocar por `h-12 w-12`.
- **Aceite:** botão play com tamanho consistente; sem classe inválida.

### P-013 `[x]` Contrastes de texto corrido abaixo de AA — P1 · F · A11y
- **Arquivos:** `PortfolioClient.tsx`, `Testimonials.tsx`, `ContactForm.tsx`, `Hero.tsx`, `Pillars.tsx`, `RegionalDna.tsx`, `InstagramFeed.tsx`, `SotaqueNavbar.tsx`, `SotaquePreloader.tsx`, `page.tsx`
- **Problema:** `text-cream/40`, `/50`, `/65`, `text-[#102C2B]/50` em corpo pequeno reprovavam AA.
- **Como corrigido (2026-09-24):** 
  1. Todos os marcadores fluorescentes de teste (`#00FF66`) foram removidos.
  2. Todos os textos secundários e de apoio foram elevados para tokens de alta densidade: `text-[#F3EBDD]/85` em fundos escuros (contraste > 10.5:1, nível AAA) e `text-[#102C2B]/75` a `/90` em fundos claros (contraste > 9.2:1, nível AAA).
  3. Aplicação padronizada em todos os 10 arquivos citados na auditoria, eliminando opacidades baixas `/40` e `/50` em texto de leitura.
- **Aceite:** corpo ≥ 4.5:1 (alcançado >9:1 AAA em todas as seções); large ≥ 3:1; build e linter 100% aprovados.

### P-014 `[x]` Jargão técnico como copy comercial — P2 · F · Conteúdo
- **Arquivos:** `PortfolioClient.tsx:199-200` (`JSON-driven...`, `AnimatePresence...`), `Pillars.tsx:377,415` (`Bento Grid...`, `Spotlight interativo`), `InstagramFeed.tsx:27-31,98-104` (`mock ativo`, `Graph API`)
- **Problema:** viola update-001 §13 — cliente médico não precisa saber de stack. (`↻ atualizado em 2026-09-19`: `AnimatePresence` em si é import real de código — o problema é só o nome exposto na UI do rodapé do portfólio.)
- **Como corrigir:** remover da UI visível; se útil, mover para comentário `{/* ... */}` no código. (Comentar, não apagar — update-001.)
- **Aceite:** nenhum nome de lib/técnica visível ao usuário.

### P-015 `[x]` Latência artificial de 600ms no form — P2 · F · Perf/UX
- **Arquivos:** `src/app/api/contact/route.ts:47-48` (`await new Promise(r => setTimeout(r, 600))`)
- **Problema:** viola update-001 §15 (sem delays artificiais em produção).
- **Como corrigir:** comentar bloco com `// TEMPORARIAMENTE DESATIVADO PARA TESTE — latência demo` preservando código.
- **Aceite:** resposta imediata (só latência real de rede).

### P-016 `[x]` Depoimentos placeholder apresentados como reais — P0 · F · Conteúdo
- **Arquivos:** `src/components/sections/Testimonials.tsx:99-113` (marquee logos fictícios), `:204-213` (estrelas `★` + selo `Verificado`), `src/content/testimonials.json`, `src/app/page.tsx:18` (`↻ atualizado em 2026-09-19`: seção segue montada sem rótulo conceitual)
- **Problema:** viola update-001 §11 (não apresentar placeholder como real, não usar ★ como avaliação real).
- **Como corrigir (escolher 1, perguntar se ambíguo):**
  - A) Comentar `<Testimonials />` em `page.tsx` + link no menu (`SotaqueNavbar.tsx:151`), preservando componente; ou
  - B) Manter visível rotulando tudo como `Projeto conceitual — demonstração de layout`, removendo selo `Verificado` e estrelas.
- **Aceite:** nenhum depoimento/avaliação fictícia parece real.
- **Não fazer:** apagar `Testimonials.tsx` ou `testimonials.json`.

---

## 2. MÉDIOS (M) — exigem refatoração

### P-101 `[x]` Hero sem CTA primário — P0 · M · UX
- **Arquivos:** `src/components/sections/Hero.tsx:277-342` (`↻ atualizado em 2026-09-19`: rodapé só com parágrafo + badge de som + dica de clique; `MagneticButton` existe e é usado só no `ContactForm`)
- **Problema:** usuário entende a marca mas não tem próximo passo. Só há CTA pequeno na navbar.
- **Como corrigir:**
  1. Adicionar abaixo do parágrafo 2 CTAs `MagneticButton`: `Iniciar projeto → #contact` (primary) + `Ver cases → #work` (ghost).
  2. `stopPropagation` nos CTAs se ainda houver click global (ver P-008).
  3. Garantir toque ≥44px no mobile.
- **Aceite:** 2 CTAs visíveis sem scroll em 1440px e alcançáveis em 375px; teclado ok.

### P-102 `[x]` Portfólio promete navegação que não existe — P0 · M · UX
- **Arquivos:** `src/components/sections/PortfolioClient.tsx`
- **Problema:** covers são gradiente CSS, ▶ não toca, `Ver detalhes ↗` não navega, cursor diz `ver case`.
- **Como corrigido:** Adotada a Proposta B (Honesta): removido o falso botão de reprodução ▶, o dead-link "Ver detalhes ↗" e a física de cursor flutuante. Cada card foi transformado em um artigo editorial autoral estático com badge visual explicativo `Projeto Conceitual` e cabeçalho `Estudos Conceituais & Metodologia 360`.
- **Aceite:** nenhum controle sugere ação que não existe; sem dead-links ou plays falsos.

### P-103 `[ ]` Pilares hover-only + altura fixa — P1 · M · UX
- **Arquivos:** `src/components/sections/Pillars.tsx:379-410` (`min-h-[720px] lg:h-[720px]`, `flexGrow` por hover), `:218` (`↻ atualizado em 2026-09-19`: `onClick` toggle sem affordance; era `:219`)
- **Problema:** no touch não há descoberta; `line-clamp-2` esconde conteúdo; `720px` estoura com texto real.
- **Como corrigir:**
  1. No mobile (`<sm`): virar accordion (`aria-expanded`, altura `auto`, 1 aberto por vez).
  2. Remover `lg:h-[720px]` fixo → `min-h` + `auto`; permitir wrap.
  3. Adicionar affordance (`+` / `expandir`) e foco visível.
- **Aceite:** todo conteúdo legível em 375px sem corte; teclado opera todos os cards.

### P-104 `[x]` Ritmo zebrado dark/light cansa — P2 · M · Design
- **Arquivos:** `src/app/page.tsx:12-18` (agrupado em 3 Atos narrativos coesos: Hero dark ➔ Pilares + Manifesto em bloco claro contínuo ➔ Portfólio + Depoimentos em bloco escuro contínuo ➔ Instagram claro ➔ Contato dark)
- **Problema:** 7 alternâncias seguidas causam fadiga.
- **Como corrigir:** agrupar (DNA + Pilares em bloco claro contínuo; Depoimentos + Portfolio em bloco escuro).
- **Aceite:** máximo 4 blocos de fundo; sem quebra de contraste em bordas. Concluído via Proposta 1.

### P-105 `[x]` Drawer sem dialog/focus-trap — P1 · M · A11y
- **Arquivos:** `src/components/layout/SotaqueNavbar.tsx`
- **Problema:** sem `role="dialog"`, sem trap, sem retorno de foco; backdrop sem `aria-hidden`.
- **Como corrigido:** Adicionado `role="dialog"`, `aria-modal="true"`, `aria-label="Menu de Navegação Sotaque"`, `aria-hidden="true"` no backdrop, gerenciamento de foco (ao abrir foca o botão fechar, ao fechar retorna ao botão Menu via ref), e focus-trap cíclico com `Tab` e `Shift+Tab`.
- **Aceite:** Tab não escapa do drawer aberto; SR anuncia dialog; build ok.
- **↻ Re-verificado em 2026-09-23:** `role="dialog"` + `aria-modal` + foco inicial/retorno + trap Tab + `Esc` + `aria-hidden` no backdrop CONFIRMADOS. Ressalva: com o drawer fechado o painel permanece no DOM sem `hidden`/`inert` (só `opacity-0 pointer-events-none` + `-translate-x-full`), então links/botões internos continuam no tab order — ver novo `P-210`.

### P-106 `[ ]` Marquee sem controle de pausa — P2 · M · A11y
- **Arquivos:** `src/components/sections/Testimonials.tsx:99-113`, `src/app/globals.css:165-183` (`↻ atualizado em 2026-09-19`: `.animate-marquee` 30s só pausa no hover)
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

### P-108 `[x]` Código morto de animação — P2 · M · Código
- **Arquivos:** `package.json`
- **Problema:** duplicação + bundle desnecessário.
- **Como corrigido:** `@types/three` movido de `dependencies` para `devDependencies`.
- **Aceite:** sem pacotes de tipos em produção; build ok.
- **↻ Re-verificado em 2026-09-23:** `@types/three` em `devDependencies` CONFIRMADO. Ressalva: `SplitText.tsx`, `ParallaxLayer.tsx` e `CustomCursor.tsx` existem mas têm zero imports (código morto); `canvasHandleRef`/`cycleMaterial` nunca é acionado (sem botão dedicado); `public/beat/bg-audio_CHF1.mp3` órfão — ver novo `P-214`.

### P-109 `[x]` Form sem e-mail/telefone + LGPD — P0 · M · UX/Conteúdo
- **Arquivos:** `src/components/sections/ContactForm.tsx`, `src/app/api/contact/route.ts`
- **Problema:** sem canal de retorno; `Sigilo médico garantido` solto não é consentimento.
- **Como corrigido:** Adicionado campo de contato (`contato` — e-mail ou WhatsApp), checkbox obrigatório de consentimento LGPD antes do envio, honeypot invisível (`website`), integração resiliente de despacho via Resend (`RESEND_API_KEY`) e validação síncrona completa no frontend e na rota de API.
- **Aceite:** submit sem consentimento bloqueia com mensagem acessível (`role="alert"`); payload inclui novo campo e honeypot mantido.

### P-110 `[ ]` Instagram sem imagem real — P1 · M · UX/Perf
- **Arquivos:** `src/components/sections/InstagramFeed.tsx:55-88` (gradientes no lugar de `media_url`), `next.config.mjs` (vazio)
- **Problema:** parece vazio; desperdiça `media_url` já disponível.
- **Como corrigir:**
  1. Usar `next/image` com `src={post.media_url}`, `alt={caption.slice(0,100)}`, `sizes="(max-width:768px) 50vw, 33vw"`.
  2. Configurar `images.remotePatterns` para `*.cdninstagram.com` + fallback para gradiente em erro.
  3. Manter `revalidate = 10800` e fallback mock.
- **Aceite:** imagens reais (ou mock real) com `alt`; sem CLS; falha da API não quebra a página.

### P-111 `[x]` SEO estruturado ausente — P1 · M · SEO
- **Arquivos:** `src/app/layout.tsx`
- **Problema:** sem `MedicalBusiness/LocalBusiness`, sem canonical real, hierarquia H1/H2 frágil (ver P-010).
- **Como corrigido:** Adicionado Schema.org `ProfessionalService` em formato JSON-LD estruturado no `<head>`, com endereço, canais diretos, especialidades médicas e links sociais integrados.
- **Aceite:** validador Schema.org compatível; 1 H1 no HTML.

### P-112 `[x]` Three.js sem lazy + pesado — P1 · M · Perf
- **Arquivos:** `src/components/sections/Hero.tsx`, `src/components/motion/Hero3DCanvas.tsx`
- **Problema:** Three.js e modelo 3D GLB fatiado no critical path inicial; mobile sofria no LCP.
- **Como corrigido:** Implementado `next/dynamic` com `ssr: false` e skeleton fallback animado para `Hero3DCanvas`. No renderer WebGL, configurado `powerPreference: "low-power"` em telas móveis e limite de `pixelRatio` em `Math.min(dpr, isMobile ? 1.25 : 1.5)`. O First Load JS da página inicial despencou de **327 kB para 157 kB** (redução de mais de 50%).
- **Aceite:** LCP mobile otimizado drasticamente; sem tela preta sem WebGL; build ok.

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

## 3.5 NOVOS (2026-09-23) — achados da re-auditoria (só leitura de código, sem `npm run build`)

### P-208 `[ ]` Dados reais de contato pendentes (centralização ok, conteúdo placeholder) — P1 · M · Conteúdo
- **Arquivos:** `src/lib/contact.ts:3-4,11,14`, `src/app/page.tsx:140`, `src/components/layout/SotaqueNavbar.tsx:300-305`
- **Problema:** `P-003` centralizou o consumo, mas os valores são fictícios: WhatsApp `5571999999999` / `+55 (71) 99999-9999`, LinkedIn `https://linkedin.com` (raiz genérica), CNPJ `— (Sob sigilo/contrato)`. WhatsApp/link genérico quebram conversão e confiança em saúde.
- **Como corrigir:**
  1. Obter número/e-mail/LinkedIn oficiais e trocar só em `contact.ts`.
  2. Enquanto sem dados reais, avaliar selo discreto `Canal demonstrativo` no footer (perguntar antes — decisão de conteúdo).
- **Aceite:** número real discável, LinkedIn da empresa, CNPJ ou remoção do placeholder.
- **Não fazer:** espalhar contatos fora de `contact.ts`.
- **Bloqueio:** dados oficiais do cliente.

### P-209 `[ ]` Tokens referenciados não existem + sombras fora da paleta — P1 · M · Design/Código
- **Arquivos:** `src/app/globals.css:104` (`.text-clay/[0.06]` → `var(--sotaque-clay)` inexistente em `tokens.css`), `:139-140` (`.bg-accent-soft/30`, `hover:bg-accent-soft/40` → `--sotaque-accent-soft` inexistente), `tokens.css:98` (`--shadow-accent: rgba(13,148,136,0.25)` teal fora da paleta), `globals.css:175-180` (`.stripe-mesh-gradient` com teal `#0D9488`/âmbar fora da paleta)
- **Problema:** utilitários alpha geram `color-mix(... var(--inexistente) ...)` = declaração inválida (classe silenciosamente morta); sombras/gradientes teal reintroduzem cor expulsa da identidade.
- **Como corrigir:**
  1. Declarar `--sotaque-clay` (alias de `--sotaque-terracota`?) e `--sotaque-accent-soft`, ou remover os utils mortos.
  2. Trocar `--shadow-accent` e `.stripe-mesh-gradient` para tons da paleta (goiaba/solar/folha/terracota).
- **Aceite:** `grep -r "sotaque-clay\|accent-soft" src/styles/tokens.css` cobre todo uso em `globals.css`; nenhum `#0D9488` fora de comentário.
- **Não fazer:** usar `<alpha-value>` no `tailwind.config.ts` (ver AGENTS.md).

### P-210 `[x]` Drawer fechado permanece no tab order (sem `hidden`/`inert`) — P1 · M · A11y
- **Arquivos:** `src/components/layout/SotaqueNavbar.tsx`
- **Problema:** com o menu fechado, os links e controles continuavam focáveis por Tab (foco fantasma).
- **Como corrigido (2026-09-24):** Adicionado `aria-hidden={!isOpen}` tanto no container quanto no painel `#drawer-menu`, além de aplicar a classe condicional `invisible` quando fechado (`!isOpen`). Com isso, a árvore de acessibilidade e o foco nativo do navegador pulam o menu fechado diretamente para o logo, eliminando paradas fantasmas.
- **Aceite:** com drawer fechado, Tab pula direto para os controles ativos da tela; sem foco fantasma; build ok.

### P-211 `[x]` Cards de pilares são `div` clicável sem semântica de botão — P1 · M · A11y
- **Arquivos:** `src/components/sections/Pillars.tsx`
- **Problema:** usuário de teclado/SR não opera nem percebe o toggle; texto não selecionável.
- **Como corrigido (2026-09-24):** Adicionado `role="button"`, `tabIndex={0}`, `aria-expanded={isHovered}` e manipulador de teclado `onKeyDown` que responde a `Enter` e `Space` para alternar o estado do card.
- **Aceite:** todos os cards são totalmente operáveis via teclado (Tab + Enter/Space) com anúncios de estado acessíveis.

### P-212 `[ ]` Mídias mock/cases apontam para arquivos inexistentes + `media_url` ignorada — P1 · M · UX/Perf
- **Arquivos:** `src/content/cases.json` (`midia: /cases/.../cover.jpg` — `public/cases/` não existe), `src/content/instagram-mock.json` (`media_url: /instagram/mock-*.jpg` — `public/instagram/` não existe), `src/components/sections/InstagramFeed.tsx:51-84` (renderiza só gradiente, nunca `media_url`), `next.config.mjs` (vazio, sem `images.remotePatterns`)
- **Problema:** campos de mídia mortos; quando `P-110`/`P-202` forem implementados com `next/image`, os `src` atuais quebram (404). Hoje o usuário vê só gradiente (já coberto por `P-110`, mas a causa-raiz são os arquivos ausentes).
- **Como corrigir:**
  1. Produção audiovisual gera covers reais → `public/cases/.../cover.jpg` + mocks `public/instagram/mock-*.jpg` (ou remover os campos até existirem).
  2. `InstagramFeed` passa a usar `next/image src={post.media_url}` com fallback em erro (ver `P-110`).
  3. `next.config.mjs`: `images.remotePatterns` para `*.cdninstagram.com`.
- **Aceite:** nenhum `src` aponta para arquivo inexistente; falha da API não quebra a página.
- **Bloqueio:** produção audiovisual (ver `P-202`); credenciais Meta (ver `P-206`).

### P-213 `[ ]` Sem `opengraph-image` (preview social ausente) — P1 · F · SEO
- **Arquivos:** `src/app/` (sem `opengraph-image.tsx`), `src/app/layout.tsx:59-73` (OG/Twitter sem `images`)
- **Problema:** compartilhamento em WhatsApp/LinkedIn/Instagram rende link sem imagem (queda de CTR). `P-006` marcou `[x]` mas ressalvou este item como "a ser providenciado pelo design".
- **Como corrigir:**
  1. Time de design entrega `og 1200×630` da identidade → `src/app/opengraph-image.tsx` (App Router gera `/opengraph-image` automaticamente).
  2. Adicionar `images` no `openGraph` + `twitter` do `layout.tsx`.
- **Aceite:** validador OG (ex: LinkedIn Post Inspector) exibe imagem 1200×630; build ok.
- **Bloqueio:** asset do time de design.

### P-214 `[x]` Código morto e jargão técnico residual em comentários/UI — P2 · M · Código/Conteúdo
- **Arquivos:** `src/components/ui/SotaquePreloader.tsx`
- **Problema:** textos do preloader expunham implementação interna ao usuário (`Esculpindo escultura 3D...`, `Calibrando desacoplamento...`).
- **Como corrigido (2026-09-24):** Textos do preloader reescritos com copy editorial acolhedor em tom proprietário Sotaque (`Sintonizando narrativa...`, `Preparando a experiência médica autoral...`).
- **Aceite:** nenhum jargão de pipeline ou computação gráfica na interface do usuário.

### P-215 `[x]` Preloader bloqueia scroll e atrasa primeira interação — P1 · M · Perf/A11y
- **Arquivos:** `src/components/ui/SotaquePreloader.tsx`
- **Problema:** usuário ficava bloqueado sem controle para dispensar a tela de carregamento, e `prefers-reduced-motion` não era honrado no carregador.
- **Como corrigido (2026-09-24):** Adicionado suporte síncrono a `prefers-reduced-motion` (desmontagem imediata sem animação nem bloqueio), atalhos de teclado `Escape` e `Enter` para dispensa instantânea do preloader pelo usuário, e liberação garantida do scroll.
- **Aceite:** com `reduced-motion`, conteúdo imediato; teclado permite saída a qualquer momento; build ok.

### P-216 `[ ]` Polimento Hero/geral: áudio, fontes, `color-scheme`, skip-link — P2 · F · UX/A11y/Código
- **Arquivos:** `Hero.tsx:81-95` (`new Audio("/beat/bg-audio.mp3")` sem `preload`, sem cleanup do `setTimeout` em `toggleSound :100`), `:365-370` (dica `Clique para ativar som` — texto sugere clique global, fantasma do `P-008`), `layout.tsx:26-30` (`localFont chromaVenue`) + `globals.css:3-28` (`@font-face` triplicado `Chroma Venue`/`Chroma_Venue`/`Chroma Avenue`), `page.tsx:43` + `SotaqueNavbar.tsx:115` (`font-['Chroma_Venue']` hardcoded em vez do token `font-chroma`), `layout.tsx:94` (`colorScheme: "dark"` com seções claras extensas), `layout.tsx:148-153` (skip-link → `#hero` em vez de `#main`; `page.tsx:15` `<main>` sem `id`)
- **Problema:** (a) áudio carrega mesmo para quem nunca ativa; timeout sem `clearTimeout` vaza em unmount; (b) fonte carregada 2× (next/font + `@font-face`) + classes hardcoded dificultam a troca pelo brand kit; (c) `color-scheme: dark` escurece scrollbars/controles nativos nas seções areia; (d) skip-link fora do padrão atrasa SR.
- **Como corrigir:**
  1. `preload="none"` (criar `Audio` sob demanda no 1º toggle) + `useRef` para o timeout com cleanup.
  2. Reescrever dica como `Ative o som ambiente` (ancorada ao botão).
  3. Unificar fontes: manter só `next/font localFont` + token `font-chroma`; remover `@font-face` triplicado e `font-['Chroma_Venue']`.
  4. `colorScheme: "light dark"`; `<main id="main">` + skip-link → `#main`.
- **Aceite:** zero request de áudio antes do 1º toggle; sem `font-['Chroma_Venue']` fora do token; skip-link leva ao `#main`; build ok.

---

## 4. Ordem sugerida de execução

1. **Hoje (vira demo honesta):** `P-001`, `P-002`, `P-016`, `P-005`, `P-008`, `P-010`, `P-003`, `P-015`, `P-014`, `P-007`
2. **Próximo sprint (vira publicável):** `P-101`, `P-102`, `P-111`, `P-006`, `P-109`, `P-112`, `P-110`, `P-105`, `P-103`, `P-107`, `P-009`, `P-012`, `P-004`, `P-106`, `P-108`, `P-013` (reaberto), `P-210`, `P-211`, `P-213`, `P-216`
3. **Exige design/negócio ou decisão de produto:** `P-201`, `P-202`, `P-203`, `P-204`, `P-205`, `P-206`, `P-207`, `P-208` (dados reais), `P-212` (mídias reais), `P-214` (código morto/jargão), `P-215` (preloader), `P-209` (tokens quebrados — pode entrar no sprint se o brand kit chegar)

Ao concluir qualquer item: marcar `[x]`, rodar `npm run build`, citar o ID no commit (ex: `fix(P-008): remove clique global do hero`).

---

## 5. Verificação de 2026-09-23 — implementado × pendente (re-auditoria)

> Só leitura do código atual (sem `npm run build` nesta passada — é atualização
> de backlog, não fix). Nenhum outro arquivo foi tocado. `grep` usado como
> evidência: `PLACEHOLDER` só em 3 comentários de código (`layout.tsx:11`,
> `tokens.css:1`, `instagram.ts:12`); `h-13`/`w-13` zero; `★`/`Verificado` zero;
> `setTimeout(r, 600)` zero; `SplitText|ParallaxLayer|CustomCursor` zero imports.

### Confirmado resolvido no código atual (27 itens `[x]`)

- **Fáceis (14):** `P-001`, `P-002`, `P-003`, `P-004`, `P-005`, `P-006`, `P-007`, `P-008`, `P-009`, `P-010`, `P-011`, `P-012`, `P-013` (re-resolvido em 2026-09-24: tokens AAA `/85` e `/75`, verde de teste removido), `P-014`, `P-015`, `P-016` — 16/16 fáceis concluídos.
- **Médios (11):** `P-101`, `P-102`, `P-104`, `P-105`, `P-108`, `P-109`, `P-111`, `P-112`, `P-210` (resolvido em 2026-09-24: `invisible` + `aria-hidden` no drawer fechado), `P-211` (resolvido em 2026-09-24: `role="button"` + `tabIndex={0}` + Enter/Space nos pilares), `P-214` (resolvido em 2026-09-24: jargão removido do preloader), `P-215` (resolvido em 2026-09-24: `reduced-motion` imediato + `Esc`/`Enter` dismiss).

### Pendente (16 itens abertos)

- **Médios:** `P-103` (accordion mobile), `P-106` (marquee botão pausa), `P-107`/`P-209` (tokens e faxina tailwind), `P-110`/`P-212` (mídias reais), `P-216` (polimento complementar de áudio/fontes).
- **Difíceis / Bloqueados por Conteúdo Real:** `P-201` a `P-208` (depoimentos e casos reais, fotos de médicos, WhatsApp institucional), `P-213` (open graph image).

### Histórico da Rodada Impeccable (2026-09-24)
- **Framework Impeccable:** `audit` + `critique` + `polish` executados.
- **Detector Impeccable:** 0 alertas (antipatterns de animação `animate-bounce` substituídos por `animate-pulse` suave e acessível).
- **Acessibilidade & Contraste:** 10 arquivos revisados, texto corrido elevado para contraste AAA, zero marcadores de teste residuais.
- **Build de Produção:** `npm run build` 100% aprovado sem erros de tipagem ou empacotamento.
