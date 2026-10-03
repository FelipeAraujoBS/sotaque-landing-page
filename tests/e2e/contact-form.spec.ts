import { test, expect } from "@playwright/test";

test.describe("Formulário de Contato (E2E)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const formSection = page.locator("#contact");
    await formSection.scrollIntoViewIfNeeded();
  });

  test("submissão vazia bloqueia envio e destaca campos inválidos", async ({ page }) => {
    const submitBtn = page.locator('#contact button[type="submit"]');
    await submitBtn.click();

    // Mensagens de erro visíveis
    await expect(page.locator("#err-nome")).toBeVisible();
    await expect(page.locator("#err-contato")).toBeVisible();
    await expect(page.locator("#err-empresa")).toBeVisible();
    await expect(page.locator("#err-mensagem")).toBeVisible();

    // Atributos de acessibilidade
    await expect(page.locator("#nome")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#contato")).toHaveAttribute("aria-invalid", "true");
  });

  test("envio com sucesso exibe confirmação e reseta os campos", async ({ page }) => {
    let apiCallCount = 0;
    await page.route("**/api/contact", async (route) => {
      apiCallCount++;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, message: "Recebido com sucesso." }),
      });
    });

    await page.locator("#nome").fill("Clara Vasconcelos");
    await page.locator("#contato").fill("clara@estudioviva.com.br");
    await page.locator("#empresa").fill("Estúdio Viva Salvador");
    await page.locator("#mensagem").fill("Desejamos estruturar o reposicionamento da nossa marca.");
    await page.locator("#consentimento").check();

    const submitBtn = page.locator('#contact button[type="submit"]');
    await submitBtn.click();

    // Confirmação de sucesso
    await expect(page.locator("#form-status")).toContainText("Mensagem enviada com sucesso");
    expect(apiCallCount).toBe(1);

    // Campos são limpos após envio
    await expect(page.locator("#nome")).toHaveValue("");
    await expect(page.locator("#contato")).toHaveValue("");
    await expect(page.locator("#empresa")).toHaveValue("");
    await expect(page.locator("#mensagem")).toHaveValue("");
  });

  test("erro de servidor exibe mensagem de alerta e permite nova tentativa", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, errors: { _server: "Instabilidade momentânea. Tente novamente." } }),
      });
    });

    await page.locator("#nome").fill("Rodrigo Castro");
    await page.locator("#contato").fill("rodrigo@bahia.com");
    await page.locator("#empresa").fill("Bahia Cultural");
    await page.locator("#mensagem").fill("Proposta para nova campanha e produção de conteúdo.");
    await page.locator("#consentimento").check();

    const submitBtn = page.locator('#contact button[type="submit"]');
    await submitBtn.click();

    // Alerta de erro
    await expect(page.locator("#form-status")).toContainText("Instabilidade momentânea");

    // Botão é reabilitado para nova tentativa
    await expect(submitBtn).toBeEnabled();
  });

  test("duplo clique rápido no botão resulta em apenas uma requisição para a API", async ({ page }) => {
    let requestCount = 0;
    await page.route("**/api/contact", async (route) => {
      requestCount++;
      // Atraso intencional para verificar estado de loading e desabilitação
      await new Promise((r) => setTimeout(r, 600));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, message: "Recebido com sucesso." }),
      });
    });

    await page.locator("#nome").fill("Clara Vasconcelos");
    await page.locator("#contato").fill("clara@estudioviva.com.br");
    await page.locator("#empresa").fill("Estúdio Viva Salvador");
    await page.locator("#mensagem").fill("Desejamos estruturar o reposicionamento da nossa marca.");
    await page.locator("#consentimento").check();

    const submitBtn = page.locator('#contact button[type="submit"]');
    // Duplo clique imediato
    await submitBtn.dblclick();

    await expect(page.locator("#form-status")).toContainText("Mensagem enviada com sucesso");
    expect(requestCount).toBe(1);
  });
});
