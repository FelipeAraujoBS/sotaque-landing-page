"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "accent" | "ghost";
  onClick?: () => void;
  ariaLabel?: string;
};

export default function MagneticButton({
  children,
  href,
  className = "",
  variant = "primary",
  onClick,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Força magnética proporcional à distância, limitada
    const deltaX = (e.clientX - centerX) * 0.28;
    const deltaY = (e.clientY - centerY) * 0.32;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D63A2F] disabled:opacity-50 cursor-pointer";

  const variantStyles = {
    primary:
      "bg-[#D63A2F] text-[#F3EBDD] hover:bg-[#BA2E24] shadow-lg shadow-[#D63A2F]/25 px-7 py-3.5",
    accent:
      "bg-[#58734A] text-[#F3EBDD] hover:bg-[#475E3B] shadow-lg shadow-[#58734A]/25 px-7 py-3.5",
    ghost:
      "bg-white border border-[#102C2B]/15 text-[#102C2B] hover:bg-[#F3EBDD] px-6 py-3",
  };

  const motionStyle = reducedMotion
    ? {}
    : {
        x: springX,
        y: springY,
      };

  if (href) {
    return (
      <motion.a
        ref={ref as any}
        href={href}
        aria-label={ariaLabel}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        style={motionStyle as any}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileTap={reducedMotion ? undefined : { scale: 0.97 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as any}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={motionStyle as any}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={reducedMotion ? undefined : { scale: 0.97 }}
      type="button"
    >
      {children}
    </motion.button>
  );
}
