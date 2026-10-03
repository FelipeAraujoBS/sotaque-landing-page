import { test, expect } from "@playwright/test";

test.describe("Seção Instagram ao Vivo (E2E)", () => {
  test("renderiza cabeçalho, botão do perfil e estrutura de feed ou fallback elegante", async ({ page }) => {
    await page.goto("/");

    const instaSection = page.locator("#instagram");
    await instaSection.scrollIntoViewIfNeeded();
    await expect(instaSection).toBeVisible();

    // Cabeçalho da seção
    await expect(instaSection.locator("h2")).toContainText("O estúdio no dia a dia");

    // Botão oficial do perfil do Instagram
    const profileLink = instaSection.locator('a[href*="instagram.com/sotaquecom"]');
    await expect(profileLink.first()).toBeVisible();
    await expect(profileLink.first()).toHaveAttribute("target", "_blank");
    await expect(profileLink.first()).toHaveAttribute("rel", "noopener noreferrer");

    // Verifica se há posts renderizados OU o fallback oficial elegante
    const posts = instaSection.locator('article, a[href*="instagram.com/p/"]');
    const fallbackNotice = instaSection.locator("text=Acompanhe o estúdio em tempo real");

    const postsCount = await posts.count();
    const hasFallback = await fallbackNotice.count();

    expect(postsCount > 0 || hasFallback > 0).toBe(true);
  });
});
