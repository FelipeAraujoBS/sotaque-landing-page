import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ContactForm from "@/components/sections/ContactForm";

describe("ContactForm (Unit / Component)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("exibe mensagens de erro ao submeter com campos obrigatórios vazios", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const submitBtn = screen.getByRole("button", { name: /enviar mensagem/i });
    await user.click(submitBtn);

    expect(await screen.findByText(/obrigatório/i, { selector: "#err-nome" })).toBeInTheDocument();
    expect(screen.getByText(/obrigatório para retorno/i, { selector: "#err-contato" })).toBeInTheDocument();
    expect(screen.getByText(/obrigatório/i, { selector: "#err-empresa" })).toBeInTheDocument();
    expect(screen.getByText(/obrigatório/i, { selector: "#err-mensagem" })).toBeInTheDocument();
    expect(screen.getByText(/autorização obrigatória para envio/i)).toBeInTheDocument();
  });

  it("rejeita e-mail/contato com menos de 5 caracteres e aceita válido", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const contatoInput = screen.getByLabelText(/e-mail ou whatsapp para retorno/i);
    await user.type(contatoInput, "abc");
    await user.tab();

    expect(await screen.findByText(/informe e-mail ou telefone válido/i)).toBeInTheDocument();

    await user.clear(contatoInput);
    await user.type(contatoInput, "contato@empresa.com.br");
    await user.tab();

    await waitFor(() => {
      expect(screen.queryByText(/informe e-mail ou telefone válido/i)).not.toBeInTheDocument();
    });
    expect(await screen.findByText(/contato válido/i)).toBeInTheDocument();
  });

  it("desabilita botão durante o envio e exibe mensagem de sucesso", async () => {
    const user = userEvent.setup();

    let resolveFetch: (value: Response) => void;
    const fetchPromise = new Promise<Response>((resolve) => {
      resolveFetch = resolve;
    });

    global.fetch = vi.fn().mockReturnValue(fetchPromise);

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/^nome/i), "Mariana Silva");
    await user.type(screen.getByLabelText(/e-mail ou whatsapp/i), "mariana@sotaque.com");
    await user.type(screen.getByLabelText(/marca, empresa ou projeto/i), "Estúdio Viva");
    await user.type(screen.getByLabelText(/^mensagem/i), "Gostaria de estruturar o branding e comunicação da marca.");
    await user.click(screen.getByRole("checkbox", { name: /concordo em receber contato/i }));

    const submitBtn = screen.getByRole("button", { name: /enviar mensagem/i });
    await user.click(submitBtn);

    // Botão entra em estado desabilitado com indicador de envio
    expect(submitBtn).toBeDisabled();
    expect(screen.getByText(/enviando\.\.\./i)).toBeInTheDocument();

    // Resolve a resposta da API
    resolveFetch!(
      new Response(JSON.stringify({ ok: true, message: "Recebido com sucesso." }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    // Sucesso exibido e campos limpos
    expect(await screen.findByText(/mensagem enviada com sucesso/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^nome/i)).toHaveValue("");
    expect(screen.getByLabelText(/e-mail ou whatsapp/i)).toHaveValue("");
  });

  it("exibe mensagem amigável de erro se a API falhar", async () => {
    const user = userEvent.setup();

    global.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: false, errors: { _server: "Erro interno no servidor." } }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    );

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/^nome/i), "Mariana Silva");
    await user.type(screen.getByLabelText(/e-mail ou whatsapp/i), "mariana@sotaque.com");
    await user.type(screen.getByLabelText(/marca, empresa ou projeto/i), "Estúdio Viva");
    await user.type(screen.getByLabelText(/^mensagem/i), "Gostaria de estruturar o branding e comunicação da marca.");
    await user.click(screen.getByRole("checkbox", { name: /concordo em receber contato/i }));

    const submitBtn = screen.getByRole("button", { name: /enviar mensagem/i });
    await user.click(submitBtn);

    expect(await screen.findByText(/erro interno no servidor/i)).toBeInTheDocument();
  });
});
