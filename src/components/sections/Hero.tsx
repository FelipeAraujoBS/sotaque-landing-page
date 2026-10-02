"use client";

import { useEffect, useState } from "react";
import BonfimRibbons from "@/components/motion/BonfimRibbons";
import { HERO_CONTENT } from "@/content/hero";

export default function Hero() {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detecção de prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Rotação de palavras candidatas da manchete
  // TODO(humano): Lista de palavras candidatas definida em content/hero.ts
  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % HERO_CONTENT.rotatingWords.length);
    }, 2800); // 2.8s entre trocas

    return () => clearInterval(interval);
  }, [reducedMotion]);

  const activeWord = reducedMotion
    ? HERO_CONTENT.headlineHighlight
    : HERO_CONTENT.rotatingWords[activeWordIndex];

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-between pt-16 sm:pt-20 pb-4 sm:pb-6 overflow-hidden bg-[var(--sotaque-creme,#F4F1E5)] text-[#0B1B47]"
      aria-label="Apresentação — Sotaque Estúdio 360"
    >
      {/* 5 Fitinhas Superiores: De ponta a ponta da tela (Desktop & Mobile) */}
      <div className="w-full overflow-hidden pointer-events-none select-none z-0 max-h-[110px] sm:max-h-[135px] md:max-h-[155px]">
        <BonfimRibbons variant="top" className="w-full" />
      </div>

      {/* Conteúdo Centralizado do Hero — Horizontal e Verticalmente no centro */}
      <div className="relative z-10 w-full px-5 sm:px-6 lg:px-8 my-auto flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* H1 Monumental em Commune Inktrap Oficial — Mobile First & Desktop Centrado */}
          <h1
            aria-label="Sua marca tem voz. Nós damos o sotaque."
            className="font-['Commune',serif] text-[clamp(2.1rem,6.4vw,5rem)] leading-[1.04] sm:leading-[0.98] tracking-[-0.03em] font-normal text-[#0B1B47] text-center"
          >
            <span className="block">Sua marca tem voz.</span>
            <span className="block mt-1 sm:mt-2">
              Nós damos o&nbsp;
              <span
                className="inline-block relative min-w-[5ch] sm:min-w-[6.5ch] align-baseline text-left"
                aria-hidden="true"
              >
                <em
                  key={activeWord}
                  className="italic text-[#6E1016] not-italic-fallback font-['Commune',serif] inline-block animate-fade-in transition-opacity duration-300"
                >
                  {activeWord}.
                </em>
              </span>
            </span>
          </h1>

          {/* Subtítulo de Posicionamento Centralizado */}
          {/* TODO(humano): Subtítulo candidato definido em content/hero.ts */}
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-[#0B1B47]/85 max-w-[52ch] mx-auto font-body font-normal text-center">
            {HERO_CONTENT.subtitle}
          </p>

          {/* Grupo de CTAs Centralizados — Alinhamento harmonioso no centro */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto z-10 relative">
            {/* CTA Primário: Sólido em Laranja Solar */}
            <a
              href={HERO_CONTENT.ctaPrimary.href}
              className="inline-flex items-center justify-center rounded-full bg-[#E27908] hover:bg-[#C96B07] text-[#F4F1E5] px-7 py-3.5 text-xs font-mono font-bold tracking-widest uppercase shadow-md transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27908] focus-visible:ring-offset-2 text-center"
            >
              {HERO_CONTENT.ctaPrimary.label}
            </a>

            {/* CTA Secundário: Contorno em Azul Meia-Noite */}
            <a
              href={HERO_CONTENT.ctaSecondary.href}
              className="inline-flex items-center justify-center rounded-full border border-[#0B1B47] text-[#0B1B47] hover:bg-[#0B1B47] hover:text-[#F4F1E5] px-7 py-3.5 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B47] focus-visible:ring-offset-2 text-center"
            >
              {HERO_CONTENT.ctaSecondary.label}
            </a>
          </div>
        </div>
      </div>

      {/* 5 Fitinhas Inferiores: De ponta a ponta da tela (Desktop & Mobile) */}
      <div className="w-full overflow-hidden pointer-events-none select-none z-0 max-h-[110px] sm:max-h-[135px] md:max-h-[155px]">
        <BonfimRibbons variant="bottom" className="w-full" />
      </div>

      {/* Faixa Inferior Discreta — Localização Salvador · Bahia Centralizada */}
      <div className="relative z-10 w-full text-center pb-1 sm:pb-2 pt-2">
        <span className="tracking-widest uppercase text-[10px] sm:text-xs font-mono text-[#0B1B47]/55">
          {HERO_CONTENT.location}
        </span>
      </div>
    </section>
  );
}
