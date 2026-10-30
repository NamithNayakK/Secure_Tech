import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import CustomCursor from "./components/motion/CustomCursor";

// Lazy-load all pages
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CyberRangePage = lazy(() => import("./pages/CyberRangePage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ThreatIntelPage = lazy(() => import("./pages/ThreatIntelPage"));
const AchievementsPage = lazy(() => import("./pages/AchievementsPage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const JoinPage = lazy(() => import("./pages/JoinPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CodeOfConductPage = lazy(() => import("./pages/CodeOfConductPage"));
const ResponsibleUsePage = lazy(() => import("./pages/ResponsibleUsePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ minHeight: "100svh" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // Move focus to main heading on route change (accessibility)
  useEffect(() => {
    const main = document.getElementById("main-content");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus();
    }
  }, [pathname]);

  return null;
}

function AppShell() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navigation />
      <ScrollToTop />
      <Suspense fallback={
        <div style={{ minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p className="font-mono-label" style={{ color: "var(--c-muted)" }}>Loading…</p>
        </div>
      }>
        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/cyber-range" element={<CyberRangePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:slug" element={<EventsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectsPage />} />
            <Route path="/threat-intelligence" element={<ThreatIntelPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/code-of-conduct" element={<CodeOfConductPage />} />
            <Route path="/responsible-use" element={<ResponsibleUsePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageTransition>
      </Suspense>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <AppShell />
    </BrowserRouter>
  );
}
