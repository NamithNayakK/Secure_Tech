import { Github, Linkedin } from "../components/common/BrandIcons";
import { getTeam } from "../lib/content";
import { SITE_CONFIG } from "../config/site";

type TeamGroup = ReturnType<typeof getTeam>[0]["team"];

const TEAM_ORDER: TeamGroup[] = ["Faculty", "Leadership", "Technical", "Red Team", "Blue Team", "R&D", "Events", "Media"];
const TEAM_LABELS: Record<TeamGroup, string> = {
  Faculty: "Faculty Coordinators",
  Leadership: "Club Leadership",
  Technical: "Technical Team",
  "Red Team": "Red Team",
  "Blue Team": "Blue Team",
  "R&D": "Research & Development",
  Events: "Events & Management",
  Media: "Media & Design",
};

function MemberCard({ member }: { member: ReturnType<typeof getTeam>[0] }) {
  return (
    <div style={{
      borderTop: "1px solid rgba(232,238,245,0.08)",
      paddingTop: "1.5rem",
      position: "relative",
    }}>
      {SITE_CONFIG.SHOW_SAMPLE_BADGES && member.isSample && (
        <span className="sample-badge" style={{ marginBottom: "0.75rem", display: "inline-block" }}>Sample</span>
      )}
      {/* Avatar placeholder */}
      <div style={{
        width: 64,
        height: 64,
        background: "var(--c-navy)",
        border: "1px solid rgba(232,238,245,0.1)",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1rem",
        fontFamily: "var(--font-display)",
        fontSize: "1.5rem",
        fontWeight: 900,
        color: "rgba(232,238,245,0.2)",
      }} aria-hidden="true">
        {member.name.charAt(0)}
      </div>

      <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-lg)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, marginBottom: "0.25rem" }}>
        {member.name}
      </p>
      <p className="font-mono-label" style={{ color: "var(--c-cyan)", marginBottom: "0.5rem" }}>
        {member.role}
      </p>
      {member.department && (
        <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-xs)" }}>{member.department}</p>
      )}
      {member.interests && member.interests.length > 0 && (
        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
          {member.interests.map((interest) => (
            <span key={interest} className="badge" style={{ background: "rgba(232,238,245,0.05)", color: "var(--c-muted)" }}>
              {interest}
            </span>
          ))}
        </div>
      )}
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.875rem" }}>
        {member.linkedinUrl && (
          <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`} style={{ color: "var(--c-muted)" }}>
            <Linkedin size={16} strokeWidth={1.5} />
          </a>
        )}
        {member.githubUrl && (
          <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on GitHub`} style={{ color: "var(--c-muted)" }}>
            <Github size={16} strokeWidth={1.5} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function TeamPage() {
  const team = getTeam();

  return (
    <main id="main-content" style={{ paddingTop: "var(--header-h)" }}>
      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)", borderBottom: "1px solid rgba(232,238,245,0.06)" }}>
        <p className="section-number" style={{ marginBottom: "0.75rem" }}>OUR TEAM</p>
        <h1 className="font-display" style={{ fontSize: "var(--fs-hero)", lineHeight: 0.88, marginBottom: "1.5rem" }}>
          THE PEOPLE
          <br />
          <em className="font-accent-italic" style={{ color: "var(--c-cyan)", fontSize: "0.85em" }}>BEHIND</em>
          <br />
          THE RANGE.
        </h1>
        {SITE_CONFIG.SHOW_SAMPLE_BADGES && (
          <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", fontFamily: "var(--font-mono)", maxWidth: "50ch", lineHeight: 1.5 }}>
            ℹ Entries marked SAMPLE are placeholder profiles. Replace with real member data before launch.
          </p>
        )}
      </section>

      {TEAM_ORDER.map((group) => {
        const members = team.filter((m) => m.team === group);
        if (members.length === 0) return null;
        return (
          <section key={group} style={{ padding: "clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,4rem)", borderBottom: "1px solid rgba(232,238,245,0.06)" }}>
            <p className="section-number" style={{ marginBottom: "1.5rem" }}>{TEAM_LABELS[group]}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "2rem" }}>
              {members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        );
      })}

      {team.length === 0 && (
        <div style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)", textAlign: "center" }}>
          <p className="font-display" style={{ fontSize: "var(--fs-2xl)", color: "rgba(232,238,245,0.12)", marginBottom: "0.75rem" }}>
            TEAM PROFILES COMING SOON
          </p>
          <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)" }}>
            Add team members in <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.9em" }}>src/data/team.ts</code>.
          </p>
        </div>
      )}
    </main>
  );
}
