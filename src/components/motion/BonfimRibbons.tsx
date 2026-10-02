"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface BonfimRibbonsProps {
  isPlayingSound?: boolean;
  analyser?: AnalyserNode | null;
  className?: string;
}

interface RibbonStyle {
  id: string;
  name: string;
  baseY: number;
  width: number;
  primaryColor: string;
  darkColor: string;
  highlightColor: string;
  textColor: string;
  speed: number;
  freq: number;
  amplitude: number;
  phaseOffset: number;
  twistFreq: number;
  twistSpeed: number;
  twistPhase: number;
}

const RIBBONS: RibbonStyle[] = [
  {
    id: "laranja",
    name: "Laranja Solar (Criatividade & Sotaque)",
    baseY: 72,
    width: 18,
    primaryColor: "#E27908",
    darkColor: "#8F4400",
    highlightColor: "#FFB04D",
    textColor: "#FFFFFF",
    speed: 1.25,
    freq: 0.0068,
    amplitude: 22,
    phaseOffset: 0.0,
    twistFreq: 0.0052,
    twistSpeed: 0.95,
    twistPhase: 0.4,
  },
  {
    id: "azul",
    name: "Azul Meia-Noite (Fé & Iemanjá)",
    baseY: 138,
    width: 18,
    primaryColor: "#0B1B47",
    darkColor: "#040B22",
    highlightColor: "#2F4A8E",
    textColor: "#F4F1E5",
    speed: 1.05,
    freq: 0.0060,
    amplitude: 26,
    phaseOffset: 1.7,
    twistFreq: 0.0048,
    twistSpeed: 0.85,
    twistPhase: 2.1,
  },
  {
    id: "vinho",
    name: "Vinho Profundo (Paixão & Raiz)",
    baseY: 204,
    width: 18,
    primaryColor: "#6E1016",
    darkColor: "#3D070B",
    highlightColor: "#A6252E",
    textColor: "#FFFFFF",
    speed: 1.18,
    freq: 0.0072,
    amplitude: 21,
    phaseOffset: 3.4,
    twistFreq: 0.0055,
    twistSpeed: 1.1,
    twistPhase: 4.2,
  },
  {
    id: "verde",
    name: "Verde Esperança (Cura & Oxóssi)",
    baseY: 270,
    width: 18,
    primaryColor: "#1E6838",
    darkColor: "#0D381D",
    highlightColor: "#349955",
    textColor: "#FFFFFF",
    speed: 0.95,
    freq: 0.0058,
    amplitude: 24,
    phaseOffset: 4.8,
    twistFreq: 0.0044,
    twistSpeed: 0.8,
    twistPhase: 1.0,
  },
  {
    id: "amarelo",
    name: "Amarelo Ouro (Prosperidade & Oxum)",
    baseY: 334,
    width: 18,
    primaryColor: "#DF9307",
    darkColor: "#825300",
    highlightColor: "#FED35B",
    textColor: "#0B1B47",
    speed: 1.3,
    freq: 0.0075,
    amplitude: 20,
    phaseOffset: 6.0,
    twistFreq: 0.0060,
    twistSpeed: 1.15,
    twistPhase: 3.3,
  },
];

const BONFIM_TEXT = "† LEMBRANÇA DO SENHOR DO BONFIM DA BAHIA †";

export default function BonfimRibbons({
  isPlayingSound = false,
  analyser = null,
  className = "",
}: BonfimRibbonsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Posição suave do mouse no hero para deslocamento de ar realista
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
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

  // IntersectionObserver para suspender renderização fora de tela
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

  // Rastreamento global de movimento do cursor sobre o Hero
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Se o mouse estiver nas imediações do canvas (com margem de 150px)
      if (
        x >= -100 &&
        x <= rect.width + 100 &&
        y >= -100 &&
        y <= rect.height + 100
      ) {
        // Normaliza para o espaço de coordenadas lógicas do canvas (largura 920, altura 420)
        const scaleX = 920 / rect.width;
        const scaleY = 420 / rect.height;
        mouseRef.current = {
          x: x * scaleX,
          y: y * scaleY,
          active: true,
        };
      } else {
        mouseRef.current.active = false;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Parallax suave atrelado ao scroll com GSAP
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
            x: -12,
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

  // Função principal de renderização do Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const logicalWidth = 920;
    const logicalHeight = 420;

    // Configuração de alta densidade (Retina display)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;
    ctx.scale(dpr, dpr);

    let rafId: number;
    let time = 0;
    const dataArray = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;

    // Renderizador de um único quadro
    const renderFrame = (t: number, audioEnergy: number, bassEnergy: number) => {
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);

      // 1. DESENHO DO NÓ TRADICIONAL DOS TRÊS PEDIDOS (Amarração à esquerda)
      const knotX = 28;
      const knotCenterY = 200;

      // Sombra projetada do nó
      ctx.save();
      ctx.shadowColor = "rgba(11, 27, 71, 0.16)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 6;

      // Anéis de tecido cruzados formando o nó
      ctx.fillStyle = "#8F4400";
      ctx.beginPath();
      ctx.ellipse(knotX, knotCenterY - 14, 8, 16, 0.15, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#0B1B47";
      ctx.beginPath();
      ctx.ellipse(knotX + 3, knotCenterY + 4, 9, 20, -0.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#6E1016";
      ctx.beginPath();
      ctx.ellipse(knotX - 2, knotCenterY + 22, 8, 18, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Friso superior de destaque no nó
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // 2. RENDERIZAÇÃO DAS 5 FITINHAS COM FÍSICA VOLUMÉTRICA 3D
      const numSegments = 70;
      const ribbonLength = logicalWidth - knotX - 30; // Termina antes da borda com desfiado
      const segmentLen = ribbonLength / numSegments;

      RIBBONS.forEach((ribbon) => {
        // Pontos de coluna (spine), borda superior e borda inferior
        const spine: { x: number; y: number; normalY: number; twist: number }[] = [];

        // Efeito do som na velocidade e amplitude
        const soundAmp = isPlayingSound ? 20 + audioEnergy * 65 + bassEnergy * 45 : 0;
        const totalAmp = ribbon.amplitude + soundAmp;

        for (let i = 0; i <= numSegments; i++) {
          const x = knotX + i * segmentLen;
          const progress = i / numSegments; // 0.0 na amarração -> 1.0 na ponta livre

          // Envelope físico: no nó a fita quase não mexe; na ponta livre chicoteia solta no vento
          const envelope = 0.06 + 0.94 * Math.pow(progress, 1.25);

          // Onda primária com propagação para a direita (vento marítimo de Salvador)
          const wave1 = Math.sin(x * ribbon.freq - t * ribbon.speed + ribbon.phaseOffset);

          // Onda secundária harmônica (turbulência orgânica)
          const wave2 = Math.sin(x * (ribbon.freq * 1.85) - t * (ribbon.speed * 1.4) + ribbon.phaseOffset * 1.6) * 0.35;

          // Flutter rápido nas pontas ativado pelo som
          const flutter = Math.sin(x * 0.038 - t * (ribbon.speed * 2.8 + bassEnergy * 2)) * (0.08 + audioEnergy * 0.45) * Math.pow(progress, 1.6);

          let y = ribbon.baseY + (wave1 + wave2 + flutter) * totalAmp * envelope;

          // Efeito de deslocamento pelo cursor do mouse (brisa gerada pelo mouse)
          if (mouseRef.current.active) {
            const dx = x - mouseRef.current.x;
            const dy = y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 135;
            if (dist < maxDist) {
              const force = (1 - dist / maxDist);
              // O cursor empurra a fita suavemente para cima ou para baixo
              y += (dy > 0 ? 1 : -1) * force * 35;
            }
          }

          // Ângulo de torção 3D da fita (revela frente e verso com sombreamento real)
          const twistAngle =
            Math.sin(x * ribbon.twistFreq - t * ribbon.twistSpeed + ribbon.twistPhase) *
            Math.PI *
            0.85 *
            Math.pow(progress, 0.9);

          spine.push({
            x,
            y,
            normalY: Math.cos(twistAngle), // 1.0 = frente chapada, 0 = canto de lado, -1.0 = verso chapado
            twist: twistAngle,
          });
        }

        // --- A. DESENHO DO CORPO DE CETIM VOLUMÉTRICO DA FITA (Quads com gradientes) ---
        ctx.save();

        // Sombra de profundidade suave sobre o fundo do site
        ctx.shadowColor = "rgba(11, 27, 71, 0.12)";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 4;

        for (let i = 0; i < numSegments; i++) {
          const p1 = spine[i];
          const p2 = spine[i + 1];

          // Tangente da curva para calcular a normal de largura
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const angle = Math.atan2(dy, dx);
          const perpAngle = angle + Math.PI / 2;

          // Largura projetada no espaço 3D (encolhe na torção)
          const halfW1 = (ribbon.width / 2) * Math.abs(p1.normalY);
          const halfW2 = (ribbon.width / 2) * Math.abs(p2.normalY);

          // Borda superior e inferior no ponto 1
          const x1Top = p1.x + Math.cos(perpAngle) * halfW1;
          const y1Top = p1.y + Math.sin(perpAngle) * halfW1;
          const x1Bot = p1.x - Math.cos(perpAngle) * halfW1;
          const y1Bot = p1.y - Math.sin(perpAngle) * halfW1;

          // Borda superior e inferior no ponto 2
          const x2Top = p2.x + Math.cos(perpAngle) * halfW2;
          const y2Top = p2.y + Math.sin(perpAngle) * halfW2;
          const x2Bot = p2.x - Math.cos(perpAngle) * halfW2;
          const y2Bot = p2.y - Math.sin(perpAngle) * halfW2;

          // Cria quad poligonal do segmento
          ctx.beginPath();
          ctx.moveTo(x1Top, y1Top);
          ctx.lineTo(x2Top, y2Top);
          ctx.lineTo(x2Bot, y2Bot);
          ctx.lineTo(x1Bot, y1Bot);
          ctx.closePath();

          // Iluminação dinâmica de cetim (Satin Specular Sheen)
          const isFront = p1.normalY >= 0;
          const grad = ctx.createLinearGradient(x1Top, y1Top, x1Bot, y1Bot);

          if (isFront) {
            // Face frontal: cor solar brilhante com feixe de cetim superior
            grad.addColorStop(0, ribbon.highlightColor);
            grad.addColorStop(0.3, ribbon.primaryColor);
            grad.addColorStop(0.85, ribbon.primaryColor);
            grad.addColorStop(1, ribbon.darkColor);
          } else {
            // Face traseira (verso): tom mais escuro e fosco da fita virada
            grad.addColorStop(0, ribbon.darkColor);
            grad.addColorStop(0.5, ribbon.darkColor);
            grad.addColorStop(1, "#050B1B");
          }

          ctx.fillStyle = grad;
          ctx.fill();

          // Friso sutil nas bordas tecidas (orla de reforço da fita de poliéster)
          ctx.strokeStyle = isFront
            ? "rgba(255, 255, 255, 0.18)"
            : "rgba(0, 0, 0, 0.25)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        ctx.restore();

        // --- B. ESTAMPA TIPOGRÁFICA ORIGINAL DO SENHOR DO BONFIM ---
        // Desenhada ao longo da curva apenas nas seções onde a face frontal está visível
        ctx.save();
        ctx.font = "900 8.2px -apple-system, BlinkMacSystemFont, 'DM Sans', sans-serif";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = ribbon.textColor;

        const phraseLen = BONFIM_TEXT.length;
        const charSpacing = 7.6; // Espaçamento típico do carimbo em bloco
        const phrasePixelWidth = phraseLen * charSpacing;

        // Repete o carimbo ao longo de toda a extensão da fita
        const totalSpineLen = ribbonLength;
        const numPhrases = Math.ceil(totalSpineLen / (phrasePixelWidth + 35));

        for (let phraseIdx = 0; phraseIdx < numPhrases; phraseIdx++) {
          const phraseStartDist = 45 + phraseIdx * (phrasePixelWidth + 32);

          for (let charIdx = 0; charIdx < phraseLen; charIdx++) {
            const charDist = phraseStartDist + charIdx * charSpacing;
            if (charDist >= ribbonLength - 10) break;

            const segFloat = charDist / segmentLen;
            const segIndex = Math.min(Math.floor(segFloat), numSegments - 1);
            const subT = segFloat - segIndex;

            const pA = spine[segIndex];
            const pB = spine[Math.min(segIndex + 1, numSegments)];

            // Ponto interpolado
            const cx = pA.x + (pB.x - pA.x) * subT;
            const cy = pA.y + (pB.y - pA.y) * subT;
            const normalY = pA.normalY + (pB.normalY - pA.normalY) * subT;

            // Só desenha se a face frontal estiver visível (evita texto de ponta cabeça no verso)
            if (normalY > 0.22) {
              const dx = pB.x - pA.x;
              const dy = pB.y - pA.y;
              const tangentAngle = Math.atan2(dy, dx);

              ctx.save();
              ctx.translate(cx, cy);
              ctx.rotate(tangentAngle);

              // Projeção 3D da altura da letra (achata quando a fita gira)
              ctx.scale(1, Math.max(0.2, normalY));

              const char = BONFIM_TEXT[charIdx];
              ctx.fillText(char, 0, 0);

              ctx.restore();
            }
          }
        }
        ctx.restore();

        // --- C. CORTE RETO COM MICRODESFIADO TRADICIONAL NAS PONTAS ---
        // A extremidade direita da fita tem o corte reto a tesoura com pequenos fios de cetim soltos
        ctx.save();
        const tipPoint = spine[numSegments];
        const prevTipPoint = spine[numSegments - 1];
        const tipAngle = Math.atan2(tipPoint.y - prevTipPoint.y, tipPoint.x - prevTipPoint.x);
        const tipPerp = tipAngle + Math.PI / 2;
        const tipHalfW = (ribbon.width / 2) * Math.abs(tipPoint.normalY);

        // Fios de tecido desfiados (14 filamentos finos e orgânicos)
        const numThreads = 14;
        for (let k = 0; k < numThreads; k++) {
          const ratio = (k / (numThreads - 1)) * 2 - 1; // -1 a +1
          const startX = tipPoint.x + Math.cos(tipPerp) * (tipHalfW * ratio);
          const startY = tipPoint.y + Math.sin(tipPerp) * (tipHalfW * ratio);

          // Cada fio tem comprimento diferente e vibra no vento
          const threadLen = 8 + (Math.sin(k * 2.3 + t * 4) * 0.5 + 0.5) * 16;
          const threadFlutter = Math.sin(t * 12 + k * 1.8) * 3.5;

          const endX = startX + Math.cos(tipAngle) * threadLen;
          const endY = startY + Math.sin(tipAngle) * threadLen + threadFlutter;

          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.quadraticCurveTo(
            (startX + endX) / 2,
            (startY + endY) / 2 + threadFlutter * 0.5,
            endX,
            endY
          );
          ctx.strokeStyle = k % 2 === 0 ? ribbon.highlightColor : ribbon.textColor;
          ctx.lineWidth = 0.8;
          ctx.globalAlpha = 0.75;
          ctx.stroke();
        }
        ctx.restore();
      });
    };

    // Loop de Animação a 60-120 FPS
    const animate = () => {
      let audioEnergy = 0;
      let bassEnergy = 0;

      if (isPlayingSound && analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);

        // Faixa de graves/percussão (tambor, surdo, batida): bins 1 a 10
        let bassSum = 0;
        const bassCount = Math.min(10, dataArray.length);
        for (let i = 1; i < bassCount; i++) {
          bassSum += dataArray[i];
        }
        bassEnergy = bassSum / Math.max(1, bassCount - 1) / 255;

        // Faixa musical geral (voz, violão, harmônicos, ritmo): bins 2 a 60
        let totalSum = 0;
        const totalCount = Math.min(60, dataArray.length);
        for (let i = 2; i < totalCount; i++) {
          totalSum += dataArray[i];
        }
        audioEnergy = totalSum / Math.max(1, totalCount - 2) / 255;
      }

      // Velocidade do vento da Baía de Todos os Santos + aceleração musical
      const speedMultiplier = isPlayingSound
        ? 1.0 + audioEnergy * 3.0 + bassEnergy * 2.4
        : 1.0;

      time += 0.016 * speedMultiplier;

      renderFrame(time, audioEnergy, bassEnergy);

      if (!reducedMotion && isVisible) {
        rafId = requestAnimationFrame(animate);
      }
    };

    if (reducedMotion) {
      // Snapshot elegante e estático com drapeado perfeito
      renderFrame(1.8, 0, 0);
    } else if (isVisible) {
      rafId = requestAnimationFrame(animate);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isPlayingSound, analyser, isVisible, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none relative ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: "920 / 420",
          display: "block",
        }}
      />
    </div>
  );
}
