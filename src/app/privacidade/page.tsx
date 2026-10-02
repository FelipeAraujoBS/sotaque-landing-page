import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_INFO } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Política de Privacidade & Proteção de Dados",
  description: "Diretrizes de privacidade, segurança da informação e tratamento de dados do Sotaque Estúdio 360.",
};

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#E3E8DE] text-[#102C2B] py-20 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Voltar */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#0E8A94] hover:underline mb-10"
        >
          <span>← Voltar ao início</span>
        </Link>

        {/* Título Principal */}
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-[#0E8A94]" aria-hidden />
          <span className="text-xs font-mono tracking-[0.16em] uppercase font-semibold text-[#0E8A94]">
            Segurança & Conformidade LGPD
          </span>
        </div>

        <h1 className="font-display font-extrabold text-[clamp(2.2rem,4vw,3.2rem)] leading-[0.98] tracking-tight mb-6">
          Política de Privacidade
        </h1>

        <p className="font-mono text-xs text-[#102C2B]/60 mb-12">
          Última atualização: Outubro de 2026 • Sotaque Estúdio 360
        </p>

        {/* Conteúdo Institucional */}
        <div className="space-y-8 font-body text-[15px] leading-relaxed text-[#102C2B]/85">
          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[#102C2B]">1. Compromisso com a Privacidade</h2>
            <p>
              O <strong>Sotaque Estúdio 360</strong> valoriza a confiança, a transparência e a segurança de todos os clientes, parceiros e visitantes de nossa plataforma. Esta Política descreve como tratamos e protegemos as informações fornecidas em nossos canais digitais, em estrita conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[#102C2B]">2. Coleta de Informações</h2>
            <p>
              Coletamos dados exclusivamente quando fornecidos de forma voluntária através do nosso formulário de contato ou canais diretos de atendimento:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Nome completo:</strong> para identificação e tratamento personalizado.</li>
              <li><strong>Contato (E-mail e/ou WhatsApp):</strong> para retorno de propostas, briefings e orçamentos.</li>
              <li><strong>Marca, Empresa ou Projeto:</strong> para entendimento do contexto e escopo de atendimento.</li>
              <li><strong>Mensagem descritiva:</strong> para diagnóstico prévio das necessidades criativas.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[#102C2B]">3. Finalidade do Tratamento</h2>
            <p>
              Os dados coletados são utilizados unicamente para:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Responder a solicitações de orçamento e diagnóstico estratégico.</li>
              <li>Envio de propostas comerciais e agendamento de reuniões de alinhamento.</li>
              <li>Garantir a segurança da plataforma e prevenir fraudes ou envios automatizados (anti-spam).</li>
            </ul>
            <p>
              <strong>Não comercializamos, alugamos ou compartilhamos</strong> suas informações com terceiros para fins de marketing ou disparos em massa.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[#102C2B]">4. Segurança e Confidencialidade</h2>
            <p>
              Adotamos medidas técnicas e administrativas aptas a proteger seus dados contra acessos não autorizados, perdas ou qualquer forma de tratamento inadequado. Todas as transmissões pelo site utilizam criptografia de ponta a ponta (HTTPS/TLS).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[#102C2B]">5. Seus Direitos como Titular</h2>
            <p>
              Em conformidade com o artigo 18 da LGPD, você pode, a qualquer momento, solicitar a confirmação da existência de tratamento, o acesso aos seus dados ou a revogação do consentimento com a imediata exclusão das informações de nossas bases.
            </p>
            <p>
              Para exercer seus direitos, basta entrar em contato direto pelo nosso canal oficial de privacidade:
            </p>
            <div className="p-4 rounded-xl border border-[#102C2B]/10 bg-white font-mono text-xs">
              <p><strong>Encarregado de Proteção de Dados (DPO) / Atendimento:</strong></p>
              <p className="mt-1">
                E-mail: <a href={`mailto:${CONTACT_INFO.email}`} className="text-[#0E8A94] underline">{CONTACT_INFO.email}</a>
              </p>
              <p>Localidade: {CONTACT_INFO.city} — {CONTACT_INFO.country}</p>
            </div>
          </section>
        </div>

        {/* Rodapé Interno da Página */}
        <div className="mt-16 pt-8 border-t border-[#102C2B]/10 flex items-center justify-between text-xs font-mono text-[#102C2B]/60">
          <span>© {new Date().getFullYear()} Sotaque Estúdio.</span>
          <Link href="/" className="hover:text-[#102C2B] transition-colors">
            Voltar à Página Principal ↑
          </Link>
        </div>
      </div>
    </main>
  );
}
