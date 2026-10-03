import { test, expect } from "@playwright/test";

test.describe("Interações e Elementos Visuais do Hero (E2E)", () => {
  test("renderiza manchete monumental, fitas do Bonfim e botões de conversão", async ({ page }) => {
    await page.goto("/");

    const hero = page.locator("#hero");
    await expect(hero).toBeVisible();

    // H1 presente com texto principal
    const h1 = hero.locator("h1");
    await expect(h1).toContainText("Sua marca tem voz");
    await expect(h1).toContainText("Nós damos o");

    // Botões de ação primário e secundário conforme HERO_CONTENT
    const workCta = hero.locator('a[href="#work"]');
    await expect(workCta).toBeVisible();
    await expect(workCta).toContainText("Ver cases");

    const contactCta = hero.locator('a[href="#contact"]');
    await expect(contactCta).toBeVisible();
    await expect(contactCta).toContainText("Falar com a gente");

    // Fitinhas do Bonfim renderizadas com caminhos e textos
    const ribbons = hero.locator("svg");
    expect(await ribbons.count()).toBeGreaterThanOrEqual(1);

    const ribbonText = hero.locator('textPath, text').filter({ hasText: "LEMBRANÇA DO SENHOR DO BONFIM" });
    expect(await ribbonText.count()).toBeGreaterThanOrEqual(1);

    // Etiqueta de localização
    await expect(hero.locator("text=SALVADOR · BAHIA")).toBeVisible();
  });
});
