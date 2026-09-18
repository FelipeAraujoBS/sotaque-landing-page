"use client";

import { useState, useRef, useCallback } from "react";
import SotaqueNavbar from "@/components/layout/SotaqueNavbar";
import Hero3DCanvas, {
  Hero3DCanvasHandle,
  SOTAQUE_MATERIALS,
} from "@/components/motion/Hero3DCanvas";

type Segment = "left" | "center" | "right";

interface CharacterFlipProps {
  text: string;
  isActive: boolean;
  baseDelay?: number;
  className?: string;
  as?: "h1" | "h2" | "span" | "div";
}

function CharacterFlip({
  text,
  isActive,
  baseDelay = 0,
  className = "",
  as: Component = "span",
}: CharacterFlipProps) {
  const characters = Array.from(text);

  return (
    <Component
      className={`inline-block select-none [perspective:800px] ${className}`}
      aria-label={text}
    >
      {characters.map((char, index) => {
        const delay = isActive ? baseDelay + index * 0.025 : 0;

        return (
          <span
            key={index}
            aria-hidden="true"
            className="inline-block transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transformOrigin: "50% 100%",
              transform: isActive
                ? "translate3d(0px, 0px, 0px) rotateX(0deg)"
                : "translate3d(0px, -12px, -80px) rotateX(-90deg)",
              opacity: isActive ? 1 : 0,
              filter: isActive ? "blur(0px)" : "blur(3px)",
              transitionDelay: `${delay}s`,
              whiteSpace: char === " " ? "pre" : "normal",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </Component>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasHandleRef = useRef<Hero3DCanvasHandle>(null);
  const [segment, setSegment] = useState<Segment>("center");
  const [activeMaterial, setActiveMaterial] = useState(SOTAQUE_MATERIALS[0]);
  const [isClickPopped, setIsClickPopped] = useState(false);

  // Rastreamento da posição do ponteiro em 3 zonas (Left, Center, Right)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    const oneThird = width / 3;
    const twoThirds = (width * 2) / 3;

    if (x < oneThird) {
      setSegment("left");
    } else if (x > twoThirds) {
      setSegment("right");
    } else {
      setSegment("center");
    }
  }, []);

  // Clique em qualquer lugar do Hero altera o material/cor da escultura 3D
  const handleHeroClick = useCallback(() => {
    canvasHandleRef.current?.cycleMaterial();
    setIsClickPopped(true);
    setTimeout(() => setIsClickPopped(false), 600);
  }, []);

  const handleMaterialChange = useCallback((index: number) => {
    setActiveMaterial(SOTAQUE_MATERIALS[index]);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onClick={handleHeroClick}
      className="relative min-h-screen w-full bg-[#102C2B] text-[#F3EBDD] flex flex-col justify-between overflow-hidden cursor-pointer select-none"
      aria-label="Sotaque — Comunicação e Marketing 360 para Saúde"
    >
      {/* 1. Navbar Suspensa Sotaque */}
      <SotaqueNavbar />

      {/* 2. WebGL 3D Canvas em tela cheia (Full-Bleed) com paleta oficial SOTAQUE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Hero3DCanvas
          ref={canvasHandleRef}
          onMaterialChange={handleMaterialChange}
          className="w-full h-full"
        />
        {/* Vinheta atmosférica profunda em Azul Petróleo Noturno */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#102C2B]/75 via-transparent to-[#102C2B]/95 pointer-events-none"
          aria-hidden="true"
        />
        {/* Halo solar suave em Solar / Mostarda (5%) */}
        <div
          className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-[#E7A92B]/10 blur-[140px] pointer-events-none"
          aria-hidden="true"
        />
        {/* Halo telúrico sutil em Terracota (2%) */}
        <div
          className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-[#B85C42]/12 blur-[150px] pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* 3. Área Central de Títulos com 3 Segmentos em Transição Cinética */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16 pt-28 pb-12 w-full max-w-7xl mx-auto">
        {/* Camada das Manchetes Horizontais */}
        <div className="w-full h-[220px] sm:h-[260px] lg:h-[300px] relative flex items-center justify-center">
          {/* SEGMENTO 1: CENTER (Default) — "Dê sotaque à sua clínica." */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${
              segment === "center" ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="text-center">
              <CharacterFlip
                text="Sua marca tem voz, nós damos o sotaque."
                isActive={segment === "center"}
                baseDelay={0}
                className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[3.5rem] font-normal tracking-tight leading-[0.95] text-[#F3EBDD]"
              />
            </h1>
          </div>

          {/* SEGMENTO 2: LEFT — "Posicionamento / Identidade Regional / Design de Autoridade" */}
          <div
            className={`absolute inset-0 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10 px-4 sm:px-8 transition-opacity duration-300 pointer-events-none ${
              segment === "left" ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex-1 text-center md:text-left">
              <CharacterFlip
                text="Posicionamento de Marca"
                isActive={segment === "left"}
                baseDelay={0}
                className="font-sans text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#F3EBDD]"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2 sm:gap-4 text-center md:text-right">
              <CharacterFlip
                text="Identidade Regional"
                isActive={segment === "left"}
                baseDelay={0.15}
                className="font-sans text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#E7A92B]"
              />
              <CharacterFlip
                text="Design de Autoridade"
                isActive={segment === "left"}
                baseDelay={0.3}
                className="font-sans text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#F3EBDD]/80"
              />
            </div>
          </div>

          {/* SEGMENTO 3: RIGHT — "Audiovisual Médico / Tráfego & Captação / Estratégia 360" */}
          <div
            className={`absolute inset-0 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10 px-4 sm:px-8 transition-opacity duration-300 pointer-events-none ${
              segment === "right" ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex-1 flex flex-col gap-2 sm:gap-4 text-center md:text-left">
              <CharacterFlip
                text="Audiovisual Cinematográfico"
                isActive={segment === "right"}
                baseDelay={0}
                className="font-sans text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#F3EBDD]"
              />
              <CharacterFlip
                text="Tráfego & Captação"
                isActive={segment === "right"}
                baseDelay={0.15}
                className="font-sans text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#58734A]"
              />
            </div>
            <div className="flex-1 text-center md:text-right">
              <CharacterFlip
                text="Estratégia 360 Saúde"
                isActive={segment === "right"}
                baseDelay={0.3}
                className="font-sans text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#D63A2F]"
              />
            </div>
          </div>
        </div>

        {/* Segment Selectors para Mobile / Touch Screen */}
        <div className="flex md:hidden items-center gap-2 mt-4 z-20">
          {(["left", "center", "right"] as Segment[]).map((seg) => (
            <button
              key={seg}
              onClick={(e) => {
                e.stopPropagation();
                setSegment(seg);
              }}
              className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                segment === seg
                  ? "bg-[#F3EBDD] text-[#102C2B] font-semibold shadow-md"
                  : "bg-[#F3EBDD]/10 text-[#F3EBDD]/70 border border-[#F3EBDD]/15"
              }`}
            >
              {seg === "left"
                ? "Branding"
                : seg === "center"
                  ? "Sotaque"
                  : "Estratégia"}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Rodapé do Hero com Copy Oficial da Sotaque e Indicadores */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pb-8 sm:pb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        {/* Parágrafo Sotaque */}
        <div className="max-w-xl">
          <p className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-[#F3EBDD]/80 text-balance">
            A <strong className="text-[#F3EBDD] font-semibold">Sotaque</strong>{" "}
            é o estúdio de comunicação 360 que clínicas e profissionais de saúde
            procuram quando precisam unir a{" "}
            <span className="text-[#E7A92B] font-medium">precisão clínica</span>{" "}
            ao{" "}
            <span className="text-[#F3EBDD] font-medium">
              calor humano, à escuta e à identidade
            </span>{" "}
            de quem entende a raiz de cada região.
          </p>
        </div>

        {/* Indicadores de Status & Microinteração 3D Oficial */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs font-mono">
          {/* Badge do Material 3D Oficial */}
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F3EBDD]/20 bg-[#102C2B]/60 backdrop-blur-md transition-all duration-300 shadow-md ${
              isClickPopped ? "scale-105 border-[#D63A2F] bg-[#D63A2F]/15" : ""
            }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"
              style={{
                backgroundColor: activeMaterial.hex,
                color: activeMaterial.hex,
              }}
            />
            <span className="text-[#F3EBDD] uppercase tracking-wider text-[11px] font-medium">
              {activeMaterial.name}
            </span>
          </div>

          {/* Dica de interação */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#F3EBDD]/15 text-[#F3EBDD]/60 text-[11px] tracking-wide">
            <span className="text-[#E7A92B]">✦</span>
            <span>Clique para alternar a cor</span>
          </div>
        </div>
      </div>
    </section>
  );
}
