"use client";

import { useEffect, useRef, useState } from "react";

interface BonfimRibbonsProps {
  isPlayingSound?: boolean;
  analyser?: AnalyserNode | null;
  className?: string;
}

interface RibbonConfig {
  id: string;
  name: string;
  baseY: number;
  color: string;
  textColor: string;
  strokeWidth: number;
  speed: number;
  freq: number;
  amplitude: number;
  phaseOffset: number;
  textOffset: string;
  opacity: number;
}

const RIBBONS: RibbonConfig[] = [
  {
    id: "bonfim-laranja",
    name: "Laranja Solar (Criatividade)",
    baseY: 65,
    color: "#E27908",
    textColor: "#FFFFFF",
    strokeWidth: 17,
    speed: 1.15,
    freq: 2.1,
    amplitude: 24,
    phaseOffset: 0.0,
    textOffset: "2%",
    opacity: 0.95,
  },
  {
    id: "bonfim-azul",
    name: "Azul Meia-Noite (Fé & Serenidade)",
    baseY: 125,
    color: "#0B1B47",
    textColor: "#F4F1E5",
    strokeWidth: 17,
    speed: 0.9,
    freq: 1.8,
    amplitude: 28,
    phaseOffset: 1.5,
    textOffset: "4%",
    opacity: 0.92,
  },
  {
    id: "bonfim-vinho",
    name: "Vinho Profundo (Paixão & Raiz)",
    baseY: 185,
    color: "#6E1016",
    textColor: "#FFFFFF",
    strokeWidth: 17,
    speed: 1.05,
    freq: 2.3,
    amplitude: 22,
    phaseOffset: 3.1,
    textOffset: "1%",
    opacity: 0.92,
  },
  {
    id: "bonfim-verde",
    name: "Verde Esperança (Cura & Oxóssi)",
    baseY: 245,
    color: "#1E6838",
    textColor: "#FFFFFF",
    strokeWidth: 17,
    speed: 0.85,
    freq: 1.9,
    amplitude: 26,
    phaseOffset: 4.6,
    textOffset: "3%",
    opacity: 0.90,
  },
  {
    id: "bonfim-amarelo",
    name: "Amarelo Ouro (Prosperidade & Oxum)",
    baseY: 305,
    color: "#DF9307",
    textColor: "#0B1B47",
    strokeWidth: 17,
    speed: 1.2,
    freq: 2.4,
    amplitude: 20,
    phaseOffset: 5.8,
    textOffset: "5%",
    opacity: 0.92,
  },
];

const BONFIM_PHRASE =
  "LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA  •  LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA  •  LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA  •  LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA";

export default function BonfimRibbons({
  isPlayingSound = false,
  analyser = null,
  className = "",
}: BonfimRibbonsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

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

  // IntersectionObserver para pausar animação fora de tela
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
            y: -35,
            x: -15,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
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

  // Função para calcular o caminho de fita ondulando no vento
  // Simula vento real: amplitude cresce em direção à ponta livre da fita
  const generateRibbonPath = (
    width: number,
    baseY: number,
    amp: number,
    freq: number,
    phase: number,
    steps = 45
  ) => {
    const points: [number, number][] = [];
    const stepX = width / steps;

    for (let i = 0; i <= steps; i++) {
      const x = i * stepX;
      const t = x / width; // 0.0 na raiz -> 1.0 na ponta livre

      // Na ponta livre da fita o vento chacoalha mais forte
      const localAmp = amp * (0.25 + 0.75 * Math.pow(t, 1.25));

      // Onda principal + harmônica secundária suave de flutter
      const primaryAngle = t * Math.PI * 2 * freq + phase;
      const flutterAngle = t * Math.PI * 5 - phase * 1.5;
      const y = baseY + Math.sin(primaryAngle) * localAmp + Math.sin(flutterAngle) * (localAmp * 0.15);

      points.push([x, y]);
    }

    if (points.length < 2) return "";

    let d = `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midX = (prev[0] + curr[0]) / 2;
      const midY = (prev[1] + curr[1]) / 2;
      d += ` Q ${prev[0].toFixed(1)} ${prev[1].toFixed(1)}, ${midX.toFixed(1)} ${midY.toFixed(1)}`;
    }
    const last = points[points.length - 1];
    d += ` T ${last[0].toFixed(1)} ${last[1].toFixed(1)}`;

    return d;
  };

  // Loop de animação das fitinhas ondulando no vento + áudio reativo
  useEffect(() => {
    if (reducedMotion || !isVisible) return;

    let rafId: number;
    let time = 0;
    const dataArray = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;

    const animate = () => {
      time += 0.016; // ~60fps

      let audioEnergy = 0;
      if (isPlayingSound && analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        const count = Math.min(48, dataArray.length);
        for (let i = 0; i < count; i++) {
          sum += dataArray[i];
        }
        audioEnergy = sum / count / 255;
      }

      const svgWidth = 860;

      RIBBONS.forEach((ribbon, index) => {
        const pathEl = pathRefs.current[index];
        if (!pathEl) return;

        // Amplitude base + flutter natural do vento + energia sonora sutil
        const dynamicAmp = ribbon.amplitude + audioEnergy * 24;
        const currentPhase = time * ribbon.speed + ribbon.phaseOffset;

        const pathData = generateRibbonPath(
          svgWidth,
          ribbon.baseY,
          dynamicAmp,
          ribbon.freq,
          currentPhase
        );

        pathEl.setAttribute("d", pathData);
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isPlayingSound, analyser, isVisible, reducedMotion]);

  // Caminhos estáticos com ondulação graciosa de repouso (reduced-motion / SSR)
  const getStaticPath = (ribbon: RibbonConfig) => {
    return generateRibbonPath(860, ribbon.baseY, ribbon.amplitude * 0.9, ribbon.freq, ribbon.phaseOffset);
  };

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none relative ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 860 370"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Sombra realista das fitinhas de tecido sobre o fundo */}
          <filter id="bonfim-shadow" x="-5%" y="-30%" width="110%" height="170%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0B1B47" floodOpacity="0.12" />
          </filter>

          {/* Caminhos SVG referenciados pelo textPath */}
          {RIBBONS.map((ribbon, index) => (
            <path
              key={`def-${ribbon.id}`}
              id={`path-${ribbon.id}`}
              ref={(el) => {
                pathRefs.current[index] = el;
              }}
              d={getStaticPath(ribbon)}
            />
          ))}
        </defs>

        {/* Camada das 5 Fitinhas do Bonfim com Sombra e Tipografia em Curva */}
        <g filter="url(#bonfim-shadow)">
          {RIBBONS.map((ribbon) => (
            <g key={`ribbon-group-${ribbon.id}`} opacity={ribbon.opacity}>
              {/* O corpo de tecido da Fita */}
              <use
                href={`#path-${ribbon.id}`}
                stroke={ribbon.color}
                strokeWidth={ribbon.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Friso sutil de brilho superior do cetim */}
              <use
                href={`#path-${ribbon.id}`}
                stroke="#FFFFFF"
                strokeWidth={1.5}
                strokeLinecap="round"
                opacity={0.25}
                transform="translate(0, -5)"
              />

              {/* Estampa Tipográfica Tradicional das Fitinhas do Bonfim */}
              <text
                fill={ribbon.textColor}
                fontSize="7.8"
                fontWeight="800"
                fontFamily="system-ui, -apple-system, 'DM Sans', sans-serif"
                letterSpacing="2.2px"
                dy="2.8"
                className="select-none pointer-events-none"
              >
                <textPath
                  href={`#path-${ribbon.id}`}
                  startOffset={ribbon.textOffset}
                >
                  {BONFIM_PHRASE}
                </textPath>
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
