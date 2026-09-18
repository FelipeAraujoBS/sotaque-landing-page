# Sotaque — Website

Este projeto é o website institucional e portfólio da **Sotaque**, uma agência de marketing e comunicação 360º.

O site deve funcionar simultaneamente como:

1. apresentação da marca Sotaque;
2. vitrine dos serviços;
3. portfólio;
4. demonstração da capacidade criativa e tecnológica da equipe;
5. primeiro ponto de contato comercial com potenciais clientes.

O site não deve parecer apenas um "site de agência". **O próprio site deve ser uma demonstração daquilo que a Sotaque é capaz de criar.**

---

# ⚠️ REGRA PRINCIPAL DESTE TESTE

Estamos realizando uma primeira versão de teste da experiência.

Alguns elementos atualmente planejados são possivelmente excessivos, especialmente em relação a animações, efeitos e interações.

### NÃO EXCLUA ESSES ELEMENTOS.

Quando este documento indicar que determinado recurso deve ser temporariamente desativado:

- **comente o código em vez de apagá-lo;**
- preserve a implementação original;
- mantenha componentes, imports, estilos e lógica sempre que isso não quebrar o funcionamento;
- adicione um comentário indicando que o recurso foi desativado temporariamente;
- não substitua definitivamente uma implementação por outra sem necessidade.

A intenção é poder comparar facilmente:

**VERSÃO COM EFEITOS → VERSÃO SIMPLIFICADA**

e posteriormente voltar à versão anterior simplesmente removendo os comentários.

Exemplo:

```tsx
{
  /* TEMPORARIAMENTE DESATIVADO PARA TESTE
<ParallaxHero />
*/
}
```

ou:

```tsx
// TEMPORARIAMENTE DESATIVADO PARA TESTE
// <CustomCursor />
```

Não faça uma refatoração destrutiva neste momento.

---

# 1. O QUE DEVE SER MANTIDO

Os seguintes conceitos fazem parte da direção principal do projeto e devem permanecer.

## 1.1 Identidade Sotaque

O site deve transmitir:

- identidade;
- personalidade;
- sofisticação;
- criatividade;
- regionalidade;
- inovação;
- comunicação;
- proximidade.

A regionalidade não deve ser representada de maneira caricatural.

Evitar transformar "Bahia" em um conjunto de clichês visuais.

A ideia é que o sotaque apareça através de:

- linguagem;
- ritmo;
- fotografia;
- composição;
- referências culturais sutis;
- personalidade visual;
- maneira de apresentar conteúdo.

---

# 2. HERO

O Hero deve permanecer como uma das partes mais importantes da página.

Ele precisa comunicar rapidamente:

- quem é a Sotaque;
- o que fazemos;
- qual é nossa personalidade;
- por que a marca é diferente.

### Manter

- tipografia forte;
- headline marcante;
- identidade visual;
- CTA principal;
- composição editorial;
- algum nível de movimento;
- sensação de profundidade;
- elementos visuais que ajudem a apresentar a marca.

### Simplificar

O Hero atualmente possui muitos elementos simultâneos.

O objetivo agora é testar uma versão mais limpa.

**Não remover definitivamente os efeitos.**

Se houver:

- parallax;
- elementos flutuantes;
- cursor customizado;
- múltiplas animações;
- efeitos de entrada;
- elementos decorativos excessivos;

eles devem ser **comentados/desativados temporariamente**, quando indicado pelo código ou pela implementação, e não apagados.

A prioridade é descobrir se o Hero funciona bem com menos elementos.

---

# 3. MOTION / ANIMAÇÕES

Animação é importante para a experiência da Sotaque, mas não deve existir simplesmente porque é tecnicamente possível.

### Princípio:

> Movimento deve comunicar alguma coisa.

Uma animação pode:

- criar hierarquia;
- conduzir o olhar;
- revelar conteúdo;
- reforçar identidade;
- criar ritmo;
- melhorar a percepção de qualidade.

Ela não deve apenas "enfeitar".

---

## 3.1 Manter

Manter a possibilidade de utilizar:

- CSS animations;
- transitions;
- Motion/Framer Motion;
- animações de entrada;
- microinterações;
- hover states;
- transformações sutis.

---

## 3.2 Temporariamente desativar

Para o primeiro teste, reduzir a quantidade de efeitos simultâneos.

Principalmente:

- parallax excessivo;
- múltiplas camadas se movimentando ao mesmo tempo;
- efeitos contínuos;
- animações muito longas;
- efeitos que competem com o conteúdo;
- custom cursor;
- efeitos magnéticos generalizados;
- smooth scrolling artificial, caso esteja sendo utilizado apenas como efeito visual.

**Comentar, não apagar.**

---

# 4. STACK DE ANIMAÇÃO

O projeto atualmente contempla diferentes ferramentas de animação.

Não assumir que todas precisam estar ativas simultaneamente.

A primeira versão deve priorizar simplicidade.

### Preferência inicial

Usar:

- CSS;
- Motion/Framer Motion;

para a maior parte das interações.

### GSAP / ScrollTrigger

Pode permanecer instalado e preservado caso já esteja sendo utilizado.

Porém, não utilizar GSAP apenas porque ele está disponível.

Se uma interação específica realmente justificar GSAP, ela pode continuar.

Caso contrário, **comentar temporariamente a utilização**, preservando o código.

### Lenis / Smooth Scroll

Não deve ser obrigatório.

Testar primeiro o site utilizando o scroll nativo do navegador.

Se a experiência ficar melhor com smooth scrolling, podemos reativar posteriormente.

---

# 5. CUSTOM CURSOR

O cursor personalizado não é uma prioridade.

### Estado do teste:

**DESATIVADO TEMPORARIAMENTE.**

Não apagar.

Comentar a implementação e preservar o componente para podermos reativá-lo depois.

O objetivo é verificar se o site continua sofisticado sem depender desse recurso.

---

# 6. BOTÕES / MICROINTERAÇÕES

Microinterações devem permanecer.

Porém, devem ser discretas.

Manter:

- hover;
- focus;
- active;
- feedback visual;
- pequenas transições;
- estados de interação.

Evitar transformar cada elemento em uma animação.

O CTA principal pode possuir uma interação mais elaborada, desde que não prejudique a usabilidade.

---

# 7. SERVICES

A seção de serviços deve permanecer.

Ela deve apresentar claramente o que a Sotaque oferece.

Preferir uma organização por grandes capacidades, por exemplo:

- Estratégia;
- Branding / Design;
- Conteúdo & Audiovisual;
- Marketing Digital / Performance;
- Tecnologia;
- Dados & IA.

A organização final pode mudar conforme a identidade visual e o posicionamento comercial.

Não transformar a seção em uma lista enorme de tecnologias.

O cliente deve entender **o que resolvemos**, e não apenas quais ferramentas usamos.

---

# 8. PORTFÓLIO

O portfólio é uma das partes mais importantes do site.

### Manter

- apresentação visual forte;
- cards/projetos;
- filtros quando fizerem sentido;
- navegação para cases;
- estrutura baseada em dados;
- possibilidade de adicionar/remover projetos sem alterar componentes da interface.

Os projetos devem seguir, quando possível, a lógica:

**Problema → Estratégia → Execução → Resultado**

O portfólio não deve ser apenas uma galeria bonita.

Ele precisa demonstrar capacidade de resolver problemas reais.

---

# 9. DADOS DO PORTFÓLIO

Manter o portfólio separado da interface.

Exemplo:

```text
content/
└── cases.json
```

ou estrutura equivalente.

O componente visual não deve depender de dados escritos diretamente dentro do componente.

Isso permitirá posteriormente trocar:

```text
JSON
↓
CMS
```

sem precisar reconstruir toda a interface.

---

# 10. CASES FICTÍCIOS

Os cases fictícios existentes podem permanecer **durante o desenvolvimento/prototipação**.

Entretanto, eles não devem ser apresentados como clientes reais.

Quando forem utilizados no site público, devem ser claramente identificados como:

- Projeto conceitual;
- Concept;
- Projeto experimental;

ou equivalente.

Quando houver cases reais, substituir os conceituais.

Não criar resultados fictícios.

---

# 11. DEPOIMENTOS

Depoimentos placeholder não devem ser apresentados como depoimentos reais.

Se ainda não houver depoimentos reais:

- esconder/comentar temporariamente a seção;

ou

- apresentar claramente como conteúdo demonstrativo durante o protótipo.

Não utilizar:

> ⭐⭐⭐⭐⭐

como se fossem avaliações reais.

O código da seção deve ser preservado para futura utilização.

---

# 12. DNA / REGIONALIDADE

A seção que apresenta o DNA da Sotaque deve permanecer conceitualmente.

Ela é importante para explicar:

**por que Sotaque existe.**

Porém, a implementação atual pode estar visualmente sobrecarregada.

### Testar uma versão mais editorial.

Manter:

- narrativa;
- identidade;
- tipografia;
- elementos gráficos;
- sensação de profundidade;
- conteúdo relacionado à origem/persona da marca.

Testar temporariamente sem uma combinação excessiva de:

- sticky;
- parallax;
- radial gradients;
- múltiplas animações;
- line reveals;
- scrub;
- métricas decorativas;
- elementos simultâneos.

Novamente:

**comentar em vez de excluir.**

---

# 13. MÉTRICAS TÉCNICAS

Informações como:

```text
02 camadas de parallax
11 linhas reveladas
Lenis
ScrollTrigger
prefers-reduced-motion
```

não devem aparecer como conteúdo comercial do site.

Essas informações podem ser úteis para documentação técnica ou portfólio do desenvolvedor, mas não devem competir com a comunicação da Sotaque.

### Manter no código/documentação quando necessário.

### Remover da apresentação visual ao usuário.

Se já estiverem implementadas como elementos da interface, **comentar temporariamente em vez de apagar**, para podermos reutilizar caso necessário.

---

# 14. INSTAGRAM

A integração com Instagram pode permanecer como recurso futuro.

Porém:

**o site não deve depender do Instagram para funcionar.**

Se a API estiver implementada:

- preservar;
- manter fallback;
- evitar que uma falha externa quebre a página.

Durante o primeiro teste, uma versão simples pode ser suficiente.

A seção pode funcionar como:

> Enquanto isso, acompanhe a Sotaque no Instagram.

A integração automática pode ser ativada posteriormente.

---

# 15. FORMULÁRIO DE CONTATO

O formulário deve permanecer.

Manter:

- validação;
- feedback de sucesso;
- feedback de erro;
- acessibilidade;
- proteção básica contra spam.

Não é necessário criar uma experiência excessivamente complexa.

Evitar:

- delays artificiais;
- animações exageradas;
- estados que simulam processamento inexistente.

Se houver uma latência artificial de demonstração, ela deve ser **desativada/comentada para produção**, preservando o código se for útil para testes.

---

# 16. ACESSIBILIDADE

Isso NÃO deve ser removido durante a simplificação.

Manter:

- `prefers-reduced-motion`;
- navegação por teclado;
- focus states;
- contraste adequado;
- HTML semântico;
- `alt` em imagens;
- labels em formulários;
- suporte adequado a leitores de tela.

### IMPORTANTE

`prefers-reduced-motion` deve continuar implementado mesmo que os efeitos visuais sejam reduzidos.

Acessibilidade é requisito técnico, não elemento decorativo.

---

# 17. PERFORMANCE

A experiência visual não deve comprometer:

- carregamento;
- responsividade;
- Core Web Vitals;
- consumo excessivo de CPU/GPU;
- experiência mobile.

Especial atenção para:

- vídeos;
- imagens;
- efeitos contínuos;
- blur;
- parallax;
- grandes assets;
- JavaScript executado no cliente.

Sempre que possível:

**conteúdo primeiro, JavaScript depois.**

---

# 18. SERVER / CLIENT

Manter a separação entre Server Components e Client Components.

Preferir:

```text
Server Component
    ↓
dados / conteúdo
    ↓
Client Component
    ↓
interações
```

Não transformar toda a página em:

```tsx
"use client";
```

apenas para facilitar animações.

Interatividade deve ser isolada onde realmente necessária.

---

# 19. DESIGN TOKENS

Manter o sistema de tokens.

Exemplo:

```text
tokens.css
```

ou estrutura equivalente.

Os tokens devem permitir alterar rapidamente:

- cores;
- tipografia;
- espaçamento;
- radius;
- sombras;
- tamanhos;
- transições.

A identidade visual definitiva fornecida pela equipe de Design deve ter prioridade sobre qualquer valor provisório existente no código.

---

# 20. TECNOLOGIA COMO PARTE DA EXPERIÊNCIA

A tecnologia deve estar presente, mas não precisa ser exibida como demonstração técnica.

O cliente não precisa necessariamente saber que existe:

```text
Next.js
React
TypeScript
GSAP
Lenis
Framer Motion
```

O cliente precisa perceber:

- qualidade;
- velocidade;
- organização;
- interatividade;
- profissionalismo;
- criatividade.

A tecnologia deve sustentar a experiência.

Não competir com ela.

---

# 21. REGRA PARA ALTERAÇÕES

Antes de implementar uma mudança significativa:

1. entender a intenção;
2. identificar quais componentes serão afetados;
3. preservar o comportamento existente;
4. implementar a mudança;
5. testar;
6. verificar mobile;
7. verificar acessibilidade;
8. verificar performance.

Não fazer refatorações gigantes sem necessidade.

Não reescrever componentes funcionando apenas para "deixar o código mais bonito".

---

# 22. REGRA DE "COMENTAR, NÃO APAGAR"

Durante esta fase, quando uma funcionalidade for considerada excessiva:

### ERRADO

```text
deletar componente
deletar estilos
deletar dependência
deletar lógica
```

### PREFERÍVEL

```text
desativar
↓
comentar
↓
preservar
↓
testar
↓
comparar
```

Adicionar comentários claros:

```tsx
// TEMPORARIAMENTE DESATIVADO
// Teste de versão simplificada do Hero.
// Reativar caso a comparação A/B favoreça esta interação.
```

Quando possível, utilizar uma estrutura que facilite a reativação sem precisar reconstruir a implementação.

---

# 23. CRITÉRIO PRINCIPAL DE AVALIAÇÃO

Depois de desativar os efeitos excessivos, avaliar o site perguntando:

### Sem as animações, o site continua parecendo Sotaque?

Se a resposta for não, o problema provavelmente não está na quantidade de animação.

Pode estar em:

- identidade visual;
- tipografia;
- composição;
- fotografia;
- copy;
- espaçamento;
- hierarquia;
- direção de arte.

A animação deve **potencializar uma identidade que já funciona**, e não criar a identidade sozinha.

---

# 24. PRINCÍPIO DE DESIGN

Seguir estes princípios durante o desenvolvimento:

1. **Conteúdo antes da animação.**
2. **Identidade antes do efeito.**
3. **Uma interação protagonista por seção.**
4. **Movimento deve ter propósito.**
5. **Regionalidade sem caricatura.**
6. **Tecnologia deve sustentar a experiência.**
7. **Portfólio é produto, não decoração.**
8. **Cases devem mostrar problema → solução → resultado.**
9. **Performance faz parte do design.**
10. **A identidade visual oficial da Sotaque sempre prevalece sobre decisões provisórias de código.**

---

# 25. OBJETIVO DESTA VERSÃO

Esta versão não pretende ser necessariamente a versão final.

O objetivo é construir uma versão:

- mais limpa;
- mais rápida;
- mais legível;
- menos carregada;
- ainda sofisticada;
- ainda interativa;
- mais fácil de avaliar.

Depois disso, podemos reintroduzir individualmente os elementos desativados.

A ideia é descobrir:

> **Quais efeitos realmente melhoram a experiência da Sotaque e quais existem apenas porque podemos fazê-los?**

---

# 26. ORDEM DE PRIORIDADE

Quando houver conflito entre elementos, seguir esta ordem:

```text
1. Identidade da Sotaque
2. Clareza da comunicação
3. Conteúdo
4. Usabilidade
5. Acessibilidade
6. Performance
7. Responsividade
8. Interações
9. Animações
10. Efeitos decorativos
```

Um efeito visual nunca deve prejudicar os itens acima.

---

# 27. PAPEL DO LLM

O LLM deve atuar como:

- pair programmer;
- implementador;
- revisor técnico;
- auxiliar de arquitetura;
- auxiliar de UX/UI.

O LLM **não deve decidir sozinho a identidade da Sotaque**.

Quando existir conflito entre:

```text
"isso seria tecnicamente interessante"
```

e

```text
"isso não combina com a identidade da Sotaque"
```

a identidade deve prevalecer.

Da mesma forma, não implementar uma tecnologia apenas porque ela está disponível.

---

# 28. REGRA FINAL

Antes de apagar qualquer elemento importante do projeto, perguntar:

> "Isso precisa realmente ser removido ou apenas desativado para o teste?"

Durante esta fase:

**PREFIRA DESATIVAR A EXCLUIR.**

Queremos preservar a possibilidade de voltar à versão anterior sem precisar reconstruir o trabalho.

O projeto deve evoluir por comparação e iteração, não por destruição e reconstrução.
