"use client";

import { useEffect, useRef, useState } from "react";

export default function RegionalDna() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isMounted || reducedMotion || !sectionRef.current) return;

    let ctx: any = null;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapMod, stMod]) => {
        if (cancelled || !sectionRef.current || !bgRef.current) return;
        const gsap = gsapMod.default;
        const ScrollTrigger = stMod.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current!;
        const bg = bgRef.current!;

        ctx = gsap.context(() => {
          // 1) Parallax suave no fundo
          gsap.fromTo(
            bg,
            { yPercent: 0 },
            {
              yPercent: -6,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
                invalidateOnRefresh: true,
              },
            },
          );

          // 2) Animação de entrada suave que dispara ao entrar na tela e PERMANECE visível para leitura
          const revealItems = section.querySelectorAll(".dna-reveal");
          if (revealItems.length > 0) {
            gsap.fromTo(
              revealItems,
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.75,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 85%",
                  once: true,
                },
              },
            );
          }
        }, section);

        requestAnimationFrame(() => ScrollTrigger.refresh());
      },
    );

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, [isMounted, reducedMotion]);

  return (
    <section
      id="dna"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F4F1E5] text-[#0B1B47]"
      aria-label="Por que Sotaque — DNA regional"
    >
      {/* Fundo parallax — Papel Creme Oficial #F4F1E5 */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[#F4F1E5]" />

        {/* Rajadas de luz orgânica quente e solar */}
        <div
          className="absolute top-1/4 right-0 w-[550px] h-[550px] rounded-full bg-[#E27908]/10 blur-[140px] pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute bottom-10 -left-20 w-[500px] h-[500px] rounded-full bg-[#E27908]/08 blur-[140px] pointer-events-none"
          aria-hidden
        />
        {/* Linhas horizontais orgânicas */}
        <div className="absolute left-0 right-0 top-[18%] h-px bg-[#0B1B47]/10 hidden lg:block" />
        <div className="absolute left-0 right-0 bottom-[22%] h-px bg-[#0B1B47]/10 hidden lg:block" />
        {/* Grande marca d'água oficial Sotaque (Ondas de Voz da Pasta de Marca) */}
        <div className="absolute -right-10 top-[10%] w-[380px] lg:w-[480px] opacity-[0.06] pointer-events-none select-none">
          <img
            src="/brand/elements/ondas-de-voz.png"
            alt=""
            aria-hidden
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-content px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Coluna esquerda — narrativa principal, ritmo lento */}
          <div className="col-span-12 lg:col-span-7 xl:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[#E27908]" aria-hidden />
              <span className="text-xs tracking-[0.16em] uppercase font-bold text-[#E27908]">
                Nossa Essência
              </span>
            </div>

            <h2 className="dna-reveal font-['Commune',serif] font-bold leading-[0.94] tracking-[-0.02em] text-[clamp(2.2rem,4.5vw,3.6rem)] text-[#0B1B47]">
              Assim como pessoas,
              <br />
              <span className="font-light italic text-[#6E1016]">
                marcas tem voz.
              </span>
              <br />
              E essa voz precisa de
              <br />
              <span className="font-light italic text-[#6E1016]">
                sotaque próprio.
              </span>
            </h2>

            {/* Texto em parágrafos nobres e fluidos — sem cortes de linha artificiais */}
            <div className="mt-8 space-y-5">
              <p className="dna-reveal font-display text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed text-[#0B1B47]/90 font-medium">
                Sotaque é o traço que revela uma identidade marcante; é a
                memória que se ouve antes de se ver; é o lugar de onde se vem,
                dito em voz alta.
              </p>

              <p className="dna-reveal font-body text-base sm:text-lg leading-relaxed text-[#0B1B47]/80">
                Na Sotaque, transformamos a singularidade da sua marca em
                estratégia: um posicionamento claro, uma linguagem consistente e
                uma comunicação que conversa de verdade com o público. A gente
                escuta a sua marca até achar o jeito que é só dela.
              </p>
            </div>

            {/* Detalhe interativo — expressão regional */}
            <div className="dna-reveal mt-8 rounded-xl border border-[#0B1B47]/12 bg-white p-4 flex items-start gap-3 max-w-xl shadow-sm">
              <span className="mt-0.5 h-7 w-7 rounded-full bg-[#0B1B47] grid place-items-center text-[#F4F1E5] text-xs font-bold shrink-0">
                ?
              </span>
              <div className="min-w-0">
                <p className="font-display font-semibold text-[#0B1B47] text-sm leading-tight">
                  Expressão do estúdio:{" "}
                  <button
                    type="button"
                    className="underline decoration-[#E27908] decoration-2 underline-offset-4 hover:text-[#0B1B47] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B47] rounded"
                    onMouseEnter={() => setShowGlossary(true)}
                    onMouseLeave={() => setShowGlossary(false)}
                    onFocus={() => setShowGlossary(true)}
                    onBlur={() => setShowGlossary(false)}
                    onClick={() => setShowGlossary((prev) => !prev)}
                    aria-expanded={showGlossary}
                    aria-controls="glossario-sotaque"
                  >
                    “com sotaque, com jeito”
                  </button>
                </p>
                <div
                  id="glossario-sotaque"
                  className={`grid transition-all duration-300 ease-out ${
                    showGlossary
                      ? "grid-rows-[1fr] opacity-100 mt-2"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                  aria-hidden={!showGlossary}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm leading-relaxed text-[#0B1B47]/75">
                      Quer dizer que a gente adapta o tom, a linguagem e o ritmo
                      da comunicação ao território e contexto de cada projeto,
                      sem cair em caricatura. Regionalidade como estética e
                      escuta autoral.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna direita — cartão editorial sticky, assimétrico */}
          <div className="col-span-12 lg:col-span-5 xl:col-span-5 lg:sticky lg:top-24">
            <div className="relative max-w-[420px] lg:ml-auto">
              <div className="relative bg-white text-[#0B1B47] rounded-[1.4rem] overflow-hidden shadow-2xl border border-[#0B1B47]/12">
                <div className="h-1.5 w-full bg-gradient-to-r from-[#6E1016] via-[#E27908] to-[#0B1B47]" />
                <div className="p-7">
                  <blockquote className="font-['Commune',serif] text-[20px] sm:text-[22px] leading-snug tracking-[-0.02em] text-[#0B1B47] text-balance">
                    “A gente não cria marcas para parecerem cópias globais. Cria
                    marcas com{" "}
                    <em className="text-[#E27908] font-bold not-italic">
                      alma
                    </em>
                    , história viva e{" "}
                    <em className="font-light italic text-[#6E1016]">
                      personalidade própria
                    </em>
                    .”
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3.5">
                    <div className="h-10 w-10 rounded-full bg-[#0B1B47] p-2 flex items-center justify-center shrink-0 shadow-md">
                      <img
                        src="/brand/logos/sotaque_simbolo_creme.png"
                        alt="Sotaque"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-xs leading-tight">
                      <p className="font-bold text-[#0B1B47] tracking-wide">
                        Sotaque Estúdio 360
                      </p>
                      <p className="text-[#0B1B47]/70 font-mono text-[11px] mt-0.5">
                        direção de criação & estratégia
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-7 py-3.5 bg-[#FAF8F2] border-t border-[#0B1B47]/10 flex items-center justify-between text-xs">
                  <span className="text-[#0B1B47]/80 font-mono font-semibold tracking-wider uppercase text-[10px]">
                    Manifesto Autoral
                  </span>
                  <span className="font-mono text-[#0B1B47]/60 text-[11px]">
                    Salvador • Brasil
                  </span>
                </div>
              </div>
            </div>

            {/* Pilares qualitativos e autoridade da marca */}
            <div className="mt-6 grid grid-cols-3 gap-3 max-w-[420px] lg:ml-auto">
              <div className="rounded-xl bg-white/90 border border-[#0B1B47]/12 p-3.5 text-center shadow-sm hover:border-[#0B1B47]/30 transition-colors">
                <p className="font-['Commune',serif] font-bold text-[#0B1B47] text-xl">
                  360°
                </p>
                <p className="text-[10px] font-mono tracking-widest uppercase text-[#0B1B47]/70 font-semibold mt-1">
                  Visão Total
                </p>
              </div>
              <div className="rounded-xl bg-white/90 border border-[#6E1016]/20 p-3.5 text-center shadow-sm hover:border-[#6E1016]/40 transition-colors">
                <p className="font-['Commune',serif] font-bold text-[#6E1016] text-xl">
                  Raiz
                </p>
                <p className="text-[10px] font-mono tracking-widest uppercase text-[#0B1B47]/70 font-semibold mt-1">
                  Cultura Viva
                </p>
              </div>
              <div className="rounded-xl bg-white/90 border border-[#E27908]/25 p-3.5 text-center shadow-sm hover:border-[#E27908]/50 transition-colors">
                <p className="font-['Commune',serif] font-bold text-[#E27908] text-xl">
                  ≠
                </p>
                <p className="text-[10px] font-mono tracking-widest uppercase text-[#0B1B47]/70 font-semibold mt-1">
                  Design Autoral
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
