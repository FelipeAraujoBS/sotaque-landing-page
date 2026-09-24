import { getInstagramPosts } from "@/lib/instagram";

export const revalidate = 10800; // ISR 3h

export default async function InstagramFeed() {
  const { posts, isMock } = await getInstagramPosts(6);

  return (
    <section
      id="instagram"
      className="relative bg-[#ECE3D3] border-t border-[#102C2B]/10 py-16 lg:py-20 text-[#102C2B]"
      aria-label="Instagram — preview do feed"
    >
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#58734A]" aria-hidden />
              <span className="text-xs tracking-[0.16em] uppercase font-semibold text-[#58734A]">Instagram</span>
              <span className="hidden sm:inline text-xs font-mono text-[#102C2B]/75 font-medium">• ponte com o feed vivo</span>
            </div>
            <h2 className="font-display font-bold tracking-tight text-[clamp(1.7rem,3.5vw,2.4rem)] text-[#102C2B] leading-none">
              O estúdio no dia a dia
            </h2>
            <p className="mt-2 text-sm text-[#102C2B]/75 max-w-[52ch]">
              Bastidores, pensamento editorial e design em saúde em tempo real.
              {/* isMock: fallback mock em content/instagram-mock.json ativo */}
            </p>
          </div>
          <a
            href="https://www.instagram.com/sotaquecom/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#102C2B]/20 bg-white px-5 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#102C2B] hover:bg-[#102C2B] hover:text-[#F3EBDD] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D63A2F]"
          >
            @sotaquecom <span aria-hidden>↗</span>
          </a>
        </div>

        {/* Grid responsivo */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 lg:gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl border border-[#102C2B]/10 bg-white shadow-sm hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D63A2F]"
              aria-label={post.caption.slice(0, 80)}
            >
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  style={{
                    backgroundImage:
                      post.media_type === "VIDEO"
                        ? "linear-gradient(135deg, rgba(16,44,43,0.15), rgba(88,115,74,0.15), #F3EBDD)"
                        : post.media_type === "CAROUSEL_ALBUM"
                        ? "linear-gradient(135deg, rgba(184,92,66,0.15), #F3EBDD, #ECE3D3)"
                        : "linear-gradient(135deg, rgba(214,58,47,0.12), rgba(231,169,43,0.12), #F3EBDD)",
                  }}
                />
                {/* Conteúdo central simulado */}
                <div className="absolute inset-0 grid place-items-center p-4">
                  <div className="text-center">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[#102C2B]/15 shadow-sm text-sm text-[#102C2B]">
                      {post.media_type === "VIDEO" ? "▶" : post.media_type === "CAROUSEL_ALBUM" ? "▦" : "◈"}
                    </span>
                    <p className="mt-3 hidden lg:block font-mono text-[11px] leading-tight text-[#102C2B]/70 font-medium max-w-[18ch] mx-auto">
                      {post.timestamp.slice(0, 10)}
                    </p>
                  </div>
                </div>
                {/* Caption no hover */}
                <div
                  className="absolute inset-x-0 bottom-0 p-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundImage:
                      "linear-gradient(to top, rgba(16,44,43,0.85), rgba(16,44,43,0.4), transparent)",
                  }}
                >
                  <p className="text-xs leading-snug text-white line-clamp-2">{post.caption}</p>
                </div>
              </div>

              {/* Badge tipo */}
              <span className="absolute left-2 top-2 rounded bg-white/90 backdrop-blur border border-[#102C2B]/10 px-2 py-0.5 text-[10px] font-mono font-semibold tracking-wider uppercase text-[#102C2B]/75">
                {post.media_type === "VIDEO" ? "Reel" : post.media_type === "CAROUSEL_ALBUM" ? "Carrossel" : "Foto"}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#102C2B]/70 border-t border-[#102C2B]/10 pt-4">
          <span>
            {/* isMock ? "Dados mock em content/instagram-mock.json • Integração Graph API pronta." : "Dados ao vivo via Graph API" */}
            Acompanhe bastidores, lançamentos e reflexões em @sotaquecom
          </span>
          <span className="hidden sm:inline">Comunicação e Saúde • Sotaque Estúdio</span>
        </div>
      </div>
    </section>
  );
}
