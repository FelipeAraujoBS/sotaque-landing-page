# Relatório de Conteúdo Pendente de Validação Humana

Este documento mapeia todos os dados de conteúdo (cases, métricas, logos de parceiros, depoimentos e cópias de texto) presentes no repositório que aparentam ser fictícios, placeholders ou necessitam de homologação e decisão explícita por parte da liderança da **Sotaque**.

---

## 1. Cases de Portfólio (`src/content/cases.json`)

Nenhum case atual utiliza mais gradientes puros de CSS ou placeholders vazios, pois foram gerados mockups editoriais em alta definição em `/public/cases/*.jpg`. No entanto, **todos os 6 clientes e métricas são fictícios/exemplos criativos** e precisam ser validados ou substituídos por trabalhos reais do estúdio:

| Arquivo | Campo | Valor Atual | Situação / Decisão Humana |
| :--- | :--- | :--- | :--- |
| `src/content/cases.json` | `[0].cliente` / `midia` | "Galeria Aurora" (`/cases/galeria-aurora.jpg`) | **Pendente**: Confirmar se o cliente é real ou substituir por case real de Branding do estúdio. |
| `src/content/cases.json` | `[0].impacto` | "Catálogo premiado & +240% público em vernissages" | **Pendente**: Métrica fictícia criada como modelo editorial. |
| `src/content/cases.json` | `[1].cliente` / `midia` | "Festival Origens" (`/cases/festival-origens.jpg`) | **Pendente**: Confirmar se o festival existiu ou substituir por documentário/filme real da agência. |
| `src/content/cases.json` | `[1].impacto` | "Mais de 1.8M visualizações orgânicas & cobertura nacional" | **Pendente**: Métrica estimativa não auditada. |
| `src/content/cases.json` | `[2].cliente` / `midia` | "Essence Botanica" (`/cases/essence.jpg`) | **Pendente**: Marca de cosméticos botânicos concebida para demonstração de packaging. |
| `src/content/cases.json` | `[2].impacto` | "Esgotamento da primeira tiragem em 14 dias" | **Pendente**: Métrica de exemplo comercial. |
| `src/content/cases.json` | `[3].cliente` / `midia` | "Studio Prime Arquitetura" (`/cases/studio-prime.jpg`) | **Pendente**: Estúdio de arquitetura fictício para demonstração de plataforma digital. |
| `src/content/cases.json` | `[3].impacto` | "+195% propostas comerciais de alto ticket" | **Pendente**: Métrica de conversão fictícia. |
| `src/content/cases.json` | `[4].cliente` / `midia` | "Instituto Vital" (`/cases/instituto-vital.jpg`) | **Pendente**: Instituição científica hipotética para demonstração de design editorial. |
| `src/content/cases.json` | `[4].impacto` | "Adoção como referência por 12 fundações parceiras" | **Pendente**: Dado institucional não auditado. |
| `src/content/cases.json` | `[5].cliente` / `midia` | "Coletivo Viva" (`/cases/coletivo-viva.jpg`) | **Pendente**: Revista cultural hipotética demonstrando curadoria fotográfica. |
| `src/content/cases.json` | `[5].impacto` | "Comunidade ativa com mais de 85 mil criadores" | **Pendente**: Número de audiência de exemplo. |

---

## 2. Depoimentos de Clientes (`src/content/testimonials.json`)

Todos os 4 depoimentos atuais são fictícios, servindo como modelo de tom de voz para a diagramação editorial:

| Arquivo | Identificador | Nome & Cargo / Empresa | Trecho do Texto | Situação |
| :--- | :--- | :--- | :--- | :--- |
| `src/content/testimonials.json` | `"01"` | Helena Drummond (`Ateliê & Galeria Drummond`) | *"A Sotaque conseguiu traduzir a sensibilidade do nosso espaço cultural..."* | **Pendente**: Cliente e depoimento fictícios. Substituir por parceiro real. |
| `src/content/testimonials.json` | `"02"` | Rafael Melo (`Grupo & Instituto Melo`) | *"Uma agência que finalmente compreende o equilíbrio entre autoridade executiva e calor humano..."* | **Pendente**: Cliente e depoimento fictícios. Substituir por parceiro real. |
| `src/content/testimonials.json` | `"03"` | Mateus Vasconcelos (`Fundação Bahiana de Arte Contemporânea`) | *"A produção audiovisual e a cobertura documental captaram o sotaque e a alma dos nossos projetos..."* | **Pendente**: Instituição e depoimento fictícios. Substituir por parceiro real. |
| `src/content/testimonials.json` | `"04"` | Carolina Prado (`Studio Casa & Arquitetura Autoral`) | *"Com o ecossistema 360 da Sotaque, nosso posicionamento ganhou clareza..."* | **Pendente**: Cliente e depoimento fictícios. Substituir por parceiro real. |

---

## 3. Logotipos de Parceiros do Marquee (`src/components/sections/PortfolioClient.tsx`)

Atualmente, o letreiro infinito exibe 14 marcas de grande visibilidade nacional e internacional. É necessário validar quais dessas marcas têm contrato formal ou autorização de uso de imagem pela Sotaque:

| Arquivo | Nome da Marca | Caminho do Asset | Situação / Risco Jurídico |
| :--- | :--- | :--- | :--- |
| `PortfolioClient.tsx` | Avon | `/logos/avon.svg` | **Validação necessária**: Houve prestação de serviço direta ou via agência parceira? |
| `PortfolioClient.tsx` | MRV Engenharia | `/logos/mrv.webp` | **Validação necessária**: Autorizado para divulgação pública em portfólio? |
| `PortfolioClient.tsx` | Sicoob | `/logos/sicoob.webp` | **Validação necessária**: Autorizado para divulgação pública? |
| `PortfolioClient.tsx` | Budweiser | `/logos/budweiser.svg` | **Validação necessária**: Houve projeto oficial ou campanha atendida? |
| `PortfolioClient.tsx` | Outback | `/logos/outback.svg` | **Validação necessária**: Autorizado para exibição institucional? |
| `PortfolioClient.tsx` | Bayer | `/logos/bayer.svg` | **Validação necessária**: Autorizado para exibição institucional? |
| `PortfolioClient.tsx` | McDonald's | `/logos/mcdonalds.svg` | **Validação necessária**: Houve trabalho regional ou nacional homologado? |
| `PortfolioClient.tsx` | Esporte Clube Bahia | `/logos/ec-bahia.webp` | **Validação necessária**: Cliente regional direto ou ativação pontual? |
| `PortfolioClient.tsx` | CCR Metrô Bahia | `/logos/ccr-metro.png` | **Validação necessária**: Projeto institucional homologado? |
| `PortfolioClient.tsx` | DemocracyLab | `/logos/democracylab.svg` | **Validação necessária**: Autorizado para exibição institucional? |
| `PortfolioClient.tsx` | Workana | `/logos/workana.svg` | **Validação necessária**: Plataforma intermediária ou cliente contratante? |
| `PortfolioClient.tsx` | Grau Técnico | `/logos/grau-tecnico.png` | **Validação necessária**: Autorizado para exibição institucional? |
| `PortfolioClient.tsx` | Natura | `/logos/natura.png` | **Validação necessária**: Autorizado para exibição institucional? |
| `PortfolioClient.tsx` | ALLOS | `/logos/allos.webp` | **Validação necessária**: Autorizado para exibição institucional? |

---

## 4. Textos com Ditados, Autoelogios ou Adjetivações Subjetivas

Mapeamento de expressões retóricas, autoelogiosas ou frases que utilizam adjetivos no lugar de fatos concretos e mensuráveis:

| Arquivo | Linha / Contexto | Trecho Identificado | Observação do Diagnóstico |
| :--- | :--- | :--- | :--- |
| `src/content/hero.ts` | Linha 21 (`subtitle`) | *"Comunicação 360° para negócios brasileiros que querem uma marca com identidade própria."* | Marcado como `// TODO(humano)` para validação de posicionamento pelo fundador. |
| `src/content/hero.ts` | Linha 19 (`rotatingWords`) | `["sotaque", "ritmo", "tempero", "jeito"]` | Marcado como `// TODO(humano)`. Palavras como "tempero" ou "jeito" podem ser interpretadas como regionalismo informal. |
| `src/components/sections/RegionalDna.tsx` | Linha 168 | Expressão *"com sotaque, com jeito"* | Expressão vernacular explicada em glossário. Decidir se o tom se alinha à seriedade executiva de grandes contas. |
| `src/components/sections/RegionalDna.tsx` | Linha 195 | *“A gente não cria marcas para parecerem cópias globais. Cria marcas com alma, história viva e personalidade própria.”* | Frase de manifesto afirmativa, porém puramente filosófica e sem comprovação fática. |
| `src/components/sections/Pillars.tsx` | Linha 27 (`motto`) | *"Marcas com espinha dorsal e voz inconfundível."* | Adjetivação metafórica. |
| `src/components/sections/Pillars.tsx` | Linha 55 (`motto`) | *"Não publicamos para preencher feed. Criamos obsessão."* | Promessa retórica de alta intensidade ("obsessão"). |
| `src/components/sections/Pillars.tsx` | Linha 97 (`motto`) | *"Toda marca tem uma verdade que merece manchete."* | Slogan retórico para Assessoria de Imprensa. |
| `src/content/instagram-mock.json` | Linha 28 | *"Making of - produção de set e fotografia para posicionamento de marca sem clichês."* | Uso do termo "sem clichês" identificado no feed mockado. |
| Histórico / Scaffold inicial | Removidos na Fase 1 & 2 | *"Sem Clichê"*, *"Quem não é visto não é lembrado (nem curtido)"*, *"Diga-me qual fonte usas..."* | Expressões informais de redes sociais que foram eliminadas na reformulação do Hero e Pilares. |
