"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  as?: "h1" | "h2" | "p" | "span";
};

export default function SplitText({
  text,
  className = "",
  delay = 0.1,
  duration = 0.7,
  stagger = 0.07,
  as = "h1",
}: SplitTextProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const Tag = as as any;

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="block overflow-hidden">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block will-change-transform"
            initial={{ y: "110%", rotate: 3, opacity: 0 }}
            animate={{ y: "0%", rotate: 0, opacity: 1 }}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.25, 1, 0.5, 1], // custom expo
            }}
            style={{ marginRight: "0.28em" }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}

// Variante por linha (para RegionalDna usar)
export function SplitLines({
  text,
  className = "",
  delay = 0,
  stagger = 0.12,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const lines = text.split("\n");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (reducedMotion) {
    return <p className={className}>{text}</p>;
  }

  return (
    <span aria-hidden className="block">
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: delay + i * stagger,
              ease: [0.25, 1, 0.5, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
