import { Link } from "react-router-dom";

const RULES = [
  {
    title: "Only test systems you own or have explicit permission to test",
    body: "Accessing, scanning or probing systems without authorisation is illegal in India under the IT Act 2000 and its amendments. Secure Tech Club activities are conducted exclusively in authorised lab environments, CTF platforms and sandboxed systems.",
  },
  {
    title: "Never disclose real vulnerabilities carelessly",
    body: "If you discover a real vulnerability during legitimate research or use, follow responsible disclosure: notify the vendor or system owner privately and give them reasonable time to patch before any public discussion.",
  },
  {
    title: "Treat all shared knowledge with respect",
    body: "Knowledge shared in club sessions, write-ups and internal channels is for educational advancement. Do not weaponise or redistribute techniques for harmful purposes.",
  },
  {
    title: "Represent the club and college with integrity",
    body: "In competitions, online forums and public events, members represent Secure Tech Club and Global Academy of Technology. Conduct must reflect this responsibility.",
  },
  {
    title: "Respect privacy",
    body: "Do not collect, share or analyse real personal data without consent. Practise on synthetic or intentionally vulnerable datasets and environments only.",
  },
  {
    title: "No tolerance for harassment or discrimination",
    body: "Secure Tech Club is an inclusive community. Harassment, bullying or discrimination of any form — online or in person — is grounds for removal from the club.",
  },
  {
    title: "Credit your sources",
    body: "When presenting research, write-ups or tools, credit original authors. Plagiarism undermines the trust that makes the security community function.",
  },
  {
    title: "Report concerns",
    body: "If you observe a member violating these rules or encounter a real security incident, report it to the Faculty Coordinator or club leadership promptly.",
  },
];

export default function CodeOfConductPage() {
  return (
    <main id="main-content" style={{ paddingTop: "var(--header-h)" }}>
      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)", borderBottom: "1px solid rgba(232,238,245,0.06)" }}>
        <p className="section-number" style={{ marginBottom: "0.75rem" }}>CODE OF CONDUCT</p>
        <h1 className="font-display" style={{ fontSize: "var(--fs-hero)", lineHeight: 0.88, marginBottom: "1.5rem" }}>
          HOW WE
          <br />
          <em className="font-accent-italic" style={{ color: "var(--c-cyan)", fontSize: "0.85em" }}>OPERATE.</em>
        </h1>
        <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-xl)", maxWidth: "45ch", lineHeight: 1.5 }}>
          Secure Tech Club operates on a foundation of ethics, legality and mutual respect. These are not optional.
        </p>
      </section>

      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)", borderBottom: "1px solid rgba(232,238,245,0.06)" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {RULES.map((rule, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: "2rem", borderTop: "1px solid rgba(232,238,245,0.08)", paddingBlock: "2rem", alignItems: "start" }}>
              <span className="font-mono-label" style={{ color: "var(--c-muted)" }}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="font-display" style={{ fontSize: "var(--fs-xl)", lineHeight: 1.05, marginBottom: "0.625rem" }}>
                  {rule.title.toUpperCase()}
                </h2>
                <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.7 }}>{rule.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "clamp(4rem,8vw,8rem) clamp(1.5rem,5vw,4rem)" }}>
        <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.7, maxWidth: "60ch" }}>
          This code applies to all members, collaborators and participants in Secure Tech Club events, platforms and communications. It is subject to review by club leadership and the Faculty Coordinator.
        </p>
        <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", marginTop: "1rem" }}>
          Also read our{" "}
          <Link to="/responsible-use" style={{ color: "var(--c-cyan)" }}>Responsible Use policy</Link>.
        </p>
      </section>
    </main>
  );
}
