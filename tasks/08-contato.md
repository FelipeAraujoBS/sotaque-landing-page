# Task 08 — Seção Contato/CTA final

## Objetivo
Fechar a página com conversão fácil: formulário curto + WhatsApp direto.

## Passos
1. Criar `app/api/contact/route.ts` (Route Handler) que recebe POST, valida
   os campos no servidor e (nesta demo) apenas loga/simula o envio
2. Criar `components/sections/ContactForm.tsx` (Client Component) com campos:
   nome, especialidade/clínica, mensagem
3. Validação em tempo real com microtransições de estado via Framer Motion
   (campo válido com feedback visual sutil, erro com leve "shake")
4. Botão de WhatsApp com o mesmo tratamento magnético do `MagneticButton`
   do hero (reuso do componente)

## Critérios de aceite
- Envio do formulário funciona ponta a ponta (mesmo que simulado no backend)
- Estados de validação são visíveis e acessíveis (não só cor — incluir texto/
  ícone de erro)
- Botão de WhatsApp reutiliza o componente `MagneticButton`, mantendo
  consistência com o hero
