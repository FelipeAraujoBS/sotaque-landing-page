import { test, expect } from "@playwright/test";

test.describe("SEO e Metadados Estruturados (E2E)", () => {
  test("HTML pré-renderizado inclui headline e conteúdo essencial antes da hidratação", async ({ request }) => {
    const res = await request.get("/");
    expect(res.status()).toBe(200);

    const html = await res.text();

    // Valida que o conteúdo principal está no HTML estático do SSR/SSG
    expect(html).toContain("Sua marca tem voz.");
    expect(html).toContain("Pilares");
    expect(html).toContain("Salvador");
  });

  test("possui exatamente um <h1> na página e tag lang no <html>", async ({ page }) => {
    await page.goto("/");

    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("pt-BR");
  });

  test("contém tags meta essenciais: title, description, canonical e Open Graph", async ({ page }) => {
    await page.goto("/");

    // Title
    const title = await page.title();
    expect(title.length).toBeGreaterThan(15);
    expect(title).toContain("Sotaque");

    // Meta Description
    const metaDesc = page.locator('meta[name="description"]');
    const descContent = await metaDesc.getAttribute("content");
    expect(descContent).toBeTruthy();
    expect(descContent!.length).toBeGreaterThan(40);

    // Canonical
    const canonical = page.locator('link[rel="canonical"]');
    expect(await canonical.count()).toBe(1);

    // Open Graph
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /.+/);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", /.+/);
  });

  test("dados estruturados JSON-LD estão presentes e possuem formato JSON válido", async ({ page }) => {
    await page.goto("/");

    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    const count = await jsonLdScript.count();
    expect(count).toBeGreaterThan(0);

    const content = await jsonLdScript.first().textContent();
    expect(content).toBeTruthy();

    const parsed = JSON.parse(content!);
    expect(parsed["@type"]).toBe("ProfessionalService");
    expect(parsed.name).toContain("Sotaque");
  });

  test("/robots.txt e /sitemap.xml respondem 200 com conteúdo válido", async ({ request }) => {
    const robotsRes = await request.get("/robots.txt");
    expect(robotsRes.status()).toBe(200);
    const robotsTxt = await robotsRes.text();
    expect(robotsTxt).toMatch(/user-agent:/i);
    expect(robotsTxt).toContain("Sitemap:");

    const sitemapRes = await request.get("/sitemap.xml");
    expect(sitemapRes.status()).toBe(200);
    const sitemapXml = await sitemapRes.text();
    expect(sitemapXml).toContain("<urlset");
    expect(sitemapXml).toContain("<loc>");
  });
});
