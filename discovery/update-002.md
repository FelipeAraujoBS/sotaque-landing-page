# update-002.md — Mudanças de posicionamento e arquitetura aprovadas

Este documento complementa (não substitui) `docs/brand.md`, `docs/design.md` e
`roadmap.md`. Ele registra **apenas as mudanças aprovadas** a partir da proposta
de nova arquitetura inspirada na estrutura comercial de um concorrente (Oxe
Marketing). Pontos da proposta original que **não** foram aprovados estão
listados no final, para deixar claro o que não deve ser adotado.

Ao aplicar este update, o agente deve atualizar `docs/brand.md`, criar/expandir
tasks em `tasks/` e reordenar `roadmap.md` conforme as seções abaixo — sem
reescrever manualmente aqui, apenas seguindo as diretrizes.

## 1. Reposicionamento

Substituir "agência de marketing 360°" (genérico demais) por um posicionamento
mais específico, do tipo:

> Estratégia, criatividade e tecnologia para marcas que têm algo a dizer.

O Hero deve manter o conceito já existente ("Toda marca tem um jeito de falar.
A gente encontra o seu.") e acrescentar uma linha comercial de apoio logo
abaixo, citando as frentes reais (estratégia, criatividade, conteúdo,
tecnologia, dados) — sem tentar explicar a empresa inteira no Hero.

**Importante:** a redação final de qualquer copy (Hero, dores, manifesto) deve
ser escrita do zero na voz da Sotaque (ver `docs/brand.md`), nunca adaptada
frase a frase de um concorrente. Usar a estrutura como referência, não o texto.

## 2. Nova seção: "O problema" (antes de "O que fazemos")

Adicionar uma seção de dor/contexto entre o Hero e os serviços, listando
problemas concretos que a Sotaque resolve (comunicação genérica, Instagram
que não traduz a qualidade do trabalho, conteúdo sem estratégia, identidade
desalinhada, site que não converte, dados sem uso, oportunidades de
automação/IA não exploradas). Fechar com uma frase de transição do tipo
"É aqui que a Sotaque entra."

Isso entra como uma nova task antes da atual `tasks/03-pilares.md` no
roadmap.

## 3. Reestruturar "O que fazemos" em 6 frentes

Substituir os pilares genéricos por 6 frentes específicas, alinhadas às
especialidades reais da equipe (ver seção 5):
1. Estratégia
2. Identidade & Design
3. Conteúdo & Audiovisual
4. Comunicação & Relações Públicas
5. Digital & Tecnologia
6. Dados & Inteligência

Cada frente com uma frase de impacto curta, não uma lista genérica de
serviços. Manter o layout assimétrico já definido em `docs/design.md`
(não virar grid simétrico 3x2 ou 2x3 só por terem 6 itens agora).

**Atenção de posicionamento:** a frente de Digital & Tecnologia deve ser
comunicada como infraestrutura que faz a comunicação funcionar melhor
("usamos tecnologia para..."), nunca como "também desenvolvemos software" —
a Sotaque não deve soar como software house.

## 4. Nova seção: "Como trabalhamos" (processo)

Adicionar uma seção de processo com 6 etapas: Diagnóstico → Estratégia →
Criação → Implementação → Mensuração → Evolução. Curta, objetiva, reforça que
tecnologia e dados fazem parte do ciclo completo (não são um departamento à
parte).

## 5. Seção de equipe: "Cinco perspectivas, uma direção"

Adicionar uma seção de equipe com as 5 pessoas reais e suas frentes:
- Lavínia — Estratégia & Marketing Digital
- Nathane — Audiovisual & Conteúdo
- Carolina — Comunicação & Relações Públicas
- Kelvin — Criação & Design
- Felipe — Tecnologia & Dados

Cada pessoa com uma frase curta que represente sua forma de enxergar uma
marca (não apenas nome + cargo + foto). Frase de amarração: "Nenhuma marca é
construída por uma única perspectiva."

Esta seção reforça o conceito de "sotaque" (vozes diferentes, uma direção) —
é a parte da proposta mais alinhada ao DNA da marca, sem copiar nada do
concorrente.

## 6. Cases estruturados por narrativa

Ao invés de galeria simples, cada case no `content/cases.json` (ver
`tasks/04-portfolio.md`) passa a incluir 4 campos de narrativa: contexto,
problema, estratégia/execução, resultado — além dos campos já existentes
(cliente, categoria, mídia). Nesta fase de demo, usar 1–2 cases placeholder
com todos os campos preenchidos como exemplo do formato, claramente
sinalizados como fictícios.

Quando possível, sinalizar em pelo menos um case a integração entre frentes
(ex: estratégia + identidade + conteúdo + tecnologia no mesmo projeto) — isso
demonstra operação integrada, não freelancers trabalhando em paralelo.

## 7. Nova peça de destaque: demonstração interativa do funil

Esta é a maior prioridade de diferenciação técnica do update. Adicionar uma
seção "Marketing que você consegue enxergar funcionando": um fluxo visual
(Anúncio → Landing Page → Formulário → CRM → Automação → Atendimento → Dados
→ Insight → Otimização) que revela métricas fictícias ao longo do scroll ou
interação, **claramente identificadas como demonstração/dados fictícios**.

Tecnicamente, esta é a peça que mais justifica GSAP + ScrollTrigger com
timeline complexa (pinning de seção, elementos que aparecem em sequência
amarrados ao progresso do scroll). Deve virar uma task própria em `tasks/`,
com prioridade alta — é o componente mais alinhado ao objetivo de "fugir do
genérico" por ser algo que a maioria dos concorrentes não tem.

## 8. Seção de saúde, sem dominar a página

Adicionar uma seção curta (não uma página inteira) do tipo "Começamos pela
saúde. Mas não precisamos terminar nela." — citando os subsegmentos
(médicos, clínicas, odontologia, estética, laboratórios) e deixando claro que
a metodologia não é exclusiva do setor. Pode ser uma seção compacta, não
precisa do mesmo peso visual das seções principais.

## 9. Manifesto (reduzido)

Manter uma versão curta do manifesto, não a versão longa. Fechar com a frase
de amarração já existente do Hero ("Toda marca tem um jeito de falar. A gente
encontra o seu."), evitando repetir o mesmo conceito em blocos de texto
extensos.

## 10. Instagram como extensão de cultura

Ajustar o framing da seção de Instagram: não é "siga a gente", é uma
continuação visual da marca (bastidores, processo, equipe), reforçando
cultura criativa — mantendo a implementação técnica já definida em
`docs/architecture.md` (fetch server-side + ISR).

## 11. CTAs intermediários

Adicionar CTAs curtos após as seções de serviços e de cases (ex: "Tem um
projeto em mente? → Vamos conversar" / "Quer construir algo assim para sua
marca? → Fale com a Sotaque"), além do CTA final já previsto.

---

## O que NÃO foi aprovado (não implementar)

- **Não** expandir a demo para as 12 seções completas de uma vez só. Este
  update deve ser incorporado de forma incremental ao roadmap atual — validar
  a base técnica (setup, hero, animações centrais) antes de assumir o escopo
  cheio de um site institucional completo.
- **Não** adaptar frases do site de um concorrente real (Oxe Marketing) —
  usar apenas a lógica estrutural descrita acima, com copy 100% original.
- **Não** criar uma "fundadora estrela"/autoridade única — a seção de equipe
  deve tratar as 5 pessoas com peso equivalente.
- **Não** posicionar a Sotaque como software house em nenhum texto — a
  tecnologia é meio, não identidade central da empresa.

## Como aplicar este update na prática

1. Atualizar `docs/brand.md` com o reposicionamento (seção 1) e a menção às
   6 frentes/equipe
2. Atualizar `docs/design.md` se necessário para cobrir a peça interativa do
   funil (seção 7) como componente de assinatura
3. Inserir novas tasks em `tasks/` para: seção de problema (2), processo (4),
   equipe (5), demonstração do funil (7) e seção de saúde (8), numeradas
   após as tasks existentes ou renumeradas conforme a nova ordem desejada
4. Atualizar `roadmap.md` para refletir a nova sequência de passos, mantendo
   o mesmo formato de checkbox e log de progresso já definido em `AGENTS.md`
