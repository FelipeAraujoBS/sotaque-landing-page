"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import testimonials from "@/content/testimonials.json";

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
      className="relative text-[#0B1B47] border-t border-[#0B1B47]/10 py-20 lg:py-28 overflow-hidden bg-[#F4F1E5]"
      aria-label="Depoimentos — parcerias e resultados"
    >
      <div className="mx-auto max-w-content px-6 lg:px-8">
        {/* Header dos Depoimentos */}
        <div className="grid grid-cols-12 gap-6 items-end mb-10">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#E27908]" aria-hidden />
              <span className="text-xs font-mono tracking-[0.16em] uppercase font-semibold text-[#E27908]">
                Depoimentos & Parcerias
              </span>
            </div>

            <h2 className="font-['Commune',serif] font-bold leading-[0.95] tracking-[-0.025em] text-[clamp(2.2rem,4.5vw,3.6rem)] text-[#0B1B47]">
              Parcerias que transformam <span className="text-[#6E1016] italic font-light">ideias em presença</span>
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:text-right">
            <p className="text-sm font-body leading-relaxed text-[#0B1B47]/80 max-w-[36ch] lg:ml-auto">
              Relatos de profissionais e marcas que encontraram na Sotaque uma voz autoral e consistente.
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
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27908] ${
                  activeIndex === i ? "w-8 bg-[#E27908]" : "w-2 bg-[#0B1B47]/20 hover:bg-[#0B1B47]/40"
                }`}
              />
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              aria-label="Depoimento anterior"
              onClick={() => scrollToIndex(activeIndex - 1)}
              className="h-9 w-9 grid place-items-center rounded-full border border-[#0B1B47]/15 bg-white hover:bg-[#0B1B47] hover:text-[#F4F1E5] text-[#0B1B47] shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27908]"
            >
              ‹
            </button>
            <button
              aria-label="Próximo depoimento"
              onClick={() => scrollToIndex(activeIndex + 1)}
              className="h-9 w-9 grid place-items-center rounded-full border border-[#0B1B47]/15 bg-white hover:bg-[#0B1B47] hover:text-[#F4F1E5] text-[#0B1B47] shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27908]"
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
          aria-label="Carrossel de depoimentos de parceiros"
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
                className="shrink-0 w-[86%] sm:w-[54%] lg:w-[40%] xl:w-[32%] min-h-[260px] rounded-[1.6rem] border border-[rgba(11,27,71,0.08)] bg-white p-7 lg:p-8 flex flex-col justify-between hover:border-[rgba(11,27,71,0.22)] transition-all duration-300 select-none shadow-[0_1px_1px_rgba(11,27,71,0.04),0_4px_8px_rgba(11,27,71,0.04),0_16px_32px_rgba(11,27,71,0.06)] text-[#0B1B47]"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
              >
                {/* Citação Direta */}
                <blockquote className="font-body text-[15.5px] leading-relaxed text-[#0B1B47]/85 flex-1 pt-1">
                  “{t.texto}”
                </blockquote>

                {/* Autor: Nome, Cargo / Empresa */}
                <div className="mt-6 pt-5 border-t border-[rgba(11,27,71,0.08)] flex items-center gap-3.5">
                  <span className="h-10 w-10 rounded-xl bg-[#0B1B47] text-[#F4F1E5] border border-[rgba(11,27,71,0.08)] grid place-items-center font-['Commune',serif] font-bold text-sm shrink-0">
                    {t.nome.slice(0, 1).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-tight text-[#0B1B47] truncate">
                      {t.nome}
                    </p>
                    <p className="text-xs text-[#0B1B47]/70 font-mono mt-0.5">{t.cargo}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#F4F1E5] to-transparent hidden lg:block"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
