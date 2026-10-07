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

// -------------------------------------------------------------
// CONFIGURAÇÕES DESKTOP (Viewport ≥ 768px - Base: 1440x90)
// 2 fitas com espaçamento orgânico e névoa (fog) de 25%
// -------------------------------------------------------------
const DESKTOP_VIEWBOX = {
  x: -40,
  y: -4,
  width: 1440,
  height: 90,
};

const TOP_RIBBONS_DESKTOP: RibbonConfig[] = [
  {
    id: "top-laranja",
    name: "Laranja Solar",
    baseY: 28,
    color: "#E27908",
    textColor: "#FFFFFF",
    strokeWidth: 12.0,
    speed: 3.2,
    freq: 2.1,
    amplitude: 9.5,
    phaseOffset: 0.0,
    textOffset: "0%",
    opacity: 0.75, // Fog de 25% (visibilidade atenuada)
  },
  {
    id: "top-azul",
    name: "Azul Meia-Noite",
    baseY: 58,
    color: "#0B1B47",
    textColor: "#F4F1E5",
    strokeWidth: 12.0,
    speed: 2.8,
    freq: 1.85,
    amplitude: 10.5,
    phaseOffset: 1.6,
    textOffset: "3%",
    opacity: 0.75, // Fog de 25% (visibilidade atenuada)
  },
];

const BOTTOM_RIBBONS_DESKTOP: RibbonConfig[] = [
  {
    id: "bot-branco",
    name: "Branco Paz",
    baseY: 28,
    color: "#FFFFFF",
    textColor: "#0B1B47",
    strokeWidth: 12.0,
    speed: 3.0,
    freq: 2.05,
    amplitude: 9.5,
    phaseOffset: 1.1,
    textOffset: "1%",
    opacity: 0.75, // Fog de 25% (visibilidade atenuada)
  },
  {
    id: "bot-vinho",
    name: "Vinho Profundo",
    baseY: 58,
    color: "#6E1016",
    textColor: "#FFFFFF",
    strokeWidth: 12.0,
    speed: 3.2,
    freq: 2.2,
    amplitude: 10.0,
    phaseOffset: 2.5,
    textOffset: "3%",
    opacity: 0.75, // Fog de 25% (visibilidade atenuada)
  },
];

// -------------------------------------------------------------
// CONFIGURAÇÕES MOBILE (Viewport < 768px - Base: 420x62)
// Proporção física idêntica ao desktop: 2 fitas com fog de 25%
// -------------------------------------------------------------
const MOBILE_VIEWBOX = {
  x: -20,
  y: -4,
  width: 420,
  height: 62,
};

const TOP_RIBBONS_MOBILE: RibbonConfig[] = [
  {
    id: "top-laranja",
    name: "Laranja Solar",
    baseY: 18,
    color: "#E27908",
    textColor: "#FFFFFF",
    strokeWidth: 11.0,
    speed: 3.2,
    freq: 1.35,
    amplitude: 5.6,
    phaseOffset: 0.0,
    textOffset: "0%",
    opacity: 0.75, // Fog de 25% (visibilidade atenuada)
  },
  {
    id: "top-azul",
    name: "Azul Meia-Noite",
    baseY: 42,
    color: "#0B1B47",
    textColor: "#F4F1E5",
    strokeWidth: 11.0,
    speed: 2.8,
    freq: 1.20,
    amplitude: 6.0,
    phaseOffset: 1.6,
    textOffset: "3%",
    opacity: 0.75, // Fog de 25% (visibilidade atenuada)
  },
];

const BOTTOM_RIBBONS_MOBILE: RibbonConfig[] = [
  {
    id: "bot-branco",
    name: "Branco Paz",
    baseY: 18,
    color: "#FFFFFF",
    textColor: "#0B1B47",
    strokeWidth: 11.0,
    speed: 3.0,
    freq: 1.30,
    amplitude: 5.6,
    phaseOffset: 1.1,
    textOffset: "1%",
    opacity: 0.75, // Fog de 25% (visibilidade atenuada)
  },
  {
    id: "bot-vinho",
    name: "Vinho Profundo",
    baseY: 42,
    color: "#6E1016",
    textColor: "#FFFFFF",
    strokeWidth: 11.0,
    speed: 3.2,
    freq: 1.40,
    amplitude: 5.8,
    phaseOffset: 2.5,
    textOffset: "3%",
    opacity: 0.75, // Fog de 25% (visibilidade atenuada)
  },
];

const BONFIM_PHRASE =
  "† LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA †   † LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA †   † LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA †   † LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA †   † LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA †   † LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA †";

// Função para calcular o caminho de fita ondulando de ponta a ponta
function generateRibbonPath(
  width: number,
  baseY: number,
  amp: number,
  freq: number,
  phase: number,
  time = 0,
  smoothMouse: { x: number; y: number; active: boolean } = { x: -9999, y: -9999, active: false },
  steps = 24
) {
  const points: [number, number][] = [];
  const startX = width > 600 ? -60 : -30;
  const endX = width + (width > 600 ? 60 : 30);
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

    // Interação sutil e orgânica com o cursor ou toque
    if (smoothMouse.active) {
      const dx = x - smoothMouse.x;
      const dy = y - smoothMouse.y;
      const distSq = dx * dx + dy * dy;
      const radius = width > 600 ? 130 : 65;

      if (distSq < radius * radius) {
        const dist = Math.sqrt(distSq);
        const gaussian = Math.exp(-distSq / (2 * (width > 600 ? 45 : 22) * (width > 600 ? 45 : 22)));
        const direction = Math.sin(Math.min(1, Math.abs(dy) / (width > 600 ? 36 : 18)) * (Math.PI / 2)) * (dy >= 0 ? 1 : -1);
        const breezeWave = Math.sin(time * 3.2 - dist * (width > 600 ? 0.03 : 0.06)) * (width > 600 ? 2.2 : 1.4);
        y += (direction * (width > 600 ? 7 : 4.5) + breezeWave) * gaussian;
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
  const desktopPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const mobilePathRefs = useRef<(SVGPathElement | null)[]>([]);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const desktopRibbons: RibbonConfig[] =
    variant === "top" ? TOP_RIBBONS_DESKTOP : BOTTOM_RIBBONS_DESKTOP;
  const mobileRibbons: RibbonConfig[] =
    variant === "top" ? TOP_RIBBONS_MOBILE : BOTTOM_RIBBONS_MOBILE;

  // Rastreamento amortecido do cursor / toque
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

  // Rastreamento responsivo de mouse e toque
  useEffect(() => {
    const updatePointer = (clientX: number, clientY: number) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const isMobile = window.innerWidth < 768;
      const vb = isMobile ? MOBILE_VIEWBOX : DESKTOP_VIEWBOX;

      if (
        x >= -60 &&
        x <= rect.width + 60 &&
        y >= -60 &&
        y <= rect.height + 60
      ) {
        const scaleX = vb.width / rect.width;
        const scaleY = vb.height / rect.height;
        targetMouseRef.current = {
          x: x * scaleX + vb.x,
          y: y * scaleY + vb.y,
          active: true,
        };
      } else {
        targetMouseRef.current.active = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePointer(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handlePointerEnd = () => {
      targetMouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerEnd);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handlePointerEnd);
    window.addEventListener("touchcancel", handlePointerEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handlePointerEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handlePointerEnd);
      window.removeEventListener("touchcancel", handlePointerEnd);
    };
  }, []);

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

      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        mobileRibbons.forEach((ribbon, index) => {
          const pathEl = mobilePathRefs.current[index];
          if (!pathEl) return;

          const currentPhase = time * ribbon.speed + ribbon.phaseOffset;

          const path = generateRibbonPath(
            420,
            ribbon.baseY,
            ribbon.amplitude,
            ribbon.freq,
            currentPhase,
            time,
            smoothMouse,
            20
          );

          pathEl.setAttribute("d", path);
        });
      } else {
        desktopRibbons.forEach((ribbon, index) => {
          const pathEl = desktopPathRefs.current[index];
          if (!pathEl) return;

          const currentPhase = time * ribbon.speed + ribbon.phaseOffset;

          const path = generateRibbonPath(
            1440,
            ribbon.baseY,
            ribbon.amplitude,
            ribbon.freq,
            currentPhase,
            time,
            smoothMouse,
            24
          );

          pathEl.setAttribute("d", path);
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isVisible, reducedMotion, desktopRibbons, mobileRibbons]);

  // Caminhos estáticos para SSR
  const getStaticPath = (ribbon: RibbonConfig, width: number) => {
    return generateRibbonPath(
      width,
      ribbon.baseY,
      ribbon.amplitude * 0.9,
      ribbon.freq,
      ribbon.phaseOffset,
      0,
      { x: -9999, y: -9999, active: false },
      width > 600 ? 24 : 20
    );
  };

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none relative overflow-visible ${className}`}
      style={{
        filter: "drop-shadow(0px 2px 4px rgba(11, 27, 71, 0.06))",
      }}
      aria-hidden="true"
    >
      {/* Fog atmosférico de 25% (névoa suave que integra as fitas com o fundo creme) */}
      <div
        className={`absolute inset-0 pointer-events-none z-10 ${
          variant === "top"
            ? "bg-gradient-to-b from-[#F4F1E5]/25 via-[#F4F1E5]/10 to-transparent"
            : "bg-gradient-to-t from-[#F4F1E5]/25 via-[#F4F1E5]/10 to-transparent"
        }`}
        aria-hidden="true"
      />
      {/* ========================================================= */}
      {/* VERSÃO DESKTOP (≥ 768px): Proporções amplas em 1440x180   */}
      {/* ========================================================= */}
      <svg
        viewBox={`${DESKTOP_VIEWBOX.x} ${DESKTOP_VIEWBOX.y} ${DESKTOP_VIEWBOX.width} ${DESKTOP_VIEWBOX.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hidden md:block w-full h-auto overflow-visible"
      >
        <defs>
          {desktopRibbons.map((ribbon, index) => (
            <path
              key={`def-desktop-${variant}-${ribbon.id}`}
              id={`path-desktop-${variant}-${ribbon.id}`}
              ref={(el) => {
                desktopPathRefs.current[index] = el;
              }}
              d={getStaticPath(ribbon, 1440)}
            />
          ))}
        </defs>

        <g>
          {desktopRibbons.map((ribbon) => (
            <g key={`group-desktop-${variant}-${ribbon.id}`} opacity={ribbon.opacity}>
              {/* O corpo de tecido da Fita */}
              <use
                href={`#path-desktop-${variant}-${ribbon.id}`}
                stroke={ribbon.color}
                strokeWidth={ribbon.strokeWidth}
                strokeLinecap="butt"
                strokeLinejoin="miter"
              />

              {/* Friso sutil de brilho de cetim superior */}
              <use
                href={`#path-desktop-${variant}-${ribbon.id}`}
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
                  href={`#path-desktop-${variant}-${ribbon.id}`}
                  startOffset={ribbon.textOffset}
                >
                  {BONFIM_PHRASE}
                </textPath>
              </text>
            </g>
          ))}
        </g>
      </svg>

      {/* ========================================================= */}
      {/* VERSÃO MOBILE (< 768px): Proporção fiel ao desktop        */}
      {/* Fitas encorpadas (11px), texto legível (7px) em 420x118   */}
      {/* ========================================================= */}
      <svg
        viewBox={`${MOBILE_VIEWBOX.x} ${MOBILE_VIEWBOX.y} ${MOBILE_VIEWBOX.width} ${MOBILE_VIEWBOX.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block md:hidden w-full h-auto overflow-visible"
      >
        <defs>
          {mobileRibbons.map((ribbon, index) => (
            <path
              key={`def-mobile-${variant}-${ribbon.id}`}
              id={`path-mobile-${variant}-${ribbon.id}`}
              ref={(el) => {
                mobilePathRefs.current[index] = el;
              }}
              d={getStaticPath(ribbon, 420)}
            />
          ))}
        </defs>

        <g>
          {mobileRibbons.map((ribbon) => (
            <g key={`group-mobile-${variant}-${ribbon.id}`} opacity={ribbon.opacity}>
              {/* O corpo de tecido da Fita */}
              <use
                href={`#path-mobile-${variant}-${ribbon.id}`}
                stroke={ribbon.color}
                strokeWidth={ribbon.strokeWidth}
                strokeLinecap="butt"
                strokeLinejoin="miter"
              />

              {/* Friso sutil de brilho de cetim superior */}
              <use
                href={`#path-mobile-${variant}-${ribbon.id}`}
                stroke={ribbon.color === "#FFFFFF" ? "#0B1B47" : "#FFFFFF"}
                strokeWidth={ribbon.color === "#FFFFFF" ? 0.7 : 1.0}
                strokeLinecap="butt"
                opacity={ribbon.color === "#FFFFFF" ? 0.15 : 0.28}
                transform="translate(0, -3.0)"
              />

              {/* Estampa Tipográfica Tradicional das Fitinhas do Bonfim */}
              <text
                fill={ribbon.textColor}
                fontSize="7.0"
                fontWeight="900"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'DM Sans', sans-serif"
                letterSpacing="1.2px"
                dy="2.4"
                className="select-none pointer-events-none"
              >
                <textPath
                  href={`#path-mobile-${variant}-${ribbon.id}`}
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
