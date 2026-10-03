import { test, expect } from "@playwright/test";

test.describe("Regressão Visual (E2E)", () => {
  test.use({
    contextOptions: {
      reducedMotion: "reduce",
    },
  });

  test.skip(true, "Snapshots visuais pausados até a integração do brand kit oficial definitivo (conforme seção 6.8 do plano).");

  test("captura snapshot do Hero com fontes prontas e animações reduzidas", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    const hero = page.locator("#hero");
    await expect(hero).toHaveScreenshot("hero-section.png", {
      mask: [page.locator("#instagram")],
    });
  });

  test("captura snapshot da seção de Pilares", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    const pilares = page.locator("#pilares");
    await expect(pilares).toHaveScreenshot("pilares-section.png");
  });
});
