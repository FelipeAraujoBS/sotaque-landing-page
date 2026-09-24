# next-sprint.md — Plano para levar o site a 100% de produção

> Plano de handoff: outra IA vai assumir a partir daqui. Tudo que ela precisa
> está neste arquivo + `problems.md` + `AGENTS.md` + `discovery/update-001.md`
> + `discovery/update-002.md`. Leia os 5 antes de codar, nesta ordem:
> 1. `AGENTS.md` (regras de ouro, stack, convenções)
> 2. `discovery/problems.md` §5 (estado real do código em 2026-09-23)
> 3. `discovery/update-001.md` (regra COMENTAR–NÃO–APAGAR)
> 4. `discovery/update-002.md` (regras de copy/posicionamento)
> 5. Este arquivo (ordem de execução)

---

## 1. Definição de "100%"

O site está em 100% quando **todos** os critérios abaixo são verdadeiros:

1. `npm run build` passa sem erro e sem warnings novos.
2. Todos os IDs `P-001~P-216` em `problems.md` estão `[x]` com aceite evidenciado,
   ou movidos para "Aguardando terceiros" com dono e prazo (só `P-201`, `P-202`,
   `P-204`, `P-205`, `P-206` podem ficar nessa coluna — ver §5).
3. Zero contato fictício alcançável pelo usuário (WhatsApp real discável,
   LinkedIn real, CNPJ real ou seção removida — `P-208`).
4. Zero depoimento/case que pareça real sem ser (`P-201`, `P-202` ou rótulo
   conceitual mantido de forma explícita onde ainda houver mock).
5. Contraste AA em todo texto corrido (`P-013`, `P-204`).
6. Navegação completa por teclado + leitor de tela sem focos fantasmas
   (`P-105`, `P-210`, `P-211`, `P-103`, `P-106`).
7. LCP mobile não espera o 3D; preloader nunca trava teclado (`P-112`, `P-215`, `P-203`).
8. Preview social real ao compartilhar (OG image 1200×630 — `P-213`).
9. `grep -r PLACEHOLDER src/` retorna só comentários de código, nunca copy
   renderizada (`P-001` segue valendo a cada task).
10. Nenhum nome de lib/técnica visível ao usuário (`P-014`, `P-214`).

---

## 2. Estado de partida (2026-09-23, ver `problems.md` §5)

- **23 itens `[x]` confirmados:** P-001, P-002, P-003, P-004, P-005, P-006, P-007,
  P-008, P-009, P-010, P-011, P-012, P-014, P-015, P-016, P-101, P-102, P-104,
  P-105, P-108, P-109, P-111, P-112.
- **1 reaberto:** `P-013` (contrastes — estava `[x]`, aceite não atingido).
- **Abertos antigos (11):** P-013, P-103, P-106, P-107, P-110, P-201, P-202,
  P-203, P-204, P-205, P-206, P-207 (12 contando o reaberto — são 4 médios +
  7 difíceis + P-013).
- **Novos (9):** P-208, P-209, P-210, P-211, P-212, P-213, P-214, P-215, P-216.
- **Não quebrar** a seção "0. O que está BOM" de `problems.md` (direção de arte,
  tokens, split Server/Client, honeypot, skip-link, reduced-motion).

---

## 3. Regras inegociáveis (resumo — o detalhe manda em `AGENTS.md`)

1. **Tokens via `src/styles/tokens.css`, nunca hardcoded.** Cores novas entram
   como `var(--sotaque-*)`; NUNCA `<alpha-value>` no `tailwind.config.ts`
   (quebra o build — ver `AGENTS.md` "Gatilhos técnicos"). Alpha via
   `color-mix()` em `src/app/globals.css` (lista existente serve de modelo).
2. **COMENTAR, NÃO APAGAR** (`update-001`): tudo que for efeito excessivo
   (Lenis, cursor, GSAP pontual, métricas técnicas visíveis, latência) sai com
   `// TEMPORARIAMENTE DESATIVADO PARA TESTE`, preservando imports/lógica.
3. **Não inventar fatos:** sem métricas/cases/depoimentos apresentados como
   reais. Mock visível = prefixo `Projeto conceitual —` (padrão já aplicado em
   `cases.json` e `testimonials.json`).
4. **Tecnologia é meio** (`update-002`): nunca "software house"; sem nomes de
   stack na UI; equipe com 5 pesos iguais; cases no arco
   `contexto → problema → estratégia/execução → resultado`.
5. **Um problema por vez:** corrija → valide (§7) → marque `[x]` em
   `problems.md` → `npm run build` → commit `fix(P-XXX): ...` → próximo.
6. **IDs estáveis:** nunca renumere. Achado novo = próximo ID livre (`P-217+`).

---

## 4. Fase 1 — Desbloqueia produção sem terceiros (fazer primeiro, nesta ordem)

### T1. `P-013` Contrastes AA (reaberto) — P1 · F
- **Arquivos:** `src/app/page.tsx:90,99,110,136` · `src/components/ui/SotaquePreloader.tsx:147,188,195`
  · `src/components/layout/SotaqueNavbar.tsx:271` · `src/components/sections/Hero.tsx:365`
  · `src/components/sections/ContactForm.tsx:155` · `src/components/sections/Pillars.tsx:272,335`
  · `src/components/sections/RegionalDna.tsx:176,180,193,210` · `src/components/sections/Testimonials.tsx:229`
  · `src/components/sections/InstagramFeed.tsx:20,69` · `src/components/sections/PortfolioClient.tsx:45,94`
- **Passos:**
  1. Texto corrido claro sobre petróleo: subir para `/70` mínimo (`/75` ideal).
  2. Texto escuro sobre areia: subir para `/70` mínimo (`text-[#102C2B]/50` → `/70`).
  3. Labels decorativos 10–11px (`/40`, `/45`) → `/60` mínimo ou remover se puramente decorativo.
  4. Validar com axe/Lighthouse (corpo ≥ 4.5:1, large ≥ 3:1).
- **Aceite:** zero ocorrências de texto funcional abaixo de AA; evidência (print do axe) citada no commit.
- **Não fazer:** mudar a paleta (isso é `P-204`, decisão de design).

### T2. `P-210` Drawer fechado fora do tab order — P1 · M
- **Arquivos:** `src/components/layout/SotaqueNavbar.tsx:181-209`
- **Passos:**
  1. No painel `#drawer-menu`, adicionar `hidden={!isOpen}` (ou `inert={!isOpen}`) + `aria-hidden={!isOpen}`.
  2. Se a animação de saída quebrar, usar `visibility` com transition-delay em vez de só `opacity`.
  3. Re-testar o trap/`Esc`/retorno de foco do `P-105` (não regredir).
- **Aceite:** drawer fechado → Tab vai de `Menu` ao logo sem paradas fantasmas; drawer aberto → trap íntegro.
- **Não fazer:** remover `role="dialog"`/`aria-modal`.

### T3. `P-211` + `P-103` Cards de pilares operáveis (fazer juntos) — P1 · M
- **Arquivos:** `src/components/sections/Pillars.tsx:206-235` (`renderCard`), `:402-435` (container `min-h-[720px] lg:h-[720px]`)
- **Passos:**
  1. `<sm`: virar accordion — 1 card aberto por vez, `<button aria-expanded>` por card, altura `auto`.
  2. `>=sm`: manter bento, mas cada card vira `<button aria-expanded>` (ou `role="button"` + `tabIndex={0}` + `onKeyDown` Enter/Espaço).
  3. Remover `lg:h-[720px]` fixo → `min-h` + `auto`; remover `select-none` do texto; remover `line-clamp-2` onde esconder conteúdo (ou expandir no aberto).
  4. Adicionar affordance visível (`+`/`expandir`) e `:focus-visible` (já global em `globals.css:55`).
- **Aceite:** 5 cards operáveis por teclado; todo conteúdo legível em 375px sem corte; `aria-expanded` correto.
- **Não fazer:** reintroduzir métricas inventadas (`P-002` continua valendo).

### T4. `P-215` Preloader sem trava — P1 · M
- **Arquivos:** `src/components/ui/SotaquePreloader.tsx:22-121` (lock/scroll/fallback 3.2s), `:134-140`
- **Passos:**
  1. Fast-path `prefers-reduced-motion`: `setIsMounted(false)` imediato, sem contador.
  2. Remover `preventScrollKeys` (ou limitar: nunca bloquear `Tab`/`Esc`/`Enter`); `Esc` dispensa o preloader.
  3. Desacoplar do `sotaque:3d-ready`: liberar scroll no primeiro paint/`onLoad`; 3D hidrata sob o skeleton de `Hero.tsx:11-19`.
  4. Teto de bloqueio ≤1s sem `reduced-motion`.
- **Aceite:** com `reduced-motion` → conteúdo imediato; sem → bloqueio ≤1s; teclado nunca preso; LCP não espera `logo.glb` (7.2MB).
- **Não fazer:** apagar o componente (regra comentar-não-apagar se algum dia voltar a ser necessário).

### T5. `P-216` Polimento Hero/geral — P2 · F
- **Arquivos:** `src/components/sections/Hero.tsx:81-100,365-370` · `src/app/layout.tsx:26-30,94,148-153`
  · `src/app/globals.css:3-28` · `src/app/page.tsx:15,43` · `src/components/layout/SotaqueNavbar.tsx:115`
- **Passos:**
  1. Áudio sob demanda: criar `new Audio` no 1º toggle (nada de request antes), `preload="none"`; guardar o `setTimeout` de `:100` em `useRef` com cleanup.
  2. Dica `:365-370` → texto ancorado ao botão (`Ative o som ambiente`), nunca "clique" genérico (fantasma do `P-008`).
  3. Fontes: manter só `next/font localFont` + token `font-chroma`; remover `@font-face` triplicado e trocar `font-['Chroma_Venue']` por `font-chroma`.
  4. `viewport.colorScheme` → `"light dark"`; `<main id="main">` + skip-link → `#main`.
- **Aceite:** zero request de áudio antes do toggle; zero `font-['Chroma_Venue']` fora do token; skip-link leva ao `#main`; build ok.

### T6. `P-106` Marquee com pausa — P2 · M
- **Arquivos:** `src/components/sections/Testimonials.tsx:99-113` · `src/app/globals.css:192-209`
- **Passos:**
  1. Botão `Pausar/Retomar letreiro` (`aria-pressed`) alternando `animation-play-state`.
  2. Manter pausa no hover + `reduced-motion` global (já existe em `tokens.css:112-121`).
- **Aceite:** pausa por botão + teclado; sem autoplay forçado com `reduced-motion`.

### T7. `P-209` + `P-107` Tokens quebrados e faxina de hex (parcial sem brand kit) — P1 · M
- **Arquivos:** `src/styles/tokens.css` · `src/app/globals.css:104,139-140,175-180` · `tailwind.config.ts:57-76`
  · ~100 usos de `bg-[#102C2B]`/`text-[#F3EBDD]` nos componentes
- **Passos:**
  1. Declarar `--sotaque-clay` (alias de `--sotaque-terracota`) e `--sotaque-accent-soft`, OU remover os utils mortos (`.text-clay/[0.06]`, `.bg-accent-soft/*`).
  2. `--shadow-accent` e `.stripe-mesh-gradient`: trocar teal `#0D9488` por goiaba/solar/folha.
  3. Trocar hex espalhado por tokens onde for mecânico (`bg-petroleo text-areia` etc.); o que for risco visual, deixar para o brand kit e listar no commit.
- **Aceite:** todo `var(--sotaque-*)` usado existe; zero `#0D9488` fora de comentário; visual idêntico; build ok.
- **Não fazer:** `<alpha-value>` no config; nem trocar a paleta (isso é `P-204`).

### T8. `P-214` Código morto e jargão residual — P2 · M
- **Arquivos:** `src/components/motion/SplitText.tsx`, `ParallaxLayer.tsx`, `CustomCursor.tsx` (zero imports)
  · `Hero.tsx:74` (`canvasHandleRef` nunca aciona `cycleMaterial`) · `public/beat/bg-audio_CHF1.mp3` (órfão)
  · `public/fonts/BF 161.*` (sem referência) · `SotaquePreloader.tsx:16-19` · `Pillars.tsx:236,401` · `globals.css:174`
- **Passos:**
  1. Decisão por arquivo: reuso real ou `// TEMPORARIAMENTE DESATIVADO PARA TESTE` + fora do bundle. NÃO deletar sem registrar.
  2. `cycleMaterial`: ou botão próprio `aria-label="Trocar acabamento 3D"` (ver `P-008`), ou comentar `SOTAQUE_MATERIALS` excedente.
  3. Status do preloader em voz Sotaque (`Preparando o estúdio...`), sem nomes de técnica.
- **Aceite:** nenhuma técnica visível ao usuário; imports mortos = zero ou comentário de desativação.

### T9. `P-213` OG image — P1 · F (desbloqueia junto se o design entregar; senão vai para §5)
- **Arquivos:** `src/app/` (criar `opengraph-image.tsx`) · `src/app/layout.tsx:59-73`
- **Passos:**
  1. Receber do design `1200×630`; criar `src/app/opengraph-image.tsx`.
  2. Adicionar `images` em `openGraph` + `twitter` do `layout.tsx`.
- **Aceite:** inspetor de OG (LinkedIn) mostra a imagem; build ok.

---

## 5. Fase 2 — Mídia e dados (depende de produção/credenciais)

### T10. `P-110` + `P-212` Instagram com imagem real — P1 · M
- **Arquivos:** `src/components/sections/InstagramFeed.tsx:51-84` · `src/lib/instagram.ts`
  · `src/content/instagram-mock.json` · `next.config.mjs` · `public/instagram/` (criar)
- **Passos:**
  1. Gerar `public/instagram/mock-*.jpg` reais (bastidores) OU remover `media_url` até existirem.
  2. Renderizar com `next/image` (`alt={caption.slice(0,100)}`, `sizes="(max-width:768px) 50vw, 33vw"`), fallback para gradiente em `onError`.
  3. `next.config.mjs`: `images.remotePatterns` para `*.cdninstagram.com`.
  4. Manter `revalidate = 10800` e fallback mock (nunca expor token no client).
- **Aceite:** imagens com `alt`, sem CLS; API fora do ar não quebra a página.

### T11. `P-206` Graph API em prod — P2 · D
- **Arquivos:** `src/lib/instagram.ts:15-36`
- **Passos:** token longa duração + refresh + monitoramento; manter fallback mock.
- **Bloqueio:** credenciais Meta + aprovação.

---

## 6. Fase 3 — Conteúdo real (exige terceiros; sem isso o 100% não fecha)

| ID | O que obter | Arquivos que só mudam com o real | Aceite |
|---|---|---|---|
| `P-208` | WhatsApp, e-mail, LinkedIn, CNPJ oficiais | `src/lib/contact.ts` (SÓ aqui) | Número discável, LinkedIn da empresa, CNPJ válido |
| `P-201` | 2–3 depoimentos + autorização de uso | `testimonials.json`, `Testimonials.tsx` | Nome/cargo/foto autorizados; sem estrela fake; remover selo conceitual onde virar real |
| `P-202` | Covers `/public/cases/.../cover.jpg` (1600w) + bastidores | `cases.json:midia`, `PortfolioClient.tsx`, `InstagramFeed.tsx`, `Hero.tsx` (poster) | `next/image` com `priority` no 1º case + `alt` descritivo |
| `P-203` | Teste em device real + profiling GPU | `Hero3DCanvas.tsx:140-158,197-229` | 60fps mobile ou poster estático no mobile (`MeshStandardMaterial`, `low-power`) |
| `P-204` | Decisão de design sobre folha `#58734A` × petróleo | `tokens.css:8-38` | Audit Stark/axe em todos os pares; folha nunca em corpo se reprovar |
| `P-205` | Estratégia + produção contínua | `/servicos/*`, cases indexáveis, blog, NAP, Google Business | Rankeia `marketing para clínicas em [cidade]` (ver update-002 §8) |
| `P-207` | Decisão de negócio + copy original | Nova seção `Como trabalhamos` (6 etapas), FAQ CFM/LGPD, CTAs intermediários (update-002 §2, §4, §11) | Copy 100% original, voz Sotaque |

---

## 7. Validação padrão (toda task, sem exceção)

1. `npm run build` passa sem erro.
2. Desktop + mobile 375px sem regressão visual (comparar antes/depois).
3. `prefers-reduced-motion` respeitado (testar com a flag ligada).
4. Teclado: Tab alcança tudo que foi tocado, `Esc` fecha o que abre, foco visível.
5. `grep -r PLACEHOLDER src/` → só comentários; nenhum jargão novo na UI.
6. Marcar `[x]` em `problems.md` + citar evidência (arquivo:linha ou print axe/Lighthouse).
7. Commit: `fix(P-XXX): <o que mudou>` (um commit por task quando possível).

## 8. Checklist final dos 100% (rodar no fim, tudo tem que ser SIM)

- [ ] Build limpo; sem warnings novos
- [ ] Todos os `P-XXX` `[x]` ou na coluna de terceiros com dono/prazo
- [ ] Contato real discável nos 3 lugares (footer, form, drawer)
- [ ] Zero `[PLACEHOLDER]`/mock parecendo real na UI e no HTML
- [ ] Contrastes AA (axe) + teclado completo + `reduced-motion` ok
- [ ] LCP mobile sem esperar o 3D; preloader ≤1s e dispensável
- [ ] OG image 1200×630 validada no inspetor
- [ ] Instagram: imagens reais com `alt`, fallback íntegro
- [ ] `P-104`: blocos de fundo coesos (revisar após mudanças)
- [ ] "0. O que está BOM" intacto (reler `problems.md` §0 antes de fechar)
