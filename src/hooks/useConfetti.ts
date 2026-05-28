import confetti from "canvas-confetti";
import { useEffect } from "react";

const TWO_MINUTES = 2 * 60 * 1000;

function fireCannons() {
  const shared = {
    particleCount: 80,
    spread: 70,
    startVelocity: 55,
    ticks: 200,
    colors: ["#FF007A", "#FFC107", "#7000FF", "#bb0058", "#ffffff"],
  };

  // left cannon
  confetti({ ...shared, origin: { x: 0, y: 1 }, angle: 60 });
  // right cannon
  confetti({ ...shared, origin: { x: 1, y: 1 }, angle: 120 });
  // center burst
  confetti({ ...shared, particleCount: 60, spread: 100, startVelocity: 40, origin: { x: 0.5, y: 0.7 } });
}

export function useConfetti(intervalMs: number = TWO_MINUTES) {
  useEffect(() => {
    // fire immediately on mount
    fireCannons();

    const id = setInterval(fireCannons, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
}
