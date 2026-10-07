"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface InteractiveSunProps {
  className?: string;
}

export default function InteractiveSun({ className = "" }: InteractiveSunProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let targetRotX = 0;
    let targetRotY = 0;
    let targetTransX = 0;
    let targetTransY = 0;

    let currentRotX = 0;
    let currentRotY = 0;
    let currentTransX = 0;
    let currentTransY = 0;

    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Deslocamento normalizado (-1 a 1) baseado na distância do cursor ao centro do elemento
      const deltaX = (e.clientX - centerX) / (window.innerWidth * 0.5);
      const deltaY = (e.clientY - centerY) / (window.innerHeight * 0.5);

      // Limites de inclinação suave (tipo cubo mágico magnético)
      targetRotY = Math.max(-18, Math.min(18, deltaX * 22));
      targetRotX = Math.max(-18, Math.min(18, -deltaY * 22));
      targetTransX = Math.max(-15, Math.min(15, deltaX * 18));
      targetTransY = Math.max(-15, Math.min(15, deltaY * 18));
    };

    const handleMouseLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
      targetTransX = 0;
      targetTransY = 0;
    };

    // Loop de inércia suave com interpolação linear (LERP)
    const animate = () => {
      const lerp = 0.065; // Fator de amortecimento fluido e orgânico
      currentRotX += (targetRotX - currentRotX) * lerp;
      currentRotY += (targetRotY - currentRotY) * lerp;
      currentTransX += (targetTransX - currentTransX) * lerp;
      currentTransY += (targetTransY - currentTransY) * lerp;

      if (containerRef.current) {
        containerRef.current.style.transform = `perspective(900px) rotateX(${currentRotX.toFixed(
          2
        )}deg) rotateY(${currentRotY.toFixed(2)}deg) translate3d(${currentTransX.toFixed(
          2
        )}px, ${currentTransY.toFixed(2)}px, 0)`;
      }

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
    >
      {/* Halo de luz ambiente difusa que ajuda o selo a se mesclar ao papel creme */}
      <div
        className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-[#E27908]/04 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Recipiente 3D com inclinação interativa fluida */}
      <div
        ref={containerRef}
        className="relative will-change-transform transition-opacity duration-700 ease-out"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <Image
          src="/brand/elements/sol-com-olhar_azul-meia-noite.png"
          alt="Selo Sotaque — Sol com Olhar"
          width={400}
          height={400}
          priority
          className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 object-contain mix-blend-multiply opacity-[0.22] hover:opacity-[0.35] transition-opacity duration-500 block filter contrast-[1.05]"
          draggable={false}
        />
      </div>
    </div>
  );
}
