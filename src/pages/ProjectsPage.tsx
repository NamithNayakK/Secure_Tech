import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { getProjects } from "../lib/content";
import { SITE_CONFIG } from "../config/site";

type Category = "All" | "Red Team" | "Blue Team" | "AI Security" | "Web Security" | "Digital Forensics" | "Network Security" | "Research";
const CATEGORIES: Category[] = ["All", "Red Team", "Blue Team", "AI Security", "Web Security", "Digital Forensics", "Network Security", "Research"];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Category>("All");
  const projects = getProjects();
  const filtered = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <main id="main-content" style={{ paddingTop: "var(--header-h)" }}>
      {/* Header */}
      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)", borderBottom: "1px solid rgba(232,238,245,0.06)" }}>
        <p className="section-number" style={{ marginBottom: "0.75rem" }}>PROJECTS & RESEARCH</p>
        <h1 className="font-display" style={{ fontSize: "var(--fs-hero)", lineHeight: 0.88 }}>
          INNOVATION THROUGH
          <br />
          <em className="font-accent-italic" style={{ color: "var(--c-cyan)", fontSize: "0.85em" }}>SECURITY</em>
          <br />
          RESEARCH.
        </h1>
      </section>

      {/* Notice */}
      <div style={{
        padding: "0.75rem clamp(1.5rem,5vw,4rem)",
        background: "rgba(255,90,54,0.04)",
        borderBottom: "1px solid rgba(255,90,54,0.12)",
      }}>
        <p style={{ color: "var(--c-alert)", fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)" }}>
          ⚠ Entries marked SAMPLE are illustrative placeholders. No project is attributed to real members until data is added.
        </p>
      </div>

      {/* Filter bar */}
      <div style={{
        padding: "1.5rem clamp(1.5rem,5vw,4rem)",
        borderBottom: "1px solid rgba(232,238,245,0.06)",
        display: "flex", gap: "0.5rem", flexWrap: "wrap",
      }} role="group" aria-label="Filter projects by category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            aria-pressed={filter === cat}
            className="btn"
            style={{
              padding: "0.35rem 0.875rem",
              background: filter === cat ? "var(--c-cyan)" : "transparent",
              color: filter === cat ? "var(--c-obsidian)" : "var(--c-muted)",
              border: `1px solid ${filter === cat ? "var(--c-cyan)" : "rgba(232,238,245,0.12)"}`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project list */}
      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)" }}>
        {filtered.length === 0 ? (
          <div style={{ border: "1px solid rgba(232,238,245,0.06)", padding: "4rem", textAlign: "center" }}>
            <p className="font-display" style={{ fontSize: "var(--fs-2xl)", color: "rgba(232,238,245,0.12)", marginBottom: "0.5rem" }}>
              NO PROJECTS
            </p>
            <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)" }}>
              No projects match this filter yet. Try another category.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {filtered.map((project, i) => (
              <div
                key={project.id}
                className="card-project"
                style={{ display: "grid", gridTemplateColumns: "48px 1fr auto", gap: "2rem", alignItems: "start" }}
              >
                {SITE_CONFIG.SHOW_SAMPLE_BADGES && project.isSample && (
                  <span className="sample-badge" style={{ gridColumn: "1/-1", marginBottom: "-0.75rem" }}>Sample</span>
                )}
                <span className="font-mono-label" style={{ color: "var(--c-muted)", paddingTop: "0.2em" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                    <span className="badge" style={{ background: "rgba(57,123,255,0.1)", color: "var(--c-blue)" }}>
                      {project.category}
                    </span>
                    <span className="badge" style={{ background: "rgba(232,238,245,0.05)", color: "var(--c-muted)" }}>
                      {project.status}
                    </span>
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="badge" style={{ background: "rgba(232,238,245,0.04)", color: "var(--c-muted)" }}>{tag}</span>
                    ))}
                  </div>
                  <h2 className="font-display" style={{ fontSize: "var(--fs-2xl)", lineHeight: 1, marginBottom: "0.75rem" }}>
                    {project.title}
                  </h2>
                  <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.6, maxWidth: "65ch" }}>
                    {project.description}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" }}>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: "var(--fs-xs)" }}>
                      GitHub <ExternalLink size={12} />
                    </a>
                  )}
                  <Link to={`/projects/${project.slug}`} className="btn btn-outline" style={{ padding: "0.35rem 0.875rem" }}>
                    Details <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
