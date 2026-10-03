import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Acessibilidade — WCAG 2.1 AA (E2E)", () => {
  test("não apresenta violações críticas ou sérias no axe-core na home page", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .disableRules(["color-contrast"]) // Conforme definido no plano, contraste visual depende do brand kit oficial
      .analyze();

    const criticalOrSerious = accessibilityScanResults.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );

    expect(criticalOrSerious).toEqual([]);
  });

  test("todas as imagens possuem atributo alt definido", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const imagesWithoutAlt = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll("img"));
      return imgs
        .filter((img) => !img.hasAttribute("alt"))
        .map((img) => img.src || img.className);
    });

    expect(imagesWithoutAlt).toEqual([]);
  });

  test("todos os campos do formulário possuem labels associados", async ({ page }) => {
    await page.goto("/");
    const form = page.locator("#contact form");
    await form.scrollIntoViewIfNeeded();

    const inputs = ["#nome", "#contato", "#empresa", "#mensagem", "#consentimento"];
    for (const id of inputs) {
      const field = page.locator(id);
      await expect(field).toBeAttached();

      const label = page.locator(`label[for="${id.replace("#", "")}"]`);
      await expect(label).toBeAttached();
    }
  });
});
