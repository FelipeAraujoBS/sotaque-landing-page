"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CaseItem } from "./Portfolio";

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

const partnerLogos = [
  // Wide wordmarks (mantidas na proporção ideal já validada)
  { name: "Avon", src: "/logos/avon.svg", className: "h-7 sm:h-8 max-w-[130px]" },
  { name: "MRV Engenharia", src: "/logos/mrv.webp", className: "h-8 sm:h-9 max-w-[130px]" },
  { name: "Sicoob", src: "/logos/sicoob.webp", className: "h-8 sm:h-9 max-w-[140px]" },
  { name: "Budweiser", src: "/logos/budweiser.svg", className: "h-8 sm:h-9 max-w-[140px]" },
  { name: "Outback Steakhouse", src: "/logos/outback.svg", className: "h-8 sm:h-9 max-w-[130px]" },

  // Logos compactos / circulares / brasões (altura aumentada para equilibrar peso óptico)
  { name: "Bayer", src: "/logos/bayer.svg", className: "h-12 sm:h-14 md:h-16 max-w-[90px]" },
  { name: "McDonald's", src: "/logos/mcdonalds.svg", className: "h-11 sm:h-12 md:h-14 max-w-[80px]" },
  { name: "Esporte Clube Bahia", src: "/logos/ec-bahia.webp", className: "h-12 sm:h-13 md:h-15 max-w-[105px] scale-[1.15] origin-center" },
  { name: "CCR Metrô Bahia", src: "/logos/ccr-metro.png", className: "h-12 sm:h-13 md:h-14 max-w-[115px] scale-[1.25] origin-center" },

  // Logos médios com novas proporções equilibradas
  { name: "DemocracyLab", src: "/logos/democracylab.svg", className: "h-9 sm:h-10 md:h-11 max-w-[150px]" },
  { name: "Workana", src: "/logos/workana.svg", className: "h-8 sm:h-9 md:h-10 max-w-[140px]" },
  { name: "Grau Técnico", src: "/logos/grau-tecnico.png", className: "h-10 sm:h-11 md:h-12 max-w-[130px]" },
  { name: "Natura", src: "/logos/natura.png", className: "h-10 sm:h-11 md:h-12 max-w-[110px]" },
  { name: "ALLOS", src: "/logos/allos.webp", className: "h-9 sm:h-10 md:h-11 max-w-[120px]" },
];

export default function PortfolioClient({ cases }: { cases: CaseItem[] }) {
  const [active, setActive] = useState<CategoryId>("todos");

  const filtered =
    active === "todos" ? cases : cases.filter((c) => c.categoria === active);

  return (
    <section
      id="work"
      className="relative bg-[#F3EBDD] text-[#102C2B] border-t border-[#102C2B]/10 pb-12 lg:pb-16"
      aria-label="Portfólio vivo — cases"
    >
      {/* Marquee Infinito de Clientes e Parceiros — Fundo Areia Sotaque */}
      <div className="mb-14 lg:mb-20 overflow-hidden border-b border-[#102C2B]/10 bg-[#F3EBDD] py-7 sm:py-8 md:py-9">
        <div className="flex items-center gap-12 sm:gap-16 md:gap-20 whitespace-nowrap animate-marquee">
          {[...partnerLogos, ...partnerLogos].map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105"
              title={logo.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                decoding="async"
                className={`${logo.className} w-auto object-contain select-none`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-content px-6 lg:px-8">
        {/* Header do Portfólio */}
        <div className="grid grid-cols-12 gap-6 items-end mb-12">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#D63A2F]" aria-hidden />
              <span className="text-xs font-mono tracking-[0.16em] uppercase font-semibold text-[#D63A2F]">
                Portfólio Vivo • Sotaque Estúdio
              </span>
              <span className="hidden sm:inline text-xs font-mono text-[#102C2B]/75 font-medium">
                • Estudos Conceituais & Metodologia 360
              </span>
            </div>

            <h2 className="font-display font-extrabold leading-[0.95] tracking-[-0.035em] text-[clamp(2.2rem,4.5vw,3.6rem)] text-[#102C2B]">
              Projetos que <span className="text-[#58734A]">ressoam</span> com o público de saúde
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:text-right">
            <p className="text-sm font-body leading-relaxed text-[#102C2B]/80 max-w-[44ch] lg:ml-auto">
              Cada trabalho abaixo traduz a complexidade de clínicas e especialistas em comunicação elegante, ética e de alto impacto comercial.
            </p>
          </div>
        </div>

        {/* Filtros em Pílula (Estúdio Sotaque no Modo Creme) */}
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
                    ? "bg-[#102C2B] text-[#F3EBDD] border-[#102C2B] shadow-md font-bold"
                    : "bg-white/70 text-[#102C2B]/75 border-[#102C2B]/15 hover:bg-white hover:text-[#102C2B] hover:border-[#102C2B]/30"
                }`}
              >
                {cat.label}
                {isActive && (
                  <motion.span
                    layoutId="portfolio-active"
                    className="absolute inset-0 rounded-full border border-[#102C2B] pointer-events-none"
                    transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
          <span className="ml-3 text-xs font-mono text-[#102C2B]/75 hidden md:inline">
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
                className="group relative col-span-12 md:col-span-6 lg:col-span-4 rounded-[1.6rem] border border-[#102C2B]/10 bg-white overflow-hidden flex flex-col hover:border-[#102C2B]/25 hover:shadow-xl transition-all duration-500"
                aria-label={`${c.cliente} — ${c.categoria}`}
              >
                {/* Visual Cover Banner com degradê oficial */}
                <div className="relative h-[210px] overflow-hidden bg-[#102C2B] border-b border-[#102C2B]/10">
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

                  {/* Category Pill Badge */}
                  <span
                    className={`absolute left-3.5 top-3.5 rounded-full border px-3 py-1 text-[10px] font-mono font-semibold tracking-widest uppercase backdrop-blur-md ${
                      categoryStyle[c.categoria] || "bg-white/10 text-[#F3EBDD] border-white/20"
                    }`}
                  >
                    {c.categoria}
                  </span>

                  {/* Identifier Slug */}
                  <span className="absolute right-3.5 bottom-3.5 rounded-full bg-[#102C2B]/80 backdrop-blur-md border border-white/20 text-[#F3EBDD] text-[10px] font-mono px-2.5 py-0.5">
                    {c.slug}
                  </span>
                </div>

                {/* Conteúdo textual */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-bold leading-snug text-[#102C2B] text-[1.15rem] group-hover:text-[#D63A2F] transition-colors">
                    {c.cliente}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#102C2B]/80 line-clamp-3 flex-1 font-body">
                    {c.resumo}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[#102C2B]/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-[#102C2B]/70 font-medium">
                      Estudo de Caso 360
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#58734A] bg-[#58734A]/10 border border-[#58734A]/25 rounded-full px-2.5 py-0.5 font-semibold">
                      Projeto Conceitual
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-sm font-mono text-[#102C2B]/75 py-16">
            Nenhum projeto registrado nesta categoria no momento.
          </p>
        )}

        <div className="mt-8 flex items-center justify-between text-xs font-mono text-[#102C2B]/70 border-t border-[#102C2B]/10 pt-4">
          <span>{/* JSON-driven: alimentado por content/cases.json */}Casos clínicos com narrativa autoral e estratégia médica.</span>
          <span className="hidden sm:inline">{/* AnimatePresence • Física de Cursor Ativa */}Identidade visual, posicionamento e resultados éticos</span>
        </div>
      </div>
    </section>
  );
}
