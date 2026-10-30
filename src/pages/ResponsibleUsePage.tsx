import { Link } from "react-router-dom";

export default function ResponsibleUsePage() {
  return (
    <main id="main-content" style={{ paddingTop: "var(--header-h)" }}>
      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)", borderBottom: "1px solid rgba(232,238,245,0.06)" }}>
        <p className="section-number" style={{ marginBottom: "0.75rem" }}>RESPONSIBLE USE</p>
        <h1 className="font-display" style={{ fontSize: "var(--fs-4xl)", lineHeight: 0.9, marginBottom: "1.5rem" }}>
          KNOW WHERE
          <br />
          <em className="font-accent-italic" style={{ color: "var(--c-cyan)", fontSize: "0.85em" }}>THE LINE IS.</em>
        </h1>
      </section>
      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)" }}>
        <div style={{ maxWidth: "70ch", display: "flex", flexDirection: "column", gap: "2rem" }}>
          {[
            {
              heading: "Authorised environments only",
              body: "All hands-on security techniques must be practised exclusively in environments you own, intentionally vulnerable platforms (e.g. DVWA, HackTheBox, TryHackMe), or environments for which you have written authorisation. There are no exceptions.",
            },
            {
              heading: "This website has no testing functionality",
              body: "The Cyber Range educational content on this site contains learning material, challenge descriptions and tool references. It does not provide or facilitate any live scanning, exploitation, or attack tools. Do not attempt to use content from this site to conduct tests against real systems.",
            },
            {
              heading: "India's legal framework",
              body: "Unauthorised access to computer systems is a criminal offence under Section 66 of the Information Technology Act, 2000. Computer-related crimes may also attract provisions under the IPC. Ignorance of the law is not a defence.",
            },
            {
              heading: "Responsible disclosure",
              body: "If you discover a vulnerability in a real system through legitimate means, do not exploit it, do not disclose it publicly, and do not share it without first notifying the owner through a responsible disclosure or bug bounty channel. Contact your Faculty Coordinator for guidance.",
            },
            {
              heading: "Educational purpose",
              body: "Content on this site — including challenge descriptions, threat intelligence summaries, tool references and learning paths — is intended solely for educational purposes within the context of security awareness and academic study.",
            },
          ].map((item, i) => (
            <div key={i} style={{ borderTop: "1px solid rgba(232,238,245,0.08)", paddingTop: "1.5rem" }}>
              <h2 className="font-display" style={{ fontSize: "var(--fs-lg)", lineHeight: 1.05, marginBottom: "0.625rem" }}>
                {String(i + 1).padStart(2, "0")}. {item.heading.toUpperCase()}
              </h2>
              <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.7 }}>{item.body}</p>
            </div>
          ))}
        </div>
        <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", marginTop: "3rem" }}>
          Also read our{" "}
          <Link to="/code-of-conduct" style={{ color: "var(--c-cyan)" }}>Code of Conduct</Link>.
        </p>
      </section>
    </main>
  );
}
