import mockPosts from "@/content/instagram-mock.json";

export type InstagramPost = {
  id: string;
  caption: string;
  media_url: string;
  permalink: string;
  timestamp: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
};

// PLACEHOLDER: substituir por fetch real quando houver credenciais
// fetch ocorre no servidor — nunca expor token no client
export async function getInstagramPosts(limit = 6): Promise<{ posts: InstagramPost[]; isMock: boolean }> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  // Se não houver credenciais, usa mock e sinaliza claramente
  if (!token || !userId) {
    // console.warn("[instagram] sem credenciais — usando mock");
    return { posts: (mockPosts as InstagramPost[]).slice(0, limit), isMock: true };
  }

  try {
    const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,permalink,timestamp,media_type&access_token=${token}&limit=${limit}`;
    const res = await fetch(url, { next: { revalidate: 60 * 60 * 3 } }); // ISR 3h
    if (!res.ok) throw new Error(`Instagram API ${res.status}`);
    const data = await res.json();
    const posts: InstagramPost[] = (data.data || []).slice(0, limit);
    if (posts.length === 0) throw new Error("empty");
    return { posts, isMock: false };
  } catch (e) {
    // fallback para mock em caso de erro
    // console.error("[instagram] fetch falhou, usando mock", e);
    return { posts: (mockPosts as InstagramPost[]).slice(0, limit), isMock: true };
  }
}
