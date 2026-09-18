"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CaseItem } from "./Portfolio";
import CustomCursor from "@/components/motion/CustomCursor";

const categories = [
  { id: "todos", label: "Todos os Cases" },
  { id: "branding", label: "Branding" },
  { id: "conteudo", label: "Conteúdo" },
  { id: "midia", label: "Tráfego & Mídia" },
  { id: "audiovisual", label: "Audiovisual" },
] as const;

type CategoryId = (typeof categories)[number]["id"];

const categoryStyle: Record<string, string> = {
  branding: "bg-[#D63A2F]/15 text-[#D63A2F] border-[#D63A2F]/30",
  conteudo: "bg-[#58734A]/15 text-[#58734A] border-[#58734A]/30",
  midia: "bg-[#E7A92B]/15 text-[#E7A92B] border-[#E7A92B]/30",
  audiovisual: "bg-[#B85C42]/15 text-[#B85C42] border-[#B85C42]/30",
};

export default function PortfolioClient({ cases }: { cases: CaseItem[] }) {
  const [active, setActive] = useState<CategoryId>("todos");
  const [cursorActive, setCursorActive] = useState(false);

  const filtered =
    active === "todos" ? cases : cases.filter((c) => c.categoria === active);

  return (
    <section
      id="work"
      className="relative bg-[#102C2B] text-[#F3EBDD] border-b border-[#F3EBDD]/10 py-20 lg:py-28"
      aria-label="Portfólio vivo — cases"
    >
      <CustomCursor active={cursorActive} />

      <div className="mx-auto max-w-content px-6 lg:px-8">
        {/* Header do Portfólio */}
        <div className="grid grid-cols-12 gap-6 items-end mb-12">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#E7A92B]" aria-hidden />
              <span className="text-xs font-mono tracking-[0.16em] uppercase font-semibold text-[#E7A92B]">
                Portfólio Vivo • Sotaque Estúdio
              </span>
              <span className="hidden sm:inline text-xs font-mono text-[#F3EBDD]/50">
                • Casos Clínicos Reais
              </span>
            </div>

            <h2 className="font-display font-extrabold leading-[0.95] tracking-[-0.035em] text-[clamp(2.2rem,4.5vw,3.6rem)] text-[#F3EBDD]">
              Projetos que <span className="text-[#58734A]">ressoam</span> com o público de saúde
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:text-right">
            <p className="text-sm font-body leading-relaxed text-cream/70 max-w-[44ch] lg:ml-auto">
              Cada trabalho abaixo traduz a complexidade de clínicas e especialistas em comunicação elegante, ética e de alto impacto comercial.
            </p>
          </div>
        </div>

        {/* Filtros em Pílula (Estúdio Sotaque) */}
        <div
          className="flex flex-wrap items-center gap-2.5 mb-10"
          role="group"
          aria-label="Filtrar por categoria"
        >
          {categories.map((cat) => {
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                aria-pressed={isActive}
                aria-label={`Filtrar por ${cat.label}`}
                className={`relative rounded-full border px-5 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D63A2F] ${
                  isActive
                    ? "bg-[#F3EBDD] text-[#102C2B] border-[#F3EBDD] shadow-[0_0_20px_rgba(243,235,221,0.2)] font-bold"
                    : "bg-[#F3EBDD]/[0.05] text-[#F3EBDD]/70 border-[#F3EBDD]/15 hover:bg-[#F3EBDD]/[0.1] hover:text-[#F3EBDD] hover:border-[#F3EBDD]/30"
                }`}
              >
                {cat.label}
                {isActive && (
                  <motion.span
                    layoutId="portfolio-active"
                    className="absolute inset-0 rounded-full border border-[#F3EBDD] pointer-events-none"
                    transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
          <span className="ml-3 text-xs font-mono text-[#F3EBDD]/50 hidden md:inline">
            {filtered.length} projeto{filtered.length !== 1 ? "s" : ""} exibido{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Grid dos Cards de Cases */}
        <motion.div layout className="grid grid-cols-12 gap-5 lg:gap-6 auto-rows-fr">
          <AnimatePresence mode="popLayout">
            {filtered.map((c) => (
              <motion.article
                key={c.slug}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 12 }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                className="group relative col-span-12 md:col-span-6 lg:col-span-4 rounded-[1.6rem] border border-[#F3EBDD]/10 bg-[#163A39] overflow-hidden flex flex-col hover:border-[#F3EBDD]/25 hover:shadow-2xl transition-all duration-500 cursor-pointer focus-within:ring-2 focus-within:ring-[#D63A2F]"
                tabIndex={0}
                aria-label={`${c.cliente} — ${c.categoria}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                  }
                }}
                onMouseEnter={() => setCursorActive(true)}
                onMouseLeave={() => setCursorActive(false)}
                onFocus={() => setCursorActive(true)}
                onBlur={() => setCursorActive(false)}
              >
                {/* Visual Cover Banner com degradê oficial */}
                <div className="relative h-[210px] overflow-hidden bg-[#102C2B] border-b border-[#F3EBDD]/10">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    aria-hidden
                    style={{
                      backgroundImage:
                        c.categoria === "branding"
                          ? "radial-gradient(circle at 30% 30%, rgba(214,58,47,0.35), transparent 70%), linear-gradient(135deg, #163A39, #0C2120)"
                          : c.categoria === "conteudo"
                          ? "radial-gradient(circle at 30% 30%, rgba(88,115,74,0.35), transparent 70%), linear-gradient(135deg, #163A39, #0C2120)"
                          : c.categoria === "midia"
                          ? "radial-gradient(circle at 30% 30%, rgba(231,169,43,0.35), transparent 70%), linear-gradient(135deg, #163A39, #0C2120)"
                          : "radial-gradient(circle at 30% 30%, rgba(184,92,66,0.35), transparent 70%), linear-gradient(135deg, #163A39, #0C2120)",
                    }}
                  />

                  {/* Play / Preview Circle Button */}
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="h-13 w-13 rounded-full bg-white/10 border border-[#F3EBDD]/20 backdrop-blur-md grid place-items-center shadow-lg group-hover:scale-110 group-hover:bg-[#F3EBDD] group-hover:text-[#102C2B] transition-all duration-300">
                      <span className="ml-0.5 text-[#F3EBDD] group-hover:text-[#102C2B] text-sm transition-colors" aria-hidden>
                        ▶
                      </span>
                    </span>
                  </div>

                  {/* Category Pill Badge */}
                  <span
                    className={`absolute left-3.5 top-3.5 rounded-full border px-3 py-1 text-[10px] font-mono font-semibold tracking-widest uppercase backdrop-blur-md ${
                      categoryStyle[c.categoria] || "bg-white/10 text-[#F3EBDD] border-white/20"
                    }`}
                  >
                    {c.categoria}
                  </span>

                  {/* Identifier Slug */}
                  <span className="absolute right-3.5 bottom-3.5 rounded-full bg-[#102C2B]/80 backdrop-blur-md border border-[#F3EBDD]/10 text-[#F3EBDD]/70 text-[10px] font-mono px-2.5 py-0.5">
                    {c.slug}
                  </span>
                </div>

                {/* Conteúdo textual */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-bold leading-snug text-[#F3EBDD] text-[1.15rem] group-hover:text-[#D63A2F] transition-colors">
                    {c.cliente}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#F3EBDD]/65 line-clamp-3 flex-1 font-body">
                    {c.resumo}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[#F3EBDD]/[0.08] flex items-center justify-between">
                    <span className="text-xs font-mono text-[#F3EBDD]/40">
                      Case Study 360
                    </span>

                    <div className="flex items-center gap-1 text-xs font-mono font-semibold text-[#D63A2F] group-hover:translate-x-1 transition-transform">
                      Ver detalhes <span aria-hidden>↗</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-sm font-mono text-cream/50 py-16">
            Nenhum projeto registrado nesta categoria no momento.
          </p>
        )}

        <div className="mt-8 flex items-center justify-between text-xs font-mono text-cream/40 border-t border-white/10 pt-4">
          <span>JSON-driven: alimentado por content/cases.json</span>
          <span className="hidden sm:inline">AnimatePresence • Física de Cursor Ativa</span>
        </div>
      </div>
    </section>
  );
}
