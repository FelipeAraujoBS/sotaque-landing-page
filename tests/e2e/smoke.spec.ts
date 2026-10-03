import { test, expect } from "@playwright/test";

test.describe("Smoke Test — Integridade Geral da Home", () => {
  test("carrega a home com status 200, todas as seções principais e sem erros de console", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    const failedRequests: string[] = [];
    page.on("response", (res) => {
      const url = res.url();
      // Monitora falhas em assets próprios do domínio
      if (res.status() >= 400 && url.includes("localhost")) {
        failedRequests.push(`${res.status()} ${url}`);
      }
    });

    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    // Garante presença de todas as seções canônicas da página
    await expect(page.locator("#hero")).toBeVisible();
    await expect(page.locator("#pilares")).toBeVisible();
    await expect(page.locator("#dna")).toBeVisible();
    await expect(page.locator("#work")).toBeVisible();
    await expect(page.locator("#depoimentos")).toBeVisible();
    await expect(page.locator("#instagram")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    // Valida ausência de requisições quebradas em assets próprios
    expect(failedRequests).toEqual([]);

    // Filtra erros de terceiros (ex: fontes externas ou extensões se houver)
    const criticalErrors = consoleErrors.filter(
      (err) => !err.includes("favicon") && !err.includes("third-party")
    );
    expect(criticalErrors).toEqual([]);
  });
});
