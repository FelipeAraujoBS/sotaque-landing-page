"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Pillar = {
  id: string;
  number: string;
  title: string;
  discipline: string;
  motto: string;
  tags: string[];
  metric: string;
  metricLabel: string;
  accentColor: string;
  accentText: string;
  badgeBg: string;
  cardImage: string;
};

const pillars: Pillar[] = [
  {
    id: "estrategia-branding",
    number: "01",
    title: "Estratégia & Branding",
    discipline: "Estratégia de Marca",
    motto: "Posicionamento claro, identidade inconfundível.",
    tags: [
      "Posicionamento",
      "Identidade",
      "Direção de Marca",
      "Naming",
      "Estratégia de Comunicação",
    ],
    metric: "Branding 360°",
    metricLabel: "Arquitetura autoral & posicionamento",
    accentColor: "#1E6838", // Verde
    accentText: "text-[#1E6838]",
    badgeBg: "bg-[#1E6838]/10 text-[#1E6838] border-[#1E6838]/25",
    cardImage: "/brand/servicos/branding-id-visual.jpg",
  },
  {
    id: "conteudo-audiovisual",
    number: "02",
    title: "Conteúdo & Audiovisual",
    discipline: "Cinema & Narrativa",
    motto: "Cinema com alma autoral, direção fina e inteligência artificial.",
    tags: [
      "Conteúdo",
      "Fotografia",
      "Filme",
      "Direção",
      "Roteiro",
      "Edição",
      "IA Generativa",
    ],
    metric: "Cinema & IA",
    metricLabel: "Narrativa documental & alta retenção",
    accentColor: "#6E1016", // Vinho
    accentText: "text-[#6E1016]",
    badgeBg: "bg-[#6E1016]/10 text-[#6E1016] border-[#6E1016]/25",
    cardImage: "/brand/servicos/storymaker-filmmaker.jpg",
  },
  {
    id: "presenca-comunidade",
    number: "03",
    title: "Presença & Comunidade",
    discipline: "Comunidade & Influência",
    motto: "Construção de audiência proprietária e conexão real.",
    tags: [
      "Redes Sociais",
      "Gestão de Comunidade",
      "Conteúdo Editorial",
      "Influência",
      "Presença Digital",
    ],
    metric: "Comunidade Viva",
    metricLabel: "Engajamento com peso cultural",
    accentColor: "#1E6838", // Verde
    accentText: "text-[#1E6838]",
    badgeBg: "bg-[#1E6838]/10 text-[#1E6838] border-[#1E6838]/25",
    cardImage: "/brand/servicos/redes-sociais.jpg",
  },
  {
    id: "digital-experiencias",
    number: "04",
    title: "Digital & Experiências",
    discipline: "Engenharia & UX/UI",
    motto: "Territórios digitais fluidos, velozes e sem limitações.",
    tags: [
      "Sites",
      "Landing Pages",
      "Plataformas",
      "Experiências Interativas",
      "UX/UI",
      "Desenvolvimento",
    ],
    metric: "Web & UX/UI",
    metricLabel: "Arquitetura digital de alto desempenho",
    accentColor: "#0B1B47", // Azul
    accentText: "text-[#0B1B47]",
    badgeBg: "bg-[#0B1B47]/10 text-[#0B1B47] border-[#0B1B47]/25",
    cardImage: "/brand/servicos/sites-landing-pages.jpg",
  },
  {
    id: "producao-broadcast",
    number: "05",
    title: "Produção & Broadcast",
    discipline: "Estúdio Multimídia",
    motto: "Voz, imagem e presença para liderar a conversa.",
    tags: [
      "Podcasts",
      "Videocasts",
      "Mesacasts",
      "Transmissões",
      "Captação",
      "Estúdio",
      "Pós-produção",
    ],
    metric: "Estúdio & Ao Vivo",
    metricLabel: "Captação multicâmera e pós-produção",
    accentColor: "#A3721B", // Cor atual (Mostarda Ocre)
    accentText: "text-[#A3721B]",
    badgeBg: "bg-[#A3721B]/12 text-[#A3721B] border-[#A3721B]/30",
    cardImage: "/brand/servicos/podcast-videocast.jpg",
  },
  {
    id: "relacoes-reputacao",
    number: "06",
    title: "Relações & Reputação",
    discipline: "PR & Institucional",
    motto: "A verdade da sua marca no centro da pauta cultural.",
    tags: [
      "Assessoria",
      "PR",
      "Relações Institucionais",
      "Relações Culturais",
      "Eventos",
      "Gestão de Reputação",
    ],
    metric: "PR & Reputação",
    metricLabel: "Repercussão nacional & valor de marca",
    accentColor: "#E27908", // Laranja
    accentText: "text-[#E27908]",
    badgeBg: "bg-[#E27908]/12 text-[#E27908] border-[#E27908]/30",
    cardImage: "/brand/servicos/assessoria-imprensa.jpg",
  },
];

export default function Pillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFolderModal, setActiveFolderModal] = useState<Pillar | null>(null);
  const [mousePos, setMousePos] = useState<{ [key: string]: { x: number; y: number } }>({});
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos((prev) => ({
      ...prev,
      [id]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

  const pillarsRow1 = pillars.slice(0, 3);
  const pillarsRow2 = pillars.slice(3, 6);

  const isHoveredRow1 = pillarsRow1.some((p) => p.id === hoveredId);
  const isHoveredRow2 = pillarsRow2.some((p) => p.id === hoveredId);

  // Proporções ultra-suaves de expansão do Bento Grid
  const getFlexGrow = (
    id: string,
    currentHoveredId: string | null,
    row: Pillar[]
  ) => {
    const isAnyInRowHovered = row.some((p) => p.id === currentHoveredId);
    if (!isAnyInRowHovered) {
      return 1;
    }
    if (currentHoveredId === id) {
      return 2.3;
    }
    return 0.85;
  };

  const renderCard = (p: Pillar, flexGrow: number) => {
    const isHovered = hoveredId === p.id;
    const isDimmed = hoveredId !== null && !isHovered;
    const pos = mousePos[p.id] || { x: 200, y: 150 };

    return (
      <div
        key={p.id}
        onMouseEnter={() => setHoveredId(p.id)}
        onMouseMove={(e) => handleMouseMove(p.id, e)}
        style={{
          flexGrow,
          flexShrink: 1,
          flexBasis: "0%",
          willChange: "flex-grow",
          transition:
            "flex-grow 700ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 500ms cubic-bezier(0.22, 1, 0.36, 1), border-color 400ms ease, opacity 400ms ease, background-color 400ms ease",
        }}
        className={`group relative rounded-[1.8rem] border overflow-hidden flex flex-col p-6 sm:p-7 lg:p-8 cursor-pointer select-none ${
          isHovered
            ? "bg-white border-[#0B1B47]/25 shadow-[0_24px_55px_rgba(11,27,71,0.12)] z-20"
            : isDimmed
            ? "bg-white/85 border-[rgba(11,27,71,0.06)] shadow-sm opacity-85 hover:opacity-100"
            : "bg-white/95 border-[rgba(11,27,71,0.08)] shadow-[0_1px_1px_rgba(11,27,71,0.04),0_4px_8px_rgba(11,27,71,0.04),0_16px_32px_rgba(11,27,71,0.06)]"
        }`}
      >
        {/* Spotlight dinâmico acionado pela posição do mouse */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(460px circle at ${pos.x}px ${pos.y}px, ${p.accentColor}18, transparent 70%)`,
          }}
          aria-hidden
        />

        {/* Linha superior com cor de acento do pilar */}
        <div
          className="absolute top-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-1.5"
          style={{ backgroundColor: p.accentColor }}
          aria-hidden
        />

        {/* Topo do Card: Número e Disciplina */}
        <div className="relative z-10 flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="h-8 w-8 rounded-xl font-mono text-xs font-bold grid place-items-center border shrink-0 transition-colors duration-400"
              style={{
                backgroundColor: `${p.accentColor}12`,
                borderColor: `${p.accentColor}30`,
                color: p.accentColor,
              }}
            >
              {p.number}
            </span>
            <span
              className={`text-[11px] font-mono tracking-widest uppercase font-semibold truncate transition-colors duration-400 ${
                isDimmed ? "text-[#0B1B47]/50" : "text-[#0B1B47]/70"
              }`}
            >
              {p.discipline}
            </span>
          </div>

          <span
            className={`font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border font-bold shrink-0 transition-all duration-400 ${
              p.badgeBg
            } ${isDimmed ? "hidden sm:inline-block scale-95" : ""}`}
          >
            {p.metric}
          </span>
        </div>

        {/* Título Principal em Commune */}
        <h3
          className={`relative z-10 font-['Commune',serif] font-bold text-xl sm:text-[1.35rem] leading-[1.14] text-[#0B1B47] transition-colors duration-400 ${
            isHovered ? "text-[#6E1016]" : ""
          }`}
        >
          {p.title}
        </h3>

        {/* Lema em Itálico Nobre */}
        <p className="relative z-10 font-serif italic text-xs text-[#6E1016] mt-2 mb-3 leading-relaxed">
          “{p.motto}”
        </p>

        {/* Tags / Serviços Oferecidos — Lista dinâmica elegante */}
        <div className="relative z-10 flex flex-wrap gap-1.5 sm:gap-2 my-auto py-2">
          {p.tags.map((tag) => (
            <span
              key={tag}
              className={`text-[11px] font-mono tracking-tight px-2.5 py-1 rounded-full border transition-all duration-400 ${
                isHovered
                  ? "bg-[#0B1B47]/06 border-[#0B1B47]/15 text-[#0B1B47] font-semibold"
                  : "bg-[#0B1B47]/03 border-[#0B1B47]/07 text-[#0B1B47]/70"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Rodapé do Card com Prévia Interativa da Pasta Oficial */}
        <div className="relative z-10 mt-5 pt-4 border-t border-[#0B1B47]/08 flex items-center justify-between gap-3">
          <span
            className={`text-xs font-mono font-medium transition-colors duration-400 truncate ${
              isHovered ? "text-[#E27908] font-semibold" : "text-[#0B1B47]/70"
            }`}
          >
            {p.metricLabel}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveFolderModal(p);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B1B47]/06 hover:bg-[#E27908] hover:text-[#F4F1E5] text-[#0B1B47] text-[11px] font-mono tracking-wider uppercase font-semibold transition-all duration-300 cursor-pointer shrink-0"
            aria-label={`Ver pasta de referência para ${p.title}`}
          >
            <span>Pasta</span>
            <span aria-hidden>↗</span>
          </button>
        </div>

        {/* Marca d'água monumental sutil de fundo */}
        <span
          className={`absolute -bottom-4 -right-2 font-['Commune',serif] font-black text-[6.5rem] leading-none tracking-tighter text-[#0B1B47]/[0.03] select-none pointer-events-none transition-all duration-600 ${
            isHovered ? "text-[#0B1B47]/[0.07] scale-110" : ""
          }`}
          aria-hidden
        >
          {p.number}
        </span>
      </div>
    );
  };

  return (
    <section
      id="pilares"
      ref={containerRef}
      className="relative text-[#0B1B47] border-t border-[#0B1B47]/10 overflow-hidden pt-24 lg:pt-32 pb-20 lg:pb-28 bg-[#F4F1E5]"
      aria-label="Serviços oferecidos — ecossistema criativo 360"
    >
      {/* Luz ambiente difusa no topo */}
      <div
        className="absolute -top-32 right-1/4 w-[600px] h-[500px] rounded-full bg-[#E27908]/06 blur-[160px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute top-48 -left-20 w-96 h-96 rounded-full bg-[#E27908]/06 blur-[140px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 left-10 w-96 h-96 rounded-full bg-[#6E1016]/05 blur-[150px] pointer-events-none"
        aria-hidden
      />

      <div className="mx-auto max-w-content px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#E27908]" aria-hidden />
              <span className="text-xs font-mono tracking-[0.2em] uppercase font-semibold text-[#E27908]">
                Ateliê de Disciplinas 360°
              </span>
            </div>

            <h2 className="font-['Commune',serif] font-normal leading-[0.94] tracking-[-0.03em] text-[clamp(2.4rem,4.8vw,4rem)] text-[#0B1B47]">
              Ousadia criativa, <br />
              <span className="italic text-[#6E1016]">rigor estratégico</span> e entrega de alto nível.
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:text-right">
            <p className="font-body text-[15px] leading-relaxed text-[#0B1B47]/80 max-w-[44ch] lg:ml-auto">
              Operamos sem intermediários e sem fórmulas prontas. Cada disciplina é conduzida por criadores que pensam a comunicação como arte e instrumento de poder.
            </p>
          </div>
        </div>
      </div>

      {/* Bento Grid Dinâmico com Expansão Ultra-Smooth no Hover */}
      <div
        className="mx-auto max-w-content px-6 lg:px-8 flex flex-col gap-5 lg:gap-6 min-h-[760px] lg:h-[760px]"
        onMouseLeave={() => setHoveredId(null)}
      >
        {/* Nível 1 do Bento: 3 Cards */}
        <div
          style={{
            flexGrow: isHoveredRow1 ? 1.35 : isHoveredRow2 ? 0.78 : 1,
            flexShrink: 1,
            flexBasis: "0%",
            willChange: "flex-grow",
            transition: "flex-grow 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease",
          }}
          className={`flex flex-col md:flex-row gap-5 lg:gap-6 w-full transition-opacity duration-500 ${
            isHoveredRow2 ? "opacity-85" : "opacity-100"
          }`}
        >
          {pillarsRow1.map((p) => renderCard(p, getFlexGrow(p.id, hoveredId, pillarsRow1)))}
        </div>

        {/* Nível 2 do Bento: 3 Cards */}
        <div
          style={{
            flexGrow: isHoveredRow2 ? 1.35 : isHoveredRow1 ? 0.78 : 1,
            flexShrink: 1,
            flexBasis: "0%",
            willChange: "flex-grow",
            transition: "flex-grow 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease",
          }}
          className={`flex flex-col md:flex-row gap-5 lg:gap-6 w-full transition-opacity duration-500 ${
            isHoveredRow1 ? "opacity-85" : "opacity-100"
          }`}
        >
          {pillarsRow2.map((p) => renderCard(p, getFlexGrow(p.id, hoveredId, pillarsRow2)))}
        </div>

        {/* Rodapé da Seção */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#0B1B47]/60 border-t border-[#0B1B47]/10 pt-4 mt-2">
          <span>Metodologia integrada: cada disciplina nutre a autoridade e a alma da marca.</span>
          <span className="hidden sm:inline">Bento Grid Dinâmico • Visão 360° Sotaque</span>
        </div>
      </div>

      {/* Modal / Gaveta de Exibição da Pasta Tátil Original */}
      {activeFolderModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Pasta oficial: ${activeFolderModal.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setActiveFolderModal(null)}
        >
          <div
            className="relative max-w-sm sm:max-w-md w-full bg-[#111827] text-[#F4F1E5] rounded-[2rem] p-6 border border-white/20 shadow-2xl overflow-hidden flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E27908] font-bold">
                  Documentação Original de Estúdio
                </span>
                <h4 className="font-['Commune',serif] text-lg font-bold">
                  {activeFolderModal.title}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setActiveFolderModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-sm font-mono transition-colors"
                aria-label="Fechar pasta"
              >
                ✕
              </button>
            </div>

            <div className="relative w-full max-h-[70vh] aspect-[9/16] rounded-xl overflow-hidden shadow-inner bg-black/40">
              <Image
                src={activeFolderModal.cardImage}
                alt={activeFolderModal.title}
                fill
                sizes="(max-width: 640px) 90vw, 420px"
                className="object-contain"
              />
            </div>

            <p className="mt-4 text-xs font-mono text-center text-[#F4F1E5]/60">
              Pasta tátil oficial criada pelo time de design da Sotaque.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
