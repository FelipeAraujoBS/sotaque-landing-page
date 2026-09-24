"use client";

import { useEffect, useState, useRef } from "react";

export default function SotaquePreloader() {
  const [progress, setProgress] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  const is3DReadyRef = useRef(false);
  const startTimeRef = useRef<number>(0);

  // Mensagens editoriais dinâmicas durante o carregamento
  const getStatusText = (val: number) => {
    if (val < 25) return "Carregando identidade editorial & tipografia...";
    if (val < 60) return "Preparando ambiente visual & direção de arte...";
    if (val < 88) return "Harmonizando narrativas & ritmo do estúdio...";
    return "Sotaque pronto para navegação.";
  };

  useEffect(() => {
    // Fast-path para usuários com prefers-reduced-motion (A11y / P-215)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsMounted(false);
      return;
    }

    startTimeRef.current = performance.now();

    // 1. Bloqueio estrito de rolagem
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    const preventScrollKeys = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        setIsMounted(false);
        unlockScroll();
        return;
      }
      const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
      if (keys.includes(e.key)) {
        e.preventDefault();
      }
    };

    const lockScroll = () => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("keydown", preventScrollKeys);
      if ((window as any).__lenis) {
        (window as any).__lenis.stop();
      }
    };

    const unlockScroll = () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventScrollKeys);
      if ((window as any).__lenis) {
        (window as any).__lenis.start();
      }
    };

    lockScroll();

    // 2. Ouvinte de prontidão do 3D
    const handle3DReady = () => {
      is3DReadyRef.current = true;
    };
    window.addEventListener("sotaque:3d-ready", handle3DReady);

    // 3. Loop do timer e progresso
    let animId: number;

    const tick = () => {
      const now = performance.now();
      const diff = now - startTimeRef.current;
      setElapsedMs(diff);

      setProgress((prev) => {
        if (prev >= 100) return 100;

        let next = prev;
        const is3D = is3DReadyRef.current;

        if (!is3D) {
          // Avança suavemente até 88% enquanto o 3D carrega
          if (prev < 88) {
            next = prev + Math.random() * 2.2 + 0.8;
          }
        } else {
          // Assim que o 3D sinaliza ready, dispara rapidamente até 100%
          next = prev + Math.random() * 4.5 + 3.0;
        }

        // Fallback de segurança: se passar de 3.2s, completa independente do 3D
        if (diff > 3200) {
          next = Math.max(next, 95) + 3.0;
        }

        if (next >= 100) {
          next = 100;
          setTimeout(() => {
            setIsDone(true);
            unlockScroll();
            // Remove do DOM após a animação de saída
            setTimeout(() => {
              setIsMounted(false);
            }, 750);
          }, 200);
        }

        return next;
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("sotaque:3d-ready", handle3DReady);
      unlockScroll();
    };
  }, []);

  if (!isMounted) return null;

  // Formatação do cronômetro: 00:01.4s
  const totalSeconds = elapsedMs / 1000;
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  const tenths = Math.floor((totalSeconds % 1) * 10);
  const formattedTimer = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${tenths}s`;
  const roundedPercent = Math.min(100, Math.floor(progress));

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#102C2B] text-[#F3EBDD] flex flex-col justify-between p-6 sm:p-12 lg:p-16 select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isDone ? "-translate-y-full opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-live="polite"
      role="status"
    >
      {/* Top Header: Logo Sotaque & Tag de Carregamento */}
      <div className="flex items-center justify-between border-b border-[#F3EBDD]/15 pb-4 sm:pb-6">
        <div className="flex items-center gap-3">
          <span className="font-display font-extrabold tracking-tight text-xl sm:text-2xl text-[#F3EBDD]">
            SOTAQUE<span className="text-[#D63A2F]">.</span>
          </span>
          <span className="hidden sm:inline text-xs font-mono tracking-widest text-[#F3EBDD]/75 uppercase">
            | Estúdio 360 Saúde
          </span>
        </div>

        {/* Timer Digital Ativo */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#F3EBDD]/15 bg-[#163A39]/60 font-mono text-xs text-[#E7A92B]">
          <span className="w-2 h-2 rounded-full bg-[#E7A92B] animate-ping" />
          <span>TEMPO: {formattedTimer}</span>
        </div>
      </div>

      {/* Centro: Grande Contador Numérico Editorial e Status */}
      <div className="max-w-5xl mx-auto w-full my-auto py-8 flex flex-col items-start justify-center">
        {/* Subtítulo da fase */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#F3EBDD]/75 uppercase tracking-wider mb-2">
          <span className="text-[#D63A2F]">✦</span>
          <span>Iniciando Universo Visual</span>
        </div>

        {/* Número da porcentagem em escala monumental */}
        <div className="font-serif text-7xl sm:text-9xl md:text-[11rem] lg:text-[13rem] font-light tracking-tighter leading-none text-[#F3EBDD] flex items-baseline">
          <span>{roundedPercent}</span>
          <span className="text-3xl sm:text-5xl md:text-6xl text-[#E7A92B] font-mono ml-2 font-normal">
            %
          </span>
        </div>

        {/* Barra de Progresso Ultrafina */}
        <div className="w-full h-1 sm:h-1.5 bg-[#F3EBDD]/15 rounded-full overflow-hidden mt-6 mb-4 relative">
          <div
            className="h-full bg-gradient-to-r from-[#E7A92B] via-[#D63A2F] to-[#E7A92B] transition-all duration-150 ease-out relative"
            style={{ width: `${roundedPercent}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#F3EBDD] shadow-[0_0_10px_#E7A92B]" />
          </div>
        </div>

        {/* Linha explicativa do que está carregando */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2 text-xs font-mono text-[#F3EBDD]/70 pt-1">
          <span className="text-balance">{getStatusText(roundedPercent)}</span>
          <span className="text-[#F3EBDD]/70 shrink-0">
            {100 - roundedPercent}% RESTANTE
          </span>
        </div>
      </div>

      {/* Rodapé: Aviso & Direitos */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 text-xs font-mono text-[#F3EBDD]/70 border-t border-[#F3EBDD]/15 pt-4 sm:pt-6">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D63A2F]" />
          <span className="text-[#F3EBDD]/80">
            Carregando experiência editorial...
          </span>
        </div>
        <span>Salvador, BA — Rigor Ético & Calor Regional</span>
      </div>
    </div>
  );
}
