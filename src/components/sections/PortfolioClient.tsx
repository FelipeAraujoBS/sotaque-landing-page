"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { CaseItem } from "./Portfolio";

const categories = [
  { id: "todos", label: "Todos os Cases" },
  { id: "branding", label: "Branding, ID & Gestão de Redes", color: "verde" },
  { id: "conteudo", label: "Narrativa, Conteúdo & Assessoria", color: "vinho" },
  { id: "midia", label: "Desenvolvimento Web & Performance", color: "azul" },
  { id: "audiovisual", label: "Produção Audiovisual", color: "dourado" },
] as const;

type CategoryId = (typeof categories)[number]["id"];

// Mapa dinâmico de cores dos pilares extraído diretamente da propriedade "color" de categories
const categoryColorLookup: Record<string, string> = {};
for (const cat of categories) {
  if ("color" in cat) {
    categoryColorLookup[cat.id] = cat.color;
  }
}

export type PillarTheme = {
  hex: string;
  badge: string;
  topLine: string;
  cardHoverBorder: string;
  cardGlow: string;
  titleHover: string;
  impactBg: string;
  dotBg: string;
  ctaHover: string;
};

const pillarColorThemes: Record<string, PillarTheme> = {
  verde: {
    hex: "#1E6838",
    badge: "bg-white/95 text-[#1E6838] border-[#1E6838]/30",
    topLine: "bg-[#1E6838]",
    cardHoverBorder: "hover:border-[#1E6838]/40",
    cardGlow: "hover:shadow-[0_12px_32px_rgba(30,104,56,0.12)]",
    titleHover: "group-hover:text-[#1E6838]",
    impactBg: "bg-[#1E6838]/08 border-[#1E6838]/20 text-[#1E6838]",
    dotBg: "bg-[#1E6838]",
    ctaHover: "group-hover:text-[#1E6838]",
  },
  vinho: {
    hex: "#6E1016",
    badge: "bg-white/95 text-[#6E1016] border-[#6E1016]/30",
    topLine: "bg-[#6E1016]",
    cardHoverBorder: "hover:border-[#6E1016]/40",
    cardGlow: "hover:shadow-[0_12px_32px_rgba(110,16,22,0.12)]",
    titleHover: "group-hover:text-[#6E1016]",
    impactBg: "bg-[#6E1016]/08 border-[#6E1016]/20 text-[#6E1016]",
    dotBg: "bg-[#6E1016]",
    ctaHover: "group-hover:text-[#6E1016]",
  },
  azul: {
    hex: "#0B1B47",
    badge: "bg-white/95 text-[#0B1B47] border-[#0B1B47]/30",
    topLine: "bg-[#0B1B47]",
    cardHoverBorder: "hover:border-[#0B1B47]/40",
    cardGlow: "hover:shadow-[0_12px_32px_rgba(11,27,71,0.14)]",
    titleHover: "group-hover:text-[#0B1B47]",
    impactBg: "bg-[#0B1B47]/08 border-[#0B1B47]/20 text-[#0B1B47]",
    dotBg: "bg-[#0B1B47]",
    ctaHover: "group-hover:text-[#0B1B47]",
  },
  dourado: {
    hex: "#A3721B",
    badge: "bg-white/95 text-[#A3721B] border-[#A3721B]/30",
    topLine: "bg-[#A3721B]",
    cardHoverBorder: "hover:border-[#A3721B]/40",
    cardGlow: "hover:shadow-[0_12px_32px_rgba(163,114,27,0.14)]",
    titleHover: "group-hover:text-[#A3721B]",
    impactBg: "bg-[#A3721B]/10 border-[#A3721B]/25 text-[#A3721B]",
    dotBg: "bg-[#A3721B]",
    ctaHover: "group-hover:text-[#A3721B]",
  },
};

const defaultTheme: PillarTheme = pillarColorThemes.azul;

function getCaseTheme(categoria: string): PillarTheme {
  const color = categoryColorLookup[categoria];
  return (color && pillarColorThemes[color]) || defaultTheme;
}

const partnerLogos = [
  {
    name: "Avon",
    src: "/logos/avon.svg",
    className: "h-7 sm:h-8 max-w-[120px]",
  },
  {
    name: "MRV Engenharia",
    src: "/logos/mrv.webp",
    className: "h-7 sm:h-8 max-w-[120px]",
  },
  {
    name: "Sicoob",
    src: "/logos/sicoob.webp",
    className: "h-7 sm:h-8 max-w-[130px]",
  },
  {
    name: "Budweiser",
    src: "/logos/budweiser.svg",
    className: "h-7 sm:h-8 max-w-[130px]",
  },
  {
    name: "Outback",
    src: "/logos/outback.svg",
    className: "h-7 sm:h-8 max-w-[120px]",
  },
  {
    name: "Bayer",
    src: "/logos/bayer.svg",
    className: "h-10 sm:h-12 max-w-[80px]",
  },
  {
    name: "McDonald's",
    src: "/logos/mcdonalds.svg",
    className: "h-9 sm:h-11 max-w-[70px]",
  },
  {
    name: "Esporte Clube Bahia",
    src: "/logos/ec-bahia.webp",
    className: "h-11 sm:h-12 max-w-[95px]",
  },
  {
    name: "CCR Metrô Bahia",
    src: "/logos/ccr-metro.png",
    className: "h-10 sm:h-11 max-w-[105px]",
  },
  {
    name: "DemocracyLab",
    src: "/logos/democracylab.svg",
    className: "h-8 sm:h-9 max-w-[130px]",
  },
  {
    name: "Workana",
    src: "/logos/workana.svg",
    className: "h-7 sm:h-8 max-w-[120px]",
  },
  {
    name: "Grau Técnico",
    src: "/logos/grau-tecnico.png",
    className: "h-9 sm:h-10 max-w-[110px]",
  },
  {
    name: "Natura",
    src: "/logos/natura.png",
    className: "h-9 sm:h-10 max-w-[100px]",
  },
  {
    name: "ALLOS",
    src: "/logos/allos.webp",
    className: "h-8 sm:h-9 max-w-[110px]",
  },
];

export default function PortfolioClient({ cases }: { cases: CaseItem[] }) {
  const [active, setActive] = useState<CategoryId>("todos");

  const filtered =
    active === "todos" ? cases : cases.filter((c) => c.categoria === active);

  return (
    <section
      id="work"
      className="relative bg-[#F4F1E5] text-[#0B1B47] border-t border-[#0B1B47]/10 pb-20 lg:pb-28 overflow-hidden"
      aria-label="Portfólio vivo — cases autorais"
    >
      {/* Luz ambiente artística nos fundos */}
      <div
        className="absolute top-1/4 -right-24 w-[600px] h-[600px] rounded-full bg-[#E27908]/06 blur-[160px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-1/3 -left-24 w-[500px] h-[500px] rounded-full bg-[#6E1016]/05 blur-[150px] pointer-events-none"
        aria-hidden
      />

      {/* Marquee de Clientes e Parceiros — Curadoria Monocromática Padrão Refokus */}
      <div className="mb-16 lg:mb-24 overflow-hidden border-y border-[#0B1B47]/10 bg-[#ECE8DC]/80 py-6 sm:py-7 backdrop-blur-sm">
        <div className="mx-auto max-w-content px-6 mb-3 flex items-center justify-between">
          <span className="text-xs font-mono tracking-[0.16em] uppercase text-[#0B1B47]/80 font-bold">
            Experiência & Trajetória
          </span>
        </div>
        <div className="flex items-center gap-12 sm:gap-16 md:gap-20 whitespace-nowrap animate-marquee">
          {[...partnerLogos, ...partnerLogos].map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300"
              title={logo.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.name}
                width={140}
                height={56}
                loading="lazy"
                decoding="async"
                className={`${logo.className} w-auto object-contain select-none`}
              />
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-content px-6 mt-3.5 flex justify-end">
          <p className="text-xs text-[#0B1B47]/60 font-mono text-right max-w-xl leading-relaxed">
            * As marcas exibidas foram atendidas ou representadas por membros da
            nossa equipe ao longo de suas carreiras. Não foram clientes diretas
            da Sotaque nem possuem contrato vigente conosco.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-content px-6 lg:px-8">
        {/* Header Editorial do Portfólio */}
        <div className="grid grid-cols-12 gap-6 items-end mb-14">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#E27908]" aria-hidden />
              <span className="text-xs font-mono tracking-[0.2em] uppercase font-semibold text-[#E27908]">
                Galeria de Cases & Criação Autoral
              </span>
            </div>

            <h2 className="font-['Commune',serif] font-normal leading-[1.04] tracking-[-0.03em] text-[clamp(2rem,3.8vw,3.2rem)] text-[#0B1B47]">
              Trabalhos com alma, <br />
              <span className="italic text-[#6E1016]">ousadia</span> e
              acabamento de estúdio.
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:text-right">
            <p className="text-[15px] font-body leading-relaxed text-[#0B1B47]/80 max-w-[42ch] lg:ml-auto">
              Cada projeto nasce da fusão entre a riqueza da cultura brasileira
              e a disciplina rigorosa do design e da narrativa contemporânea.
            </p>
          </div>
        </div>

        {/* Filtros em Pílula Estilo Galeria com Indicador de Cor do Pilar */}
        <div
          className="flex flex-wrap items-center gap-2.5 mb-12"
          role="group"
          aria-label="Filtrar por categoria"
        >
          {categories.map((cat) => {
            const isActive = active === cat.id;
            const colorKey = "color" in cat ? cat.color : undefined;
            const catTheme = colorKey ? pillarColorThemes[colorKey] : null;

            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                aria-pressed={isActive}
                aria-label={`Filtrar por ${cat.label}`}
                className={`relative rounded-full border px-5 py-2.5 text-xs font-mono tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B47] cursor-pointer inline-flex items-center gap-2 ${
                  isActive
                    ? "bg-[#0B1B47] text-[#F4F1E5] border-[#0B1B47] shadow-lg shadow-[#0B1B47]/15 font-semibold"
                    : "bg-white/80 text-[#0B1B47]/75 border-[#0B1B47]/12 hover:bg-white hover:text-[#0B1B47] hover:border-[#0B1B47]/30"
                }`}
              >
                {catTheme && (
                  <span
                    className={`w-2 h-2 rounded-full ${catTheme.dotBg} shrink-0`}
                    aria-hidden
                  />
                )}
                <span>{cat.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="portfolio-active"
                    className="absolute inset-0 rounded-full border border-[#0B1B47] pointer-events-none"
                    transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Grid de Cards de Alta Fidelidade (Padrão Studio Showcase com Cores dos Pilares) */}
        <motion.div
          layout
          className="grid grid-cols-12 gap-7 lg:gap-8 auto-rows-fr"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((c) => {
              const theme = getCaseTheme(c.categoria);

              return (
                <motion.article
                  key={c.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 16 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className={`group relative col-span-12 md:col-span-6 lg:col-span-4 rounded-[1.6rem] border border-[rgba(11,27,71,0.08)] bg-white overflow-hidden flex flex-col shadow-[0_1px_1px_rgba(11,27,71,0.04),0_4px_8px_rgba(11,27,71,0.04),0_16px_32px_rgba(11,27,71,0.06)] ${theme.cardHoverBorder} ${theme.cardGlow} transition-all duration-300`}
                  aria-label={`${c.cliente} — ${c.disciplina || c.categoria}`}
                >
                  {/* Linha superior indicadora da cor do pilar correspondente */}
                  <div className={`h-[3.5px] w-full ${theme.topLine}`} />

                  {/* Visual Mockup Container com Aspect Ratio 16:10 */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0B1B47] border-b border-[#0B1B47]/08">
                    {/* Imagem Retina do Case Otimizada (AVIF/WebP) */}
                    <Image
                      src={c.midia}
                      alt={c.cliente}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={82}
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />

                    {/* Gradiente de proteção sutil para legibilidade dos badges */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none"
                      aria-hidden
                    />

                    {/* Top Bar sobre a imagem: Categoria com cor do pilar e Ano */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                      <span className={`rounded-full border px-3 py-1 text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-md shadow-sm inline-flex items-center gap-1.5 ${theme.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${theme.dotBg}`} />
                        <span>{c.disciplina || c.categoria}</span>
                      </span>

                      {c.ano && (
                        <span className="rounded-full bg-black/40 backdrop-blur-md px-2.5 py-0.5 text-xs font-mono text-white/90 border border-white/20 font-semibold">
                          {c.ano}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Conteúdo Textual com Hierarquia Editorial Rigorosa */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className={`font-['Commune',serif] font-bold text-[1.35rem] leading-[1.1] text-[#0B1B47] ${theme.titleHover} transition-colors duration-300`}>
                        {c.cliente}
                      </h3>

                      <p className="mt-3 text-sm leading-[1.6] text-[#0B1B47]/85 font-body">
                        {c.resumo}
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-[#0B1B47]/08 flex flex-col gap-3">
                      {/* Selo de Impacto / Métrica com a cor do pilar */}
                      {c.impacto && (
                        <div className={`inline-flex items-center gap-2 text-xs font-mono font-medium rounded-lg px-3 py-1.5 w-fit border ${theme.impactBg}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${theme.dotBg}`} />
                          <span>{c.impacto}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1">
                        <span className={`text-xs font-mono font-bold uppercase tracking-wider text-[#0B1B47] ${theme.ctaHover} transition-colors flex items-center gap-1.5`}>
                          <span>Ver Estudo de Caso</span>
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-sm font-mono text-[#0B1B47]/75 py-20">
            Nenhum projeto encontrado nesta categoria no momento.
          </p>
        )}
      </div>
    </section>
  );
}
