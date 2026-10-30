import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ArrowRight, ExternalLink } from "lucide-react";
import NetworkTopology from "../components/sections/NetworkTopology";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { SITE_CONFIG } from "../config/site";
import { getDomains, getStatistics, getFeaturedProjects, getEvents, getThreatArticles } from "../lib/content";
import { EVENTS } from "../data/events";

// ── Marquee items ────────────────────────────────────────────
const MARQUEE_ITEMS = [
  "Ethical Hacking", "●", "Web Security", "●", "Digital Forensics",
  "●", "Cloud Security", "●", "AI Security", "●", "Network Security",
  "●", "Malware Analysis", "●", "Security Operations",
];

// ── Stat counter component ────────────────────────────────────
function StatCounter({ value, label, suffix }: { value: number | null; label: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(
    value === null ? "—" : reducedMotion ? value.toString() : "0"
  );

  useEffect(() => {
    if (value === null || reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          gsap.to({ val: 0 }, {
            val: value,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: function () {
              setDisplayed(Math.round((this as any).targets()[0].val).toString());
            },
          });
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, reducedMotion]);

  return (
    <div style={{ borderTop: "1px solid rgba(232,238,245,0.08)", paddingTop: "1.5rem" }}>
      <span ref={ref} className={`stat-value ${value === null ? "stat-placeholder" : ""}`}>
        {displayed}{suffix && value !== null ? suffix : ""}
      </span>
      <p className="font-mono-label" style={{ color: "var(--c-muted)", marginTop: "0.5rem" }}>{label}</p>
    </div>
  );
}

// ── Domain glyph card ────────────────────────────────────────
function DomainCard({ domain, index }: { domain: ReturnType<typeof getDomains>[0]; index: number }) {
  return (
    <div className="card-domain" style={{ animationDelay: `${index * 0.08}s` }}>
      <div style={{ marginBottom: "1rem" }}>
        <svg
          width="32" height="32" viewBox="0 0 24 24"
          fill="none" stroke="currentColor"
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: "var(--c-cyan)" }}
          aria-hidden="true"
        >
          <path d={domain.glyph} />
        </svg>
      </div>
      <p className="font-mono-label" style={{ color: "var(--c-cyan)", marginBottom: "0.5rem" }}>
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--fs-lg)", lineHeight: 1.1, textTransform: "uppercase", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>
        {domain.name}
      </h3>
      <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.6 }}>
        {domain.description}
      </p>
    </div>
  );
}

// ── Event card ───────────────────────────────────────────────
function EventCard({ event }: { event: ReturnType<typeof getEvents>[0] }) {
  const dateStr = new Date(event.date).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
  return (
    <div className="card-event" style={{ borderRadius: 0 }}>
      {SITE_CONFIG.SHOW_SAMPLE_BADGES && event.isSample && (
        <span className="sample-badge">Sample</span>
      )}
      <p className="font-mono-label" style={{ color: "var(--c-cyan)", marginBottom: "0.75rem" }}>
        {event.category} · {dateStr}
      </p>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-xl)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 1.1, marginBottom: "0.75rem" }}>
        {event.title}
      </h3>
      <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
        {event.description}
      </p>
      <p className="font-mono-label" style={{ color: "var(--c-muted)" }}>
        📍 {event.venue}
      </p>
      <div style={{ marginTop: "1.25rem" }}>
        <Link to={`/events/${event.slug}`} className="btn btn-outline" style={{ padding: "0.5rem 1rem" }}>
          Details <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}

// ── Threat preview card ──────────────────────────────────────
function ThreatCard({ article }: { article: ReturnType<typeof getThreatArticles>[0] }) {
  const dateStr = new Date(article.publicationDate).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
  const categoryColors: Record<string, string> = {
    Threat: "#FF5A36", CVE: "#397BFF", Malware: "#FF5A36",
    Tool: "#16C4D9", Research: "#397BFF", Attack: "#FF5A36", Defence: "#16C4D9",
  };
  return (
    <div className="card-threat" style={{ borderRadius: 0 }}>
      {SITE_CONFIG.SHOW_SAMPLE_BADGES && article.isSample && (
        <span className="sample-badge">Sample</span>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <span style={{
          width: 6, height: 6, borderRadius: "50%",
          background: categoryColors[article.category] ?? "var(--c-cyan)",
          display: "block", flexShrink: 0,
        }} aria-hidden="true" />
        <span className="font-mono-label" style={{ color: "var(--c-muted)" }}>
          {article.category} · {dateStr}
        </span>
      </div>
      <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "var(--fs-sm)", lineHeight: 1.4, marginBottom: "0.5rem" }}>
        {article.title}
      </h3>
      <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-xs)", lineHeight: 1.6 }}>
        {article.summary.slice(0, 120)}…
      </p>
    </div>
  );
}

// ── Main Home page ───────────────────────────────────────────
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const domains = getDomains();
  const stats = getStatistics();
  const featuredProjects = getFeaturedProjects();
  const upcomingEvents = EVENTS.filter((e) => e.status === "upcoming").slice(0, 3);
  const pastEvents = EVENTS.filter((e) => e.status === "completed").slice(0, 2);
  const threatPreviews = getThreatArticles().slice(0, 3);

  // Hero entrance animation
  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-line",
        { y: "25%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.08, duration: 0.8, ease: "power2.out" }
      );
      gsap.fromTo(
        ".hero-support",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.25 }
      );
      gsap.fromTo(
        ".hero-ctas",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.4 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <main id="main-content">
      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          minHeight: "100svh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          position: "relative",
          borderBottom: "1px solid rgba(232,238,245,0.06)",
          paddingTop: "var(--header-h)",
        }}
        aria-label="Hero"
      >
        {/* Left — Headline */}
        <div
          className="hero-headline-wrap"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "clamp(2rem,6vw,5rem) clamp(1.5rem,5vw,4rem)",
            borderRight: "1px solid rgba(232,238,245,0.06)",
          }}
        >
          <p className="font-mono-label blink-cursor" style={{ color: "var(--c-cyan)", marginBottom: "2rem" }}>
            01 / SECURE TECH CLUB
          </p>
          <h1 className="font-display" style={{ fontSize: "var(--fs-hero)", lineHeight: 0.88, letterSpacing: "-0.02em", overflow: "hidden" }}>
            {SITE_CONFIG.heroHeadline.map((line, i) => (
              <span key={i} className="reveal-line" style={{ display: "block" }}>
                <span className="hero-line" style={{ display: "block" }}>
                  {i === 1 ? (
                    <em className="font-accent-italic" style={{ color: "var(--c-cyan)", fontSize: "0.85em" }}>
                      {line}
                    </em>
                  ) : line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="hero-support"
            style={{
              color: "var(--c-muted)",
              fontSize: "var(--fs-lg)",
              maxWidth: "42ch",
              lineHeight: 1.6,
              marginTop: "2rem",
            }}
          >
            {SITE_CONFIG.heroSupport}
          </p>

          <div
            className="hero-ctas"
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginTop: "2.5rem",
            }}
          >
            <Link to="/cyber-range" className="btn btn-primary">
              Explore Cyber Range <ArrowRight size={14} />
            </Link>
            <Link to="/join" className="btn btn-outline">
              Join the Club
            </Link>
          </div>
        </div>

        {/* Right — Network Topology */}
        <div style={{ position: "relative", minHeight: "clamp(320px, 50vw, 700px)" }}>
          <NetworkTopology />
          <p className="font-mono-label" style={{
            position: "absolute", bottom: "1.5rem", right: "1.5rem",
            color: "var(--c-muted)",
          }}>
            Click a node to explore →
          </p>
        </div>

        {/* Bottom label strip */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.75rem clamp(1.5rem,5vw,4rem)",
          borderTop: "1px solid rgba(232,238,245,0.06)",
        }}>
          <span className="font-mono-label" style={{ color: "var(--c-muted)" }}>
            {SITE_CONFIG.college.name} · {SITE_CONFIG.college.city}
          </span>
          <span className="font-mono-label" style={{ color: "var(--c-muted)" }}>
            {SITE_CONFIG.tagline}
          </span>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────── */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__inner">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className={`marquee__item ${item === "●" ? "marquee__item--accent" : ""}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── INTRO: LEARN / EXPLORE / BUILD ────────────────── */}
      <section
        className="reveal-section"
        style={{
          padding: "clamp(3.5rem, 6vw, 5.5rem) clamp(1.5rem, 5vw, 4rem)",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "4rem",
          alignItems: "start",
          borderBottom: "1px solid rgba(232,238,245,0.06)",
        }}
        aria-label="About section"
      >
        <div>
          <p className="section-number">02 / ABOUT</p>
          <div style={{ marginTop: "1.5rem", borderTop: "1px solid rgba(232,238,245,0.06)", paddingTop: "1.5rem" }}>
            <p className="font-mono-label" style={{ color: "var(--c-muted)", lineHeight: 1.8 }}>
              Est. at Global Academy of Technology
            </p>
          </div>
        </div>
        <div>
          <h2 className="font-display" style={{ fontSize: "var(--fs-4xl)", lineHeight: 0.9, marginBottom: "3rem" }}>
            BEYOND THE ORDINARY.{" "}
            <em className="font-accent-italic" style={{ color: "var(--c-cyan)", fontSize: "0.85em" }}>
              INTO
            </em>{" "}
            CYBERSECURITY.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem" }}>
            {[
              {
                label: "LEARN",
                num: "01",
                body: "Structured paths from fundamentals to advanced specialisations. No prerequisites — just curiosity.",
              },
              {
                label: "EXPLORE",
                num: "02",
                body: "The Cyber Range gives you hands-on challenges, real tools and a safe space to experiment.",
              },
              {
                label: "BUILD",
                num: "03",
                body: "Ship research projects, contribute to open source and compete in CTF teams.",
              },
            ].map((item) => (
              <div key={item.label} style={{ borderTop: "1px solid rgba(232,238,245,0.08)", paddingTop: "1.5rem" }}>
                <p className="font-mono-label" style={{ color: "var(--c-muted)", marginBottom: "0.75rem" }}>
                  {item.num}
                </p>
                <p className="font-display" style={{ fontSize: "var(--fs-2xl)", marginBottom: "0.75rem" }}>
                  {item.label}
                </p>
                <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.6 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOMAINS ───────────────────────────────────────── */}
      <section
        className="reveal-section"
        style={{ padding: "clamp(3.5rem, 6vw, 5.5rem) clamp(1.5rem, 5vw, 4rem)", borderBottom: "1px solid rgba(232,238,245,0.06)" }}
        aria-label="Security domains"
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="section-number">03 / DOMAINS</p>
            <h2 className="font-display" style={{ fontSize: "var(--fs-4xl)", lineHeight: 0.9, marginTop: "0.75rem" }}>
              EIGHT DOMAINS.
              <br />
              <em className="font-accent-italic" style={{ color: "var(--c-cyan)", fontSize: "0.85em" }}>ONE</em>{" "}
              COMMUNITY.
            </h2>
          </div>
          <Link to="/cyber-range" className="btn btn-outline">
            Explore the Range <ArrowRight size={14} />
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1px", background: "rgba(232,238,245,0.06)" }}>
          {domains.map((domain, i) => (
            <div key={domain.id} style={{ background: "var(--c-obsidian)" }}>
              <DomainCard domain={domain} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ── STATISTICS ────────────────────────────────────── */}
      <section
        className="reveal-section section-bone"
        style={{ padding: "clamp(3.5rem, 6vw, 5.5rem) clamp(1.5rem, 5vw, 4rem)" }}
        aria-label="Club statistics"
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="section-number">04 / BY THE NUMBERS</p>
            <h2 className="font-display" style={{ fontSize: "var(--fs-4xl)", lineHeight: 0.9, marginTop: "0.75rem", color: "var(--c-bone-text)" }}>
              THE CLUB
              <br />IN NUMBERS.
            </h2>
          </div>
          <p style={{ color: "rgba(11,18,32,0.5)", fontSize: "var(--fs-sm)", maxWidth: "32ch", lineHeight: 1.5 }}>
            Figures marked "—" will be updated once verified data is available.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "2rem" }}>
          {stats.map((s) => (
            <StatCounter key={s.label} value={s.value} label={s.label} suffix={s.suffix} />
          ))}
        </div>
      </section>

      {/* ── EVENTS ────────────────────────────────────────── */}
      <section
        className="reveal-section"
        style={{ padding: "clamp(3.5rem, 6vw, 5.5rem) clamp(1.5rem, 5vw, 4rem)", borderBottom: "1px solid rgba(232,238,245,0.06)" }}
        aria-label="Events"
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="section-number">05 / EVENTS</p>
            <h2 className="font-display" style={{ fontSize: "var(--fs-4xl)", lineHeight: 0.9, marginTop: "0.75rem" }}>
              WHAT'S
              <br />HAPPENING.
            </h2>
          </div>
          <Link to="/events" className="btn btn-outline">
            All events <ArrowRight size={14} />
          </Link>
        </div>

        {upcomingEvents.length > 0 && (
          <>
            <p className="font-mono-label" style={{ color: "var(--c-cyan)", marginBottom: "1.5rem" }}>Upcoming</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", background: "rgba(232,238,245,0.06)", marginBottom: "3rem" }}>
              {upcomingEvents.map((e) => (
                <div key={e.id} style={{ background: "var(--c-obsidian)" }}>
                  <EventCard event={e} />
                </div>
              ))}
            </div>
          </>
        )}

        {upcomingEvents.length === 0 && (
          <div style={{
            border: "1px solid rgba(232,238,245,0.08)",
            padding: "3rem",
            textAlign: "center",
            marginBottom: "3rem",
          }}>
            <p className="font-display" style={{ fontSize: "var(--fs-2xl)", color: "rgba(232,238,245,0.15)", marginBottom: "0.75rem" }}>
              NO UPCOMING EVENTS
            </p>
            <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)" }}>
              Check back soon or follow us on social media for announcements.
            </p>
          </div>
        )}

        {pastEvents.length > 0 && (
          <>
            <p className="font-mono-label" style={{ color: "var(--c-muted)", marginBottom: "1.5rem" }}>Recently Completed</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", background: "rgba(232,238,245,0.06)" }}>
              {pastEvents.map((e) => (
                <div key={e.id} style={{ background: "var(--c-obsidian)" }}>
                  <EventCard event={e} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* ── FEATURED PROJECTS ─────────────────────────────── */}
      <section
        className="reveal-section"
        style={{ padding: "clamp(3.5rem, 6vw, 5.5rem) clamp(1.5rem, 5vw, 4rem)", borderBottom: "1px solid rgba(232,238,245,0.06)" }}
        aria-label="Featured projects"
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="section-number">06 / PROJECTS</p>
            <h2 className="font-display" style={{ fontSize: "var(--fs-4xl)", lineHeight: 0.9, marginTop: "0.75rem" }}>
              WHAT WE'RE
              <br />BUILDING.
            </h2>
          </div>
          <Link to="/projects" className="btn btn-outline">
            All projects <ArrowRight size={14} />
          </Link>
        </div>

        {featuredProjects.map((project, i) => (
          <div
            key={project.id}
            className="card-project"
            style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "2rem", alignItems: "start" }}
          >
            {SITE_CONFIG.SHOW_SAMPLE_BADGES && project.isSample && (
              <span className="sample-badge" style={{ gridColumn: "1/-1", marginBottom: "-1rem" }}>Sample</span>
            )}
            <span className="font-mono-label" style={{ color: "var(--c-muted)", paddingTop: "0.2em" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                <span className="badge badge-beginner" style={{ background: "rgba(57,123,255,0.1)", color: "var(--c-blue)" }}>
                  {project.category}
                </span>
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="badge" style={{ background: "rgba(232,238,245,0.05)", color: "var(--c-muted)" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-display" style={{ fontSize: "var(--fs-2xl)", lineHeight: 1, marginBottom: "0.75rem" }}>
                {project.title}
              </h3>
              <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.6, maxWidth: "60ch" }}>
                {project.description}
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexDirection: "column", alignItems: "flex-end" }}>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: "var(--fs-xs)" }}>
                  GitHub <ExternalLink size={12} />
                </a>
              )}
              <Link to={`/projects/${project.slug}`} className="btn btn-outline" style={{ padding: "0.4rem 0.875rem" }}>
                Details
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* ── THREAT INTELLIGENCE WALL PREVIEW ──────────────── */}
      <section
        className="reveal-section section-bone"
        style={{ padding: "clamp(3.5rem, 6vw, 5.5rem) clamp(1.5rem, 5vw, 4rem)" }}
        aria-label="Threat intelligence preview"
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="section-number" style={{ color: "rgba(11,18,32,0.45)" }}>07 / THREAT INTEL</p>
            <h2 className="font-display" style={{ fontSize: "var(--fs-4xl)", lineHeight: 0.9, marginTop: "0.75rem", color: "var(--c-bone-text)" }}>
              WHAT'S IN
              <br />THE WILD.
            </h2>
          </div>
          <Link to="/threat-intelligence" className="btn btn-outline" style={{ borderColor: "rgba(11,18,32,0.15)", color: "var(--c-bone-text)" }}>
            Full wall <ArrowRight size={14} />
          </Link>
        </div>
        <p style={{ color: "rgba(11,18,32,0.5)", fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", marginBottom: "2rem" }}>
          ⚠ Educational content only. Entries are clearly marked as sample or sourced.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "rgba(11,18,32,0.08)" }}>
          {threatPreviews.map((a) => (
            <div key={a.id} style={{ background: "var(--c-bone)" }}>
              <ThreatCard article={a} />
            </div>
          ))}
        </div>
      </section>

      {/* ── CLOSING CTA ───────────────────────────────────── */}
      <section
        className="reveal-section"
        style={{
          padding: "clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)",
          borderTop: "1px solid rgba(232,238,245,0.06)",
          textAlign: "center",
        }}
        aria-label="Call to action"
      >
        <p className="section-number" style={{ marginBottom: "1.5rem" }}>08 / JOIN</p>
        <h2 className="font-display" style={{ fontSize: "var(--fs-hero)", lineHeight: 0.88, marginBottom: "2rem" }}>
          YOUR CYBER­SECURITY
          <br />
          <em className="font-accent-italic" style={{ color: "var(--c-cyan)", fontSize: "0.85em" }}>JOURNEY</em>
          <br />
          STARTS HERE.
        </h2>
        <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-lg)", maxWidth: "50ch", margin: "0 auto 3rem", lineHeight: 1.6 }}>
          Explore. Experiment. Collaborate. Become part of a community shaping a more secure digital world.
        </p>
        <Link to="/join" className="btn btn-primary" style={{ fontSize: "var(--fs-sm)", padding: "1rem 2.5rem" }}>
          Become a Member <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  );
}
