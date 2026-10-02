"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import VoiceWaves from "@/components/motion/VoiceWaves";
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
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-8 overflow-hidden bg-[var(--sotaque-creme,#F4F1E5)] text-[#0B1B47]"
      aria-label="Apresentação — Sotaque Estúdio 360"
    >
      {/* Ondas de Voz Estruturais — Posicionadas atrás e à direita do título */}
      <div className="absolute right-[-5%] top-[14%] sm:top-[12%] w-[85%] sm:w-[65%] max-w-[780px] pointer-events-none z-0">
        <VoiceWaves
          isPlayingSound={isPlayingSound}
          analyser={analyserRef.current}
          className="w-full"
        />
      </div>

      {/* Grid Principal Único — Margens alinhadas exatamente com navbar e seções */}
      <div className="relative z-10 mx-auto max-w-content w-full px-6 lg:px-8 my-auto">
        <div className="max-w-3xl">
          {/* H1 Monumental em Commune Inktrap Oficial */}
          {/* Texto completo estático em aria-label para SEO e leitores de tela */}
          <h1
            aria-label="Sua marca tem voz. Nós damos o sotaque."
            className="font-['Commune',serif] text-[clamp(2.75rem,6.8vw,5.5rem)] leading-[0.96] tracking-[-0.03em] font-normal text-[#0B1B47]"
          >
            <span className="block">Sua marca tem voz.</span>
            <span className="block mt-1 sm:mt-2">
              Nós damos o&nbsp;
              <span
                className="inline-block relative min-w-[7ch] align-baseline text-left"
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

          {/* Subtítulo de Posicionamento — Estilo único de destaque */}
          {/* TODO(humano): Subtítulo candidato definido em content/hero.ts */}
          <p className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl leading-relaxed text-[#0B1B47]/80 max-w-[52ch] font-body font-normal">
            {HERO_CONTENT.subtitle}
          </p>

          {/* Grupo de CTAs — Um primário e um secundário */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            {/* CTA Primário: Sólido em Laranja Solar */}
            <a
              href={HERO_CONTENT.ctaPrimary.href}
              className="inline-flex items-center justify-center rounded-full bg-[#E27908] hover:bg-[#C96B07] text-[#F4F1E5] px-7 py-3.5 text-xs font-mono font-bold tracking-widest uppercase shadow-md transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27908] focus-visible:ring-offset-2"
            >
              {HERO_CONTENT.ctaPrimary.label}
            </a>

            {/* CTA Secundário: Contorno em Azul Meia-Noite */}
            <a
              href={HERO_CONTENT.ctaSecondary.href}
              className="inline-flex items-center justify-center rounded-full border border-[#0B1B47] text-[#0B1B47] hover:bg-[#0B1B47] hover:text-[#F4F1E5] px-7 py-3.5 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1B47] focus-visible:ring-offset-2"
            >
              {HERO_CONTENT.ctaSecondary.label}
            </a>
          </div>
        </div>
      </div>

      {/* Faixa Inferior Discreta — Alinhada ao mesmo grid */}
      <div className="relative z-10 w-full mt-12 sm:mt-16">
        <div className="mx-auto max-w-content w-full px-6 lg:px-8">
          <div className="pt-4 border-t border-[#0B1B47]/10 flex items-center justify-between text-xs font-mono text-[#0B1B47]/65">
            {/* Localização oficial */}
            <span className="tracking-widest uppercase">
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
              className="group flex items-center gap-2.5 rounded-full px-3 py-1.5 border border-[#0B1B47]/15 hover:border-[#E27908] bg-transparent hover:bg-white/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27908]"
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
              <span className="text-[11px] font-semibold uppercase tracking-wider group-hover:text-[#0B1B47]">
                {isPlayingSound ? "Som: Ligado" : "Som: Desligado"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
