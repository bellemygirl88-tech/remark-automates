import { useEffect, useRef } from "react";

/**
 * Lightning trail that follows the cursor.
 * - Canvas-based, full-viewport, pointer-events: none
 * - Intensifies on hover over interactive elements
 * - Bursts a radial lightning shockwave on click
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
    let hovering = false;
    // Active radial bursts triggered by clicks
    const bursts: { x: number; y: number; t: number }[] = [];

    const isInteractive = (el: EventTarget | null) => {
      if (!(el instanceof Element)) return false;
      return !!el.closest(
        'a, button, [role="button"], input, textarea, select, summary, label, [data-cursor="lightning"]',
      );
    };

    const onMove = (e: PointerEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
      hovering = isInteractive(e.target);
      trail.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (trail.length > 28) trail.shift();
    };
    const onOver = (e: PointerEvent) => {
      hovering = isInteractive(e.target);
    };
    const onDown = (e: PointerEvent) => {
      bursts.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (bursts.length > 6) bursts.shift();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });

    const getColor = () => {
      const styles = getComputedStyle(document.documentElement);
      return styles.getPropertyValue("--brand-violet").trim() || "oklch(0.72 0.24 290)";
    };
    const getAccent = () => {
      const styles = getComputedStyle(document.documentElement);
      return styles.getPropertyValue("--brand-cyan").trim() || "oklch(0.78 0.18 240)";
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
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      const color = getColor();
      const accent = getAccent();

      // Trail glow — thicker when hovering interactive
      if (trail.length > 1) {
        ctx.strokeStyle = hovering ? accent : color;
        ctx.lineWidth = hovering ? 3 : 2;
        ctx.shadowBlur = hovering ? 26 : 16;
        ctx.shadowColor = hovering ? accent : color;
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length; i++) {
          const age = (now - trail[i].t) / 600;
          if (age >= 1) continue;
          ctx.lineTo(trail[i].x, trail[i].y);
        }
        ctx.stroke();
      }

      // Periodic bolt — faster cadence + bigger displacement on hover
      const cadence = hovering ? 35 : 70;
      if (now - lastBolt > cadence && trail.length > 4) {
        lastBolt = now;
        const start = trail[Math.max(0, trail.length - 6)];
        ctx.strokeStyle = "rgba(255,255,255,0.95)";
        ctx.lineWidth = hovering ? 1.6 : 1.2;
        ctx.shadowBlur = hovering ? 32 : 22;
        ctx.shadowColor = hovering ? accent : color;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        drawBolt(start.x, start.y, mouse.x, mouse.y, hovering ? 38 : 24);
        ctx.stroke();
      }

      // Radial click bursts — N bolts shooting outward, fading 600ms
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        const age = (now - b.t) / 600;
        if (age >= 1) {
          bursts.splice(i, 1);
          continue;
        }
        const radius = 30 + age * 160;
        const alpha = 1 - age;
        const arms = 9;
        ctx.strokeStyle = `rgba(255,255,255,${0.85 * alpha})`;
        ctx.shadowBlur = 28;
        ctx.shadowColor = color;
        ctx.lineWidth = 1.4;
        for (let a = 0; a < arms; a++) {
          const angle = (a / arms) * Math.PI * 2 + age * 0.6;
          const ex = b.x + Math.cos(angle) * radius;
          const ey = b.y + Math.sin(angle) * radius;
          ctx.beginPath();
          ctx.moveTo(b.x, b.y);
          drawBolt(b.x, b.y, ex, ey, 22);
          ctx.stroke();
        }
        // Soft ring
        ctx.beginPath();
        ctx.strokeStyle = `rgba(180,140,255,${0.35 * alpha})`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 18;
        ctx.arc(b.x, b.y, radius * 0.9, 0, Math.PI * 2);
        ctx.stroke();
      }

      while (trail.length && now - trail[0].t > 600) trail.shift();

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
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
