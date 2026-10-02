"use client";

import { useEffect, useRef, useState } from "react";

interface BonfimRibbonsProps {
  isPlayingSound?: boolean;
  analyser?: AnalyserNode | null;
  className?: string;
  variant?: "desktop" | "mobile-top" | "mobile-bottom";
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

// Configuração Desktop: 11 fitas em cascata completa
const DESKTOP_RIBBONS: RibbonConfig[] = [
  {
    id: "bonfim-laranja-1",
    name: "Laranja Solar (Criatividade & Sotaque)",
    baseY: 52,
    color: "#E27908",
    textColor: "#FFFFFF",
    strokeWidth: 17,
    speed: 3.5,
    freq: 2.1,
    amplitude: 42,
    phaseOffset: 0.0,
    textOffset: "1%",
    opacity: 0.96,
  },
  {
    id: "bonfim-azul-1",
    name: "Azul Meia-Noite (Fé & Iemanjá)",
    baseY: 106,
    color: "#0B1B47",
    textColor: "#F4F1E5",
    strokeWidth: 17,
    speed: 3.1,
    freq: 1.85,
    amplitude: 45,
    phaseOffset: 1.6,
    textOffset: "4%",
    opacity: 0.94,
  },
  {
    id: "bonfim-vinho-1",
    name: "Vinho Profundo (Paixão & Raiz)",
    baseY: 160,
    color: "#6E1016",
    textColor: "#FFFFFF",
    strokeWidth: 17,
    speed: 3.7,
    freq: 2.25,
    amplitude: 40,
    phaseOffset: 3.2,
    textOffset: "2%",
    opacity: 0.95,
  },
  {
    id: "bonfim-verde-1",
    name: "Verde Esperança (Cura & Oxóssi)",
    baseY: 214,
    color: "#1E6838",
    textColor: "#FFFFFF",
    strokeWidth: 17,
    speed: 3.2,
    freq: 1.95,
    amplitude: 44,
    phaseOffset: 4.7,
    textOffset: "3%",
    opacity: 0.94,
  },
  {
    id: "bonfim-amarelo-1",
    name: "Amarelo Ouro (Prosperidade & Oxum)",
    baseY: 268,
    color: "#DF9307",
    textColor: "#0B1B47",
    strokeWidth: 17,
    speed: 3.9,
    freq: 2.3,
    amplitude: 39,
    phaseOffset: 5.9,
    textOffset: "5%",
    opacity: 0.95,
  },
  {
    id: "bonfim-branco-1",
    name: "Branco Paz (Oxalá & Senhor do Bonfim)",
    baseY: 322,
    color: "#FFFFFF",
    textColor: "#0B1B47",
    strokeWidth: 17,
    speed: 3.3,
    freq: 2.05,
    amplitude: 43,
    phaseOffset: 1.1,
    textOffset: "2%",
    opacity: 0.96,
  },
  {
    id: "bonfim-vinho-2",
    name: "Vinho Profundo (Paixão & Raiz)",
    baseY: 376,
    color: "#6E1016",
    textColor: "#FFFFFF",
    strokeWidth: 17,
    speed: 3.6,
    freq: 2.2,
    amplitude: 41,
    phaseOffset: 2.5,
    textOffset: "4%",
    opacity: 0.95,
  },
  {
    id: "bonfim-laranja-2",
    name: "Laranja Solar (Criatividade & Sotaque)",
    baseY: 430,
    color: "#E27908",
    textColor: "#FFFFFF",
    strokeWidth: 17,
    speed: 3.8,
    freq: 2.15,
    amplitude: 45,
    phaseOffset: 4.1,
    textOffset: "1%",
    opacity: 0.96,
  },
  {
    id: "bonfim-azul-2",
    name: "Azul Meia-Noite (Fé & Iemanjá)",
    baseY: 484,
    color: "#0B1B47",
    textColor: "#F4F1E5",
    strokeWidth: 17,
    speed: 3.0,
    freq: 1.9,
    amplitude: 46,
    phaseOffset: 5.4,
    textOffset: "3%",
    opacity: 0.94,
  },
  {
    id: "bonfim-verde-2",
    name: "Verde Esperança (Cura & Oxóssi)",
    baseY: 538,
    color: "#1E6838",
    textColor: "#FFFFFF",
    strokeWidth: 17,
    speed: 3.4,
    freq: 2.0,
    amplitude: 42,
    phaseOffset: 0.8,
    textOffset: "5%",
    opacity: 0.94,
  },
  {
    id: "bonfim-amarelo-2",
    name: "Amarelo Ouro (Prosperidade & Oxum)",
    baseY: 592,
    color: "#DF9307",
    textColor: "#0B1B47",
    strokeWidth: 17,
    speed: 4.0,
    freq: 2.35,
    amplitude: 38,
    phaseOffset: 2.9,
    textOffset: "2%",
    opacity: 0.95,
  },
];

// Mobile Top: 3 fitas de ponta a ponta acima dos CTAs
const MOBILE_TOP_RIBBONS: RibbonConfig[] = [
  {
    id: "m-top-laranja",
    name: "Laranja Solar",
    baseY: 30,
    color: "#E27908",
    textColor: "#FFFFFF",
    strokeWidth: 14.5,
    speed: 3.4,
    freq: 2.05,
    amplitude: 20,
    phaseOffset: 0.0,
    textOffset: "0%",
    opacity: 0.95,
  },
  {
    id: "m-top-azul",
    name: "Azul Meia-Noite",
    baseY: 76,
    color: "#0B1B47",
    textColor: "#F4F1E5",
    strokeWidth: 14.5,
    speed: 3.0,
    freq: 1.85,
    amplitude: 22,
    phaseOffset: 1.6,
    textOffset: "3%",
    opacity: 0.92,
  },
  {
    id: "m-top-vinho",
    name: "Vinho Profundo",
    baseY: 122,
    color: "#6E1016",
    textColor: "#FFFFFF",
    strokeWidth: 14.5,
    speed: 3.6,
    freq: 2.2,
    amplitude: 19,
    phaseOffset: 3.2,
    textOffset: "1%",
    opacity: 0.93,
  },
];

// Mobile Bottom: 3 fitas de ponta a ponta abaixo dos CTAs
const MOBILE_BOTTOM_RIBBONS: RibbonConfig[] = [
  {
    id: "m-bot-verde",
    name: "Verde Esperança",
    baseY: 30,
    color: "#1E6838",
    textColor: "#FFFFFF",
    strokeWidth: 14.5,
    speed: 3.2,
    freq: 1.95,
    amplitude: 21,
    phaseOffset: 4.7,
    textOffset: "2%",
    opacity: 0.92,
  },
  {
    id: "m-bot-amarelo",
    name: "Amarelo Ouro",
    baseY: 76,
    color: "#DF9307",
    textColor: "#0B1B47",
    strokeWidth: 14.5,
    speed: 3.8,
    freq: 2.25,
    amplitude: 19,
    phaseOffset: 0.9,
    textOffset: "4%",
    opacity: 0.94,
  },
  {
    id: "m-bot-branco",
    name: "Branco Paz",
    baseY: 122,
    color: "#FFFFFF",
    textColor: "#0B1B47",
    strokeWidth: 14.5,
    speed: 3.3,
    freq: 2.1,
    amplitude: 20,
    phaseOffset: 2.4,
    textOffset: "1%",
    opacity: 0.95,
  },
];

const BONFIM_PHRASE =
  "† LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA †   † LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA †   † LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA †   † LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA †";

// Função para calcular o caminho da fita
function generateRibbonPath(
  width: number,
  baseY: number,
  amp: number,
  freq: number,
  phase: number,
  audioEnergy = 0,
  bassEnergy = 0,
  time = 0,
  smoothMouse: { x: number; y: number; active: boolean },
  edgeToEdge = false,
  steps = 55
) {
  const points: [number, number][] = [];
  const startX = edgeToEdge ? -40 : 0;
  const endX = edgeToEdge ? width + 40 : width;
  const totalSpan = endX - startX;
  const stepX = totalSpan / steps;

  for (let i = 0; i <= steps; i++) {
    const x = startX + i * stepX;
    const t = (x - startX) / totalSpan; // 0.0 a 1.0

    // Envelope de amplitude
    const envelope = edgeToEdge
      ? 0.85 + 0.15 * Math.sin(t * Math.PI)
      : 0.15 + 0.85 * Math.pow(t, 1.15);

    const localAmp = amp * envelope;

    const primaryAngle = t * Math.PI * 2 * freq - phase;
    const turbAngle = t * Math.PI * 3.8 - phase * 1.35;
    const turbAmp = localAmp * 0.22;

    const flutterFreq = 5.2 + audioEnergy * 4.0;
    const flutterAngle = t * Math.PI * flutterFreq - phase * (1.8 + bassEnergy * 2.2);
    const flutterAmp = localAmp * (0.08 + audioEnergy * 0.45 + bassEnergy * 0.35);

    let y =
      baseY +
      Math.sin(primaryAngle) * localAmp +
      Math.sin(turbAngle) * turbAmp +
      Math.sin(flutterAngle) * flutterAmp;

    // Interação com o mouse suave
    if (smoothMouse.active) {
      const dx = x - smoothMouse.x;
      const dy = y - smoothMouse.y;
      const distSq = dx * dx + dy * dy;
      const radius = 135;

      if (distSq < radius * radius) {
        const dist = Math.sqrt(distSq);
        const gaussian = Math.exp(-distSq / (2 * 45 * 45));
        const direction = Math.sin(Math.min(1, Math.abs(dy) / 36) * (Math.PI / 2)) * (dy >= 0 ? 1 : -1);
        const breezeWave = Math.sin(time * 3.2 - dist * 0.03) * 2.2;
        y += (direction * 9 + breezeWave) * gaussian;
      }
    }

    points.push([x, y]);
  }

  if (points.length < 2) return { path: "", lastPoint: [width, baseY] as [number, number], lastAngle: 0 };

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

  const penultimate = points[points.length - 2];
  const lastAngle = Math.atan2(last[1] - penultimate[1], last[0] - penultimate[0]);

  return { path: d, lastPoint: last, lastAngle };
}

// Gera os caminhos dos microdesfiados na ponta da fita (usado apenas quando a ponta é visível)
function generateFrayedThreadsPath(
  endPoint: [number, number],
  endAngle: number,
  halfWidth: number,
  time: number,
  ribbonIndex: number
) {
  let d = "";
  const perp = endAngle + Math.PI / 2;
  const numThreads = 10;

  for (let k = 0; k < numThreads; k++) {
    const ratio = (k / (numThreads - 1)) * 2 - 1;
    const startX = endPoint[0] + Math.cos(perp) * (halfWidth * ratio);
    const startY = endPoint[1] + Math.sin(perp) * (halfWidth * ratio);

    const len = 9 + ((k * 3.7 + ribbonIndex * 2) % 9) + Math.sin(time * 8 + k) * 2.5;
    const flutter = Math.sin(time * 14 + k * 1.5 + ribbonIndex) * 3.5;

    const midX = startX + Math.cos(endAngle) * (len * 0.5);
    const midY = startY + Math.sin(endAngle) * (len * 0.5) + flutter * 0.5;

    const endX = startX + Math.cos(endAngle) * len;
    const endY = startY + Math.sin(endAngle) * len + flutter;

    d += ` M ${startX.toFixed(1)} ${startY.toFixed(1)} Q ${midX.toFixed(1)} ${midY.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;
  }

  return d;
}

export default function BonfimRibbons({
  isPlayingSound = false,
  analyser = null,
  className = "",
  variant = "desktop",
}: BonfimRibbonsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const frayRefs = useRef<(SVGPathElement | null)[]>([]);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const isEdgeToEdge = variant === "mobile-top" || variant === "mobile-bottom";

  const ribbons: RibbonConfig[] =
    variant === "mobile-top"
      ? MOBILE_TOP_RIBBONS
      : variant === "mobile-bottom"
      ? MOBILE_BOTTOM_RIBBONS
      : DESKTOP_RIBBONS;

  const viewBoxWidth = isEdgeToEdge ? 940 : 900;
  const viewBoxHeight = isEdgeToEdge ? 156 : 645;
  const viewBoxX = isEdgeToEdge ? -20 : 0;

  // Rastreamento amortecido do mouse
  const targetMouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const smoothMouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  // Detecção de prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // IntersectionObserver para pausar animação fora da tela
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

  // Ouvinte de mouse global no hero
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (
        x >= -80 &&
        x <= rect.width + 80 &&
        y >= -80 &&
        y <= rect.height + 80
      ) {
        const scaleX = viewBoxWidth / rect.width;
        const scaleY = viewBoxHeight / rect.height;
        targetMouseRef.current = {
          x: x * scaleX + viewBoxX,
          y: y * scaleY,
          active: true,
        };
      } else {
        targetMouseRef.current.active = false;
      }
    };

    const handleMouseLeave = () => {
      targetMouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [viewBoxWidth, viewBoxHeight, viewBoxX]);

  // Loop principal de animação a 60-120 FPS
  useEffect(() => {
    if (reducedMotion || !isVisible) return;

    let rafId: number;
    let time = 0;
    const dataArray = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;

    const animate = () => {
      let audioEnergy = 0;
      let bassEnergy = 0;

      if (isPlayingSound && analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);

        let bassSum = 0;
        const bassCount = Math.min(10, dataArray.length);
        for (let i = 1; i < bassCount; i++) {
          bassSum += dataArray[i];
        }
        bassEnergy = bassSum / Math.max(1, bassCount - 1) / 255;

        let totalSum = 0;
        const totalCount = Math.min(60, dataArray.length);
        for (let i = 2; i < totalCount; i++) {
          totalSum += dataArray[i];
        }
        audioEnergy = totalSum / Math.max(1, totalCount - 2) / 255;
      }

      const speedMultiplier = isPlayingSound
        ? 1.0 + audioEnergy * 2.2 + bassEnergy * 1.8
        : 1.0;

      time += 0.016 * speedMultiplier;

      const targetMouse = targetMouseRef.current;
      const smoothMouse = smoothMouseRef.current;

      if (targetMouse.active) {
        if (!smoothMouse.active) {
          smoothMouse.x = targetMouse.x;
          smoothMouse.y = targetMouse.y;
          smoothMouse.active = true;
        } else {
          smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.06;
          smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.06;
        }
      } else if (smoothMouse.active) {
        smoothMouse.x += (-9999 - smoothMouse.x) * 0.05;
        if (Math.abs(smoothMouse.x + 9999) < 20) {
          smoothMouse.active = false;
        }
      }

      const svgWidth = 900;

      ribbons.forEach((ribbon, index) => {
        const pathEl = pathRefs.current[index];
        const frayEl = frayRefs.current[index];
        if (!pathEl) return;

        const soundAmpBoost = isPlayingSound
          ? (isEdgeToEdge ? 14 : 26) + audioEnergy * (isEdgeToEdge ? 35 : 65) + bassEnergy * (isEdgeToEdge ? 24 : 45)
          : 0;

        const dynamicAmp = ribbon.amplitude + soundAmpBoost;
        const currentPhase = time * ribbon.speed + ribbon.phaseOffset;

        const { path, lastPoint, lastAngle } = generateRibbonPath(
          svgWidth,
          ribbon.baseY,
          dynamicAmp,
          ribbon.freq,
          currentPhase,
          audioEnergy,
          bassEnergy,
          time,
          smoothMouse,
          isEdgeToEdge
        );

        pathEl.setAttribute("d", path);

        if (frayEl && !isEdgeToEdge) {
          const frayPath = generateFrayedThreadsPath(
            lastPoint,
            lastAngle,
            ribbon.strokeWidth / 2,
            time,
            index
          );
          frayEl.setAttribute("d", frayPath);
        }
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isPlayingSound, analyser, isVisible, reducedMotion, ribbons, isEdgeToEdge]);

  // Caminhos estáticos para SSR e prefers-reduced-motion
  const getStaticPath = (ribbon: RibbonConfig) => {
    return generateRibbonPath(
      900,
      ribbon.baseY,
      ribbon.amplitude * 0.9,
      ribbon.freq,
      ribbon.phaseOffset,
      0,
      0,
      0,
      { x: -9999, y: -9999, active: false },
      isEdgeToEdge
    ).path;
  };

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none relative ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox={`${viewBoxX} 0 ${viewBoxWidth} ${viewBoxHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id={`bonfim-shadow-${variant}`} x="-5%" y="-25%" width="115%" height="150%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0B1B47" floodOpacity="0.12" />
          </filter>

          {ribbons.map((ribbon, index) => (
            <path
              key={`def-${variant}-${ribbon.id}`}
              id={`path-${variant}-${ribbon.id}`}
              ref={(el) => {
                pathRefs.current[index] = el;
              }}
              d={getStaticPath(ribbon)}
            />
          ))}
        </defs>

        <g filter={`url(#bonfim-shadow-${variant})`}>
          {ribbons.map((ribbon, index) => (
            <g key={`group-${variant}-${ribbon.id}`} opacity={ribbon.opacity}>
              {/* O corpo de tecido da Fita */}
              <use
                href={`#path-${variant}-${ribbon.id}`}
                stroke={ribbon.color}
                strokeWidth={ribbon.strokeWidth}
                strokeLinecap="butt"
                strokeLinejoin="miter"
              />

              {/* Friso sutil de brilho superior do cetim */}
              <use
                href={`#path-${variant}-${ribbon.id}`}
                stroke={ribbon.color === "#FFFFFF" ? "#0B1B47" : "#FFFFFF"}
                strokeWidth={ribbon.color === "#FFFFFF" ? 0.8 : 1.4}
                strokeLinecap="butt"
                opacity={ribbon.color === "#FFFFFF" ? 0.15 : 0.30}
                transform="translate(0, -4.5)"
              />

              {/* Sombra suave de dobra na borda inferior do tecido */}
              <use
                href={`#path-${variant}-${ribbon.id}`}
                stroke="#000000"
                strokeWidth={1.1}
                strokeLinecap="butt"
                opacity={0.14}
                transform="translate(0, 4.5)"
              />

              {/* Estampa Tipográfica Tradicional das Fitinhas do Bonfim */}
              <text
                fill={ribbon.textColor}
                fontSize={isEdgeToEdge ? "7.8" : "8.4"}
                fontWeight="900"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'DM Sans', sans-serif"
                letterSpacing={isEdgeToEdge ? "2.1px" : "2.4px"}
                dy={isEdgeToEdge ? "2.7" : "3.0"}
                className="select-none pointer-events-none"
              >
                <textPath
                  href={`#path-${variant}-${ribbon.id}`}
                  startOffset={ribbon.textOffset}
                >
                  {BONFIM_PHRASE}
                </textPath>
              </text>

              {/* Microdesfiados (apenas na versão desktop onde a ponta termina em quadro) */}
              {!isEdgeToEdge && (
                <path
                  ref={(el) => {
                    frayRefs.current[index] = el;
                  }}
                  stroke={ribbon.textColor}
                  strokeWidth={0.8}
                  opacity={0.65}
                  strokeLinecap="round"
                />
              )}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
