import { useEffect } from "react";

/**
 * Global UX effects:
 * - Click ripple coordinates for any element with class "ripple"
 * - Adds "is-visible" to ".reveal" elements as they enter the viewport
 * - Auto-tags common scroll targets (sections, cards) with .reveal
 */
export function InteractionEffects() {
  useEffect(() => {
    // Ripple position
    const onPointerDown = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(".ripple");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--ripple-x", `${e.clientX - rect.left}px`);
      target.style.setProperty("--ripple-y", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("pointerdown", onPointerDown);

    // Scroll reveal
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    const observe = () => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)").forEach((el) => {
        io.observe(el);
      });
    };
    observe();

    // Re-scan on route changes (DOM mutations)
    const mo = new MutationObserver(() => observe());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
