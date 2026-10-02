"use client";

import { useEffect, useState } from "react";

export default function SotaquePreloader() {
  const [isMounted, setIsMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // 1. Respeito a prefers-reduced-motion (Acessibilidade)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // 2. Exibe apenas na primeira visita da sessão (sessionStorage)
    try {
      if (sessionStorage.getItem("sotaque_visited")) {
        return;
      }
      sessionStorage.setItem("sotaque_visited", "true");
    } catch {
      // Caso cookies/storage estejam desativados
    }

    setIsMounted(true);

    // 3. Bloqueio de rolagem enquanto o overlay existir
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if ((window as any).__lenis) {
      (window as any).__lenis.stop();
    }

    const unlockScroll = () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      if ((window as any).__lenis) {
        (window as any).__lenis.start();
      }
    };

    // Duração máxima de ~800ms (inicia saída em 450ms, remove aos 800ms)
    const closeTimer = setTimeout(() => {
      setIsClosing(true);
      unlockScroll();
    }, 450);

    const unmountTimer = setTimeout(() => {
      setIsMounted(false);
    }, 800);

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(unmountTimer);
      unlockScroll();
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#0B1B47] text-[#F4F1E5] flex items-center justify-center select-none transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isClosing ? "-translate-y-full" : "translate-y-0"
      }`}
      role="status"
      aria-label="Carregando Sotaque"
    >
      <div
        className={`transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
      >
        <img
          src="/brand/logos/sotaque_simbolo-e-nome_creme.png"
          alt="Sotaque Estúdio 360"
          className="h-9 sm:h-11 w-auto object-contain animate-fade-in"
        />
      </div>
    </div>
  );
}
