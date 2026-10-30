import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getEvents } from "../lib/content";
import { SITE_CONFIG } from "../config/site";

type Category = "All" | "Workshop" | "CTF" | "Hackathon" | "Talk" | "Awareness" | "Bootcamp";
const CATEGORIES: Category[] = ["All", "Workshop", "CTF", "Hackathon", "Talk", "Awareness", "Bootcamp"];

export default function EventsPage() {
  const [filter, setFilter] = useState<Category>("All");
  const events = getEvents();

  const filtered = events.filter((e) => filter === "All" || e.category === filter);
  const upcoming = filtered.filter((e) => e.status === "upcoming");
  const past = filtered.filter((e) => e.status === "completed");

  return (
    <main id="main-content" style={{ paddingTop: "var(--header-h)" }}>
      {/* Header */}
      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)", borderBottom: "1px solid rgba(232,238,245,0.06)" }}>
        <p className="section-number" style={{ marginBottom: "0.75rem" }}>EVENTS</p>
        <h1 className="font-display" style={{ fontSize: "var(--fs-hero)", lineHeight: 0.88 }}>
          WHAT'S
          <br />
          <em className="font-accent-italic" style={{ color: "var(--c-cyan)", fontSize: "0.85em" }}>ON.</em>
        </h1>
      </section>

      {/* Filter bar */}
      <div style={{
        padding: "1.5rem clamp(1.5rem,5vw,4rem)",
        borderBottom: "1px solid rgba(232,238,245,0.06)",
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
      }} role="group" aria-label="Filter events by category">
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
              borderRadius: 2,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Upcoming */}
      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)", borderBottom: "1px solid rgba(232,238,245,0.06)" }} aria-label="Upcoming events">
        <p className="font-mono-label" style={{ color: "var(--c-cyan)", marginBottom: "2rem" }}>
          Upcoming ({upcoming.length})
        </p>
        {upcoming.length === 0 ? (
          <div style={{ border: "1px solid rgba(232,238,245,0.06)", padding: "3rem", textAlign: "center" }}>
            <p className="font-display" style={{ fontSize: "var(--fs-2xl)", color: "rgba(232,238,245,0.12)", marginBottom: "0.5rem" }}>
              NOTHING SCHEDULED
            </p>
            <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)" }}>
              No upcoming events match this filter. Check back soon.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", background: "rgba(232,238,245,0.06)" }}>
            {upcoming.map((e) => {
              const dateStr = new Date(e.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
              return (
                <div key={e.id} className="card-event" style={{ background: "var(--c-obsidian)" }}>
                  {SITE_CONFIG.SHOW_SAMPLE_BADGES && e.isSample && <span className="sample-badge">Sample</span>}
                  <p className="font-mono-label" style={{ color: "var(--c-cyan)", marginBottom: "0.5rem" }}>
                    {e.category} · {dateStr}
                  </p>
                  <h2 className="font-display" style={{ fontSize: "var(--fs-xl)", lineHeight: 1, marginBottom: "0.625rem" }}>
                    {e.title}
                  </h2>
                  <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.6, marginBottom: "1rem" }}>{e.description}</p>
                  <p className="font-mono-label" style={{ color: "var(--c-muted)", marginBottom: "1rem" }}>📍 {e.venue}</p>
                  {e.registrationLink && (
                    <a href={e.registrationLink} className="btn btn-primary" style={{ padding: "0.4rem 0.875rem", display: "inline-flex" }}>
                      Register <ArrowRight size={12} />
                    </a>
                  )}
                  <Link to={`/events/${e.slug}`} className="btn btn-outline" style={{ padding: "0.4rem 0.875rem", marginLeft: e.registrationLink ? "0.5rem" : 0 }}>
                    Details
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Past */}
      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)" }} aria-label="Past events">
        <p className="font-mono-label" style={{ color: "var(--c-muted)", marginBottom: "2rem" }}>
          Past ({past.length})
        </p>
        {past.length === 0 ? (
          <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)" }}>No past events match this filter.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {past.map((e) => {
              const dateStr = new Date(e.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
              return (
                <div key={e.id} className="card-project" style={{ display: "grid", gridTemplateColumns: "200px 1fr auto", gap: "2rem", alignItems: "start" }}>
                  {SITE_CONFIG.SHOW_SAMPLE_BADGES && e.isSample && (
                    <span className="sample-badge" style={{ gridColumn: "1/-1", marginBottom: "-1rem" }}>Sample</span>
                  )}
                  <div>
                    <p className="font-mono-label" style={{ color: "var(--c-muted)" }}>{dateStr}</p>
                    <p className="font-mono-label" style={{ color: "var(--c-muted)", marginTop: "0.25rem" }}>{e.category}</p>
                  </div>
                  <div>
                    <h2 className="font-display" style={{ fontSize: "var(--fs-xl)", lineHeight: 1, marginBottom: "0.5rem" }}>{e.title}</h2>
                    <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.6 }}>{e.description}</p>
                  </div>
                  <Link to={`/events/${e.slug}`} className="btn btn-ghost" style={{ fontSize: "var(--fs-xs)", whiteSpace: "nowrap" }}>
                    View recap <ArrowRight size={12} />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
