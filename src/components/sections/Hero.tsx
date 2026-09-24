"use client";

import { useState, useRef, useCallback, useEffect, ReactNode } from "react";
import dynamic from "next/dynamic";
import SotaqueNavbar from "@/components/layout/SotaqueNavbar";
import type { Hero3DCanvasHandle } from "@/components/motion/Hero3DCanvas";
import MagneticButton from "@/components/motion/MagneticButton";

const Hero3DCanvas = dynamic(() => import("@/components/motion/Hero3DCanvas"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full bg-[#102C2B] flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      <div className="w-56 h-56 rounded-full bg-[#163A39]/60 blur-3xl animate-pulse" />
    </div>
  ),
});

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
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [isClickPopped, setIsClickPopped] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inicialização do áudio de fundo (bg-audio) com loop contínuo
  useEffect(() => {
    const audio = new Audio("/beat/bg-audio.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    const handleEnded = () => setIsPlayingSound(false);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleSound = useCallback(() => {
    if (!audioRef.current) return;
    setIsClickPopped(true);
    setTimeout(() => setIsClickPopped(false), 500);

    if (isPlayingSound) {
      audioRef.current.pause();
      setIsPlayingSound(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlayingSound(true);
        })
        .catch((err) => {
          console.warn("Reprodução bloqueada pelo navegador:", err);
        });
    }
  }, [isPlayingSound]);

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

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#102C2B] text-[#F3EBDD] flex flex-col justify-between overflow-hidden cursor-default select-text"
      aria-label="Sotaque — Comunicação e Marketing 360 para Saúde"
    >
      {/* 1. Navbar Suspensa Sotaque com controle de som unificado */}
      <SotaqueNavbar
        isPlayingSound={isPlayingSound}
        onToggleSound={toggleSound}
      />

      {/* 2. WebGL 3D Canvas em tela cheia (Full-Bleed) com paleta oficial SOTAQUE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Hero3DCanvas ref={canvasHandleRef} className="w-full h-full" />
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
            aria-hidden={segment !== "center"}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${
              segment === "center" ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="text-center font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5.1rem] font-normal tracking-tight leading-[0.95] text-[#F3EBDD]">
              <CharacterFlip
                text="Sua marca tem voz, nós damos o"
                isActive={segment === "center"}
                baseDelay={0}
              />{" "}
              <span className="font-['Chroma_Venue'] font-chroma">
                sotaque.
              </span>
            </h1>
          </div>

          {/* SEGMENTO 2: LEFT — "Posicionamento / Identidade Regional / Design de Autoridade" */}
          <div
            aria-hidden={segment !== "left"}
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
            aria-hidden={segment !== "right"}
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

      {/* 4. Rodapé do Hero com Copy Oficial da Sotaque, CTAs e Indicadores */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pb-8 sm:pb-12 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
        {/* Parágrafo Sotaque + CTAs de Ação */}
        <div className="max-w-xl flex flex-col gap-6">
          <p className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-[#F3EBDD]/85 text-balance">
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

          {/* CTAs Primário & Secundário com Affordance Impecável */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1">
            <MagneticButton
              href="#contact"
              variant="primary"
              ariaLabel="Iniciar projeto com a Sotaque"
              className="shadow-xl shadow-[#D63A2F]/25"
            >
              <span>Iniciar Projeto</span>
              <span className="text-sm font-light">→</span>
            </MagneticButton>

            <a
              href="#pilares"
              className="inline-flex items-center gap-2 rounded-full border border-[#F3EBDD]/25 bg-[#F3EBDD]/5 hover:bg-[#F3EBDD]/15 hover:border-[#F3EBDD]/45 px-6 py-3.5 font-mono text-xs font-bold tracking-wider uppercase text-[#F3EBDD] transition-all duration-300 backdrop-blur-sm cursor-pointer"
              aria-label="Conhecer os 5 pilares integrados"
            >
              <span>Explorar Pilares</span>
              <span className="text-xs text-[#E7A92B]">↓</span>
            </a>
          </div>
        </div>

        {/* Indicadores de Status & Microinteração Sonora */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs font-mono">
          {/* Badge Interativo do Som — Pílula de Alto Relevo */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-300 shadow-md cursor-pointer ${
              isPlayingSound
                ? "border-[#E7A92B] bg-[#E7A92B]/15 text-[#F3EBDD] shadow-[#E7A92B]/20 scale-100"
                : "border-[#F3EBDD]/20 bg-[#102C2B]/80 text-[#F3EBDD]/75 hover:border-[#F3EBDD]/50 hover:text-[#F3EBDD]"
            } ${isClickPopped ? "scale-105" : ""}`}
            aria-label={
              isPlayingSound
                ? "Desativar áudio de fundo"
                : "Ativar áudio de fundo"
            }
            title={
              isPlayingSound ? "Pausar som ambiente" : "Ligar som ambiente"
            }
          >
            <div className="flex items-center gap-[2.5px] h-3.5">
              <span
                className={`w-[2px] bg-[#E7A92B] rounded-full transition-all duration-300 ${
                  isPlayingSound ? "h-3.5 animate-pulse" : "h-1 opacity-50"
                }`}
              />
              <span
                className={`w-[2px] bg-[#D63A2F] rounded-full transition-all duration-300 ${
                  isPlayingSound ? "h-2 animate-pulse [animation-delay:150ms]" : "h-1.5 opacity-50"
                }`}
              />
              <span
                className={`w-[2px] bg-[#58734A] rounded-full transition-all duration-300 ${
                  isPlayingSound ? "h-3.5 animate-pulse [animation-delay:300ms]" : "h-2 opacity-50"
                }`}
              />
              <span
                className={`w-[2px] bg-[#B85C42] rounded-full transition-all duration-300 ${
                  isPlayingSound ? "h-2.5 animate-pulse [animation-delay:450ms]" : "h-1 opacity-50"
                }`}
              />
            </div>
            <span className="uppercase tracking-wider text-[11px] font-semibold">
              {isPlayingSound ? "Som: Ativado" : "Som: Mudo"}
            </span>
          </button>

          {/* Dica de interação */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#F3EBDD]/20 text-[#F3EBDD]/85 font-medium text-[11px] tracking-wide">
            <span className="text-[#E7A92B]">✦</span>
            <span>
              Clique para {isPlayingSound ? "pausar som" : "ativar som"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
