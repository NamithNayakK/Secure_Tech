import { getAchievements } from "../lib/content";

export default function AchievementsPage() {
  const achievements = getAchievements();

  return (
    <main id="main-content" style={{ paddingTop: "var(--header-h)" }}>
      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)", borderBottom: "1px solid rgba(232,238,245,0.06)" }}>
        <p className="section-number" style={{ marginBottom: "0.75rem" }}>ACHIEVEMENTS</p>
        <h1 className="font-display" style={{ fontSize: "var(--fs-hero)", lineHeight: 0.88 }}>
          WHAT WE'VE
          <br />
          <em className="font-accent-italic" style={{ color: "var(--c-cyan)", fontSize: "0.85em" }}>EARNED.</em>
        </h1>
      </section>

      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)" }}>
        {achievements.length === 0 ? (
          <div style={{ border: "1px solid rgba(232,238,245,0.06)", padding: "5rem 2rem", textAlign: "center" }}>
            <p className="font-display" style={{ fontSize: "var(--fs-3xl)", color: "rgba(232,238,245,0.1)", marginBottom: "1rem" }}>
              THE SCOREBOARD STARTS NOW.
            </p>
            <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", maxWidth: "40ch", margin: "0 auto 0.5rem" }}>
              Achievements will appear here once the club participates in competitions, conducts workshops and receives recognitions.
            </p>
            <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-xs)", fontFamily: "var(--font-mono)" }}>
              No fabricated records. Only verified achievements are listed.
            </p>
          </div>
        ) : (
          <div style={{ position: "relative", paddingLeft: "2rem" }}>
            {/* Timeline line */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "rgba(232,238,245,0.1)" }} aria-hidden="true" />
            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
              {achievements.map((a) => {
                const dateStr = new Date(a.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
                return (
                  <div key={a.id} style={{ position: "relative" }}>
                    <div style={{
                      position: "absolute",
                      left: "-2.3rem",
                      top: "0.3em",
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "var(--c-cyan)",
                    }} aria-hidden="true" />
                    <p className="font-mono-label" style={{ color: "var(--c-muted)", marginBottom: "0.5rem" }}>{dateStr} · {a.category}</p>
                    <h2 className="font-display" style={{ fontSize: "var(--fs-xl)", lineHeight: 1, marginBottom: "0.5rem" }}>{a.title}</h2>
                    <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.6 }}>{a.description}</p>
                    {a.rank && (
                      <p className="font-mono-label" style={{ color: "var(--c-cyan)", marginTop: "0.5rem" }}>🏆 {a.rank}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
