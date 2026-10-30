import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useNavScroll } from "../../hooks/useNavScroll";
import { SITE_CONFIG } from "../../config/site";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Cyber Range", to: "/cyber-range" },
  { label: "Events", to: "/events" },
  { label: "Projects", to: "/projects" },
  { label: "Achievements", to: "/achievements" },
  { label: "Our Team", to: "/team" },
  { label: "Join Us", to: "/join" },
];

const menuVariants = {
  closed: { opacity: 0, transition: { duration: 0.3 } },
  open: { opacity: 1, transition: { duration: 0.3 } },
};

const linkVariants = {
  closed: { y: "110%", opacity: 0 },
  open: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function Navigation() {
  const { isScrolled, isHidden } = useNavScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <nav
        className={`nav ${isScrolled ? "is-scrolled" : ""} ${isHidden && !menuOpen ? "is-hidden" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <Link to="/" className="nav__logo" onClick={() => setMenuOpen(false)}>
          <span>Secure</span> <span className="nav__logo-accent">Tech</span>
        </Link>

        <ul className="nav__links" role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `nav__link ${isActive ? "active" : ""}`
                }
                end={item.to === "/"}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className={`nav__menu-btn ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-controls="menu-overlay"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="menu-overlay"
            ref={overlayRef}
            className="menu-overlay is-open"
            role="dialog"
            aria-label="Navigation menu"
            aria-modal="true"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <ul className="menu-overlay__links" role="list">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.to} style={{ overflow: "hidden" }}>
                  <motion.div
                    custom={i}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    exit={{ y: "110%", opacity: 0, transition: { duration: 0.3 } }}
                  >
                    <Link
                      to={item.to}
                      className="menu-overlay__link"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>

            <motion.div
              className="menu-overlay__footer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.4 } }}
              exit={{ opacity: 0 }}
            >
              <span className="font-mono-label" style={{ color: "var(--c-muted)" }}>
                {SITE_CONFIG.college.name}
              </span>
              <a
                href={SITE_CONFIG.college.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-label"
                style={{ color: "var(--c-cyan)", marginLeft: "auto" }}
              >
                gat.ac.in ↗
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
