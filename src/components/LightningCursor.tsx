import { useEffect, useRef } from "react";

/**
 * Lightning trail that follows the cursor.
 * - Canvas-based, full-viewport, pointer-events: none
 * - Disabled on touch / reduced-motion devices
 */
export function LightningCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia?.("(pointer: coarse)").matches;
    if (reduced || isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const trail: { x: number; y: number; t: number }[] = [];
    let mouse = { x: -9999, y: -9999 };
    let lastBolt = 0;

    const onMove = (e: PointerEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
      trail.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (trail.length > 24) trail.shift();
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Read theme color from CSS var
    const getColor = () => {
      const styles = getComputedStyle(document.documentElement);
      const c = styles.getPropertyValue("--brand-violet").trim() || "oklch(0.7 0.22 25)";
      return c;
    };

    const drawBolt = (x1: number, y1: number, x2: number, y2: number, displace: number) => {
      if (displace < 2) {
        ctx.lineTo(x2, y2);
        return;
      }
      const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * displace;
      const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * displace;
      drawBolt(x1, y1, midX, midY, displace / 2);
      drawBolt(midX, midY, x2, y2, displace / 2);
    };

    let raf = 0;
    const render = () => {
      const now = performance.now();
      // fade previous frame
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      const color = getColor();

      // Trail glow
      if (trail.length > 1) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 16;
        ctx.shadowColor = color;
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length; i++) {
          const age = (now - trail[i].t) / 600;
          if (age >= 1) continue;
          ctx.lineTo(trail[i].x, trail[i].y);
        }
        ctx.stroke();
      }

      // Periodic lightning bolt from previous trail point to mouse
      if (now - lastBolt > 70 && trail.length > 4) {
        lastBolt = now;
        const start = trail[Math.max(0, trail.length - 6)];
        ctx.strokeStyle = "rgba(255,255,255,0.9)";
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 22;
        ctx.shadowColor = color;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        drawBolt(start.x, start.y, mouse.x, mouse.y, 24);
        ctx.stroke();
      }

      // expire trail
      while (trail.length && now - trail[0].t > 600) trail.shift();

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] mix-blend-screen"
    />
  );
}
