import { test, expect } from "@playwright/test";

test.describe("Navegação e Âncoras Globais (E2E)", () => {
  test("links da navbar desktop navegam até as seções correspondentes", async ({ page, isMobile }) => {
    test.skip(isMobile, "Teste exclusivo para viewports desktop.");
    test.slow();

    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const navLinks = [
      { label: "Pilares", targetId: "#pilares" },
      { label: "Manifesto", targetId: "#dna" },
      { label: "Portfólio", targetId: "#work" },
      { label: "Insta Live", targetId: "#instagram" },
      { label: "Contato", targetId: "#contact" },
    ];

    for (const item of navLinks) {
      const link = page.locator(`header nav a:has-text("${item.label}")`);
      await expect(link).toBeVisible();
      await link.click();

      const targetSection = page.locator(item.targetId);
      await expect(targetSection).toBeInViewport({ timeout: 10000 });

      // Aguarda estabilização do scroll suave do Lenis (ou passa direto se reduced-motion)
      await page.waitForFunction(() => {
        const lenis = (window as any).__lenis;
        return !lenis || !lenis.isScrolling;
      }, { timeout: 3000 }).catch(() => {});
    }
  });

  test("menu mobile abre gaveta, permite navegação e fecha com ESC ou clique em link", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Teste exclusivo para viewports mobile.");

    await page.goto("/");

    const openMenuButton = page.getByRole("button", { name: /abrir menu/i });
    await expect(openMenuButton).toBeVisible();
    await openMenuButton.click();

    // Drawer visível
    const drawer = page.locator("#drawer-menu");
    await expect(drawer).toBeVisible();

    // Fecha via ESC
    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();

    // Reabre e navega por um link
    await openMenuButton.click();
    await expect(drawer).toBeVisible();

    const contactLink = drawer.locator('a[href="#contact"]').first();
    await contactLink.click();

    // Drawer fecha após navegação
    await expect(drawer).toBeHidden();
    await expect(page.locator("#contact")).toBeInViewport({ timeout: 5000 });
  });

  test("links do footer possuem URLs válidas e links externos possuem rel='noopener noreferrer'", async ({ page }) => {
    await page.goto("/");

    const footerLinks = page.locator("footer a");
    const count = await footerLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = footerLinks.nth(i);
      const href = await link.getAttribute("href");
      expect(href).toBeTruthy();

      const target = await link.getAttribute("target");
      if (target === "_blank") {
        const rel = await link.getAttribute("rel");
        expect(rel).toContain("noopener");
        expect(rel).toContain("noreferrer");
      }
    }
  });

  test("botão 'Topo' no rodapé rola suavemente até o Hero", async ({ page }) => {
    await page.goto("/");

    // Rola até o footer
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();

    const backToTopBtn = page.locator('footer a[aria-label="Voltar ao topo da página"]');
    await expect(backToTopBtn).toBeVisible();
    await backToTopBtn.click();

    await expect(page.locator("#hero")).toBeInViewport({ timeout: 5000 });
  });
});
