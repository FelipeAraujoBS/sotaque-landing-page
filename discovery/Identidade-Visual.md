# Identidade-Visual.md — Afinidade entre a identidade Sotaque e o site atual

> Documento de análise. Não altera código. Baseado na leitura integral de `identidade/` (7 PDFs), `docs/brand.md`, `docs/design.md`, `docs/architecture.md` e do site implementado em `src/` (tokens, layout, seções).
> Data: 2026-09-25

## 0. Fontes — o que a pasta `identidade/` realmente diz

| Arquivo | Convergência extraída |
|---|---|
| `Sotaque Comunicação.pdf` | Manifesto: `Todo mundo fala. Poucos têm sotaque. / Quem tem sotaque não passa batido. / Sua marca tem voz. A gente dá o sotaque.` + moodboard: plantas/frutas brasileiras (`espada de São Jorge, dendê, manga, carambola, guaraná, caju, coco`), animais (`galo, papagaio, bem-te-vi, arara`), cores (`amarelo, laranja, marrom, branco, azul, creme, vermelho`). |
| `Sotaque Comunicação(2).pdf` | `Nome - Ok / Slogan - Ok / Cores - Ok / Tipografia - Coolvetica`. Alternativas display pesquisadas: Metsuri, Snake Break, Histore Magica, Avigea, Balivia, Western Retro, Commune Serif, Viltrum Condensed, Bangro, Boru Playful, Monea, Melatonas. Foco operacional: `instagram, WhatsApp Business, Mídia Kit, Manual da marca, Prospecção`. |
| `SERVIÇOS - Reunião 19_09 .pdf` | Sotaque é **agência 360 real**, não só médico: Branding/ID Visual, Social, Assessoria de Imprensa, Comunicação Interna, Storymaker/Filmmaker, Edição com IA, Motion, Sites/Landing, Dados, Papelaria, Clipes/visualizers, Podcast/Videocast. Time nomeado por liderança (Carol/imprensa, Lavínia/social, Nathane/audiovisual, Kelvin/design-motion, Felipe/web-dados). |
| `Escopo Audiovisual.pdf` | Método: diagnóstico → pilares (institucional, comercial, social, interna, imprensa) → pré/produção/pós → formatos por canal + legendas → KPIs (alcance, retenção, engajamento, conversão). |
| `Experiências .pdf` | Prova social **real e forte**, fora do médico: Behance Nathane (Budweiser/Afropunk), Social Lavínia (Dra. Anna, Itaquareia, Incentivar, Shopping da Gente), Imprensa Carol (Shopping Bahia, Salvador Airport, Gurilândia/Land, Outback, Clínica Ceder, + logos McD, Bayer, Neoenergia, Natura, Avon, Sicoob, MRV). |
| `Roteiro_POST 1.pdf` | Teaser `A Sotaque está em todo lugar` (12-15s, 9:16): clima `misterioso, cotidiano, clean`. Logo aparece em glitch na tela do notebook, na xícara, no caderno, na TV. Fecha com `SOTAQUE / Quem tem Sotaque não passa batido`. |
| `✨🦜 Perfis que inspiram ✨🦜.pdf` | Refs: `rumifolks` (fontes), moldura, `laislourranapsico`, `mmusestudio` (mockups/aplicações), `estudio.candeia`, `salte.cc`, `opa.agencia`, `brendascalco`, `dudacomunicaa`, `studionalvagomesdesign` + vídeo flamxdesign. Linha: tipografia expressiva + mockup/aplicação + conteúdo autoral, não template. |

Espírito-síntese: **tropical lúdico + tipografia display pesada brasileira + cotidiano clean com aparição misteriosa + 360 de verdade (imprensa/social/audiovisual/web)**.

---

## 1. Veredito geral

| Eixo | O site traduz o espírito? | Nota |
|---|---|---|
| Conceito / naming / slogan | Sim, quase literal | 9/10 |
| Tom de voz | Sim | 8/10 |
| Paleta (matiz) | Sim na matiz, não na proporção/luz | 7/10 |
| Tipografia | Parcial — falta ousadia pop-retro da Coolvetica e refs | 5/10 |
| Motivos fauna/flora brasileiros | Não — ausente | 3/10 |
| Escopo 360 vs foco médico | Parcial — site esconde diferenciais reais | 6/10 |
| Estética teaser (cotidiano/clean/misterioso) | Não — Hero atual é monumental/3D pesado | 5/10 |
| Prova social | Não — placeholder quando já existe real | 4/10 |
| Anti-genérico / craft de interação | Sim | 8/10 |

**Resumo:** o site acerta o *discurso* da Sotaque, mas ameniza a *personalidade visual*. Está mais `clínica premium sóbria` do que `estúdio baiano tropical e lúdico` que os PDFs descrevem.

---

## 2. Onde há afinidade real (manter)

### 2.1. Slogan e conceito central — afinidade alta
- `src/components/sections/Hero.tsx:181-190` usa `Sua marca tem voz, nós damos o sotaque.` — citação direta do manifesto.
- `src/components/sections/RegionalDna.tsx:120-124` — `Inovação sem perder o chão onde pisa` traduz a tensão `inovação x origem` de `docs/brand.md:12-20`.
- `src/app/page.tsx:48-49` + `ContactForm.tsx:108-112` — `Vamos dar sotaque ao seu próximo passo` mantém o verbo `dar sotaque` como assinatura. Correto, não mexer.

### 2.2. Paleta — matiz compatível, via tokens
- `src/styles/tokens.css:6-39` — petróleo `#102C2B` (= azul noturno), areia `#F3EBDD` (= creme), goiaba `#D63A2F` (= vermelho), solar `#E7A92B` (= amarelo), folha `#58734A` + terracota `#B85C42` (= marrom/laranja/terra).
- Mapeia 1:1 com a lista `amarelo, laranja, marrom, branco, azul, creme, vermelho` do PDF. Troca futura continua trivial via tokens — conforme `docs/design.md:11-14`. Contraste AAA documentado no próprio `tokens.css:104-109`. Manter a arquitetura.

### 2.3. Tom de voz regional sem caricatura
- `RegionalDna.tsx:129-137` — `não soar igual a todo mundo`, `pode entrar`, `balcão, sala de espera` + glossário interativo `com sotaque, com jeito` (`:149-176`). É exatamente o `confiante mas não corporativo, regional autêntico nunca estereotipado` de `docs/brand.md:45-53`.
- Footer com `Conformidade CFM 2.336/2023` (`page.tsx:51-54`) + `sigilo médico` reforça `confiança/credibilidade` pedida para o público saúde.

### 2.4. Craft anti-template
- Bento 2 níveis com expansão por hover em `Pillars.tsx:418-444`, split por caractere em `Hero.tsx:31-70`, magnetic em `MagneticButton.tsx`, parallax em `RegionalDna.tsx:38-52`, marquee + drag real em `Testimonials.tsx`. Cumpre os 4 `detalhes de estúdio` de `docs/design.md:57-61` e dialoga com as refs `mmusestudio / estudio.candeia / salte.cc` (aplicação + interação feita à mão, não template).

---

## 3. Onde o site se afasta da identidade (gaps)

### 3.1. Tipografia — o maior gap visual [GAP-01]
- **Identidade pede:** `Coolvetica` (sans bold, condensada, geométrica, lúdica) + pesquisa de displays expressivas/playful/retro (`Boru Bold Playful, Western Retro, Viltrum Condensed, Balivia, Monea`). Ref `rumifolks (fontes)` reforça tipografia como protagonista.
- **Site entrega:** `Fraunces` (serifada editorial) para display + `DM Sans` para corpo + `Chroma Venue` só no `sotaque.` do Hero (`layout.tsx:12-30`, `globals.css:3-28`).
- **Efeito:** Fraunces é elegante e `saúde premium`, mas fria e editorial. Falta o peso pop-tropical, a letra `gorda e brasileira` que o moodboard papagaio/arara/manga pede. O site hoje poderia ser de qualquer healthtech; a identidade pede para não passar batido.

### 3.2. Fauna/flora brasileiras ausentes [GAP-02]
- **Identidade pede:** `dendê, manga, carambola, guaraná, caju, coco, espada de São Jorge, galo, papagaio, bem-te-vi, arara` como universo visual explícito.
- **Site entrega:** halos abstratos (`Hero.tsx:160-167`), radial terracota/mostarda sutil (`RegionalDna.tsx:95-100`), `360` em marca d'água (`:105-107`). Nenhum motivo, pattern, ilustração, textura ou máscara orgânica.
- **Efeito:** perda total de um diferencial. Nenhum concorrente médico tem papagaio/carambola; todos têm blur/glow. O site escolheu o segundo.

### 3.3. Proporção dark x solar invertida [GAP-03]
- **Identidade sugere:** fundo `creme/branco` com cor quente vibrante por cima (lógica de papelaria/ID + teaser `clean`).
- **Site entrega:** base `petróleo 45%+` dominante (Hero, Portfolio, Testimonials, Contact, footer todos dark; só Pillars + DNA são claros em `page.tsx:18-30`).
- **Efeito:** sofisticado e noturno, mas menos `solar/baiano/cotidiano`. O teaser pede luz do dia (mesa, café, caderno); o site pede palco escuro. Ambos válidos, mas hoje só existe o segundo.

### 3.4. 360 real podado para caber no médico [GAP-04]
- **Identidade tem:** 12 frentes (`SERVIÇOS`) com donos nomeados + cases grandes de imprensa (Shopping Bahia, Airport, Outback) que nenhum concorrente médico tem.
- **Site tem:** 5 pilares 100% medicalizados (`Pillars.tsx:18-77` — branding médico, conteúdo clínico, audiovisual clínico, tráfego particular, estratégia 360) + `cases.json` com 6 `Projeto conceitual` fictícios + `Testimonials.tsx:7-16` com especialidades genéricas em marquee.
- **Efeito:** o site esconde justamente a prova de que a Sotaque já operou marcas grandes. Para o público médico isso seria `prova social` decisiva (`docs/brand.md:28-33`), mas foi trocada por placeholder. Também somem do menu: Assessoria de Imprensa, Comunicação Interna, Podcast/Videocast, Papelaria, Clipes — todos escopo contratado.

### 3.5. Teaser cotidiano vs Hero monumental [GAP-05]
- **Teaser pede:** `misterioso, cotidiano, clean`, logo em aparições rápidas (glitch na xícara/caderno/TV), 12-15s, vertical.
- **Hero entrega:** canvas WebGL full-bleed + áudio ambiente `bg-audio.mp3` + 3 segmentos cinéticos por zona de mouse (`Hero.tsx:118-134, 150-168`). É `monumental/imersivo`, oposto de `cotidiano/clean`.
- **Efeito:** nenhum reaproveitamento narrativo. O conceito `A Sotaque está em todo lugar` poderia ser o preloader, o Instagram ou microinterações — hoje o `SotaquePreloader.tsx` existe mas não usa essa linguagem.

---

## 4. O que poderia mudar para adequar ainda mais (sem reescrever)

Princípio: tudo via tokens e componentes existentes, em camadas. Nada de hardcode — respeitar `docs/design.md:11-14` e o gatilho `NUNCA use <alpha-value>` de `AGENTS.md`.

### P0 — alto impacto, baixo custo

- **P0-1. Trazer a Coolvetica (ou equivalente) para display.** Manter `Fraunces` para citações editoriais e `DM Sans` para corpo, mas trocar `font-display` de títulos grandes (`Hero, Pillars h2, DNA h2`) por `Coolvetica` licenciada ou alternativa open (ex: `Archivo Black, Anton, Bricolage Grotesque` como placeholder documentado). Arquivos: `src/app/layout.tsx:12-30`, `src/styles/tokens.css:71-74`, `tailwind.config.ts:78-84`. Critério: título em `clamp(2.8rem,7.5vw,5.8rem)` precisa ter peso/pop à la `rumifolks`, não serifada fina.
- **P0-2. Trocar prova fictícia por real já autorizável.** Substituir `src/content/cases.json` (6 conceituais) por 4-6 cases reais de `Experiências.pdf` (ex: Dra. Anna, Itaquareia, Budweiser/Afropunk Behance, Shopping Bahia/imprensa) com flag `conceitual:false` + disclaimer. Idem `testimonials.json` + marquee `Testimonials.tsx:7-16` (trocar especialidades genéricas por `Shopping Bahia, Salvador Airport, Outback, Dra. Anna` quando houver autorização). Isso sozinho eleva credibilidade mais que qualquer animação.
- **P0-3. Explicitar o 360 real na página.** Sem criar seção nova: renomear/estender os 5 pilares em `Pillars.tsx:18-77` ou adicionar linha `Assessoria de Imprensa • Com. Interna • Podcast/Videocast • Papelaria` no rodapé da seção (`:447-450`) e no footer (`page.tsx:63-80`). O visitante médico precisa ver que contrata `departamento inteiro`, não só social.

### P1 — médio custo, dá o sotaque tropical

- **P1-1. Um motivo orgânico por bloco claro.** Introduzir 1 asset SVG/máscara (pena de papagaio, folha de espada de São Jorge, fatia de carambola) como marca d'água em `RegionalDna.tsx:93-108` e como selo/pattern no `Pillars.tsx:374-382`, em `terracota/solar` a 6-8% de opacidade. Começar sutil para não caricatizar; validar com o time de design antes de ilustração final.
- **P1-2. Clarear um ato.** Inverter `InstagramFeed` ou `Testimonials` para fundo `areia` (`#F3EBDD`) para quebrar a sequência dark `Portfolio → Testimonials → Contact` (`page.tsx:25-30`). A identidade é solar; o site precisa respirar claro no meio do escuro.
- **P1-3. Reaproveitar o teaser no produto.** Usar o roteiro `Roteiro_POST 1.pdf` como: (a) copy do `SotaquePreloader.tsx` (`logo aparece em glitch`), (b) 4 frames do `InstagramFeed` (`xícara, caderno, notebook, TV`), (c) micro-easter egg no `CustomCursor.tsx` ou `Hero3DCanvas`. Conecta audiovisual + site + social, como pede `Escopo Audiovisual.pdf`.

### P2 — quando houver brand kit oficial

- **P2-1.** Substituir `tokens.css:6-39` pelos hex oficiais (hoje `petróleo/areia/goiaba/solar/folha/terracota` são placeholder assumido no comentário `:1`). Manter os aliases (`midnight, cream, earth...` em `tailwind.config.ts:57-76`) para não reescrever componentes.
- **P2-2.** Produzir `Manual da marca` + `Mídia Kit` (previstos em `Sotaque Comunicação(2).pdf`) a partir dos próprios componentes do site (bento, cards, manifesto) — o site vira fonte, não só vitrine.
- **P2-3.** Decidir escopo: Sotaque segue `médico-first` (posicionamento atual do site) ou `360 geral com vertical saúde` (realidade da `identidade/`)? Hoje o site escolheu o primeiro sem registrar a decisão. Vale uma linha em `docs/brand.md`.

---

## 5. Checklist rápido de adequação (para revisão com design)

- [ ] Títulos grandes testados em Coolvetica vs Fraunces lado a lado?
- [ ] Pelo menos 1 motivo fauna/flora aparece sem parecer clip-art?
- [ ] Visitante entende em 10s que há Assessoria de Imprensa + Audiovisual + Web, não só social?
- [ ] Cases/logos reais substituíram `Projeto conceitual`?
- [ ] Há pelo menos um momento `clean/cotidiano` (teaser) entre os momentos `noturnos`?
- [ ] Troca de paleta continua sendo só `tokens.css` + `globals.css` alpha?

---

## 6. Conclusão em uma frase

O site atual é **compatível com o discurso e a arquitetura** da Sotaque (slogan, 360, tom regional, tokens, anti-genérico), mas ainda **não traduz a exuberância visual** da identidade (tipografia pop brasileira + fauna/flora + solar cotidiano + prova 360 real) — os P0/P1 acima fecham esse vão sem reescrever o projeto.
