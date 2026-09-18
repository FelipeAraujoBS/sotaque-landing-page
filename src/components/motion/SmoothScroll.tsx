"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let lenis: Lenis | null = null;
    let gsap: any = null;
    let ScrollTrigger: any = null;
    let tickerCallback: ((time: number) => void) | null = null;
    let onLoad: (() => void) | null = null;
    let isMounted = true;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapMod, stMod]) => {
      if (!isMounted) return;
      gsap = gsapMod.default;
      ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      });

      lenis.on("scroll", ScrollTrigger.update);

      tickerCallback = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
    });

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches && lenis) {
        lenis.destroy();
        lenis = null;
      }
    };
    mediaQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      isMounted = false;
      mediaQuery.removeEventListener("change", handleReducedMotionChange);
      if (onLoad) window.removeEventListener("load", onLoad);
      if (lenis && ScrollTrigger) {
        try {
          lenis.off("scroll", ScrollTrigger.update);
        } catch {}
        lenis.destroy();
        lenis = null;
      }
      if (gsap && tickerCallback) {
        try {
          gsap.ticker.remove(tickerCallback);
        } catch {}
      }
    };
  }, []);

  return <>{children}</>;
}
