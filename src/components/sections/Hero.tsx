"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import BonfimRibbons from "@/components/motion/BonfimRibbons";
import { HERO_CONTENT } from "@/content/hero";

export default function Hero() {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

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

  // Inicialização do Web Audio sob demanda (desligado por padrão, sem autoplay)
  const initAudio = useCallback(() => {
    if (audioRef.current) return;

    try {
      const audio = new Audio("/beat/bg-audio.mp3");
      audio.loop = true;
      audio.volume = 0.35;
      audioRef.current = audio;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const analyser = ctx.createAnalyser();
        analyser.fftSize = 128;
        analyserRef.current = analyser;

        const source = ctx.createMediaElementSource(audio);
        sourceRef.current = source;
        source.connect(analyser);
        analyser.connect(ctx.destination);
      }
    } catch (err) {
      console.warn("Falha ao inicializar Web Audio:", err);
    }
  }, []);

  const toggleSound = useCallback(() => {
    initAudio();

    if (!audioRef.current) return;

    if (isPlayingSound) {
      audioRef.current.pause();
      setIsPlayingSound(false);
    } else {
      if (audioContextRef.current && audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }
      audioRef.current
        .play()
        .then(() => setIsPlayingSound(true))
        .catch((err) => {
          console.warn("Autoplay bloqueado pelo navegador:", err);
          setIsPlayingSound(false);
        });
    }
  }, [initAudio, isPlayingSound]);

  // Limpeza de áudio ao desmontar o componente
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const activeWord = reducedMotion
    ? HERO_CONTENT.headlineHighlight
    : HERO_CONTENT.rotatingWords[activeWordIndex];

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-between pt-24 sm:pt-32 pb-6 sm:pb-8 overflow-hidden bg-[var(--sotaque-creme,#F4F1E5)] text-[#0B1B47]"
      aria-label="Apresentação — Sotaque Estúdio 360"
    >
      {/* Fitinhas Desktop: Cascata Completa de 11 fitas à direita */}
      <div className="hidden md:block absolute right-[-4%] top-[19%] lg:top-[21%] w-[68%] max-w-[840px] pointer-events-none z-0">
        <BonfimRibbons
          variant="desktop"
          isPlayingSound={isPlayingSound}
          analyser={analyserRef.current}
          className="w-full"
        />
      </div>

      {/* Grid Principal — Margens alinhadas exatamente com navbar e seções */}
      <div className="relative z-10 mx-auto max-w-content w-full px-5 sm:px-6 lg:px-8 my-auto">
        <div className="max-w-3xl">
          {/* MOBILE: 5 Fitinhas ACIMA da frase 'Sua marca tem voz.' (de ponta a ponta da tela) */}
          <div className="md:hidden w-[calc(100%+2.5rem)] -mx-5 mb-5 overflow-hidden pointer-events-none z-0">
            <BonfimRibbons
              variant="mobile-top"
              isPlayingSound={isPlayingSound}
              analyser={analyserRef.current}
              className="w-full"
            />
          </div>

          {/* H1 Monumental em Commune Inktrap Oficial — Mobile First */}
          <h1
            aria-label="Sua marca tem voz. Nós damos o sotaque."
            className="font-['Commune',serif] text-[clamp(2.1rem,6.8vw,5.4rem)] leading-[1.02] sm:leading-[0.96] tracking-[-0.03em] font-normal text-[#0B1B47]"
          >
            <span className="block">Sua marca tem voz.</span>
            <span className="block mt-1 sm:mt-2">
              Nós damos o&nbsp;
              <span
                className="inline-block relative min-w-[5ch] sm:min-w-[7ch] align-baseline text-left"
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

          {/* Subtítulo de Posicionamento */}
          {/* TODO(humano): Subtítulo candidato definido em content/hero.ts */}
          <p className="mt-4 sm:mt-7 text-sm sm:text-lg lg:text-xl leading-relaxed text-[#0B1B47]/85 max-w-[50ch] font-body font-normal">
            {HERO_CONTENT.subtitle}
          </p>

          {/* Grupo de CTAs — Mobile First: largura total no mobile, flex-row no desktop */}
          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto z-10 relative">
            {/* CTA Primário: Sólido em Laranja Solar */}
            <a
              href={HERO_CONTENT.ctaPrimary.href}
              className="inline-flex items-center justify-center rounded-full bg-[#E27908] hover:bg-[#C96B07] text-[#F4F1E5] px-6 sm:px-7 py-3.5 text-xs font-mono font-bold tracking-widest uppercase shadow-md transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27908] focus-visible:ring-offset-2 text-center"
            >
              {HERO_CONTENT.ctaPrimary.label}
            </a>

            {/* CTA Secundário: Contorno em Azul Meia-Noite */}
            <a
              href={HERO_CONTENT.ctaSecondary.href}
              className="inline-flex items-center justify-center rounded-full border border-[#0B1B47] text-[#0B1B47] hover:bg-[#0B1B47] hover:text-[#F4F1E5] px-6 sm:px-7 py-3.5 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B47] focus-visible:ring-offset-2 text-center"
            >
              {HERO_CONTENT.ctaSecondary.label}
            </a>
          </div>

          {/* MOBILE: 5 Fitinhas ABAIXO dos botões CTA (de ponta a ponta da tela) */}
          <div className="md:hidden w-[calc(100%+2.5rem)] -mx-5 mt-6 mb-2 overflow-hidden pointer-events-none z-0">
            <BonfimRibbons
              variant="mobile-bottom"
              isPlayingSound={isPlayingSound}
              analyser={analyserRef.current}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Faixa Inferior Discreta — Alinhada ao mesmo grid */}
      <div className="relative z-10 w-full mt-4 sm:mt-16">
        <div className="mx-auto max-w-content w-full px-5 sm:px-6 lg:px-8">
          <div className="pt-4 border-t border-[#0B1B47]/10 flex items-center justify-between text-xs font-mono text-[#0B1B47]/65">
            {/* Localização oficial */}
            <span className="tracking-widest uppercase text-[11px] sm:text-xs">
              {HERO_CONTENT.location}
            </span>

            {/* Controle de Som Discreto */}
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={isPlayingSound}
              aria-label={
                isPlayingSound
                  ? "Desativar ambientação sonora da Sotaque"
                  : "Ativar ambientação sonora da Sotaque"
              }
              className="group flex items-center gap-2 rounded-full px-2.5 sm:px-3 py-1.5 border border-[#0B1B47]/15 hover:border-[#E27908] bg-transparent hover:bg-white/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27908]"
            >
              {/* Ícone de ondas de áudio */}
              <span className="flex items-center gap-[2px] h-3" aria-hidden="true">
                <span
                  className={`w-0.5 rounded-full bg-[#0B1B47] transition-all ${
                    isPlayingSound ? "h-3 animate-pulse" : "h-1.5 opacity-50"
                  }`}
                />
                <span
                  className={`w-0.5 rounded-full bg-[#E27908] transition-all ${
                    isPlayingSound ? "h-2.5 animate-bounce" : "h-1 opacity-50"
                  }`}
                />
                <span
                  className={`w-0.5 rounded-full bg-[#0B1B47] transition-all ${
                    isPlayingSound ? "h-3.5 animate-pulse" : "h-1.5 opacity-50"
                  }`}
                />
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider group-hover:text-[#0B1B47]">
                <span className="sm:hidden">{isPlayingSound ? "Som: On" : "Som: Off"}</span>
                <span className="hidden sm:inline">{isPlayingSound ? "Som: Ligado" : "Som: Desligado"}</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
