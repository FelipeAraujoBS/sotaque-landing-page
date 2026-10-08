"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

const TARGET_VOLUME = 0.35;
const AUDIO_SRC = "/audio/freegroove.mp3";

const EQUALIZER_BARS = [
  { min: 4, max: 14, duration: 0.6, delay: 0 },
  { min: 6, max: 16, duration: 0.45, delay: 0.15 },
  { min: 3, max: 12, duration: 0.55, delay: 0.3 },
  { min: 5, max: 15, duration: 0.5, delay: 0.1 },
];

export default function SoundToggle() {
  // Inicia ON por padrão
  const [isPlaying, setIsPlaying] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userMutedRef = useRef(false);
  const reduceMotion = useReducedMotion();

  // Inicializa o áudio e dispara a reprodução no carregamento
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = TARGET_VOLUME;
    audioRef.current = audio;

    setIsReady(true);

    const tryPlay = () => {
      if (userMutedRef.current || !audioRef.current) return;

      audioRef.current.play().catch(() => {
        // Caso o navegador bloqueie autoplay com som antes do primeiro gesto,
        // o switch continua "ON" e o som destrava no primeiro toque/clique
        const unlock = () => {
          if (!userMutedRef.current && audioRef.current) {
            audioRef.current.play().catch(() => {});
          }
          cleanup();
        };

        const cleanup = () => {
          window.removeEventListener("pointerdown", unlock);
          window.removeEventListener("click", unlock);
          window.removeEventListener("keydown", unlock);
          window.removeEventListener("touchstart", unlock);
          window.removeEventListener("scroll", unlock);
        };

        window.addEventListener("pointerdown", unlock, { once: true, passive: true });
        window.addEventListener("click", unlock, { once: true, passive: true });
        window.addEventListener("keydown", unlock, { once: true, passive: true });
        window.addEventListener("touchstart", unlock, { once: true, passive: true });
        window.addEventListener("scroll", unlock, { once: true, passive: true });
      });
    };

    tryPlay();

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  // Alterna o som ao clicar no switch
  const toggleSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      userMutedRef.current = true;
      audio.pause();
      setIsPlaying(false);
    } else {
      userMutedRef.current = false;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying]);

  if (!isReady) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-40 select-none pointer-events-auto"
      role="region"
      aria-label="Controle de Trilha Sonora Sotaque"
    >
      <button
        type="button"
        role="switch"
        aria-checked={isPlaying}
        aria-label={
          isPlaying
            ? "Desligar música de fundo (Free Groove)"
            : "Ligar música de fundo (Free Groove)"
        }
        onClick={toggleSound}
        className="group flex items-center gap-2.5 sm:gap-3 rounded-full bg-[#0B1B47]/85 hover:bg-[#0B1B47] text-[#F4F1E5] backdrop-blur-md px-3.5 py-2 border border-[#F4F1E5]/20 hover:border-[#E27908]/60 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E27908] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1B47]"
      >
        {/* Equalizador sonoro animado */}
        <div className="flex items-end gap-[2.5px] h-4 w-4 justify-center" aria-hidden="true">
          {EQUALIZER_BARS.map((bar, i) => (
            <motion.span
              key={i}
              className="w-[2.5px] rounded-full bg-[#E27908]"
              animate={
                isPlaying && !reduceMotion
                  ? {
                      height: [bar.min, bar.max, bar.min],
                      transition: {
                        duration: bar.duration,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: bar.delay,
                      },
                    }
                  : {
                      height: isPlaying ? 8 : 3,
                      opacity: isPlaying ? 1 : 0.4,
                    }
              }
            />
          ))}
        </div>

        {/* Rótulo refinado em tipografia mono */}
        <div className="flex flex-col text-left">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest font-bold text-[#F4F1E5]/90 group-hover:text-[#F4F1E5] leading-none transition-colors">
            Groove
          </span>
          <span className="text-[8px] font-mono tracking-wider uppercase text-[#F4F1E5]/50 leading-none mt-0.5">
            {isPlaying ? "On" : "Off"}
          </span>
        </div>

        {/* Switch Toggle discreto visual */}
        <span
          aria-hidden="true"
          className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border border-transparent transition-colors duration-250 ease-in-out ${
            isPlaying ? "bg-[#E27908]" : "bg-[#F4F1E5]/25"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-[#F4F1E5] shadow-md ring-0 transition-transform duration-250 ease-in-out mt-[1px] ${
              isPlaying ? "translate-x-4 ml-[2px]" : "translate-x-0.5"
            }`}
          />
        </span>
      </button>
    </div>
  );
}
