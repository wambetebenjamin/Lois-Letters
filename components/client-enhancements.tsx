"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window { AOS?: { init: (options: { duration: number; easing: string; once: boolean }) => void } }
}

export default function ClientEnhancements() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let lenis: Lenis | null = null;
    if (!reduced) {
      lenis = new Lenis({ duration: 1.2, smoothWheel: true });
      const raf = (time: number) => { lenis?.raf(time); frame = window.requestAnimationFrame(raf); };
      frame = window.requestAnimationFrame(raf);
    }
    const timer = window.setTimeout(() => window.AOS?.init({ duration: 800, easing: "ease", once: true }), 350);
    return () => { window.clearTimeout(timer); window.cancelAnimationFrame(frame); lenis?.destroy(); };
  }, []);
  return null;
}
