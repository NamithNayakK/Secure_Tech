import { useState, useEffect, useRef } from "react";

export function useNavScroll() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);
      setIsHidden(y > lastY.current && y > 100);
      lastY.current = y;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return { isScrolled, isHidden };
}
