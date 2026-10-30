import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Only on fine pointer devices
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let raf: number;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", move);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Context classes
    const addHover = () => ring.classList.add("is-hover");
    const removeHover = () => ring.classList.remove("is-hover");
    const addDrag = () => ring.classList.add("is-drag");
    const removeDrag = () => ring.classList.remove("is-drag");

    document.querySelectorAll("a, button, [role='button'], [tabindex='0']").forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    const obs = new MutationObserver(() => {
      document.querySelectorAll("a, button, [role='button'], [tabindex='0']").forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    });
    obs.observe(document.body, { subtree: true, childList: true });

    document.addEventListener("mousedown", addDrag);
    document.addEventListener("mouseup", removeDrag);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mousedown", addDrag);
      document.removeEventListener("mouseup", removeDrag);
      obs.disconnect();
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
