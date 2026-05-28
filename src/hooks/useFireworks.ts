import confetti from "canvas-confetti";
import { type RefObject, useEffect } from "react";

const COLORS = ["#FF007A", "#FFC107", "#7000FF", "#bb0058", "#ffffff"];

function burst(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const y = (rect.top + rect.height * 0.25) / window.innerHeight;

  const shared = {
    particleCount: 18,
    spread: 50,
    startVelocity: 28,
    ticks: 130,
    gravity: 0.9,
    scalar: 0.75,
    shapes: ["star" as const],
    colors: COLORS,
  };

  confetti({ ...shared, angle: 65, origin: { x: 0.05, y } });
  confetti({ ...shared, angle: 115, origin: { x: 0.95, y } });
}

export function useFireworks(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let interval: ReturnType<typeof setInterval> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          burst(el);
          interval = setInterval(() => burst(el), 8000);
        } else {
          if (interval) clearInterval(interval);
          interval = null;
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [ref]);
}
