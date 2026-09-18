# docs/design.md — Como a Sotaque deve parecer

## Status atual: sem assets finais

O time de audiovisual/design da Sotaque ainda vai entregar a identidade visual
definitiva (paleta de cores, tipografia, ilustrações, texturas). Esta demo **não
espera por isso** — ela deve ser construída com um sistema de **design tokens
provisórios**, isolado o suficiente para que trocar por assets reais depois seja
uma tarefa de configuração, não de reescrita.

### Regra prática
Todo valor de cor, fonte e espaçamento usado no projeto deve vir de um único
arquivo de tokens (ex: `styles/tokens.css` ou `tailwind.config.ts` estendido).
Nenhum componente deve ter cor/fonte hardcoded inline.

Tokens provisórios sugeridos para a demo (o agente pode ajustar dentro do
espírito "regional + inovador", mas devem ficar centralizados e claramente
comentados como `/* PLACEHOLDER — substituir com brand kit oficial */`):
- Uma cor de base terrosa/quente (remetendo a regionalidade) + uma cor de
  contraste mais moderna/saturada (remetendo a inovação)
- Uma fonte serifada ou com personalidade para títulos (não Inter/Poppins puro)
  + uma fonte neutra legível para corpo de texto

## Objetivo central: fugir do "genérico gerado por IA"

Este é um requisito de produto, não só gosto estético. Um site que "parece
feito por IA/template" mina a credibilidade de uma empresa de comunicação e
design. Evite ativamente estes padrões:

- Hero centralizado com blob de gradiente roxo/azul atrás do título
- Glassmorphism (cards translúcidos com blur) sem função clara
- Ícones de biblioteca genérica (Lucide/Heroicons) usados sem nenhum tratamento
- Grid de "features" com ícone + título + parágrafo, todos com peso visual igual
- Animação de entrada idêntica em toda a página (fade + slide-up genérico)
- Tipografia "seguríssima" sem nenhuma escolha de personalidade

O antídoto não é nunca usar essas ferramentas, é não deixar que elas formem
a estrutura *inteira* da página. Prefira assimetria intencional, ritmo variado
de animação entre seções, e pelo menos 2–3 detalhes de interação "feitos à mão"
(ver seção de animação).

## Diretrizes de layout

- Preferir **layouts assimétricos** (ex: bento grid customizado) a grids
  perfeitamente simétricos de 3 ou 4 colunas iguais
- Cada seção pode ter seu próprio "ritmo" de layout — não repetir a mesma
  estrutura de coluna em todas as seções

## Diretrizes de animação

Bibliotecas disponíveis: Framer Motion, GSAP + ScrollTrigger, Lenis (ver
`docs/architecture.md` para onde cada uma entra).

- **Animação deve servir a narrativa da seção**, não ser decoração uniforme.
  Seções institucionais/regionais podem ter ritmo mais lento e orgânico;
  seções de portfólio podem ter transições mais rápidas e diretas.
- Pelo menos os seguintes detalhes "de estúdio" devem existir na demo:
  - Texto do hero com split-text animado (entrada escalonada por palavra/linha)
  - Botão(ões) principais com efeito "magnetic" (reage à proximidade do cursor)
  - Transição de layout animada no filtro do portfólio (reorganização fluida,
    não sumiço/aparecimento seco)
  - Parallax em pelo menos 2 camadas em alguma seção (não uma imagem só se
    movendo mais devagar — múltiplas camadas com profundidades diferentes)
- Todas as animações devem respeitar `prefers-reduced-motion: reduce`,
  desabilitando ou reduzindo drasticamente o movimento nesse caso.
- Evitar excesso de 3D/WebGL "só para impressionar" — o setor é saúde, o
  movimento deve reforçar cuidado e confiança, não parecer vitrine tech.

## Acessibilidade (não negociável mesmo em demo)

- Contraste mínimo AA mesmo com os tokens provisórios
- Toda animação com alternativa estática via `prefers-reduced-motion`
- Navegação por teclado funcional em todos os elementos interativos
  (incluindo o filtro de portfólio e o formulário de contato)
