"use client";

import { useEffect, useRef, useState } from "react";

interface VoiceWavesProps {
  isPlayingSound?: boolean;
  analyser?: AnalyserNode | null;
  className?: string;
}

export default function VoiceWaves({
  isPlayingSound = false,
  analyser = null,
  className = "",
}: VoiceWavesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const path3Ref = useRef<SVGPathElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Detecção de prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Pausar animação quando o elemento sai da viewport (IntersectionObserver)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Parallax leve atrelado ao scroll com GSAP ScrollTrigger
  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    let ctx: any = null;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapMod, stMod]) => {
        if (cancelled || !containerRef.current) return;
        const gsap = gsapMod.default;
        const ScrollTrigger = stMod.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          gsap.to(containerRef.current, {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        });
      }
    );

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, [reducedMotion]);

  // Função auxiliar para gerar caminho SVG de onda senoidal suave com bezier
  const generateWavePath = (
    width: number,
    baseY: number,
    amplitude: number,
    cycles: number,
    phase: number
  ) => {
    const points: [number, number][] = [];
    const steps = 60;
    const stepX = width / steps;

    for (let i = 0; i <= steps; i++) {
      const x = i * stepX;
      const angle = (x / width) * Math.PI * 2 * cycles + phase;
      const y = baseY + Math.sin(angle) * amplitude;
      points.push([x, y]);
    }

    if (points.length < 2) return "";

    let d = `M ${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midX = (prev[0] + curr[0]) / 2;
      const midY = (prev[1] + curr[1]) / 2;
      d += ` Q ${prev[0].toFixed(2)} ${prev[1].toFixed(2)}, ${midX.toFixed(2)} ${midY.toFixed(2)}`;
    }
    const last = points[points.length - 1];
    d += ` T ${last[0].toFixed(2)} ${last[1].toFixed(2)}`;

    return d;
  };

  // Loop de animação contínuo (respiração suave) e modulação por áudio
  useEffect(() => {
    if (reducedMotion || !isVisible) return;

    let rafId: number;
    let time = 0;
    const dataArray = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;

    const animate = () => {
      time += 0.016; // ~60fps step

      let audioEnergy = 0;
      if (isPlayingSound && analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);
        // Calcula energia média nas baixas e médias frequências (voz e ritmo)
        let sum = 0;
        const count = Math.min(64, dataArray.length);
        for (let i = 0; i < count; i++) {
          sum += dataArray[i];
        }
        audioEnergy = (sum / count) / 255; // 0.0 a 1.0
      }

      const svgWidth = 800;
      const baseAmp = 26 + audioEnergy * 38;
      const breathing = Math.sin(time * 1.2) * 5;

      // Onda 1: Superior (Azul Meia-Noite)
      if (path1Ref.current) {
        const d1 = generateWavePath(
          svgWidth,
          100,
          baseAmp + breathing,
          2.2,
          time * 0.95
        );
        path1Ref.current.setAttribute("d", d1);
      }

      // Onda 2: Central (Laranja Solar — destaque pontual da marca)
      if (path2Ref.current) {
        const d2 = generateWavePath(
          svgWidth,
          180,
          baseAmp * 1.15 + breathing * 0.8,
          2.0,
          time * 1.1 + 1.2
        );
        path2Ref.current.setAttribute("d", d2);
      }

      // Onda 3: Inferior (Azul Meia-Noite com base harmônica)
      if (path3Ref.current) {
        const d3 = generateWavePath(
          svgWidth,
          260,
          baseAmp * 0.85 + breathing * 1.2,
          2.4,
          time * 0.85 + 2.4
        );
        path3Ref.current.setAttribute("d", d3);
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isPlayingSound, analyser, isVisible, reducedMotion]);

  // Caminhos estáticos padrão para SSR e reduced-motion
  const staticPath1 =
    "M 0 100 Q 100 65, 200 100 T 400 100 T 600 100 T 800 100";
  const staticPath2 =
    "M 0 180 Q 100 220, 200 180 T 400 180 T 600 180 T 800 180";
  const staticPath3 =
    "M 0 260 Q 100 230, 200 260 T 400 260 T 600 260 T 800 260";

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
        preserveAspectRatio="none"
      >
        {/* Onda 1: Azul Meia-Noite com opacidade sutil estrutural (~12%) */}
        <path
          ref={path1Ref}
          d={staticPath1}
          stroke="#0B1B47"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.12"
          className="transition-opacity duration-300"
        />

        {/* Onda 2: Destaque Pontual em Laranja Solar Oficial */}
        <path
          ref={path2Ref}
          d={staticPath2}
          stroke="#E27908"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={isPlayingSound ? "0.65" : "0.35"}
          className="transition-opacity duration-300"
        />

        {/* Onda 3: Azul Meia-Noite com opacidade baixa estrutural (~10%) */}
        <path
          ref={path3Ref}
          d={staticPath3}
          stroke="#0B1B47"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.10"
          className="transition-opacity duration-300"
        />
      </svg>
    </div>
  );
}
