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

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapMod, stMod]) => {
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
          }
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
            }
          );
        }
      }, section);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, [isMounted, reducedMotion]);

  return (
    <section
      id="dna"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F3EBDD] text-[#102C2B]"
      aria-label="Por que Sotaque — DNA regional"
    >
      {/* Fundo parallax — textura terrosa muito sutil, duas camadas */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none will-change-transform" aria-hidden>
        <div className="absolute inset-0 bg-[#F3EBDD]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 22% 30%, #B85C42 0%, transparent 46%), radial-gradient(circle at 88% 78%, #E7A92B 0%, transparent 38%)`,
          }}
        />
        {/* Linhas horizontais orgânicas */}
        <div className="absolute left-0 right-0 top-[18%] h-px bg-[#102C2B]/10 hidden lg:block" />
        <div className="absolute left-0 right-0 bottom-[22%] h-px bg-[#102C2B]/10 hidden lg:block" />
        {/* Grande marca d'água */}
        <div className="absolute -right-[6%] top-[12%] font-display font-black text-[20vw] leading-none tracking-tighter text-[#102C2B]/[0.03] select-none hidden xl:block">
          360
        </div>
      </div>

      <div className="relative mx-auto max-w-content px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Coluna esquerda — narrativa principal, ritmo lento */}
          <div className="col-span-12 lg:col-span-7 xl:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[#D63A2F]" aria-hidden />
              <span className="text-xs tracking-[0.16em] uppercase font-semibold text-[#D63A2F]">Por que Sotaque</span>
              <span className="hidden sm:inline text-xs font-mono text-[#102C2B]/75 font-medium">• DNA regional & Escuta</span>
            </div>

            <h2 className="dna-reveal font-display font-bold leading-[0.92] tracking-[-0.03em] text-[clamp(2.2rem,4.5vw,3.6rem)] text-[#102C2B]">
              Inovação sem perder
              <br />
              <span className="font-light italic text-[#102C2B]/75">o chão onde pisa.</span>
            </h2>

            {/* Texto em parágrafos nobres e fluidos — sem cortes de linha artificiais */}
            <div className="mt-8 space-y-5">
              <p className="dna-reveal font-display text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed text-[#102C2B]/90 font-medium">
                A gente acredita que comunicação boa tem sotaque. Não é sobre falar &ldquo;diferente&rdquo; por marketing — é sobre não soar igual a todo mundo.
              </p>

              <p className="dna-reveal font-body text-base sm:text-lg leading-relaxed text-[#102C2B]/80">
                Enquanto o mercado tenta parecer global e asséptico, a gente escolhe ficar perto: entender o balcão, a sala de espera e o jeito acolhedor de dizer &ldquo;pode entrar&rdquo;.
              </p>

              <p className="dna-reveal font-body text-base sm:text-lg leading-relaxed text-[#102C2B]/80">
                A Sotaque nasceu para ser o departamento de comunicação que clínicas e profissionais de saúde não têm — e não precisam montar do zero. Inovação nas ferramentas, raiz na escuta.
              </p>
            </div>

            {/* Detalhe interativo — expressão regional */}
            <div className="dna-reveal mt-8 rounded-xl border border-[#102C2B]/12 bg-white p-4 flex items-start gap-3 max-w-xl shadow-sm">
              <span className="mt-0.5 h-7 w-7 rounded-full bg-[#102C2B] grid place-items-center text-[#F3EBDD] text-xs font-bold shrink-0">
                ?
              </span>
              <div className="min-w-0">
                <p className="font-display font-semibold text-[#102C2B] text-sm leading-tight">
                  Expressão do estúdio:{" "}
                  <button
                    type="button"
                    className="underline decoration-[#D63A2F] decoration-2 underline-offset-4 hover:text-[#D63A2F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D63A2F] rounded"
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
                    showGlossary ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
                  }`}
                  aria-hidden={!showGlossary}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm leading-relaxed text-[#102C2B]/75">
                      Quer dizer que a gente adapta o tom, o vocabulário e o ritmo da comunicação à cultura local do paciente, sem cair em caricatura. Regionalidade como método e escuta, nunca fantasia.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#102C2B]/70 font-medium mt-1">Passe o mouse ou clique para ver o significado.</p>
              </div>
            </div>

            <p className="dna-reveal mt-6 text-xs text-[#102C2B]/70 font-mono">
              Manifesto autoral Sotaque — comunicação em saúde com profundidade e precisão.
            </p>
          </div>

          {/* Coluna direita — cartão editorial sticky, assimétrico */}
          <div className="col-span-12 lg:col-span-5 xl:col-span-5 lg:sticky lg:top-24">
            <div className="relative max-w-[420px] lg:ml-auto">
              {/* Moldura */}
              <div className="absolute -inset-2 border border-[#102C2B]/10 rounded-[1.4rem] hidden md:block" aria-hidden />
              <div className="relative bg-white text-[#102C2B] rounded-[1.2rem] overflow-hidden shadow-xl border border-[#102C2B]/10">
                <div className="h-1.5 w-full bg-[#D63A2F]" />
                <div className="p-6">
                  <p className="text-xs tracking-[0.14em] uppercase font-semibold text-[#102C2B]/70">Manifesto curto</p>
                  <blockquote className="mt-3 font-display text-[18px] leading-snug tracking-tight text-[#102C2B] text-balance">
                    “A gente não quer ser a agência que fala <em className="font-light italic text-[#D63A2F]">sobre</em> saúde.
                    Quer ser a que fala <em className="text-[#102C2B] font-semibold">com</em> quem vive de saúde.”
                  </blockquote>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="h-8 w-8 rounded-full bg-[#102C2B] text-[#F3EBDD] grid place-items-center font-display font-bold text-xs">
                      S
                    </span>
                    <div className="text-xs leading-tight">
                      <p className="font-semibold text-[#102C2B]">Sotaque Estúdio 360</p>
                      <p className="text-[#102C2B]/75 font-medium">direção de criação & estratégia</p>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-3 bg-[#F3EBDD]/60 border-t border-[#102C2B]/10 flex items-center justify-between text-xs">
                  <span className="text-[#102C2B]/70 font-medium">Manifesto Autoral</span>
                  <span className="font-mono text-[#102C2B]/70 font-medium">Salvador • Brasil</span>
                </div>
              </div>

              {/* Etiqueta de Raiz em Terracota */}
              <div className="absolute -bottom-3 -left-3 hidden md:inline-flex items-center gap-2 rounded-full bg-[#B85C42] text-[#F3EBDD] px-3.5 py-1.5 text-xs font-semibold shadow-md rotate-[-1deg]">
                Raiz regional • 360
              </div>
            </div>

            {/* Pilares qualitativos e autoridade da marca */}
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-[420px] lg:ml-auto">
              <div className="rounded-lg bg-white border border-[#102C2B]/10 p-3 text-center shadow-sm">
                <p className="font-display font-bold text-[#102C2B] text-lg">360°</p>
                <p className="text-[11px] tracking-wide uppercase text-[#102C2B]/75 font-semibold mt-1">Visão Integrada</p>
              </div>
              <div className="rounded-lg bg-white border border-[#102C2B]/10 p-3 text-center shadow-sm">
                <p className="font-display font-bold text-[#58734A] text-lg">CFM</p>
                <p className="text-[11px] tracking-wide uppercase text-[#102C2B]/75 font-semibold mt-1">Rigor Ético</p>
              </div>
              <div className="rounded-lg bg-white border border-[#102C2B]/10 p-3 text-center shadow-sm">
                <p className="font-display font-bold text-[#D63A2F] text-lg">≠</p>
                <p className="text-[11px] tracking-wide uppercase text-[#102C2B]/75 font-semibold mt-1">Design Autoral</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
