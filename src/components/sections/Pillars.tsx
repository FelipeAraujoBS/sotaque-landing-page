"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Pillar = {
  id: string;
  number: string;
  title: string;
  discipline: string;
  motto: string;
  phrase: string;
  metric: string;
  metricLabel: string;
  accentColor: string;
  accentText: string;
  badgeBg: string;
  cardImage: string;
};

const pillars: Pillar[] = [
  {
    id: "branding",
    number: "01",
    title: "Branding, ID Visual & Papelaria",
    discipline: "Arquitetura de Marca",
    motto: "Marcas com espinha dorsal e voz inconfundível.",
    phrase: "Concepção de naming, tipografia autoral, paleta de choque e manuais completos. Da expressão digital à papelaria tátil em alta gramatura que impõe respeito no primeiro contato.",
    metric: "Design & Tangibilidade",
    metricLabel: "Identidade autoral sem concessões",
    accentColor: "#6E1016", // Vinho Profundo
    accentText: "text-[#6E1016]",
    badgeBg: "bg-[#6E1016]/10 text-[#6E1016] border-[#6E1016]/25",
    cardImage: "/brand/servicos/branding-id-visual.jpg",
  },
  {
    id: "audiovisual",
    number: "02",
    title: "Filmmaker, Cinema & IA",
    discipline: "Produção Audiovisual",
    motto: "Cinema com alma autoral e tecnologia de ponta.",
    phrase: "Roteiros ousados, direção de fotografia em 4K e captação presencial. Edição ágil acelerada por inteligência artificial com refinamento artesanal de diretor para documentários e campanhas.",
    metric: "4K Cinema & IA",
    metricLabel: "Narrativa documental & alta retenção",
    accentColor: "#0B1B47", // Azul Meia-Noite
    accentText: "text-[#0B1B47]",
    badgeBg: "bg-[#0B1B47]/10 text-[#0B1B47] border-[#0B1B47]/25",
    cardImage: "/brand/servicos/storymaker-filmmaker.jpg",
  },
  {
    id: "redes",
    number: "03",
    title: "Gestão de Presença & Comunidade",
    discipline: "Estratégia de Redes",
    motto: "Não publicamos para preencher feed. Criamos obsessão.",
    phrase: "Linha editorial magnética com a densidade cultural da sua marca. Conteúdo que constrói audiência proprietária, autoridade indiscutível e conexão real com o público.",
    metric: "Comunidade 360°",
    metricLabel: "Engajamento com peso cultural",
    accentColor: "#2F7C4B", // Verde Tropical
    accentText: "text-[#2F7C4B]",
    badgeBg: "bg-[#2F7C4B]/12 text-[#2F7C4B] border-[#2F7C4B]/30",
    cardImage: "/brand/servicos/redes-sociais.jpg",
  },
  {
    id: "web",
    number: "04",
    title: "Plataformas Web & Experiências",
    discipline: "Design & Engenharia Web",
    motto: "Seu território digital sem limitações de templates.",
    phrase: "Interfaces contemporâneas de alto padrão, código limpo, micro-interações fluidas e carregamento instantâneo. Feito para marcas que exigem elegância máxima e conversão real.",
    metric: "Web & Conversão",
    metricLabel: "Arquitetura viva e interativa",
    accentColor: "#E27908", // Laranja Solar
    accentText: "text-[#E27908]",
    badgeBg: "bg-[#E27908]/15 text-[#E27908] border-[#E27908]/30",
    cardImage: "/brand/servicos/sites-landing-pages.jpg",
  },
  {
    id: "podcast",
    number: "05",
    title: "Podcast, Videocast & Mesacast",
    discipline: "Estúdio Multimídia",
    motto: "Conversas que viram referência e pauta.",
    phrase: "Estrutura completa de gravação com captação multicâmera, direção de palco, pós-produção acústica, vinhetas originais e distribuição estratégica nas principais plataformas.",
    metric: "Estúdio & Cortes",
    metricLabel: "Autoridade amplificada em áudio e vídeo",
    accentColor: "#A3721B", // Mostarda Ocre
    accentText: "text-[#A3721B]",
    badgeBg: "bg-[#A3721B]/15 text-[#A3721B] border-[#A3721B]/30",
    cardImage: "/brand/servicos/podcast-videocast.jpg",
  },
  {
    id: "imprensa",
    number: "06",
    title: "Assessoria & Relações Culturais",
    discipline: "Comunicação Institucional",
    motto: "Toda marca tem uma verdade que merece manchete.",
    phrase: "Posicionamento estratégico nos veículos que moldam opinião e conexão com formadores de mercado. Para dentro de casa: alinhamento de lideranças e fortalecimento da cultura de time.",
    metric: "RP & Cultura",
    metricLabel: "Repercussão nacional & time alinhado",
    accentColor: "#6E1016", // Vinho Profundo
    accentText: "text-[#6E1016]",
    badgeBg: "bg-[#6E1016]/10 text-[#6E1016] border-[#6E1016]/25",
    cardImage: "/brand/servicos/assessoria-imprensa.jpg",
  },
];

export default function Pillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFolderModal, setActiveFolderModal] = useState<Pillar | null>(null);
  const [mousePos, setMousePos] = useState<{ [key: string]: { x: number; y: number } }>({});

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

      {/* Grid Estável de 6 Pilares — Tratamento Unificado (Fase 2.2 / 2.5) */}
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {pillars.map((p) => {
            const pos = mousePos[p.id] || { x: 200, y: 150 };

            return (
              <div
                key={p.id}
                onMouseMove={(e) => handleMouseMove(p.id, e)}
                className="group relative rounded-[1.6rem] border border-[rgba(11,27,71,0.08)] bg-white/95 overflow-hidden flex flex-col p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(11,27,71,0.22)] shadow-[0_1px_1px_rgba(11,27,71,0.04),0_4px_8px_rgba(11,27,71,0.04),0_16px_32px_rgba(11,27,71,0.06)] focus-within:ring-2 focus-within:ring-[#0B1B47]"
              >
                {/* Spotlight único com acento solar (#E27908) */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(460px circle at ${pos.x}px ${pos.y}px, rgba(226, 121, 8, 0.08), transparent 70%)`,
                  }}
                  aria-hidden
                />

                {/* Linha superior sutil em vinho */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-[#6E1016]/40 transition-all duration-300 group-hover:bg-[#6E1016] group-hover:h-1.5"
                  aria-hidden
                />

                {/* Topo do Card: Índice em Vinho e Pílula Neutra */}
                <div className="relative z-10 flex items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="h-8 w-8 rounded-xl font-mono text-xs font-bold grid place-items-center bg-[#6E1016]/10 border border-[#6E1016]/20 text-[#6E1016]">
                      {p.number}
                    </span>
                    <span className="text-[11px] font-mono tracking-widest uppercase text-[#0B1B47]/60 font-semibold">
                      {p.discipline}
                    </span>
                  </div>

                  <span className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border border-[#0B1B47]/10 bg-[#0B1B47]/05 text-[#0B1B47]/70 font-semibold">
                    {p.metric}
                  </span>
                </div>

                {/* Título Principal em Commune */}
                <h3 className="relative z-10 font-['Commune',serif] font-bold text-xl sm:text-[1.38rem] leading-[1.12] text-[#0B1B47] group-hover:text-[#6E1016] transition-colors duration-300">
                  {p.title}
                </h3>

                {/* Lema em Itálico Nobre */}
                <p className="relative z-10 font-serif italic text-xs text-[#6E1016] mt-2 mb-4 leading-relaxed">
                  “{p.motto}”
                </p>

                {/* Descrição Concisa e Ousada */}
                <p className="relative z-10 font-body text-xs sm:text-[13.5px] leading-[1.65] text-[#0B1B47]/80 flex-1">
                  {p.phrase}
                </p>

                {/* Rodapé do Card com Prévia Interativa da Pasta Oficial */}
                <div className="relative z-10 mt-6 pt-5 border-t border-[#0B1B47]/08 flex items-center justify-between gap-3">
                  <span className="text-xs font-mono font-medium text-[#0B1B47]/70">
                    {p.metricLabel}
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveFolderModal(p)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B1B47]/06 hover:bg-[#E27908] hover:text-[#F4F1E5] text-[#0B1B47] text-[11px] font-mono tracking-wider uppercase font-semibold transition-all duration-300 cursor-pointer"
                    aria-label={`Ver pasta de referência para ${p.title}`}
                  >
                    <span>Pasta</span>
                    <span aria-hidden>↗</span>
                  </button>
                </div>
              </div>
            );
          })}
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
