"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MosaicMarquee from "@/components/motion/MosaicMarquee";
import TileObject from "@/components/motion/TileObject";

// Sequência única: tempero → jeito → ritmo → sotaque (para em sotaque)
const ROTATING_WORDS = ["tempero", "jeito", "ritmo", "sotaque"] as const;
const WORD_INTERVAL_MS = 1100;
const FINAL_INDEX = ROTATING_WORDS.length - 1; // 3 ("sotaque")

const EASE_MASK = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isSettled, setIsSettled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Detecção de prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) {
      setWordIndex(FINAL_INDEX);
      setIsSettled(true);
    }
    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) {
        setWordIndex(FINAL_INDEX);
        setIsSettled(true);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Sequência única com ~1100ms por palavra: tempero → jeito → ritmo → sotaque (para)
  useEffect(() => {
    if (reducedMotion || isSettled) return;

    if (wordIndex >= FINAL_INDEX) {
      setIsSettled(true);
      return;
    }

    const interval = setTimeout(() => {
      setWordIndex((prev) => Math.min(FINAL_INDEX, prev + 1));
    }, WORD_INTERVAL_MS);

    return () => clearTimeout(interval);
  }, [wordIndex, isSettled, reducedMotion]);

  // Replay automático toda vez que o usuário sai do Hero e retorna
  useEffect(() => {
    if (reducedMotion) return;
    const heroEl = heroRef.current;
    if (!heroEl) return;

    let hasLeftHero = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          // O usuário rolou a página para baixo e saiu do Hero
          hasLeftHero = true;
        } else if (hasLeftHero) {
          // O usuário retornou ao Hero após ter saído: reinicia a animação
          hasLeftHero = false;
          setIsSettled(false);
          setWordIndex(0);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const currentWord = ROTATING_WORDS[wordIndex];
  const isFinal = wordIndex === FINAL_INDEX;

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-0 overflow-hidden bg-[var(--sotaque-creme,#F4F1E5)] text-[#0B1B47]"
      aria-label="Apresentação — Sotaque Estúdio 360"
    >
      {/* Conteúdo Principal: ~7 de 12 colunas para o texto + ~5 de 12 para o objeto de azulejo */}
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 my-auto py-4 sm:py-6 flex flex-col items-start text-left z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 w-full items-center">
          {/* Coluna de Texto: ~7 de 12 colunas */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* H1 Monumental em Commune Inktrap: dimensionado para respirar perfeitamente nas 7 colunas sem sobrepor o elemento visual */}
            <h1 className="font-['Commune',serif] text-[clamp(2.4rem,4.2vw,4.5rem)] leading-[0.95] tracking-[-0.035em] font-normal text-[#0B1B47] text-left select-none">
              {/* Texto semântico estável para SEO e leitores de tela */}
              <span className="sr-only">
                Sua marca tem voz. Nós damos o sotaque.
              </span>

              {/* Versão visual animada */}
              <span aria-hidden="true" className="block">
                {/* Linha 1: whitespace-nowrap a partir de md para nunca quebrar 'voz.' sozinha */}
                <span className="block md:whitespace-nowrap">
                  Sua marca tem voz.
                </span>

                {/* Linha 2: Nós damos o [palavra] */}
                <span className="block mt-1 sm:mt-2">
                  Nós damos o&nbsp;
                  {/* Grid estável com largura reservada: NUNCA pula nem treme a linha */}
                  <span className="inline-grid grid-cols-1 grid-rows-1 align-baseline relative">
                    {/* Elementos fantasma invisíveis reservando a largura estática */}
                    <span
                      className="invisible col-start-1 row-start-1 pointer-events-none select-none italic font-['Commune',serif] pb-[0.14em] pr-[0.1em]"
                      aria-hidden="true"
                    >
                      sotaque.
                    </span>
                    <span
                      className="invisible col-start-1 row-start-1 pointer-events-none select-none italic font-['Commune',serif] pb-[0.14em] pr-[0.1em]"
                      aria-hidden="true"
                    >
                      tempero.
                    </span>

                    {/* Wrapper da máscara com overflow-hidden e compensação de padding para descendentes ('q') e itálico */}
                    <span className="col-start-1 row-start-1 overflow-hidden relative inline-block pb-[0.14em] pr-[0.1em] -mb-[0.14em] -mr-[0.1em]">
                      {reducedMotion ? (
                        <span className="italic font-['Commune',serif] text-[var(--sotaque-vinho,#6E1016)] block">
                          sotaque.
                        </span>
                      ) : (
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={currentWord}
                            initial={{ y: "105%", opacity: 0 }}
                            animate={{ y: "0%", opacity: 1 }}
                            exit={{ y: "-105%", opacity: 0 }}
                            transition={{
                              duration: 0.5,
                              ease: EASE_MASK,
                            }}
                            className={`italic font-['Commune',serif] block ${
                              isFinal
                                ? "text-[var(--sotaque-vinho,#6E1016)]"
                                : "text-[var(--sotaque-azul-meia-noite,#0B1B47)]/50"
                            }`}
                          >
                            {currentWord}.
                          </motion.span>
                        </AnimatePresence>
                      )}
                    </span>

                    {/* Sublinhado em onda SVG posicionado FORA do wrapper com overflow-hidden */}
                    <span
                      className="absolute -bottom-2.5 sm:-bottom-3.5 left-0 right-0 w-full overflow-visible pointer-events-none"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 240 18"
                        fill="none"
                        preserveAspectRatio="none"
                        className={`w-full h-3 sm:h-4 md:h-5 text-[var(--sotaque-vinho,#6E1016)] overflow-visible transition-opacity duration-300 ${
                          isFinal ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <path
                          d="M 2 9 C 22 1, 42 17, 62 9 C 82 1, 102 17, 122 9 C 142 1, 162 17, 182 9 C 202 1, 222 17, 238 9"
                          stroke="currentColor"
                          strokeWidth="3.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            strokeDasharray: 260,
                            strokeDashoffset: isFinal ? 0 : 260,
                            transition: reducedMotion
                              ? "none"
                              : "stroke-dashoffset 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease",
                          }}
                        />
                      </svg>
                    </span>
                  </span>
                </span>
              </span>
            </h1>

            {/* Subtítulo de Posicionamento com Destaques Editoriais */}
            <p className="mt-6 sm:mt-7 text-sm sm:text-base md:text-lg lg:text-[1.12rem] leading-relaxed text-[#0B1B47]/80 max-w-[56ch] font-body font-normal text-left">
              Sotaque é a agência de comunicação 360º que faz{" "}
              <span className="font-semibold text-[#0B1B47] underline decoration-[#E27908] decoration-2 underline-offset-[5px] whitespace-nowrap">
                a precisão da estratégia
              </span>{" "}
              conversar com{" "}
              <span className="font-semibold text-[#6E1016] underline decoration-[#E27908] decoration-2 underline-offset-[5px] whitespace-nowrap">
                a pluralidade brasileira
              </span>{" "}
              para marcas que querem falar com voz própria.
            </p>

            {/* Grupo de CTAs Alinhados à Esquerda */}
            <div className="mt-8 sm:mt-9 flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-full bg-[#E27908] hover:bg-[#C96B07] text-[#F4F1E5] px-8 py-4 text-xs font-mono font-bold tracking-widest uppercase shadow-md transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27908] focus-visible:ring-offset-2 text-center"
              >
                Ver cases
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-[#0B1B47] text-[#0B1B47] hover:bg-[#0B1B47] hover:text-[#F4F1E5] px-8 py-4 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B47] focus-visible:ring-offset-2 text-center"
              >
                Falar com a gente
              </a>
            </div>
          </div>

          {/* Coluna da Direita (~5 de 12 colunas): Objeto de Azulejo em Camadas sincronizado com wordIndex */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end relative w-full pt-8 lg:pt-0">
            <TileObject
              wordIndex={wordIndex}
              containerRef={heroRef}
              className="mx-auto lg:mr-0 lg:ml-auto"
            />
          </div>
        </div>
      </div>

      {/* Rodapé do Hero: Proveniência Salvador · Bahia + Botão de Scroll Animado + Faixa de Azulejos */}
      <div className="relative z-10 w-full flex flex-col items-center mt-auto pb-0 mb-0 leading-none">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pb-3.5 pt-2 flex items-center justify-between">
          <span className="tracking-widest uppercase text-xs font-mono text-[#0B1B47]/80 font-medium">
            Salvador · Bahia
          </span>

          {/* Scroll Animado Sem Bordas e Sem Card */}
          <a
            href="#pilares"
            aria-label="Rolar para ver o método e serviços"
            className="inline-flex items-center gap-2 text-[#0B1B47]/75 hover:text-[#0B1B47] transition-colors group cursor-pointer select-none bg-transparent border-0 p-0"
          >
            <span className="font-mono text-xs font-semibold tracking-[0.18em] uppercase">
              scroll
            </span>
            <span
              className="inline-flex items-center justify-center text-[#E27908] group-hover:text-[#C96B07] transition-colors duration-200 animate-bounce"
              aria-hidden="true"
            >
              <svg
                className="w-3.5 h-3.5 stroke-[2.5]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M12 5v14M19 12l-7 7-7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>

        {/* Faixa de Mosaicos Protagonista colada na base */}
        <MosaicMarquee className="w-full pb-0 mb-0" />
      </div>
    </section>
  );
}
