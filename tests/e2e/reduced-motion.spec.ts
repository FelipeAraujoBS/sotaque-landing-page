import { test, expect } from "@playwright/test";

test.describe("Acessibilidade — prefers-reduced-motion (E2E)", () => {
  test.use({
    contextOptions: {
      reducedMotion: "reduce",
    },
  });

  test("mantém conteúdo essencial visível imediatamente sem exigir animações", async ({ page }) => {
    await page.goto("/");

    // Hero visível
    const heroH1 = page.locator("#hero h1");
    await expect(heroH1).toBeVisible();

    // Seções principais acessíveis e visíveis
    await expect(page.locator("#pilares")).toBeVisible();
    await expect(page.locator("#dna")).toBeVisible();
    await expect(page.locator("#work")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();

    // No modo reduced-motion, a palavra em destaque no Hero não fica invisível
    const highlight = heroH1.locator("em");
    await expect(highlight).toBeVisible();
  });
});
