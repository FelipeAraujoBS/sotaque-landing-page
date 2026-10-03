import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getInstagramPosts, type InstagramPost } from "@/lib/instagram";
import { mockInstagramFeedResponse } from "../mocks/fixtures/instagram-responses";

describe("Instagram Mapper & Helper (Unit)", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("retorna lista vazia em produção caso não haja token configurado", async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = "production";
    delete process.env.INSTAGRAM_ACCESS_TOKEN;

    const result = await getInstagramPosts();
    expect(result.posts).toEqual([]);
    expect(result.isMock).toBe(true);
  });

  it("retorna posts mockados em desenvolvimento caso não haja token", async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = "development";
    delete process.env.INSTAGRAM_ACCESS_TOKEN;

    const result = await getInstagramPosts(6);
    expect(result.posts.length).toBeLessThanOrEqual(6);
    expect(result.isMock).toBe(true);
    expect(result.posts[0]).toHaveProperty("id");
    expect(result.posts[0]).toHaveProperty("media_url");
  });

  it("busca e mapeia dados da API do Instagram com token configurado", async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = "production";
    process.env.INSTAGRAM_ACCESS_TOKEN = "valid_test_token";
    process.env.INSTAGRAM_USER_ID = "me";

    global.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(mockInstagramFeedResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const result = await getInstagramPosts(3);
    expect(result.isMock).toBe(false);
    expect(result.posts).toHaveLength(3);
    expect(result.posts[0].id).toBe("18012345678901234");
    expect(result.posts[0].media_type).toBe("IMAGE");
  });

  it("recai para fallback seguro em caso de falha de rede na API", async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = "development";
    process.env.INSTAGRAM_ACCESS_TOKEN = "valid_test_token";

    global.fetch = vi.fn().mockRejectedValue(new Error("Network timeout"));

    const result = await getInstagramPosts(4);
    expect(result.isMock).toBe(true);
    expect(result.posts.length).toBeGreaterThan(0);
  });
});
