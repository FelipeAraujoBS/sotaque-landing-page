"use client";

import { useEffect, useRef, useState } from "react";

interface BonfimRibbonsProps {
  className?: string;
  variant?: "top" | "bottom";
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

// 5 Fitas Superiores (Acima da manchete "Sua marca tem voz.")
const TOP_RIBBONS: RibbonConfig[] = [
  {
    id: "top-laranja",
    name: "Laranja Solar",
    baseY: 24,
    color: "#E27908",
    textColor: "#FFFFFF",
    strokeWidth: 12.0,
    speed: 3.2,
    freq: 2.1,
    amplitude: 9.5,
    phaseOffset: 0.0,
    textOffset: "0%",
    opacity: 0.96,
  },
  {
    id: "top-azul",
    name: "Azul Meia-Noite",
    baseY: 48,
    color: "#0B1B47",
    textColor: "#F4F1E5",
    strokeWidth: 12.0,
    speed: 2.8,
    freq: 1.85,
    amplitude: 10.5,
    phaseOffset: 1.6,
    textOffset: "3%",
    opacity: 0.94,
  },
  {
    id: "top-vinho",
    name: "Vinho Profundo",
    baseY: 72,
    color: "#6E1016",
    textColor: "#FFFFFF",
    strokeWidth: 12.0,
    speed: 3.3,
    freq: 2.25,
    amplitude: 9.5,
    phaseOffset: 3.2,
    textOffset: "1%",
    opacity: 0.95,
  },
  {
    id: "top-verde",
    name: "Verde Esperança",
    baseY: 96,
    color: "#1E6838",
    textColor: "#FFFFFF",
    strokeWidth: 12.0,
    speed: 2.9,
    freq: 1.95,
    amplitude: 10.0,
    phaseOffset: 4.7,
    textOffset: "4%",
    opacity: 0.94,
  },
  {
    id: "top-amarelo",
    name: "Amarelo Ouro",
    baseY: 120,
    color: "#DF9307",
    textColor: "#0B1B47",
    strokeWidth: 12.0,
    speed: 3.5,
    freq: 2.3,
    amplitude: 9.5,
    phaseOffset: 5.9,
    textOffset: "2%",
    opacity: 0.96,
  },
];

// 5 Fitas Inferiores (Abaixo dos botões CTA)
const BOTTOM_RIBBONS: RibbonConfig[] = [
  {
    id: "bot-branco",
    name: "Branco Paz",
    baseY: 24,
    color: "#FFFFFF",
    textColor: "#0B1B47",
    strokeWidth: 12.0,
    speed: 3.0,
    freq: 2.05,
    amplitude: 9.5,
    phaseOffset: 1.1,
    textOffset: "1%",
    opacity: 0.97,
  },
  {
    id: "bot-vinho",
    name: "Vinho Profundo",
    baseY: 48,
    color: "#6E1016",
    textColor: "#FFFFFF",
    strokeWidth: 12.0,
    speed: 3.2,
    freq: 2.2,
    amplitude: 10.0,
    phaseOffset: 2.5,
    textOffset: "3%",
    opacity: 0.95,
  },
  {
    id: "bot-laranja",
    name: "Laranja Solar",
    baseY: 72,
    color: "#E27908",
    textColor: "#FFFFFF",
    strokeWidth: 12.0,
    speed: 3.4,
    freq: 2.15,
    amplitude: 10.5,
    phaseOffset: 4.1,
    textOffset: "0%",
    opacity: 0.96,
  },
  {
    id: "bot-azul",
    name: "Azul Meia-Noite",
    baseY: 96,
    color: "#0B1B47",
    textColor: "#F4F1E5",
    strokeWidth: 12.0,
    speed: 2.7,
    freq: 1.9,
    amplitude: 10.0,
    phaseOffset: 5.4,
    textOffset: "4%",
    opacity: 0.94,
  },
  {
    id: "bot-verde",
    name: "Verde Esperança",
    baseY: 120,
    color: "#1E6838",
    textColor: "#FFFFFF",
    strokeWidth: 12.0,
    speed: 3.1,
    freq: 2.0,
    amplitude: 9.5,
    phaseOffset: 0.8,
    textOffset: "2%",
    opacity: 0.94,
  },
];

const BONFIM_PHRASE =
  "† LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA †   † LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA †   † LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA †   † LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA †";

// Função para calcular o caminho de fita ondulando de ponta a ponta
function generateRibbonPath(
  width: number,
  baseY: number,
  amp: number,
  freq: number,
  phase: number,
  time = 0,
  smoothMouse: { x: number; y: number; active: boolean },
  steps = 24
) {
  const points: [number, number][] = [];
  const startX = -60;
  const endX = width + 60;
  const totalSpan = endX - startX;
  const stepX = totalSpan / steps;

  for (let i = 0; i <= steps; i++) {
    const x = startX + i * stepX;
    const t = (x - startX) / totalSpan;

    // Envelope suave para travessia contínua da tela
    const envelope = 0.90 + 0.10 * Math.sin(t * Math.PI);
    const localAmp = amp * envelope;

    const primaryAngle = t * Math.PI * 2 * freq - phase;
    const turbAngle = t * Math.PI * 3.8 - phase * 1.35;
    const turbAmp = localAmp * 0.22;

    let y = baseY + Math.sin(primaryAngle) * localAmp + Math.sin(turbAngle) * turbAmp;

    // Interação sutil e singela com o cursor
    if (smoothMouse.active) {
      const dx = x - smoothMouse.x;
      const dy = y - smoothMouse.y;
      const distSq = dx * dx + dy * dy;
      const radius = 130;

      if (distSq < radius * radius) {
        const dist = Math.sqrt(distSq);
        const gaussian = Math.exp(-distSq / (2 * 45 * 45));
        const direction = Math.sin(Math.min(1, Math.abs(dy) / 36) * (Math.PI / 2)) * (dy >= 0 ? 1 : -1);
        const breezeWave = Math.sin(time * 3.2 - dist * 0.03) * 2.2;
        y += (direction * 7 + breezeWave) * gaussian;
      }
    }

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
}

export default function BonfimRibbons({
  className = "",
  variant = "top",
}: BonfimRibbonsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const ribbons: RibbonConfig[] = variant === "top" ? TOP_RIBBONS : BOTTOM_RIBBONS;

  // ViewBox com margens verticais generosas para NUNCA cortar as ondas no topo ou na base do eixo Y
  const viewBoxWidth = 1440;
  const viewBoxHeight = 180;
  const viewBoxX = -40;
  const viewBoxY = -18;

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

  // Prefers reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // IntersectionObserver e VisibilityChange para pausar fora de vista ou com aba oculta
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let isIntersecting = true;

    const checkVisibility = () => {
      setIsVisible(isIntersecting && !document.hidden);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        checkVisibility();
      },
      { threshold: 0.02 }
    );

    observer.observe(el);
    document.addEventListener("visibilitychange", checkVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", checkVisibility);
    };
  }, []);

  // Rastreamento de mouse
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
          y: y * scaleY + viewBoxY,
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
  }, [viewBoxWidth, viewBoxHeight, viewBoxX, viewBoxY]);

  // Loop de animação travado a 60-120 FPS via delta-time real
  useEffect(() => {
    if (reducedMotion || !isVisible) return;

    let rafId: number;
    let time = 0;
    let lastTimestamp = 0;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.033);
      lastTimestamp = timestamp;

      time += dt;

      const targetMouse = targetMouseRef.current;
      const smoothMouse = smoothMouseRef.current;

      if (targetMouse.active) {
        if (!smoothMouse.active) {
          smoothMouse.x = targetMouse.x;
          smoothMouse.y = targetMouse.y;
          smoothMouse.active = true;
        } else {
          smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.08;
          smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.08;
        }
      } else if (smoothMouse.active) {
        smoothMouse.x += (-9999 - smoothMouse.x) * 0.06;
        if (Math.abs(smoothMouse.x + 9999) < 20) {
          smoothMouse.active = false;
        }
      }

      const svgWidth = 1440;

      ribbons.forEach((ribbon, index) => {
        const pathEl = pathRefs.current[index];
        if (!pathEl) return;

        const currentPhase = time * ribbon.speed + ribbon.phaseOffset;

        const path = generateRibbonPath(
          svgWidth,
          ribbon.baseY,
          ribbon.amplitude,
          ribbon.freq,
          currentPhase,
          time,
          smoothMouse
        );

        pathEl.setAttribute("d", path);
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isVisible, reducedMotion, ribbons]);

  // Caminho estático para SSR
  const getStaticPath = (ribbon: RibbonConfig) => {
    return generateRibbonPath(
      1440,
      ribbon.baseY,
      ribbon.amplitude * 0.9,
      ribbon.freq,
      ribbon.phaseOffset,
      0,
      { x: -9999, y: -9999, active: false }
    );
  };

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none relative overflow-visible ${className}`}
      style={{
        filter: "drop-shadow(0px 3px 5px rgba(11, 27, 71, 0.10))",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible block"
      >
        <defs>
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

        <g>
          {ribbons.map((ribbon) => (
            <g key={`group-${variant}-${ribbon.id}`} opacity={ribbon.opacity}>
              {/* O corpo de tecido da Fita */}
              <use
                href={`#path-${variant}-${ribbon.id}`}
                stroke={ribbon.color}
                strokeWidth={ribbon.strokeWidth}
                strokeLinecap="butt"
                strokeLinejoin="miter"
              />

              {/* Friso sutil de brilho de cetim superior */}
              <use
                href={`#path-${variant}-${ribbon.id}`}
                stroke={ribbon.color === "#FFFFFF" ? "#0B1B47" : "#FFFFFF"}
                strokeWidth={ribbon.color === "#FFFFFF" ? 0.7 : 1.2}
                strokeLinecap="butt"
                opacity={ribbon.color === "#FFFFFF" ? 0.15 : 0.28}
                transform="translate(0, -3.2)"
              />

              {/* Estampa Tipográfica Tradicional das Fitinhas do Bonfim */}
              <text
                fill={ribbon.textColor}
                fontSize="7.2"
                fontWeight="900"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'DM Sans', sans-serif"
                letterSpacing="2.0px"
                dy="2.5"
                className="select-none pointer-events-none"
              >
                <textPath
                  href={`#path-${variant}-${ribbon.id}`}
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
