import { Link } from "react-router-dom";
import { SITE_CONFIG } from "../config/site";

export default function ContactPage() {
  return (
    <main id="main-content" style={{ paddingTop: "var(--header-h)" }}>
      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)", borderBottom: "1px solid rgba(232,238,245,0.06)" }}>
        <p className="section-number" style={{ marginBottom: "0.75rem" }}>CONTACT</p>
        <h1 className="font-display" style={{ fontSize: "var(--fs-hero)", lineHeight: 0.88, marginBottom: "2rem" }}>
          GET IN
          <br />
          <em className="font-accent-italic" style={{ color: "var(--c-cyan)", fontSize: "0.85em" }}>TOUCH.</em>
        </h1>
      </section>
      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
          <div>
            <p className="font-mono-label" style={{ color: "var(--c-muted)", marginBottom: "1.5rem" }}>Email Us</p>
            <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{
              fontFamily: "var(--font-display)", fontSize: "var(--fs-2xl)", fontWeight: 900,
              textTransform: "uppercase", color: "var(--c-cyan)", textDecoration: "none", letterSpacing: "-0.01em",
            }}>
              {SITE_CONFIG.contact.email}
            </a>
          </div>
          <div>
            <p className="font-mono-label" style={{ color: "var(--c-muted)", marginBottom: "1.5rem" }}>Our College</p>
            <a href={SITE_CONFIG.college.url} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "var(--font-display)", fontSize: "var(--fs-2xl)", fontWeight: 900,
              textTransform: "uppercase", color: "var(--c-text)", textDecoration: "none", letterSpacing: "-0.01em",
            }}>
              {SITE_CONFIG.college.name}
            </a>
            <p style={{ color: "var(--c-muted)", marginTop: "0.25rem", fontSize: "var(--fs-sm)" }}>{SITE_CONFIG.college.city}</p>
          </div>
        </div>
        <div style={{ marginTop: "4rem" }}>
          <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", marginBottom: "1.5rem" }}>
            For membership enquiries, please use the form on our{" "}
            <Link to="/join" style={{ color: "var(--c-cyan)" }}>Join Us</Link> page.
          </p>
        </div>
      </section>
    </main>
  );
}
