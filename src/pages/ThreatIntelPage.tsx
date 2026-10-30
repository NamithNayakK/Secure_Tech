import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { getThreatArticles } from "../lib/content";
import { SITE_CONFIG } from "../config/site";

type Category = "All" | "Threat" | "CVE" | "Malware" | "Tool" | "Research" | "Attack" | "Defence";
const CATEGORIES: Category[] = ["All", "Threat", "CVE", "Malware", "Tool", "Research", "Attack", "Defence"];

const CATEGORY_DOTS: Record<string, string> = {
  Threat: "#FF5A36", CVE: "#397BFF", Malware: "#FF5A36",
  Tool: "#16C4D9", Research: "#397BFF", Attack: "#FF5A36", Defence: "#16C4D9",
};

export default function ThreatIntelPage() {
  const [filter, setFilter] = useState<Category>("All");
  const articles = getThreatArticles();
  const filtered = articles.filter((a) => filter === "All" || a.category === filter);

  return (
    <main id="main-content" style={{ paddingTop: "var(--header-h)" }}>
      {/* Header */}
      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)", borderBottom: "1px solid rgba(232,238,245,0.06)" }}>
        <p className="section-number" style={{ marginBottom: "0.75rem" }}>THREAT INTELLIGENCE WALL</p>
        <h1 className="font-display" style={{ fontSize: "var(--fs-hero)", lineHeight: 0.88, marginBottom: "1rem" }}>
          WHAT'S IN
          <br />
          <em className="font-accent-italic" style={{ color: "var(--c-cyan)", fontSize: "0.85em" }}>THE WILD.</em>
        </h1>
        <div style={{
          padding: "0.875rem 1.25rem",
          background: "rgba(57,123,255,0.06)",
          border: "1px solid rgba(57,123,255,0.15)",
          display: "inline-block",
          maxWidth: "60ch",
        }}>
          <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", lineHeight: 1.6 }}>
            ℹ This wall contains educational content only. Entries marked SAMPLE are illustrative. We do not claim live threat monitoring. CVE IDs are only used when linked to an official NVD or vendor advisory.
          </p>
        </div>
      </section>

      {/* Filter */}
      <div style={{
        padding: "1.5rem clamp(1.5rem,5vw,4rem)",
        borderBottom: "1px solid rgba(232,238,245,0.06)",
        display: "flex", gap: "0.5rem", flexWrap: "wrap",
      }} role="group" aria-label="Filter by category">
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

      {/* Articles grid */}
      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)" }}>
        {filtered.length === 0 ? (
          <p style={{ color: "var(--c-muted)" }}>No articles match this category.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1px", background: "rgba(232,238,245,0.06)" }}>
            {filtered.map((a) => {
              const dateStr = new Date(a.publicationDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
              return (
                <div key={a.id} className="card-threat" style={{ background: "var(--c-obsidian)" }}>
                  {SITE_CONFIG.SHOW_SAMPLE_BADGES && a.isSample && <span className="sample-badge" style={{ marginBottom: "0.75rem", display: "inline-block" }}>Sample</span>}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.875rem" }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: CATEGORY_DOTS[a.category] ?? "var(--c-cyan)",
                      display: "block", flexShrink: 0,
                    }} aria-hidden="true" />
                    <span className="font-mono-label" style={{ color: "var(--c-muted)" }}>
                      {a.category} · {dateStr}
                    </span>
                  </div>
                  <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "var(--fs-base)", lineHeight: 1.4, marginBottom: "0.625rem", color: "var(--c-text)" }}>
                    {a.title}
                  </h2>
                  <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-xs)", lineHeight: 1.6, marginBottom: "1rem" }}>
                    {a.summary}
                  </p>
                  {a.sourceUrl && (
                    <a
                      href={a.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--c-cyan)", fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "0.25rem" }}
                    >
                      {a.sourceName ?? "Source"} <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
