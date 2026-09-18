import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Payload = {
  nome?: string;
  clinica?: string;
  mensagem?: string;
  email?: string; // honeypot opcional
};

function validate(data: Payload) {
  const errors: Record<string, string> = {};
  if (!data.nome || data.nome.trim().length < 2) {
    errors.nome = "Informe seu nome (mín. 2 caracteres).";
  }
  if (!data.clinica || data.clinica.trim().length < 2) {
    errors.clinica = "Informe sua clínica ou especialidade.";
  }
  if (!data.mensagem || data.mensagem.trim().length < 10) {
    errors.mensagem = "Mensagem muito curta — conte em 10+ caracteres.";
  }
  // honeypot: se email preenchido, é bot
  if (data.email && data.email.trim().length > 0) {
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

    // Simula envio — log no servidor (sem integração real de e-mail/CRM)
    console.log("[contact] novo envio simulado:", {
      nome: data.nome?.trim(),
      clinica: data.clinica?.trim(),
      mensagem: data.mensagem?.trim()?.slice(0, 200),
      at: new Date().toISOString(),
    });

    // Simula latência de 600ms
    await new Promise((r) => setTimeout(r, 600));

    return NextResponse.json({ ok: true, message: "Recebido com sucesso." });
  } catch (e) {
    console.error("[contact] erro", e);
    return NextResponse.json({ ok: false, errors: { _server: "Erro interno. Tente novamente." } }, { status: 500 });
  }
}
