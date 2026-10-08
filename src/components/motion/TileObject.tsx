"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type RefObject,
} from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { PARROT_PATH, PARROT_VIEWBOX } from "./parrotPath";
import { TILE_VIEWBOX } from "./tileMotifs";

/* ---------------------------------------------------------------------------
   Paleta canônica da Sotaque (via tokens oficiais de tokens.css)
--------------------------------------------------------------------------- */
const NAVY = "var(--sotaque-azul-meia-noite,#0B1B47)";
const VINHO = "var(--sotaque-vinho,#6E1016)";
const SOLAR = "var(--sotaque-solar,#E27908)";
const CREME = "var(--sotaque-creme,#F4F1E5)";

/**
 * Estados oficiais do símbolo Sotaque baseados exatamente nas referências
 * de `assets/references/parrot` (PNGs oficiais da marca):
 * - fundo azul / logo creme
 * - fundo laranja / logo creme
 * - fundo azul / logo laranja
 * - fundo vinho / logo creme
 * - fundo vinho / logo laranja
 * - fundo creme / logo azul
 * - fundo creme / logo laranja
 * - fundo creme / logo vinho
 * - fundo laranja / logo vinho
 */
export interface TileState {
  name: string;
  bg: string;
  logo: string;
  border: string;
  accent: string;
  sideColor: string;
}

export const TILE_STATES: TileState[] = [
  // 1 · Fundo Azul Meia-Noite, Logo Creme
  {
    name: "Azul · Creme",
    bg: NAVY,
    logo: CREME,
    border: SOLAR,
    accent: VINHO,
    sideColor: "#071333",
  },
  // 2 · Fundo Laranja (Solar), Logo Creme
  {
    name: "Laranja · Creme",
    bg: SOLAR,
    logo: CREME,
    border: NAVY,
    accent: VINHO,
    sideColor: "#B55E04",
  },
  // 3 · Fundo Azul Meia-Noite, Logo Laranja
  {
    name: "Azul · Laranja",
    bg: NAVY,
    logo: SOLAR,
    border: CREME,
    accent: VINHO,
    sideColor: "#071333",
  },
  // 4 · Fundo Vinho Profundo, Logo Creme
  {
    name: "Vinho · Creme",
    bg: VINHO,
    logo: CREME,
    border: SOLAR,
    accent: NAVY,
    sideColor: "#4A0B0F",
  },
  // 5 · Fundo Vinho Profundo, Logo Laranja
  {
    name: "Vinho · Laranja",
    bg: VINHO,
    logo: SOLAR,
    border: CREME,
    accent: NAVY,
    sideColor: "#4A0B0F",
  },
  // 6 · Fundo Creme, Logo Azul Meia-Noite
  {
    name: "Creme · Azul",
    bg: CREME,
    logo: NAVY,
    border: SOLAR,
    accent: VINHO,
    sideColor: "#DED9CB",
  },
  // 7 · Fundo Creme, Logo Laranja
  {
    name: "Creme · Laranja",
    bg: CREME,
    logo: SOLAR,
    border: NAVY,
    accent: VINHO,
    sideColor: "#DED9CB",
  },
  // 8 · Fundo Creme, Logo Vinho Profundo
  {
    name: "Creme · Vinho",
    bg: CREME,
    logo: VINHO,
    border: SOLAR,
    accent: NAVY,
    sideColor: "#DED9CB",
  },
  // 9 · Fundo Laranja, Logo Vinho Profundo
  {
    name: "Laranja · Vinho",
    bg: SOLAR,
    logo: VINHO,
    border: CREME,
    accent: NAVY,
    sideColor: "#B55E04",
  },
];

const SPRING = { stiffness: 120, damping: 18 };
const FLOAT_PERIOD_S = 7;
const AMBIENT_CYCLE_MS = 4500; // transição suave a cada 4.5s
const DEPTH = 28; // Espessura física em pixels ("gordinho")
const HALF_DEPTH = DEPTH / 2; // 14px

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

interface TileFaceProps {
  state: TileState;
  uid: string;
  hx: MotionValue<string>;
  hy: MotionValue<string>;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
}

/**
 * Renderiza uma face do azulejo cerâmico com:
 * 1. Base esmaltada com a cor de fundo do estado
 * 2. Filetes e molduras geométricas de azulejo tradicional baiano
 * 3. O Símbolo Oficial da Sotaque (Arara / Parrot) vetorizado
 * 4. Esmalte cerâmico, bisel, textura e reflexo especular dinâmico
 */
function TileFace({ state, uid, hx, hy, sx, sy }: TileFaceProps) {
  const vb = `0 0 ${TILE_VIEWBOX} ${TILE_VIEWBOX}`;

  // Pequeno relevo físico no logo (desloca 2px no sentido da luz)
  const logoX = useTransform(sx, [-1, 1], [-2.5, 2.5]);
  const logoY = useTransform(sy, [-1, 1], [-2.5, 2.5]);

  return (
    <div className="absolute inset-0 isolate overflow-hidden rounded-[8%] bg-transparent [backface-visibility:hidden]">
      {/* 1 · Fundo esmaltado cerâmico */}
      <div
        className="absolute inset-0 transition-colors duration-[600ms] ease-out"
        style={{ backgroundColor: state.bg }}
      />

      {/* 2 · Moldura concêntrica de azulejo clássico */}
      <div className="absolute inset-0 pointer-events-none p-3 sm:p-4">
        <svg viewBox={vb} className="w-full h-full" fill="none">
          {/* Filete externo */}
          <rect
            x="6"
            y="6"
            width={TILE_VIEWBOX - 12}
            height={TILE_VIEWBOX - 12}
            rx="4"
            strokeWidth="1.2"
            className="transition-[stroke] duration-[600ms] ease-out"
            style={{ stroke: state.border }}
          />
          {/* Filete interno */}
          <rect
            x="10.5"
            y="10.5"
            width={TILE_VIEWBOX - 21}
            height={TILE_VIEWBOX - 21}
            rx="2.5"
            strokeWidth="0.6"
            strokeDasharray="2 2"
            opacity="0.6"
            className="transition-[stroke] duration-[600ms] ease-out"
            style={{ stroke: state.accent }}
          />
          {/* Cantoneiras ornamentais de azulejo */}
          <circle cx="10.5" cy="10.5" r="1.5" style={{ fill: state.border }} />
          <circle cx={TILE_VIEWBOX - 10.5} cy="10.5" r="1.5" style={{ fill: state.border }} />
          <circle cx="10.5" cy={TILE_VIEWBOX - 10.5} r="1.5" style={{ fill: state.border }} />
          <circle cx={TILE_VIEWBOX - 10.5} cy={TILE_VIEWBOX - 10.5} r="1.5" style={{ fill: state.border }} />
        </svg>
      </div>

      {/* 3 · Símbolo Oficial da Sotaque (Parrot / Arara) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center p-8 sm:p-10 pointer-events-none"
        style={{ x: logoX, y: logoY }}
      >
        <svg
          viewBox={PARROT_VIEWBOX}
          className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)]"
          aria-hidden="true"
        >
          <path
            d={PARROT_PATH}
            fillRule="evenodd"
            className="transition-[fill] duration-[600ms] ease-out"
            style={{ fill: state.logo }}
          />
        </svg>
      </motion.div>

      {/* 4 · Bisel e relevo esmaltado da peça cerâmica */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[8%]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 42%, rgba(0,0,0,0.28) 100%)",
          boxShadow:
            "inset 0 0 0 1.5px rgba(255,255,255,0.18), inset 0 -3px 12px rgba(0,0,0,0.24)",
        }}
      />

      {/* 5 · Textura tátil de grão cerâmico */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.24] mix-blend-overlay pointer-events-none"
        aria-hidden="true"
      >
        <filter id={`${uid}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${uid}-grain)`} />
      </svg>

      {/* 6 · Reflexo especular radial reativo */}
      <motion.div
        className="absolute -inset-[30%] opacity-60 mix-blend-soft-light pointer-events-none"
        style={{
          x: hx,
          y: hy,
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 24%, rgba(255,255,255,0) 50%)",
        }}
      />
    </div>
  );
}

interface TileObjectProps {
  /** Índice da palavra atual da headline (0 a 3). */
  wordIndex: number;
  /** Elemento container do Hero cujo cursor é monitorado. */
  containerRef: RefObject<HTMLElement>;
  className?: string;
}

export default function TileObject({
  wordIndex,
  containerRef,
  className = "",
}: TileObjectProps) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");

  // Índice de estado ativo do azulejo
  const [stateIndex, setStateIndex] = useState(0);
  const userInteractedRef = useRef(false);
  const introSettledRef = useRef(false);

  // Sincroniza com as palavras na introdução da headline:
  // 0: Azul · Creme, 1: Laranja · Creme, 2: Azul · Laranja, 3: Vinho · Creme
  useEffect(() => {
    if (wordIndex < 3 && !userInteractedRef.current) {
      setStateIndex(wordIndex);
    } else if (wordIndex === 3 && !introSettledRef.current) {
      introSettledRef.current = true;
      setStateIndex(3); // Pousa em Vinho · Creme
    }
  }, [wordIndex]);

  // Avança para a próxima combinação de cores do logo/fundo
  const nextState = useCallback(() => {
    setStateIndex((prev) => (prev + 1) % TILE_STATES.length);
  }, []);

  // Ciclo ambiente permanente: o azulejo continua vivo mudando a cada 4.5s
  useEffect(() => {
    if (reduce) return;
    const interval = setInterval(() => {
      setStateIndex((prev) => (prev + 1) % TILE_STATES.length);
    }, AMBIENT_CYCLE_MS);
    return () => clearInterval(interval);
  }, [reduce]);

  // Configuração da Frente e do Verso (180° revela a contraparte complementar)
  const stateFront = TILE_STATES[stateIndex % TILE_STATES.length];
  const stateBack = TILE_STATES[(stateIndex + 1) % TILE_STATES.length];

  // Cursor normalizado (-1..1) no Hero para efeito de paralaxe
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, SPRING);
  const sy = useSpring(my, SPRING);

  // Rotação 3D interativa livre (pode girar 180°, 360°, 720°...)
  const baseRotY = useMotionValue(0);
  const baseRotX = useMotionValue(0);

  // Parallax magnético suave somado à rotação livre
  const tiltY = useTransform(sx, [-1, 1], [-12, 12]);
  const tiltX = useTransform(sy, [-1, 1], [12, -12]);

  const totalRotY = useTransform(
    [baseRotY, tiltY],
    ([r, t]) => (r as number) + (t as number)
  );
  const totalRotX = useTransform(
    [baseRotX, tiltX],
    ([r, t]) => (r as number) + (t as number)
  );

  // Flutuação senoidal suave em repouso
  const floatY = useMotionValue(0);
  const floatRot = useMotionValue(0);
  const inViewRef = useRef(true);
  const hoveringRef = useRef(false);
  const ampRef = useRef(1);

  useAnimationFrame((t) => {
    if (reduce || !inViewRef.current) return;
    ampRef.current += ((hoveringRef.current ? 0.35 : 1) - ampRef.current) * 0.04;
    const phase = (t / 1000) * ((Math.PI * 2) / FLOAT_PERIOD_S);
    floatY.set(Math.sin(phase) * 9 * ampRef.current);
    floatRot.set(Math.sin(phase + 1.1) * 1.1 * ampRef.current);
  });

  // Rastreamento de ponteiro no Hero inteiro
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(el);

    let cleanupPointer = () => {};
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!reduce && canHover) {
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) return;
        mx.set(clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1));
        my.set(clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1));
      };
      const onLeave = () => {
        mx.set(0);
        my.set(0);
      };
      el.addEventListener("pointermove", onMove, { passive: true });
      el.addEventListener("pointerleave", onLeave);
      cleanupPointer = () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    }

    return () => {
      io.disconnect();
      cleanupPointer();
    };
  }, [containerRef, reduce, mx, my]);

  // Arraste 3D do Azulejo com física de inércia e clique
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, rotY: 0, rotX: 0, time: 0 });
  const velocityRef = useRef({ vx: 0, vy: 0 });
  const animFrameRef = useRef<number | null>(null);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    userInteractedRef.current = true;
    isDraggingRef.current = true;
    hoveringRef.current = true;

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotY: baseRotY.get(),
      rotX: baseRotX.get(),
      time: performance.now(),
    };
    velocityRef.current = { vx: 0, vy: 0 };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(1, now - dragStartRef.current.time);
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    const newRotY = dragStartRef.current.rotY + dx * 0.75;
    const newRotX = clamp(dragStartRef.current.rotX - dy * 0.5, -45, 45);

    velocityRef.current = {
      vx: (dx / dt) * 16,
      vy: (dy / dt) * 16,
    };

    dragStartRef.current.x = e.clientX;
    dragStartRef.current.y = e.clientY;
    dragStartRef.current.rotY = newRotY;
    dragStartRef.current.rotX = newRotX;
    dragStartRef.current.time = now;

    baseRotY.set(newRotY);
    baseRotX.set(newRotX);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    hoveringRef.current = false;

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignora se o ponteiro já foi liberado
    }

    const totalDx = Math.abs(e.clientX - dragStartRef.current.x);
    const totalDy = Math.abs(e.clientY - dragStartRef.current.y);

    // Clique rápido sem arrasto: avança o estado de cor do fundo e do logo
    if (totalDx < 5 && totalDy < 5) {
      nextState();
      return;
    }

    // Inércia com desaceleração fluida
    let vx = velocityRef.current.vx * 0.5;
    let vy = velocityRef.current.vy * 0.25;

    const stepInertia = () => {
      vx *= 0.92;
      vy *= 0.90;

      if (Math.abs(vx) > 0.08 || Math.abs(vy) > 0.08) {
        baseRotY.set(baseRotY.get() + vx);
        baseRotX.set(clamp(baseRotX.get() - vy, -45, 45));
        animFrameRef.current = requestAnimationFrame(stepInertia);
      } else {
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(stepInertia);
  };

  // Reflexo especular que acompanha o ponteiro
  const hx = useTransform(sx, [-1, 1], ["-34%", "14%"]);
  const hy = useTransform(sy, [-1, 1], ["-34%", "14%"]);

  // Sombra suave deslocada no plano de fundo
  const shX = useTransform(sx, [-1, 1], [30, 8]);
  const shY = useTransform(sy, [-1, 1], [38, 20]);

  const sideFrontColor = stateFront.sideColor;

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Container 3D do Azulejo */}
      <div
        aria-label={`Azulejo Sotaque (${stateFront.name}). Clique para mudar as cores de fundo e do logo ou arraste para girar em 3D.`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            nextState();
          }
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative aspect-square w-[clamp(220px,26vw,440px)] max-w-full shrink-0 cursor-grab active:cursor-grabbing touch-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27908] rounded-[8%]"
      >
        {/* Flutuação senoidal suave */}
        <motion.div
          className="absolute inset-0"
          style={{ y: floatY, rotate: floatRot }}
        >
          {/* Caixa 3D Sólida ("gordinha") com 28px de profundidade física */}
          <motion.div
            className="absolute inset-0 will-change-transform [transform-style:preserve-3d]"
            style={{
              transformPerspective: 1100,
              rotateX: totalRotX,
              rotateY: totalRotY,
            }}
          >
            {/* Sombra realista projetada atrás do bloco */}
            <motion.div
              className="absolute inset-0 rounded-[8%] pointer-events-none"
              style={{
                x: shX,
                y: shY,
                scale: 0.92,
                background: "rgba(11, 27, 71, 0.38)",
                filter: "blur(26px)",
                transform: `translateZ(-${HALF_DEPTH + 12}px)`,
              }}
            />

            {/* ============================================================
                BORDAS LATERAIS DO AZULEJO 3D ("GORDINHO" - ESPESSURA 28PX)
                ============================================================ */}

            {/* Borda Superior (Top Edge) */}
            <div
              className="absolute left-0 right-0 pointer-events-none transition-colors duration-[600ms] ease-out rounded-t-sm"
              style={{
                top: -HALF_DEPTH,
                height: DEPTH,
                backgroundColor: sideFrontColor,
                transform: "rotateX(90deg)",
                transformOrigin: "center center",
                backgroundImage:
                  "linear-gradient(to bottom, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 50%, rgba(0,0,0,0.18) 100%)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)",
              }}
            />

            {/* Borda Inferior (Bottom Edge) */}
            <div
              className="absolute left-0 right-0 pointer-events-none transition-colors duration-[600ms] ease-out rounded-b-sm"
              style={{
                bottom: -HALF_DEPTH,
                height: DEPTH,
                backgroundColor: sideFrontColor,
                transform: "rotateX(-90deg)",
                transformOrigin: "center center",
                backgroundImage:
                  "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 60%, rgba(255,255,255,0.05) 100%)",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.2)",
              }}
            />

            {/* Borda Esquerda (Left Edge) */}
            <div
              className="absolute top-0 bottom-0 pointer-events-none transition-colors duration-[600ms] ease-out rounded-l-sm"
              style={{
                left: -HALF_DEPTH,
                width: DEPTH,
                backgroundColor: sideFrontColor,
                transform: "rotateY(-90deg)",
                transformOrigin: "center center",
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.22) 100%)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
              }}
            />

            {/* Borda Direita (Right Edge) */}
            <div
              className="absolute top-0 bottom-0 pointer-events-none transition-colors duration-[600ms] ease-out rounded-r-sm"
              style={{
                right: -HALF_DEPTH,
                width: DEPTH,
                backgroundColor: sideFrontColor,
                transform: "rotateY(90deg)",
                transformOrigin: "center center",
                backgroundImage:
                  "linear-gradient(to left, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)",
              }}
            />

            {/* ============================================================
                FACE FRONTAL (0° / 360°) — Posicionada em Z = +14px
                ============================================================ */}
            <div
              className="absolute inset-0 [transform-style:preserve-3d]"
              style={{ transform: `translateZ(${HALF_DEPTH}px)` }}
            >
              <TileFace
                state={stateFront}
                uid={`${uid}-front`}
                hx={hx}
                hy={hy}
                sx={sx}
                sy={sy}
              />
            </div>

            {/* ============================================================
                FACE TRASEIRA (180°) — Posicionada em Z = -14px invertida
                ============================================================ */}
            <div
              className="absolute inset-0 [transform-style:preserve-3d]"
              style={{ transform: `rotateY(180deg) translateZ(${HALF_DEPTH}px)` }}
            >
              <TileFace
                state={stateBack}
                uid={`${uid}-back`}
                hx={hx}
                hy={hy}
                sx={sx}
                sy={sy}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Dica de interação com indicador da paleta ativa */}
      <div
        className="mt-4 flex flex-col items-center gap-1 text-[11px] font-mono tracking-widest uppercase text-[#0B1B47]/65 pointer-events-none select-none transition-opacity duration-300"
        aria-hidden="true"
      >
        <div className="flex items-center gap-1.5">
          <svg
            className="w-3.5 h-3.5 animate-spin text-[#E27908]"
            style={{ animationDuration: "9s" }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
          </svg>
          <span className="font-semibold text-[#0B1B47]/85">
            {stateFront.name}
          </span>
          <span className="text-[#0B1B47]/40">·</span>
          <span>clique p/ trocar</span>
        </div>
        <span className="text-[10px] tracking-[0.2em] text-[#0B1B47]/45">
          arraste 360° em 3d
        </span>
      </div>
    </div>
  );
}
