"use client";

import { useEffect, useState } from "react";

interface MosaicMarqueeProps {
  className?: string;
  speedSeconds?: number;
  heightClassName?: string;
}

// 8 azulejos oficiais da identidade Sotaque
const TILE_IDS = [1, 2, 3, 4, 5, 6, 7, 8];

// 3 ciclos de 8 ladrilhos por track (24 ladrilhos por track)
const CYCLES_PER_TRACK = 3;
const TILES_PER_TRACK = Array.from(
  { length: TILE_IDS.length * CYCLES_PER_TRACK },
  (_, i) => TILE_IDS[i % TILE_IDS.length]
);

export default function MosaicMarquee({
  className = "",
  speedSeconds = 85, // Deslize solene, majestoso e suave
  heightClassName = "h-[62px] sm:h-[70px] md:h-[78px] lg:h-[82px]", // Reduzido em 35% para harmonizar com o azulejo protagonista
}: MosaicMarqueeProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredGlobalIndex, setHoveredGlobalIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Calcula a intensidade de reconfiguração de cor para o azulejo e seus vizinhos
  const getReconfigurationOpacity = (idx: number) => {
    if (hoveredGlobalIndex === null) return 0;
    const distance = Math.abs(idx - hoveredGlobalIndex);
    if (distance === 0) return 1.0;
    if (distance === 1) return 0.65;
    if (distance === 2) return 0.35;
    return 0;
  };

  const renderTrack = (trackOffset: number) => (
    <div className="flex shrink-0 items-end leading-none">
      {TILES_PER_TRACK.map((tileNum, indexInTrack) => {
        const globalIdx = trackOffset + indexInTrack;
        const altOpacity = getReconfigurationOpacity(globalIdx);
        const isCenterHover = hoveredGlobalIndex === globalIdx;

        return (
          <div
            key={`tile-${trackOffset}-${indexInTrack}`}
            onMouseEnter={() => setHoveredGlobalIndex(globalIdx)}
            onMouseLeave={() => setHoveredGlobalIndex(null)}
            className={`relative shrink-0 cursor-pointer will-change-transform leading-none ${
              isCenterHover
                ? "z-30 scale-[1.10] -translate-y-2 shadow-[0_16px_32px_rgba(11,27,71,0.22)]"
                : "z-10 scale-100 translate-y-0"
            }`}
            style={
              {
                transition:
                  "transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 300ms ease",
                ...( !reducedMotion && isMounted
                  ? {
                      animation: `tile-stagger-flip 0.75s cubic-bezier(0.16, 1, 0.3, 1) both`,
                      animationDelay: `${(indexInTrack % 14) * 65}ms`,
                    }
                  : {}),
              }
            }
          >
            {/* Azulejo com Paleta Primária Oficial */}
            <picture className="block leading-none">
              <source
                srcSet={`/brand/mosaics/tiles/tile_${tileNum}.webp`}
                type="image/webp"
              />
              <img
                src={`/brand/mosaics/tiles/tile_${tileNum}.png`}
                alt=""
                className={`w-auto ${heightClassName} object-contain block align-bottom pointer-events-none select-none`}
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </picture>

            {/* Azulejo com Paleta Alternativa (Reconfiguração Dinâmica ao Interagir) */}
            <picture className="block absolute inset-0 pointer-events-none leading-none">
              <source
                srcSet={`/brand/mosaics/tiles/tile_${tileNum}_alt.webp`}
                type="image/webp"
              />
              <img
                src={`/brand/mosaics/tiles/tile_${tileNum}_alt.png`}
                alt=""
                className={`w-auto ${heightClassName} object-contain block align-bottom select-none transition-opacity duration-300 ease-out`}
                style={{ opacity: altOpacity }}
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </picture>
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      role="region"
      aria-label="Friso monumental de azulejaria tradicional interativa Sotaque"
      className={`relative w-full overflow-hidden pt-2 pb-0 mb-0 select-none bg-transparent leading-none ${className}`}
    >
      {/* Pista do Marquee: pausa suavemente ao interagir para admirar os azulejos */}
      <div
        className={`flex w-max items-end will-change-transform ${
          reducedMotion ? "" : "animate-mosaic-glide group-hover/marquee:[animation-play-state:paused]"
        }`}
        style={
          {
            "--mosaic-speed": `${speedSeconds}s`,
          } as React.CSSProperties
        }
      >
        {/* Track 1 */}
        {renderTrack(0)}

        {/* Track 2 (Clone idêntico garantindo loop contínuo matematicamente perfeito) */}
        {renderTrack(TILES_PER_TRACK.length)}
      </div>

      <style jsx global>{`
        @keyframes tile-stagger-flip {
          0% {
            opacity: 0;
            transform: perspective(600px) rotateY(-70deg) scale(0.92);
          }
          100% {
            opacity: 1;
            transform: perspective(600px) rotateY(0deg) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
