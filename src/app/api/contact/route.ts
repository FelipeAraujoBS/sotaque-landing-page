import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Payload = {
  nome?: string;
  contato?: string;
  clinica?: string;
  mensagem?: string;
  consentimento?: boolean;
  website?: string; // honeypot invisível para bots
};

function validate(data: Payload) {
  const errors: Record<string, string> = {};
  if (!data.nome || data.nome.trim().length < 2) {
    errors.nome = "Informe seu nome (mín. 2 caracteres).";
  }
  if (!data.contato || data.contato.trim().length < 5) {
    errors.contato = "Informe seu e-mail ou WhatsApp para retorno.";
  }
  if (!data.clinica || data.clinica.trim().length < 2) {
    errors.clinica = "Informe sua clínica ou especialidade.";
  }
  if (!data.mensagem || data.mensagem.trim().length < 10) {
    errors.mensagem = "Mensagem muito curta — conte em 10+ caracteres.";
  }
  if (!data.consentimento) {
    errors.consentimento = "É necessário autorizar o contato para envio.";
  }
  // honeypot: se website preenchido, é bot
  if (data.website && data.website.trim().length > 0) {
    errors._bot = "Bot detectado.";
  }
  return errors;
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Payload;

    const errors = validate(data);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const leadInfo = {
      nome: data.nome?.trim(),
      contato: data.contato?.trim(),
      clinica: data.clinica?.trim(),
      mensagem: data.mensagem?.trim()?.slice(0, 500),
      consentimento: !!data.consentimento,
      at: new Date().toISOString(),
    };

    // Log seguro no servidor
    console.log("[contact] novo lead recebido:", leadInfo);

    // Envio real de e-mail via Resend se a chave RESEND_API_KEY estiver configurada
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "contato@sotaque.com.br";

    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Sotaque Leads <onboarding@resend.dev>",
            to: [notificationEmail],
            subject: `Novo Contato Médico: ${leadInfo.nome} (${leadInfo.clinica})`,
            html: `
              <h2>Novo contato recebido pelo site Sotaque</h2>
              <p><strong>Nome:</strong> ${leadInfo.nome}</p>
              <p><strong>Contato (Email/WhatsApp):</strong> ${leadInfo.contato}</p>
              <p><strong>Clínica / Especialidade:</strong> ${leadInfo.clinica}</p>
              <p><strong>Mensagem:</strong></p>
              <p>${leadInfo.mensagem}</p>
              <p><small>Consentimento LGPD confirmado em: ${leadInfo.at}</small></p>
            `,
          }),
        });
      } catch (err) {
        console.error("[contact] falha ao despachar e-mail via Resend:", err);
        // Não quebra a experiência do usuário final se a notificação falhar
      }
    }

    return NextResponse.json({ ok: true, message: "Recebido com sucesso." });
  } catch (e) {
    console.error("[contact] erro", e);
    return NextResponse.json({ ok: false, errors: { _server: "Erro interno. Tente novamente." } }, { status: 500 });
  }
}
