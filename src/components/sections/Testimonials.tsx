"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import testimonials from "@/content/testimonials.json";

const logos = [
  "Dermatologia Clínica & Estética",
  "Ortopedia & Traumatologia",
  "Odontologia & Reabilitação Oral",
  "Centros Médicos Integrados",
  "Cirurgia Plástica & Reconstrutiva",
  "Cardiologia & Diagnóstico",
  "Oftalmologia & Cirurgia Refrativa",
  "Medicina Preventiva & Longevidade",
];

export default function Testimonials() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  // Calcula larguras para constraints
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const update = () => {
      setViewportWidth(viewport.offsetWidth);
      setTrackWidth(track.scrollWidth);
    };
    update();

    const ro = new ResizeObserver(update);
    ro.observe(viewport);
    ro.observe(track);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const maxDrag = Math.max(0, trackWidth - viewportWidth + 24);

  const scrollToIndex = (idx: number) => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    const clamped = Math.max(0, Math.min(testimonials.length - 1, idx));
    const card = track.querySelectorAll<HTMLElement>("[data-card]")[clamped];
    if (!card) return;

    const targetX = Math.min(0, Math.max(-maxDrag, -(card.offsetLeft - 16)));
    animate(x, targetX, { type: "spring", stiffness: 380, damping: 32 });
    setActiveIndex(clamped);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const currentX = x.get();
    const track = trackRef.current;
    if (!track) return;

    let closest = 0;
    let closestDist = Infinity;
    track.querySelectorAll<HTMLElement>("[data-card]").forEach((card, i) => {
      const cardPos = card.offsetLeft + currentX;
      const dist = Math.abs(cardPos - 16);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    scrollToIndex(closest);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToIndex(activeIndex + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToIndex(activeIndex - 1);
    }
  };

  return (
    <section
      id="depoimentos"
      className="relative bg-[#102C2B] text-[#F3EBDD] border-y border-[#F3EBDD]/10 py-20 lg:py-28 overflow-hidden"
      aria-label="Depoimentos — prova social em saúde"
    >
      {/* 1. Marquee Infinito Sotaque (Logos e Clínicas Parceiras) */}
      <div className="mb-20 overflow-hidden border-y border-[#F3EBDD]/10 bg-[#163A39] py-5">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-[#F3EBDD]/80 px-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E7A92B]" />
              <span>{logo}</span>
              <span className="text-[#F3EBDD]/30">/</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-content px-6 lg:px-8">
        {/* Header dos Depoimentos */}
        <div className="grid grid-cols-12 gap-6 items-end mb-10">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#D63A2F]" aria-hidden />
              <span className="text-xs font-mono tracking-[0.16em] uppercase font-semibold text-[#D63A2F]">
                Demonstração de Prova Social
              </span>
              <span className="hidden sm:inline text-xs font-mono text-[#F3EBDD]/75">
                • Projeto Conceitual
              </span>
            </div>

            <h2 className="font-display font-extrabold leading-[0.95] tracking-[-0.035em] text-[clamp(2.2rem,4.5vw,3.6rem)] text-[#F3EBDD]">
              Quem vive de <span className="text-[#D63A2F]">cuidado</span>, confia na Sotaque
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:text-right">
            <p className="text-sm font-body leading-relaxed text-[#F3EBDD]/75 max-w-[36ch] lg:ml-auto">
              Simulação de depoimentos e estrutura editorial para validação de layout com clínicas e especialistas.
            </p>
          </div>
        </div>

        {/* Controles do Carrossel */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2" role="tablist" aria-label="Navegar depoimentos">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={activeIndex === i}
                aria-label={`Ir para depoimento ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D63A2F] ${
                  activeIndex === i ? "w-8 bg-[#D63A2F]" : "w-2 bg-[#F3EBDD]/20 hover:bg-[#F3EBDD]/40"
                }`}
              />
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              aria-label="Depoimento anterior"
              onClick={() => scrollToIndex(activeIndex - 1)}
              className="h-9 w-9 grid place-items-center rounded-full border border-[#F3EBDD]/15 bg-[#163A39] hover:bg-[#1f4a49] text-[#F3EBDD] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D63A2F]"
            >
              ‹
            </button>
            <button
              aria-label="Próximo depoimento"
              onClick={() => scrollToIndex(activeIndex + 1)}
              className="h-9 w-9 grid place-items-center rounded-full border border-[#F3EBDD]/15 bg-[#163A39] hover:bg-[#1f4a49] text-[#F3EBDD] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D63A2F]"
            >
              ›
            </button>
          </div>
        </div>

        {/* Viewport do Carrossel */}
        <div
          ref={viewportRef}
          className="relative -mx-6 px-6 lg:mx-0 lg:px-0 overflow-hidden"
          onKeyDown={onKeyDown}
          tabIndex={0}
          aria-label="Carrossel de depoimentos médicos"
          aria-roledescription="carousel"
        >
          <motion.div
            ref={trackRef}
            className={`flex gap-5 lg:gap-6 will-change-transform ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -maxDrag, right: 0 }}
            dragElastic={0.12}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                data-card
                className="shrink-0 w-[86%] sm:w-[54%] lg:w-[40%] xl:w-[32%] min-h-[300px] rounded-[1.6rem] border border-[#F3EBDD]/10 bg-[#163A39] p-7 lg:p-8 flex flex-col hover:border-[#F3EBDD]/25 transition-all duration-300 select-none shadow-xl text-[#F3EBDD]"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
              >
                {/* Cabeçalho do Card Conceitual */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#F3EBDD]/10 border border-[#F3EBDD]/15 text-[#F3EBDD]/75 font-semibold">
                    Depoimento Conceitual
                  </span>

                  <span className="text-[10px] font-mono tracking-wider text-[#E7A92B]">
                    Layout Demo
                  </span>
                </div>

                {/* Aspas e Citação */}
                <blockquote className="font-body text-[15.5px] leading-relaxed text-[#F3EBDD]/90 flex-1">
                  “{t.texto}”
                </blockquote>

                {/* Autor */}
                <div className="mt-6 pt-5 border-t border-[#F3EBDD]/10 flex items-center gap-3.5">
                  <span className="h-10 w-10 rounded-xl bg-[#102C2B] text-[#F3EBDD] border border-[#F3EBDD]/15 grid place-items-center font-display font-bold text-sm shrink-0">
                    {t.nome.slice(0, 1).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-tight text-[#F3EBDD] truncate">
                      {t.nome}
                    </p>
                    <p className="text-xs text-[#F3EBDD]/60 mt-0.5">{t.cargo}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#102C2B] to-transparent hidden lg:block"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
