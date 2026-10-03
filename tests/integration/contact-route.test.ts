import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "@/app/api/contact/route";

describe("API Route: /api/contact (Integration)", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("retorna 200 com payload válido", async () => {
    const payload = {
      nome: "Carlos Eduardo",
      contato: "carlos@empresa.com.br",
      empresa: "Bahia Tech",
      mensagem: "Queremos desenvolver nova estratégia de marca 360.",
      consentimento: true,
      website: "",
    };

    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.message).toContain("Recebido com sucesso");
  });

  it("retorna 400 com erros de validação em payload incompleto", async () => {
    const payload = {
      nome: "",
      contato: "ab",
      empresa: "",
      mensagem: "oi",
      consentimento: false,
    };

    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.ok).toBe(false);
    expect(json.errors).toHaveProperty("nome");
    expect(json.errors).toHaveProperty("contato");
    expect(json.errors).toHaveProperty("empresa");
    expect(json.errors).toHaveProperty("mensagem");
    expect(json.errors).toHaveProperty("consentimento");
  });

  it("detecta bot e bloqueia envio quando o campo honeypot (website) for preenchido", async () => {
    const payload = {
      nome: "Bot Spam",
      contato: "bot@spam.com",
      empresa: "Crypto Spam",
      mensagem: "Buy crypto now http://spam.link",
      consentimento: true,
      website: "http://bot-site.com", // honeypot
    };

    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.ok).toBe(false);
    expect(json.errors._bot).toBe("Bot detectado.");
  });

  it("despacha notificação por e-mail via Resend quando RESEND_API_KEY estiver configurada", async () => {
    process.env.RESEND_API_KEY = "re_test_123456789";
    process.env.CONTACT_NOTIFICATION_EMAIL = "leads@sotaquecom.com.br";

    const fetchSpy = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "email_sent_ok" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );
    global.fetch = fetchSpy;

    const payload = {
      nome: "Beatriz Costa",
      contato: "+55 (71) 99876-5432",
      empresa: "Festival Salvador",
      mensagem: "Queremos uma proposta de cobertura audiovisual e design.",
      consentimento: true,
    };

    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer re_test_123456789",
        }),
      })
    );
  });

  it("retorna 500 sem vazar detalhes internos em caso de falha catastrófica de parsing", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "corrupted-json-{{{",
    });

    const res = await POST(req);
    expect(res.status).toBe(500);

    const json = await res.json();
    expect(json.ok).toBe(false);
    expect(json.errors._server).toBe("Erro interno. Tente novamente.");
    // Garante que stack trace ou segredos de ambiente não vazam na resposta
    expect(JSON.stringify(json)).not.toContain("SyntaxError");
  });
});
