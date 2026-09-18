"use client";

import { useEffect, useRef, useState } from "react";

type ParallaxLayerProps = {
  children: React.ReactNode;
  /** 0 = estático, 0.15 = lento profundo, 0.4 = médio — será mapeado para ~ 0-16% yPercent para não quebrar layout */
  speed?: number;
  className?: string;
  /** seletor ou trigger custom; padrão: section ancestral mais próximo */
  trigger?: string;
};

export default function ParallaxLayer({
  children,
  speed = 0.3,
  className = "",
  trigger,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isMounted || reducedMotion || !ref.current) return;

    let ctx: any = null;
    let cancelled = false;

    // Import dinâmico — evita SSR crash (ScrollTrigger acessa window)
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapMod, stMod]) => {
      if (cancelled || !ref.current) return;
      const gsap = gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const el = ref.current!;
      // Encontra trigger: prop > section mais próxima > parent
      let triggerEl: Element | null = null;
      if (trigger) {
        triggerEl = document.querySelector(trigger);
      }
      if (!triggerEl) {
        triggerEl = el.closest("section") as Element | null;
      }
      if (!triggerEl) triggerEl = el.parentElement;

      if (!triggerEl) return;

      // Mapeia speed 0-1 para yPercent sutil (evita quebrar layout com 38% gigante)
      // speed 0.14 => ~5.6%, 0.38 => ~13% — perceptível mas não sai da tela
      const yPercent = -(speed * 35);
      // Para speeds muito altos, usa px fallback para controle
      // yPercent negativo = move para cima mais devagar que scroll (parallax real)

      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { yPercent: 0 },
          {
            yPercent,
            ease: "none",
            scrollTrigger: {
              trigger: triggerEl as Element,
              start: "top bottom", // quando topo da seção entra por baixo
              end: "bottom top", // quando base sai por cima
              scrub: 0.6, // suavização — 0.6s de lag, orgânico
              invalidateOnRefresh: true,
              // markers: process.env.NODE_ENV === "development",
            },
          }
        );
      }, triggerEl as Element);

      // Força refresh após setup — garante que Lenis está sincronizado
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, [speed, reducedMotion, isMounted, trigger]);

  return (
    <div
      ref={ref}
      className={`${className} ${reducedMotion ? "" : "will-change-transform"}`}
      aria-hidden
    >
      {children}
    </div>
  );
}
