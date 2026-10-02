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

// 11 Fitinhas do Bonfim (2 de cada cor tradicional, com as 6 novas adicionadas abaixo da última e mescladas)
const RIBBONS: RibbonConfig[] = [
  // --- Bloco Superior (5 originais) ---
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

  // --- Bloco Inferior (6 adicionadas abaixo, mesclando as cores) ---
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

const BONFIM_PHRASE =
  "† LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA †   † LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA †   † LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA †   † LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA †";

export default function BonfimRibbons({
  isPlayingSound = false,
  analyser = null,
  className = "",
}: BonfimRibbonsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const frayRefs = useRef<(SVGPathElement | null)[]>([]);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Rastreamento amortecido do mouse para resposta suave e singela (sem trancos)
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

  // Ouvinte de mouse global no hero para sopro de ar interativo
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
        const scaleX = 900 / rect.width;
        const scaleY = 645 / rect.height;
        targetMouseRef.current = {
          x: x * scaleX,
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
  }, []);

  // Parallax suave atrelado ao scroll com GSAP ScrollTrigger
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

  // Função para calcular o caminho de fita ondulando com vento, amplitude e física de ponta
  const generateRibbonPath = (
    width: number,
    baseY: number,
    amp: number,
    freq: number,
    phase: number,
    audioEnergy = 0,
    bassEnergy = 0,
    time = 0,
    smoothMouse: { x: number; y: number; active: boolean },
    steps = 55
  ) => {
    const points: [number, number][] = [];
    const stepX = width / steps;

    for (let i = 0; i <= steps; i++) {
      const x = i * stepX;
      const t = x / width; // 0.0 na raiz -> 1.0 na ponta livre

      // Envelope físico de amplitude: no nó à esquerda a fita é firme; no meio e ponta flutua com liberdade total
      const envelope = 0.15 + 0.85 * Math.pow(t, 1.15);
      const localAmp = amp * envelope;

      // Onda primária com propagação viva da esquerda para a direita (vento da Baía de Todos os Santos)
      const primaryAngle = t * Math.PI * 2 * freq - phase;

      // Harmônica de turbulência marítima (ondulação secundária realista)
      const turbAngle = t * Math.PI * 3.8 - phase * 1.35;
      const turbAmp = localAmp * 0.24;

      // Flutter de alta frequência reativo à música
      const flutterFreq = 5.2 + audioEnergy * 4.0;
      const flutterAngle = t * Math.PI * flutterFreq - phase * (1.8 + bassEnergy * 2.2);
      const flutterAmp = localAmp * (0.08 + audioEnergy * 0.5 + bassEnergy * 0.4);

      let y =
        baseY +
        Math.sin(primaryAngle) * localAmp +
        Math.sin(turbAngle) * turbAmp +
        Math.sin(flutterAngle) * flutterAmp;

      // Interação singela, suave e orgânica com o cursor (sem saltos bruscos)
      if (smoothMouse.active) {
        const dx = x - smoothMouse.x;
        const dy = y - smoothMouse.y;
        const distSq = dx * dx + dy * dy;
        const radius = 150; // Raio amplo para transição contínua e suave

        if (distSq < radius * radius) {
          const dist = Math.sqrt(distSq);
          // Amortecimento gaussiano contínuo
          const gaussian = Math.exp(-distSq / (2 * 50 * 50));
          // Transição contínua sem descontinuidade em dy = 0
          const direction = Math.sin(Math.min(1, Math.abs(dy) / 40) * (Math.PI / 2)) * (dy >= 0 ? 1 : -1);
          // Suave ondulação de ar gerada pelo movimento
          const breezeWave = Math.sin(time * 3.2 - dist * 0.03) * 3;
          // Deslocamento máximo singelo e refinado (10-12px)
          y += (direction * 11 + breezeWave) * gaussian;
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
  };

  // Gera os caminhos dos microdesfiados na ponta da fita
  const generateFrayedThreadsPath = (
    endPoint: [number, number],
    endAngle: number,
    halfWidth: number,
    time: number,
    ribbonIndex: number
  ) => {
    let d = "";
    const perp = endAngle + Math.PI / 2;
    const numThreads = 10;

    for (let k = 0; k < numThreads; k++) {
      const ratio = (k / (numThreads - 1)) * 2 - 1; // -1 até +1
      const startX = endPoint[0] + Math.cos(perp) * (halfWidth * ratio);
      const startY = endPoint[1] + Math.sin(perp) * (halfWidth * ratio);

      // Comprimento variado do fio desfiado
      const len = 9 + ((k * 3.7 + ribbonIndex * 2) % 11) + Math.sin(time * 8 + k) * 3;
      const flutter = Math.sin(time * 14 + k * 1.5 + ribbonIndex) * 4.5;

      const midX = startX + Math.cos(endAngle) * (len * 0.5);
      const midY = startY + Math.sin(endAngle) * (len * 0.5) + flutter * 0.5;

      const endX = startX + Math.cos(endAngle) * len;
      const endY = startY + Math.sin(endAngle) * len + flutter;

      d += ` M ${startX.toFixed(1)} ${startY.toFixed(1)} Q ${midX.toFixed(1)} ${midY.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;
    }

    return d;
  };

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

        // Faixa de graves/percussão (tambor, surdo, batida)
        let bassSum = 0;
        const bassCount = Math.min(10, dataArray.length);
        for (let i = 1; i < bassCount; i++) {
          bassSum += dataArray[i];
        }
        bassEnergy = bassSum / Math.max(1, bassCount - 1) / 255;

        // Faixa musical geral (voz, harmonia, ritmo)
        let totalSum = 0;
        const totalCount = Math.min(60, dataArray.length);
        for (let i = 2; i < totalCount; i++) {
          totalSum += dataArray[i];
        }
        audioEnergy = totalSum / Math.max(1, totalCount - 2) / 255;
      }

      // Quando a música está ligada, acelera o ritmo do vento
      const speedMultiplier = isPlayingSound
        ? 1.0 + audioEnergy * 2.2 + bassEnergy * 1.8
        : 1.0;

      time += 0.016 * speedMultiplier;

      // Interpolação suave do mouse (inércia fluida de ar)
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
        // Amortecimento gradual de saída
        smoothMouse.x += (-9999 - smoothMouse.x) * 0.05;
        if (Math.abs(smoothMouse.x + 9999) < 20) {
          smoothMouse.active = false;
        }
      }

      const svgWidth = 900;

      RIBBONS.forEach((ribbon, index) => {
        const pathEl = pathRefs.current[index];
        const frayEl = frayRefs.current[index];
        if (!pathEl) return;

        // Amplitude expressiva: mesmo sem som tem presença marcante; com som tem impulsos vibrantes
        const soundAmpBoost = isPlayingSound
          ? 26 + audioEnergy * 65 + bassEnergy * 45
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
          smoothMouse
        );

        pathEl.setAttribute("d", path);

        if (frayEl) {
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
  }, [isPlayingSound, analyser, isVisible, reducedMotion]);

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
      { x: -9999, y: -9999, active: false }
    ).path;
  };

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none relative ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 900 645"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Sombra de profundidade realista projetada pelas fitas */}
          <filter id="bonfim-shadow-filter" x="-5%" y="-25%" width="115%" height="150%">
            <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#0B1B47" floodOpacity="0.13" />
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

        {/* Camada das 11 Fitinhas do Bonfim com Sombra e Tipografia em Curva */}
        <g filter="url(#bonfim-shadow-filter)">
          {RIBBONS.map((ribbon, index) => (
            <g key={`ribbon-group-${ribbon.id}`} opacity={ribbon.opacity}>
              {/* O corpo de tecido da Fita — corte reto e quadrado tradicional */}
              <use
                href={`#path-${ribbon.id}`}
                stroke={ribbon.color}
                strokeWidth={ribbon.strokeWidth}
                strokeLinecap="butt"
                strokeLinejoin="miter"
              />

              {/* Friso sutil de brilho superior do cetim (Satin Specular Sheen) */}
              <use
                href={`#path-${ribbon.id}`}
                stroke={ribbon.color === "#FFFFFF" ? "#0B1B47" : "#FFFFFF"}
                strokeWidth={ribbon.color === "#FFFFFF" ? 0.8 : 1.5}
                strokeLinecap="butt"
                opacity={ribbon.color === "#FFFFFF" ? 0.15 : 0.32}
                transform="translate(0, -5.5)"
              />

              {/* Sombra suave de dobra na borda inferior do tecido */}
              <use
                href={`#path-${ribbon.id}`}
                stroke="#000000"
                strokeWidth={1.2}
                strokeLinecap="butt"
                opacity={0.16}
                transform="translate(0, 5.5)"
              />

              {/* Estampa Tipográfica Tradicional das Fitinhas do Bonfim */}
              <text
                fill={ribbon.textColor}
                fontSize="8.4"
                fontWeight="900"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'DM Sans', sans-serif"
                letterSpacing="2.4px"
                dy="3.0"
                className="select-none pointer-events-none"
              >
                <textPath
                  href={`#path-${ribbon.id}`}
                  startOffset={ribbon.textOffset}
                >
                  {BONFIM_PHRASE}
                </textPath>
              </text>

              {/* Microdesfiados tradicionais na ponta da fita (fios soltos cortados à tesoura) */}
              <path
                ref={(el) => {
                  frayRefs.current[index] = el;
                }}
                stroke={ribbon.textColor}
                strokeWidth={0.85}
                opacity={0.7}
                strokeLinecap="round"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
