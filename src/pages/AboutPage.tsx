import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "../config/site";
import { getDomains } from "../lib/content";

const OBJECTIVES = [
  "Conduct regular workshops, bootcamps and technical talks on cybersecurity topics.",
  "Participate in CTF competitions and security hackathons at state and national levels.",
  "Develop student-led security research projects and tools.",
  "Build awareness of responsible and ethical security practices across the college.",
  "Collaborate with faculty on cybersecurity curriculum and research initiatives.",
  "Create an inclusive environment for students from all technical backgrounds.",
];

const WHAT_WE_DO = [
  { title: "Hands-On Workshops", body: "Technical sessions covering tools and techniques — Burp Suite, Wireshark, Metasploit, Volatility — in authorised lab environments." },
  { title: "CTF Competitions", body: "Regular internal challenges and representation at external competitions including national-level CTFs and hackathons." },
  { title: "Security Research", body: "Student-led projects exploring real-world security problems, from phishing detection to network anomaly analysis." },
  { title: "Awareness Campaigns", body: "Campus-wide programmes educating peers about digital hygiene, safe browsing and social engineering threats." },
  { title: "Guest Lectures", body: "Sessions with security practitioners sharing real-world perspectives on careers and current threats." },
  { title: "Study Groups", body: "Peer-led learning circles organised by domain, from fundamentals through specialised paths." },
];

export default function AboutPage() {
  const domains = getDomains();

  return (
    <main id="main-content" style={{ paddingTop: "var(--header-h)" }}>
      {/* Header */}
      <section style={{
        padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)",
        borderBottom: "1px solid rgba(232,238,245,0.06)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4rem",
        alignItems: "end",
      }}>
        <div>
          <p className="section-number">ABOUT</p>
          <h1 className="font-display" style={{ fontSize: "var(--fs-hero)", lineHeight: 0.88, marginTop: "0.75rem" }}>
            WHO
            <br />
            <em className="font-accent-italic" style={{ color: "var(--c-cyan)", fontSize: "0.85em" }}>WE</em>
            <br />
            ARE.
          </h1>
        </div>
        <div>
          <p style={{ fontSize: "var(--fs-xl)", color: "var(--c-muted)", lineHeight: 1.6, maxWidth: "45ch" }}>
            Secure Tech Club is the cybersecurity student community of{" "}
            <a href={SITE_CONFIG.college.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--c-cyan)", textDecoration: "none" }}>
              {SITE_CONFIG.college.name}
            </a>
            . We are not a passive club. We build, break, analyse and learn.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section style={{ padding: "clamp(5rem,10vw,10rem) clamp(1.5rem,5vw,4rem)", borderBottom: "1px solid rgba(232,238,245,0.06)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
          <div>
            <p className="section-number" style={{ marginBottom: "1.5rem" }}>01 / VISION</p>
            <blockquote style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--fs-2xl)",
              fontWeight: 900,
              textTransform: "uppercase",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}>
              "To cultivate a technically skilled and security-conscious community that contributes to a safer digital ecosystem."
            </blockquote>
          </div>
          <div>
            <p className="section-number" style={{ marginBottom: "1.5rem" }}>02 / MISSION</p>
            <blockquote style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--fs-2xl)",
              fontWeight: 900,
              textTransform: "uppercase",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}>
              "To empower students through practical cybersecurity education, technical experimentation, collaborative research and real-world security challenges."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="section-bone" style={{ padding: "clamp(5rem,10vw,10rem) clamp(1.5rem,5vw,4rem)" }}>
        <p className="section-number" style={{ color: "rgba(11,18,32,0.45)", marginBottom: "1.5rem" }}>03 / OBJECTIVES</p>
        <h2 className="font-display" style={{ fontSize: "var(--fs-4xl)", lineHeight: 0.9, color: "var(--c-bone-text)", marginBottom: "3rem" }}>
          WHAT DRIVES
          <br />THE CLUB.
        </h2>
        <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem", listStyle: "none" }}>
          {OBJECTIVES.map((obj, i) => (
            <li key={i} style={{ borderTop: "1px solid rgba(11,18,32,0.1)", paddingTop: "1.25rem" }}>
              <span className="font-mono-label" style={{ color: "rgba(11,18,32,0.4)", display: "block", marginBottom: "0.5rem" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p style={{ color: "var(--c-bone-text)", fontSize: "var(--fs-sm)", lineHeight: 1.6 }}>{obj}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* What We Do */}
      <section style={{ padding: "clamp(5rem,10vw,10rem) clamp(1.5rem,5vw,4rem)", borderBottom: "1px solid rgba(232,238,245,0.06)" }}>
        <p className="section-number" style={{ marginBottom: "1.5rem" }}>04 / WHAT WE DO</p>
        <h2 className="font-display" style={{ fontSize: "var(--fs-4xl)", lineHeight: 0.9, marginBottom: "3rem" }}>
          HOW WE
          <br />OPERATE.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
          {WHAT_WE_DO.map((item, i) => (
            <div key={i} style={{ borderTop: "1px solid rgba(232,238,245,0.08)", paddingTop: "1.5rem" }}>
              <span className="font-mono-label" style={{ color: "var(--c-muted)", display: "block", marginBottom: "0.75rem" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-lg)", fontWeight: 900, textTransform: "uppercase", marginBottom: "0.625rem" }}>
                {item.title}
              </h3>
              <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.6 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Domains strip */}
      <section style={{ padding: "clamp(5rem,10vw,10rem) clamp(1.5rem,5vw,4rem)", borderBottom: "1px solid rgba(232,238,245,0.06)" }}>
        <p className="section-number" style={{ marginBottom: "1.5rem" }}>05 / DOMAINS</p>
        <h2 className="font-display" style={{ fontSize: "var(--fs-4xl)", lineHeight: 0.9, marginBottom: "3rem" }}>
          OUR EIGHT
          <br />SPECIALISATIONS.
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {domains.map((d) => (
            <span key={d.id} style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-xs)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              border: "1px solid rgba(22,196,217,0.25)",
              color: "var(--c-cyan)",
              padding: "0.4em 0.9em",
              borderRadius: 2,
            }}>
              {d.name}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "clamp(5rem,10vw,10rem) clamp(1.5rem,5vw,4rem)", textAlign: "center" }}>
        <h2 className="font-display" style={{ fontSize: "var(--fs-4xl)", lineHeight: 0.9, marginBottom: "2rem" }}>
          READY TO JOIN?
        </h2>
        <Link to="/join" className="btn btn-primary">
          Apply Now <ArrowRight size={14} />
        </Link>
      </section>
    </main>
  );
}
