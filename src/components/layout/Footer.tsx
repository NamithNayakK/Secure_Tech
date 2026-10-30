import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Instagram, Linkedin, Github, Twitter } from "../common/BrandIcons";
import { SITE_CONFIG } from "../../config/site";

const QUICK_LINKS = [
  { label: "About", to: "/about" },
  { label: "Cyber Range", to: "/cyber-range" },
  { label: "Events", to: "/events" },
  { label: "Projects", to: "/projects" },
  { label: "Achievements", to: "/achievements" },
  { label: "Our Team", to: "/team" },
  { label: "Join Us", to: "/join" },
  { label: "Code of Conduct", to: "/code-of-conduct" },
  { label: "Contact", to: "/contact" },
];

const SOCIALS = [
  { icon: Instagram, href: SITE_CONFIG.contact.instagram, label: "Instagram" },
  { icon: Linkedin, href: SITE_CONFIG.contact.linkedin, label: "LinkedIn" },
  { icon: Github, href: SITE_CONFIG.contact.github, label: "GitHub" },
  { icon: Twitter, href: SITE_CONFIG.contact.twitter, label: "Twitter/X" },
];

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(232,238,245,0.06)",
        paddingTop: "4rem",
        paddingBottom: "2rem",
        paddingLeft: "clamp(1.5rem, 5vw, 4rem)",
        paddingRight: "clamp(1.5rem, 5vw, 4rem)",
        marginTop: "auto",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "3rem", marginBottom: "3rem" }}>
        {/* Brand column */}
        <div style={{ gridColumn: "span 2" }}>
          <Link to="/" className="nav__logo" style={{ marginBottom: "1rem", display: "inline-flex", fontSize: "2rem" }}>
            <span>Secure</span> <span className="nav__logo-accent">Tech</span>
          </Link>
          <p className="font-mono-label" style={{ color: "var(--c-muted)", marginBottom: "0.5rem" }}>
            {SITE_CONFIG.concept}
          </p>
          <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", maxWidth: "36ch", lineHeight: "1.6" }}>
            The cybersecurity student community of {SITE_CONFIG.college.name}, {SITE_CONFIG.college.city}.{" "}
            {SITE_CONFIG.tagline}
          </p>

          {/* Socials */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{ color: "var(--c-muted)", transition: "color 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--c-cyan)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--c-muted)"; }}
              >
                <Icon size={18} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <p className="font-mono-label" style={{ color: "var(--c-muted)", marginBottom: "1.25rem" }}>
            Quick Links
          </p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  style={{ color: "var(--c-muted)", textDecoration: "none", fontSize: "var(--fs-sm)", transition: "color 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--c-text)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--c-muted)"; }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact / College */}
        <div>
          <p className="font-mono-label" style={{ color: "var(--c-muted)", marginBottom: "1.25rem" }}>
            Contact
          </p>
          <a
            href={`mailto:${SITE_CONFIG.contact.email}`}
            style={{ color: "var(--c-text)", textDecoration: "none", fontSize: "var(--fs-sm)", display: "block", marginBottom: "1rem" }}
          >
            {SITE_CONFIG.contact.email}
          </a>
          <a
            href={SITE_CONFIG.college.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--c-cyan)", textDecoration: "none", fontSize: "var(--fs-sm)", display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            {SITE_CONFIG.college.name}
            <ExternalLink size={12} strokeWidth={1.5} />
          </a>
          <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-xs)", marginTop: "0.25rem" }}>
            {SITE_CONFIG.college.city}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "0.75rem",
        paddingTop: "1.5rem",
        borderTop: "1px solid rgba(232,238,245,0.06)",
      }}>
        <p className="font-mono-label" style={{ color: "var(--c-muted)" }}>
          © {CURRENT_YEAR} {SITE_CONFIG.clubName} · {SITE_CONFIG.college.shortName}
        </p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link to="/code-of-conduct" className="font-mono-label" style={{ color: "var(--c-muted)", textDecoration: "none" }}>
            Code of Conduct
          </Link>
          <Link to="/responsible-use" className="font-mono-label" style={{ color: "var(--c-muted)", textDecoration: "none" }}>
            Responsible Use
          </Link>
        </div>
      </div>
    </footer>
  );
}
