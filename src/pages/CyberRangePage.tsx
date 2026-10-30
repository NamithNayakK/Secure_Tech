import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, ChevronDown } from "lucide-react";
import { getChallenges, getLearningPaths, getSecurityResources } from "../lib/content";
import { SITE_CONFIG } from "../config/site";

function DifficultyBadge({ level }: { level: string }) {
  const cls = level === "Beginner" ? "badge-beginner" : level === "Intermediate" ? "badge-intermediate" : "badge-advanced";
  return <span className={`badge ${cls}`}>{level}</span>;
}

function ChallengeOfWeek() {
  const cotw = getChallenges().find((c) => c.isChallengeOfWeek);
  const [hintsShown, setHintsShown] = useState(0);
  const [solutionShown, setSolutionShown] = useState(false);

  if (!cotw) return null;

  return (
    <div style={{
      border: "1px solid rgba(22,196,217,0.3)",
      padding: "clamp(1.5rem,3vw,2.5rem)",
      background: "rgba(22,196,217,0.03)",
    }}>
      {SITE_CONFIG.SHOW_SAMPLE_BADGES && cotw.isSample && (
        <span className="sample-badge" style={{ marginBottom: "1rem", display: "inline-block" }}>Sample</span>
      )}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        <span className="badge badge-beginner">{cotw.category}</span>
        <DifficultyBadge level={cotw.difficulty} />
        <span className="font-mono-label" style={{ color: "var(--c-muted)" }}>⏱ {cotw.timeEstimate}</span>
      </div>

      <h2 className="font-display" style={{ fontSize: "var(--fs-3xl)", lineHeight: 0.95, marginBottom: "1rem" }}>
        {cotw.title}
      </h2>
      <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.6, marginBottom: "2rem" }}>
        {cotw.description}
      </p>

      {/* Scenario */}
      <div style={{ marginBottom: "2rem" }}>
        <p className="font-mono-label" style={{ color: "var(--c-cyan)", marginBottom: "0.75rem" }}>Scenario</p>
        <pre style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-xs)",
          color: "var(--c-muted)",
          background: "rgba(11,18,32,0.6)",
          border: "1px solid rgba(232,238,245,0.06)",
          padding: "1rem",
          overflowX: "auto",
          lineHeight: 1.7,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}>
          {cotw.scenario}
        </pre>
      </div>

      {/* Instructions */}
      <div style={{ marginBottom: "2rem" }}>
        <p className="font-mono-label" style={{ color: "var(--c-cyan)", marginBottom: "0.75rem" }}>Instructions</p>
        <ol style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {cotw.instructions.map((ins, i) => (
            <li key={i} style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.6 }}>{ins}</li>
          ))}
        </ol>
      </div>

      {/* Progressive hints */}
      <div style={{ marginBottom: "2rem" }}>
        <p className="font-mono-label" style={{ color: "var(--c-muted)", marginBottom: "0.75rem" }}>
          {hintsShown === 0 ? "Stuck?" : `Hint ${hintsShown} of ${cotw.hints.length}`}
        </p>
        {cotw.hints.slice(0, hintsShown).map((h, i) => (
          <p key={i} style={{
            background: "rgba(57,123,255,0.06)",
            border: "1px solid rgba(57,123,255,0.15)",
            color: "var(--c-text)",
            fontSize: "var(--fs-sm)",
            lineHeight: 1.6,
            padding: "0.75rem 1rem",
            marginBottom: "0.5rem",
          }}>
            <span className="font-mono-label" style={{ color: "var(--c-blue)", display: "block", marginBottom: "0.25rem" }}>
              Hint {i + 1}
            </span>
            {h}
          </p>
        ))}
        {hintsShown < cotw.hints.length && (
          <button
            className="btn btn-outline"
            style={{ padding: "0.4rem 0.875rem" }}
            onClick={() => setHintsShown((n) => n + 1)}
          >
            {hintsShown === 0 ? "Show a hint" : "Next hint"} <ChevronDown size={14} />
          </button>
        )}
      </div>

      {/* Solution — spoiler-safe */}
      {!solutionShown ? (
        <button
          className="btn btn-outline"
          style={{ borderColor: "rgba(255,90,54,0.3)", color: "var(--c-alert)" }}
          onClick={() => setSolutionShown(true)}
          aria-label="Reveal solution (spoiler)"
        >
          Reveal Solution ⚠
        </button>
      ) : (
        <div>
          <div style={{
            background: "rgba(255,90,54,0.05)",
            border: "1px solid rgba(255,90,54,0.2)",
            padding: "1.25rem",
            marginBottom: "1rem",
          }}>
            <p className="font-mono-label" style={{ color: "var(--c-alert)", marginBottom: "0.75rem" }}>Solution</p>
            <p style={{ color: "var(--c-text)", fontSize: "var(--fs-sm)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{cotw.solution}</p>
          </div>
          <div style={{
            background: "rgba(22,196,217,0.04)",
            border: "1px solid rgba(22,196,217,0.15)",
            padding: "1.25rem",
          }}>
            <p className="font-mono-label" style={{ color: "var(--c-cyan)", marginBottom: "0.75rem" }}>Explanation</p>
            <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{cotw.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CyberRangePage() {
  const learningPaths = getLearningPaths();
  const resources = getSecurityResources();
  const [activePath, setActivePath] = useState(learningPaths[0]?.id ?? "");

  const currentPath = learningPaths.find((p) => p.id === activePath);

  return (
    <main id="main-content" style={{ paddingTop: "var(--header-h)" }}>
      {/* Header */}
      <section style={{
        padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)",
        borderBottom: "1px solid rgba(232,238,245,0.06)",
      }}>
        <p className="section-number" style={{ marginBottom: "1rem" }}>THE CYBER RANGE</p>
        <h1 className="font-display" style={{ fontSize: "var(--fs-hero)", lineHeight: 0.88, marginBottom: "1.5rem" }}>
          ENTER THE
          <br />
          <em className="font-accent-italic" style={{ color: "var(--c-cyan)", fontSize: "0.85em" }}>CYBER</em>
          <br />
          RANGE.
        </h1>
        <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-xl)", maxWidth: "40ch", lineHeight: 1.5 }}>
          Learn by exploring. Improve by practising.
        </p>
        <div style={{
          marginTop: "1.5rem",
          padding: "0.75rem 1rem",
          background: "rgba(255,90,54,0.06)",
          border: "1px solid rgba(255,90,54,0.2)",
          display: "inline-flex",
          gap: "0.5rem",
          alignItems: "flex-start",
        }}>
          <span style={{ color: "var(--c-alert)", fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)" }}>⚠</span>
          <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", lineHeight: 1.5 }}>
            Practise only in authorised environments. This page contains no live testing, scanning or exploitation tools.
          </p>
        </div>
      </section>

      {/* Challenge of the Week */}
      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)", borderBottom: "1px solid rgba(232,238,245,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="section-number" style={{ marginBottom: "0.5rem" }}>01 / CHALLENGE OF THE WEEK</p>
            <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)" }}>
              A new educational challenge every week. All data fictional.
            </p>
          </div>
        </div>
        <ChallengeOfWeek />
      </section>

      {/* Learning Paths */}
      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)", borderBottom: "1px solid rgba(232,238,245,0.06)" }}>
        <p className="section-number" style={{ marginBottom: "1.5rem" }}>02 / LEARNING PATHS</p>
        <h2 className="font-display" style={{ fontSize: "var(--fs-4xl)", lineHeight: 0.9, marginBottom: "2.5rem" }}>
          PICK YOUR
          <br />PATH.
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "2rem", alignItems: "start" }}>
          {/* Sidebar */}
          <nav aria-label="Learning paths" style={{ position: "sticky", top: "calc(var(--header-h) + 1rem)" }}>
            {learningPaths.map((path) => (
              <button
                key={path.id}
                onClick={() => setActivePath(path.id)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  borderLeft: `2px solid ${activePath === path.id ? "var(--c-cyan)" : "rgba(232,238,245,0.08)"}`,
                  paddingLeft: "1rem",
                  paddingBlock: "0.625rem",
                  cursor: "pointer",
                  color: activePath === path.id ? "var(--c-text)" : "var(--c-muted)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--fs-xs)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  transition: "all 0.2s",
                  display: "block",
                  marginBottom: "0.25rem",
                }}
                aria-pressed={activePath === path.id}
              >
                {path.title}
              </button>
            ))}
          </nav>

          {/* Content */}
          {currentPath && (
            <div>
              <h3 className="font-display" style={{ fontSize: "var(--fs-2xl)", marginBottom: "0.75rem" }}>
                {currentPath.title}
              </h3>
              <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", marginBottom: "2rem", lineHeight: 1.6 }}>
                {currentPath.description}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
                {currentPath.topics.map((topic) => (
                  <div key={topic.level} style={{ borderTop: "1px solid rgba(232,238,245,0.08)", paddingTop: "1.25rem" }}>
                    <DifficultyBadge level={topic.level} />
                    <ul style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.35rem", listStyle: "none" }}>
                      {topic.items.map((item) => (
                        <li key={item} style={{ color: "var(--c-muted)", fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)", display: "flex", gap: "0.5rem" }}>
                          <span style={{ color: "var(--c-cyan)" }}>›</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Security Resources */}
      <section className="section-bone" style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)" }}>
        <p className="section-number" style={{ color: "rgba(11,18,32,0.45)", marginBottom: "1.5rem" }}>03 / TOOLS & RESOURCES</p>
        <h2 className="font-display" style={{ fontSize: "var(--fs-4xl)", lineHeight: 0.9, marginBottom: "2.5rem", color: "var(--c-bone-text)" }}>
          TOOLS WORTH
          <br />KNOWING.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {resources.map((r) => (
            <div key={r.name} style={{
              borderTop: "1px solid rgba(11,18,32,0.1)",
              paddingTop: "1.25rem",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.625rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-lg)", fontWeight: 900, textTransform: "uppercase", color: "var(--c-bone-text)" }}>
                  {r.name}
                </h3>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${r.name} — official site`}
                  style={{ color: "rgba(11,18,32,0.4)", marginLeft: "0.5rem", flexShrink: 0 }}
                >
                  <ExternalLink size={14} />
                </a>
              </div>
              <span className="badge" style={{ background: "rgba(11,18,32,0.06)", color: "rgba(11,18,32,0.5)", marginBottom: "0.625rem" }}>
                {r.category}
              </span>
              <p style={{ color: "rgba(11,18,32,0.55)", fontSize: "var(--fs-sm)", lineHeight: 1.6 }}>{r.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTF Corner */}
      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)", borderTop: "1px solid rgba(232,238,245,0.06)" }}>
        <p className="section-number" style={{ marginBottom: "1.5rem" }}>04 / CTF CORNER</p>
        <h2 className="font-display" style={{ fontSize: "var(--fs-4xl)", lineHeight: 0.9, marginBottom: "2rem" }}>
          CTF COMPETITION
          <br />HISTORY.
        </h2>

        {/* Empty state — authentic */}
        <div style={{
          border: "1px solid rgba(232,238,245,0.08)",
          padding: "4rem 2rem",
          textAlign: "center",
        }}>
          <p className="font-display" style={{ fontSize: "var(--fs-2xl)", color: "rgba(232,238,245,0.12)", marginBottom: "0.75rem" }}>
            NO RECORDS YET
          </p>
          <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", maxWidth: "40ch", margin: "0 auto" }}>
            CTF participation history will appear here once the team starts competing. Check our events page for upcoming competitions.
          </p>
          <Link to="/events" className="btn btn-outline" style={{ marginTop: "1.5rem" }}>
            View Events <ArrowRight size={14} />
          </Link>
        </div>

        {/* Recommended platforms */}
        <div style={{ marginTop: "3rem" }}>
          <p className="font-mono-label" style={{ color: "var(--c-muted)", marginBottom: "1.25rem" }}>Practice Platforms</p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {[
              { name: "picoCTF", url: "https://picoctf.org" },
              { name: "Hack The Box", url: "https://www.hackthebox.com" },
              { name: "TryHackMe", url: "https://tryhackme.com" },
              { name: "CTFtime", url: "https://ctftime.org" },
              { name: "OverTheWire", url: "https://overthewire.org" },
            ].map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ padding: "0.4rem 0.875rem" }}
              >
                {p.name} <ExternalLink size={12} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
