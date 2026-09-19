"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Pillar = {
  id: string;
  number: string;
  title: string;
  phrase: string;
  metric: string;
  metricLabel: string;
  accentColor: string;
  accentText: string;
  badgeBg: string;
};

const pillarsRow1: Pillar[] = [
  {
    id: "branding",
    number: "01",
    title: "Branding & Identidade Médica",
    phrase: "Identidade visual autoral, naming e tom de voz que constroem autoridade imediata sem o visual frio hospitalar.",
    metric: "Design Autoral",
    metricLabel: "Identidade sem templates",
    accentColor: "#D63A2F",
    accentText: "text-[#D63A2F]",
    badgeBg: "bg-[#D63A2F]/10 text-[#D63A2F] border-[#D63A2F]/25",
  },
  {
    id: "conteudo",
    number: "02",
    title: "Conteúdo & Educação Clínica",
    phrase: "Rotina editorial médica com respaldo científico e linguagem humana. Transforma dúvidas em consultas marcadas.",
    metric: "Foco Editorial",
    metricLabel: "Rigor científico e humano",
    accentColor: "#58734A",
    accentText: "text-[#58734A]",
    badgeBg: "bg-[#58734A]/12 text-[#58734A] border-[#58734A]/25",
  },
];

const pillarsRow2: Pillar[] = [
  {
    id: "audiovisual",
    number: "03",
    title: "Audiovisual Cinematográfico",
    phrase: "Vídeo de estrutura, rotina clínica e procedimentos com iluminação de estúdio e narrativa ética aprovada pelo CFM.",
    metric: "Padrão Cinema",
    metricLabel: "Registro documental acolhedor",
    accentColor: "#E7A92B",
    accentText: "text-[#E7A92B]",
    badgeBg: "bg-[#E7A92B]/15 text-[#E7A92B] border-[#E7A92B]/30",
  },
  {
    id: "midia",
    number: "04",
    title: "Tráfego & Captação Particular",
    phrase: "Campanhas hiper-segmentadas de Google e Meta focadas em atrair pacientes qualificados para procedimentos particulares.",
    metric: "Captação Ética",
    metricLabel: "Foco em pacientes particulares",
    accentColor: "#58734A",
    accentText: "text-[#58734A]",
    badgeBg: "bg-[#58734A]/12 text-[#58734A] border-[#58734A]/25",
  },
  {
    id: "estrategia",
    number: "05",
    title: "Estratégia 360 & Governança",
    phrase: "Do primeiro anúncio até a experiência no consultório. Alinhamento contínuo em dashboards claros e objetivos.",
    metric: "Gestão 360°",
    metricLabel: "Governança e visão unificada",
    accentColor: "#B85C42",
    accentText: "text-[#B85C42]",
    badgeBg: "bg-[#B85C42]/12 text-[#B85C42] border-[#B85C42]/25",
  },
];

const cardIndexMap: Record<string, number> = {
  branding: 0,
  conteudo: 1,
  audiovisual: 2,
  midia: 3,
  estrategia: 4,
};

export default function Pillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ [key: string]: { x: number; y: number } }>({});

  useEffect(() => {
    setIsMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (reducedMotion) {
      cardsRef.current.forEach((el) => {
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      });
      return;
    }

    let ctx: any = null;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapMod, stMod]) => {
      if (cancelled || !containerRef.current) return;
      const gsap = gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        cardsRef.current.forEach((el, i) => {
          if (!el) return;
          gsap.fromTo(
            el,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: i * 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );
        });
      }, containerRef);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, [isMounted, reducedMotion]);

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

  const isHoveredRow1 = hoveredId === "branding" || hoveredId === "conteudo";
  const isHoveredRow2 =
    hoveredId === "audiovisual" || hoveredId === "midia" || hoveredId === "estrategia";
  const isAnyHovered = isHoveredRow1 || isHoveredRow2;

  // Proporções de largura da Linha 1 (Bento padrão 7 : 5 = 58.3% : 41.7%)
  const getFlexGrowRow1 = (id: string, currentHoveredId: string | null) => {
    if (!currentHoveredId) {
      return id === "branding" ? 7 : 5;
    }
    if (currentHoveredId === "branding") {
      return id === "branding" ? 8.2 : 3.8; // 68.3% : 31.7%
    }
    if (currentHoveredId === "conteudo") {
      return id === "conteudo" ? 8.0 : 4.0; // 66.7% : 33.3%
    }
    // Hover ativo na Linha 2 — mantém proporção padrão na Linha 1
    return id === "branding" ? 7 : 5;
  };

  // Proporções de largura da Linha 2 (Bento padrão 4 : 4.8 : 3.2 = 33.3% : 40% : 26.7%)
  const getFlexGrowRow2 = (id: string, currentHoveredId: string | null) => {
    if (!currentHoveredId) {
      return id === "audiovisual" ? 4 : id === "midia" ? 4.8 : 3.2;
    }
    if (currentHoveredId === "audiovisual") {
      return id === "audiovisual" ? 7.2 : 2.4; // 60% : 20% : 20%
    }
    if (currentHoveredId === "midia") {
      return id === "midia" ? 7.2 : 2.4; // 20% : 60% : 20%
    }
    if (currentHoveredId === "estrategia") {
      return id === "estrategia" ? 7.2 : 2.4; // 20% : 20% : 60%
    }
    // Hover ativo na Linha 1 — mantém proporção padrão na Linha 2
    return id === "audiovisual" ? 4 : id === "midia" ? 4.8 : 3.2;
  };

  const renderCard = (p: Pillar, flexGrow: number) => {
    const isHovered = hoveredId === p.id;
    const isDimmed = isAnyHovered && !isHovered;
    const pos = mousePos[p.id] || { x: 200, y: 150 };

    return (
      <div
        key={p.id}
        ref={(el) => {
          cardsRef.current[cardIndexMap[p.id]] = el;
        }}
        onMouseEnter={() => setHoveredId(p.id)}
        onClick={() => setHoveredId(hoveredId === p.id ? null : p.id)}
        onMouseMove={(e) => handleMouseMove(p.id, e)}
        style={{
          flexGrow,
          flexShrink: 1,
          flexBasis: "0%",
          minWidth: isAnyHovered && !isHovered ? "190px" : undefined,
          transition:
            "flex-grow 550ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms, border-color 300ms, opacity 300ms",
        }}
        className={`group relative rounded-[1.6rem] border overflow-hidden flex flex-col cursor-pointer select-none transition-all duration-300 ${
          isHovered
            ? "bg-white border-[#102C2B]/25 shadow-2xl z-20"
            : isDimmed
              ? "bg-white/90 border-[#102C2B]/10 shadow-sm opacity-85 hover:opacity-100"
              : "bg-white border-[#102C2B]/12 shadow-md hover:shadow-lg"
        }`}
      >
        {/* Dynamic Webflow Spotlight Effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, ${p.accentColor}20, transparent 70%)`,
          }}
          aria-hidden
        />

        {/* Top Border Hairline Highlight */}
        <div
          className={`w-full transition-all duration-300 ${isHovered ? "h-2" : "h-1"}`}
          style={{
            backgroundColor: p.accentColor,
            opacity: isDimmed ? 0.6 : 1,
          }}
        />

        <div
          className={`relative flex flex-col flex-1 z-10 min-w-0 transition-all duration-300 ${
            isDimmed ? "p-4 sm:p-5 lg:p-5" : "p-6 sm:p-7 lg:p-8"
          }`}
        >
          {/* Top Bar do Card */}
          <div className="flex items-center justify-between gap-2 mb-3 min-w-0">
            <div className="flex items-center gap-2 shrink-0">
              <div
                className={`h-8 w-8 sm:h-9 sm:w-9 rounded-xl border grid place-items-center font-mono font-bold text-xs shrink-0 transition-colors duration-300 ${
                  isHovered
                    ? "border-[#102C2B] bg-[#102C2B] text-[#F3EBDD]"
                    : "border-[#102C2B]/15 bg-[#F3EBDD]/60 text-[#102C2B]"
                }`}
              >
                {p.number}
              </div>
              <span
                className={`text-[11px] font-mono tracking-widest uppercase text-[#102C2B]/50 transition-opacity duration-300 ${
                  isDimmed ? "hidden" : "hidden sm:inline"
                }`}
              >
                Pilar 360
              </span>
            </div>

            <span
              className={`font-mono uppercase font-semibold border rounded-full transition-all duration-300 shrink-0 ${p.badgeBg} ${
                isDimmed
                  ? "text-[10px] tracking-tight px-2 py-0.5 scale-95 origin-right max-w-[125px] truncate"
                  : "text-[11px] tracking-wider px-3 py-1 scale-100 whitespace-nowrap"
              }`}
              title={p.metric}
            >
              {p.metric}
            </span>
          </div>

          {/* Título */}
          <h3
            className={`font-display font-bold leading-tight tracking-tight text-[#102C2B] transition-all duration-300 min-w-0 ${
              isHovered
                ? "text-xl sm:text-2xl lg:text-[1.7rem]"
                : isDimmed
                  ? "text-sm sm:text-base lg:text-lg line-clamp-2"
                  : "text-base sm:text-lg lg:text-[1.25rem] line-clamp-2"
            }`}
          >
            {p.title}
          </h3>

          {/* Frase / Descrição */}
          <div
            className={`transition-all duration-500 overflow-hidden flex-1 ${
              isHovered
                ? "opacity-100 max-h-56 mt-3.5"
                : isDimmed
                  ? "opacity-50 max-h-16 mt-2 line-clamp-2"
                  : "opacity-80 max-h-36 mt-2.5 line-clamp-2 sm:line-clamp-3"
            }`}
          >
            <p
              className={`font-body leading-relaxed text-[#102C2B]/80 ${
                isHovered ? "text-sm sm:text-base" : "text-xs"
              }`}
            >
              {p.phrase}
            </p>
          </div>

          {/* Rodapé do Card — com label de métrica autoritária (sem link vazio) */}
          <div className="mt-auto pt-3 border-t border-[#102C2B]/10 flex items-center justify-between gap-2 min-w-0">
            <span
              className={`text-xs font-mono font-semibold tracking-wide transition-colors duration-300 truncate min-w-0 ${
                isHovered ? p.accentText : "text-[#102C2B]/60"
              }`}
            >
              {p.metricLabel}
            </span>

            <span
              className={`text-[11px] font-mono text-[#102C2B]/40 shrink-0 ${
                isDimmed ? "hidden sm:inline" : "inline"
              }`}
            >
              {p.number} / 05
            </span>
          </div>
        </div>

        {/* Letra monumental sutil de fundo */}
        <span
          className={`absolute -bottom-4 -right-2 font-display font-black text-[6.5rem] leading-none tracking-tighter text-[#102C2B]/[0.04] select-none pointer-events-none transition-all duration-300 ${
            isHovered ? "text-[#102C2B]/[0.08] scale-110" : ""
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
      className="relative bg-[#F3EBDD] text-[#102C2B] border-t border-[#102C2B]/10 overflow-hidden pt-20 lg:pt-28 pb-12 lg:pb-16"
      aria-label="O que fazemos — pilares 360"
    >
      {/* Luz ambiente difusa no fundo */}
      <div
        className="absolute -top-40 right-10 w-96 h-96 rounded-full bg-[#58734A]/10 blur-[130px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 left-10 w-96 h-96 rounded-full bg-[#B85C42]/10 blur-[130px] pointer-events-none"
        aria-hidden
      />

      <div className="mx-auto max-w-content px-6 lg:px-8 mb-14">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#D63A2F]" aria-hidden />
              <span className="text-xs font-mono tracking-[0.16em] uppercase font-semibold text-[#D63A2F]">
                Pilares 360 Integrados
              </span>
              <span className="text-xs font-mono tracking-wide text-[#102C2B]/50 hidden sm:inline">
                • Precisão de Dados + Criatividade
              </span>
            </div>

            <h2 className="font-display font-extrabold leading-[0.95] tracking-[-0.035em] text-[clamp(2.2rem,4.5vw,3.6rem)] text-[#102C2B]">
              Comunicação em saúde <br />
              <span className="text-[#D63A2F]">sem fragmentação</span>.
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:text-right">
            <p className="font-body text-[15px] leading-relaxed text-[#102C2B]/75 max-w-[44ch] lg:ml-auto text-balance">
              Esqueça a dor de contratar múltiplos fornecedores que não dialogam. Na Sotaque, cada pilar opera em harmonia cirúrgica para valorizar sua autoridade médica.
            </p>
          </div>
        </div>
      </div>

      {/* Bento Grid com Proporções Dinâmicas em 2 Níveis (Modo Areia Editorial) */}
      <div
        className="mx-auto max-w-content px-6 lg:px-8 flex flex-col gap-4 lg:gap-5 min-h-[720px] lg:h-[720px]"
        onMouseLeave={() => setHoveredId(null)}
      >
        {/* Nível 1 do Bento: 2 Cards (expande em altura quando focado e comprime quando o nível 2 é focado) */}
        <div
          style={{
            flexGrow: isHoveredRow1 ? 2.2 : isHoveredRow2 ? 0.65 : 1,
            flexShrink: 1,
            flexBasis: "0%",
            transition: "flex-grow 550ms cubic-bezier(0.16, 1, 0.3, 1), opacity 350ms",
          }}
          className={`flex flex-col sm:flex-row gap-4 lg:gap-5 w-full transition-opacity duration-300 ${
            isHoveredRow2 ? "opacity-75" : "opacity-100"
          }`}
        >
          {pillarsRow1.map((p) => renderCard(p, getFlexGrowRow1(p.id, hoveredId)))}
        </div>

        {/* Nível 2 do Bento: 3 Cards (expande em altura quando focado e comprime quando o nível 1 é focado) */}
        <div
          style={{
            flexGrow: isHoveredRow2 ? 2.3 : isHoveredRow1 ? 0.65 : 1.15,
            flexShrink: 1,
            flexBasis: "0%",
            transition: "flex-grow 550ms cubic-bezier(0.16, 1, 0.3, 1), opacity 350ms",
          }}
          className={`flex flex-col sm:flex-row gap-4 lg:gap-5 w-full transition-opacity duration-300 ${
            isHoveredRow1 ? "opacity-75" : "opacity-100"
          }`}
        >
          {pillarsRow2.map((p) => renderCard(p, getFlexGrowRow2(p.id, hoveredId)))}
        </div>

        {/* Rodapé da Seção */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#102C2B]/70 border-t border-[#102C2B]/10 pt-4 mt-2">
          <span>Metodologia integrada: cada disciplina nutre a autoridade da clínica.</span>
          <span className="hidden sm:inline">{/* Spotlight interativo • Bento Grid 2D */}Navegação integrada • Visão 360° em saúde</span>
        </div>
      </div>
    </section>
  );
}
