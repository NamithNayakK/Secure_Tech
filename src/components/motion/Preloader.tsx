import { useEffect, useRef, useState } from "react";
import { SITE_CONFIG } from "../../config/site";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const SESSION_KEY = "secure-tech-preloader-shown";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const reducedMotion = useReducedMotion();
  const barRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Skip on reduced-motion or returning visitors
    if (reducedMotion || sessionStorage.getItem(SESSION_KEY)) {
      onComplete();
      return;
    }

    let start: number | null = null;
    const duration = 1600; // ms
    let raf: number;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const pct = Math.round(eased * 100);
      setCounter(pct);
      if (barRef.current) {
        barRef.current.style.width = `${pct}%`;
      }
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        // Exit
        sessionStorage.setItem(SESSION_KEY, "1");
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 200);
      }
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [onComplete, reducedMotion]);

  if (!visible) return null;

  return (
    <div className="preloader" aria-hidden="true" aria-live="off">
      <div className="preloader__wordmark">
        <span style={{ display: "block", overflow: "hidden" }}>
          {SITE_CONFIG.shortName}
        </span>
      </div>
      <p className="preloader__counter font-mono-label">{counter.toString().padStart(3, "0")}</p>
      <div className="preloader__bar">
        <div className="preloader__bar-fill" ref={barRef} />
      </div>
      <p className="font-mono-label" style={{ color: "var(--c-muted)", marginTop: "0.5rem" }}>
        THE CYBER RANGE
      </p>
    </div>
  );
}
