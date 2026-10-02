"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { InstagramPost } from "@/lib/instagram";
import { CONTACT_INFO } from "@/lib/contact";

interface InstagramFeedClientProps {
  posts: InstagramPost[];
  isMock: boolean;
}

export default function InstagramFeedClient({ posts, isMock }: InstagramFeedClientProps) {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const instagramProfileUrl = CONTACT_INFO.instagram || "https://www.instagram.com/sotaquecom/";

  // Função para carregar mais 6 publicações (ou o restante se houver menos de 6)
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(posts.length, prev + 6));
      setIsLoadingMore(false);
    }, 280);
  };

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;
  const remainingCount = Math.min(6, posts.length - visibleCount);

  // Formata data amigável
  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
    } catch {
      return isoString.slice(0, 10);
    }
  };

  return (
    <section
      id="instagram"
      className="relative bg-[#F4F1E5] border-t border-[#0B1B47]/10 py-16 lg:py-24 text-[#0B1B47] overflow-hidden"
      aria-label="Instagram — preview do feed vivo"
    >
      {/* Aura Mesh: Luz ambiente quente e solar */}
      <div
        className="absolute top-10 -right-20 w-[480px] h-[480px] rounded-full bg-[#E27908]/07 blur-[150px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-5 left-1/4 w-[420px] h-[420px] rounded-full bg-[#E27908]/06 blur-[140px] pointer-events-none"
        aria-hidden
      />

      <div className="mx-auto max-w-content px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#E27908]" aria-hidden />
              <span className="text-xs tracking-[0.16em] uppercase font-semibold text-[#E27908]">
                Instagram ao Vivo
              </span>
            </div>
            <h2 className="font-['Commune',serif] font-bold tracking-tight text-[clamp(1.8rem,3.6vw,2.5rem)] text-[#0B1B47] leading-none">
              O estúdio no dia a dia
            </h2>
            <p className="mt-2.5 text-sm font-body text-[#0B1B47]/80 max-w-[54ch] leading-relaxed">
              Bastidores de produções, pensamento editorial, podcasts e discussões sobre cultura, design e comunicação de autoridade.
            </p>
          </div>

          <a
            href={instagramProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#0B1B47]/20 bg-white px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0B1B47] hover:bg-[#0B1B47] hover:text-[#F4F1E5] shadow-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B47]"
          >
            <span>@sotaquecom</span>
            <span aria-hidden className="text-[#E27908]">↗</span>
          </a>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            CASO 0: SEM POSTS DISPONÍVEIS (PRODUÇÃO SEM TOKEN DA API)
            Renderiza bloco elegante convidando para o canal oficial
            ───────────────────────────────────────────────────────────── */}
        {posts.length === 0 && (
          <div className="rounded-[1.6rem] border border-[rgba(11,27,71,0.08)] bg-white p-8 sm:p-12 text-center shadow-[0_1px_1px_rgba(11,27,71,0.04),0_4px_8px_rgba(11,27,71,0.04),0_16px_32px_rgba(11,27,71,0.06)] max-w-2xl mx-auto my-6">
            <span className="w-12 h-12 rounded-full bg-[#0B1B47]/05 border border-[#0B1B47]/10 grid place-items-center text-xl text-[#0B1B47] mx-auto mb-4 font-mono">
              ◈
            </span>
            <h3 className="font-['Commune',serif] font-bold text-xl sm:text-2xl text-[#0B1B47]">
              Acompanhe o estúdio em tempo real
            </h3>
            <p className="mt-3 text-sm text-[#0B1B47]/75 font-body max-w-md mx-auto leading-relaxed">
              Bastidores de produções, pensamento editorial, novos projetos e narrativas culturais direto no nosso canal oficial.
            </p>
            <div className="mt-6">
              <a
                href={instagramProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#E27908] hover:bg-[#C96B07] text-[#F4F1E5] px-6 py-3 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-200 shadow-sm"
              >
                <span>Acessar @sotaquecom</span>
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            CASO 1: APENAS 1 POST PUBLICADO (Layout Adaptativo Heroico)
            ───────────────────────────────────────────────────────────── */}
        {posts.length === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Card do Único Post (Destaque Ampliado) */}
            <div className="lg:col-span-7 rounded-[1.6rem] border border-[#0B1B47]/10 bg-white overflow-hidden shadow-lg flex flex-col group hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-[#0B1B47] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 30%, rgba(226,121,8,0.35), transparent 70%), linear-gradient(135deg, #0B1B47, #060E26)",
                  }}
                />
                <div className="absolute inset-0 grid place-items-center p-6">
                  <div className="text-center text-white">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xl">
                      {posts[0].media_type === "VIDEO" ? "▶" : posts[0].media_type === "CAROUSEL_ALBUM" ? "▦" : "◈"}
                    </span>
                    <p className="mt-3 text-xs font-mono tracking-widest uppercase text-white/75 font-semibold">
                      Última publicação no feed
                    </p>
                  </div>
                </div>

                <span className="absolute left-4 top-4 rounded-full bg-[#0B1B47]/80 backdrop-blur border border-white/20 text-[#F4F1E5] px-3 py-1 text-[10px] font-mono font-semibold tracking-wider uppercase">
                  {posts[0].media_type === "VIDEO" ? "Vídeo / Reel" : posts[0].media_type === "CAROUSEL_ALBUM" ? "Carrossel" : "Foto"}
                </span>

                <span className="absolute right-4 top-4 rounded-full bg-white/90 backdrop-blur text-[#0B1B47] px-3 py-1 text-[10px] font-mono font-bold">
                  {formatDate(posts[0].timestamp)}
                </span>
              </div>

              <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between gap-4">
                <p className="font-body text-base sm:text-lg leading-relaxed text-[#0B1B47]/90 font-medium">
                  “{posts[0].caption}”
                </p>

                <div className="pt-4 border-t border-[#0B1B47]/10 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-mono text-[#0B1B47]/70 font-semibold">
                    Publicado por @sotaquecom
                  </span>

                  <a
                    href={posts[0].permalink || instagramProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#0B1B47] text-white px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#E27908] transition-colors"
                  >
                    <span>Ver no Instagram</span>
                    <span aria-hidden>↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Card Editorial de Convite (Preenchimento Nobre) */}
            <div className="lg:col-span-5 rounded-[1.6rem] border border-[#0B1B47]/10 bg-gradient-to-br from-white via-[#FAF7EE] to-[#F4F1E5] p-6 sm:p-8 flex flex-col justify-between shadow-md">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E27908] text-white font-mono text-[10px] font-bold uppercase tracking-wider mb-5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  Comunidade & Bastidores
                </span>

                <h3 className="font-['Commune',serif] font-bold text-2xl sm:text-3xl text-[#0B1B47] leading-tight">
                  Nosso feed começou agora. Acompanhe a construção em tempo real.
                </h3>

                <p className="mt-4 text-sm font-body text-[#0B1B47]/80 leading-relaxed">
                  Estamos produzindo ensaios fotográficos autorais, gravações de videocasts, projetos de identidade visual e coberturas criativas. Siga o perfil para acompanhar as novas publicações e os bastidores das produções.
                </p>
              </div>

              <div className="pt-6 border-t border-[#0B1B47]/10 mt-6 flex flex-col gap-3">
                <a
                  href={instagramProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E27908] to-[#0B1B47] text-white py-3.5 px-6 text-xs font-mono font-bold uppercase tracking-wider hover:opacity-95 shadow-md shadow-[#E27908]/20 transition-all text-center"
                >
                  <span>Seguir @sotaquecom</span>
                  <span aria-hidden className="text-[#F4F1E5]">↗</span>
                </a>

                <span className="text-[11px] font-mono text-[#0B1B47]/60 text-center">
                  @sotaquecom • Salvador · Bahia
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            CASO 2: 2 POSTS (Grade Dupla Balanceada)
            ───────────────────────────────────────────────────────────── */}
        {posts.length === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-[1.6rem] border border-[#0B1B47]/10 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B47]"
                aria-label={post.caption}
              >
                <div className="relative aspect-[16/10] bg-[#0B1B47] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage:
                        post.media_type === "VIDEO"
                          ? "linear-gradient(135deg, rgba(11,27,71,0.25), rgba(226,121,8,0.2), #F4F1E5)"
                          : "linear-gradient(135deg, rgba(110,16,22,0.2), rgba(226,121,8,0.2), #F4F1E5)",
                    }}
                  />
                  <div className="absolute inset-0 grid place-items-center p-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/80 border border-[#0B1B47]/10 shadow-sm text-base text-[#0B1B47]">
                      {post.media_type === "VIDEO" ? "▶" : "◈"}
                    </span>
                  </div>
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 backdrop-blur px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-[#0B1B47]">
                    {post.media_type === "VIDEO" ? "Reel" : "Post"}
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 backdrop-blur px-2.5 py-0.5 text-[10px] font-mono font-semibold text-[#0B1B47]/75">
                    {formatDate(post.timestamp)}
                  </span>
                </div>
                <div className="p-6 flex flex-col justify-between flex-1 gap-3">
                  <p className="font-body text-sm leading-relaxed text-[#0B1B47]/85 line-clamp-3">
                    {post.caption}
                  </p>
                  <span className="text-xs font-mono font-bold text-[#E27908] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Ver publicação <span>↗</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            CASO 3: 3 OU MAIS POSTS (Grade Padrão com Paginação de 6 em 6)
            ───────────────────────────────────────────────────────────── */}
        {posts.length >= 3 && (
          <>
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3.5 lg:gap-5">
              <AnimatePresence mode="popLayout">
                {visiblePosts.map((post) => (
                  <motion.a
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-square overflow-hidden rounded-[1.4rem] border border-[#0B1B47]/10 bg-white shadow-sm hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B47]"
                    aria-label={post.caption.slice(0, 80)}
                  >
                    <div className="absolute inset-0">
                      <div
                        className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                        style={{
                          backgroundImage:
                            post.media_type === "VIDEO"
                              ? "linear-gradient(135deg, rgba(11,27,71,0.22), rgba(226,121,8,0.2), #F4F1E5)"
                              : post.media_type === "CAROUSEL_ALBUM"
                              ? "linear-gradient(135deg, rgba(226,121,8,0.2), #F4F1E5, #ECE8DC)"
                              : "linear-gradient(135deg, rgba(110,16,22,0.18), rgba(226,121,8,0.18), #F4F1E5)",
                        }}
                      />

                      {/* Ícone central simulado */}
                      <div className="absolute inset-0 grid place-items-center p-4">
                        <div className="text-center">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/85 backdrop-blur-md border border-[#0B1B47]/12 shadow-sm text-sm text-[#0B1B47] group-hover:scale-110 transition-transform">
                            {post.media_type === "VIDEO" ? "▶" : post.media_type === "CAROUSEL_ALBUM" ? "▦" : "◈"}
                          </span>
                          <p className="mt-3 hidden lg:block font-mono text-[11px] leading-tight text-[#0B1B47]/75 font-medium max-w-[18ch] mx-auto">
                            {formatDate(post.timestamp)}
                          </p>
                        </div>
                      </div>

                      {/* Caption no hover */}
                      <div
                        className="absolute inset-x-0 bottom-0 p-4 pt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          backgroundImage:
                            "linear-gradient(to top, rgba(11,27,71,0.92), rgba(11,27,71,0.5), transparent)",
                        }}
                      >
                        <p className="text-xs leading-snug text-white line-clamp-3 font-body">{post.caption}</p>
                        <span className="mt-2 text-[10px] font-mono text-[#E27908] font-semibold flex items-center gap-1">
                          Abrir no Instagram ↗
                        </span>
                      </div>
                    </div>

                    {/* Badge tipo */}
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 backdrop-blur border border-[#0B1B47]/10 px-2.5 py-0.5 text-[10px] font-mono font-semibold tracking-wider uppercase text-[#0B1B47]/80 shadow-sm">
                      {post.media_type === "VIDEO" ? "Reel" : post.media_type === "CAROUSEL_ALBUM" ? "Carrossel" : "Foto"}
                    </span>
                  </motion.a>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Controles de Paginação (Carregar Mais de 6 em 6) */}
            <div className="mt-10 flex flex-col items-center justify-center gap-3">
              {hasMore ? (
                <>
                  <motion.button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="inline-flex items-center gap-2.5 rounded-full border border-[#0B1B47]/20 bg-white px-7 py-3 text-xs font-mono font-bold uppercase tracking-wider text-[#0B1B47] hover:bg-[#0B1B47] hover:text-[#F4F1E5] shadow-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B47] disabled:opacity-50 cursor-pointer"
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoadingMore ? (
                      <>
                        <span className="h-3.5 w-3.5 rounded-full border-2 border-[#0B1B47]/30 border-t-[#0B1B47] animate-spin" aria-hidden />
                        <span>Carregando...</span>
                      </>
                    ) : (
                      <>
                        <span>Carregar mais publicações</span>
                        <span className="text-[#E27908] font-semibold">+{remainingCount}</span>
                        <span aria-hidden>↓</span>
                      </>
                    )}
                  </motion.button>

                  <span className="text-[11px] font-mono text-[#0B1B47]/60">
                    Exibindo {visiblePosts.length} de {posts.length} publicações
                  </span>
                </>
              ) : (
                <div className="text-center pt-2">
                  <p className="text-xs font-mono text-[#0B1B47]/70 font-medium">
                    Você visualizou todas as {posts.length} publicações recentes.
                  </p>
                  <a
                    href={instagramProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#E27908] hover:underline"
                  >
                    <span>Siga @sotaquecom para ver novos conteúdos diários</span>
                    <span aria-hidden>↗</span>
                  </a>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
