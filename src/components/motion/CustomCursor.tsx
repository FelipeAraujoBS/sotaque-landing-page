"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  active: boolean;
  label?: string;
};

export default function CustomCursor({ active, label = "ver case" }: Props) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.6 });

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mqMotion.matches);
    const onMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mqMotion.addEventListener("change", onMotion);

    const mqDesktop = window.matchMedia("(pointer: fine)");
    const updateDesktop = () => setIsDesktop(mqDesktop.matches);
    updateDesktop();
    // pointer: fine pode não disparar change em alguns browsers, usa resize como fallback
    mqDesktop.addEventListener("change", updateDesktop);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      mqMotion.removeEventListener("change", onMotion);
      mqDesktop.removeEventListener("change", updateDesktop);
      window.removeEventListener("mousemove", onMove);
    };
  }, [x, y]);

  if (reducedMotion || !isDesktop) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[60] hidden md:flex items-center justify-center"
      style={{
        x: springX,
        y: springY,
      }}
      aria-hidden
    >
      {/* Offset de -50% para centralizar no cursor — usa transform CSS, não style translate* inválido */}
      <motion.div
        className="rounded-full bg-[#D63A2F] text-[#F3EBDD] px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase shadow-xl flex items-center gap-1.5 border border-[#F3EBDD]/20 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{
          scale: active ? 1 : 0.7,
          opacity: active ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {label}
        <span aria-hidden>↗</span>
      </motion.div>
    </motion.div>
  );
}
