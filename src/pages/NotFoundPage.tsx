import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main id="main-content" style={{ paddingTop: "var(--header-h)", minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", padding: "2rem" }}>
      <p className="font-mono-label blink-cursor" style={{ color: "var(--c-cyan)", marginBottom: "1.5rem" }}>
        404 / NOT FOUND
      </p>
      <h1 className="font-display" style={{ fontSize: "var(--fs-hero)", lineHeight: 0.88, marginBottom: "1.5rem" }}>
        WRONG
        <br />
        <em className="font-accent-italic" style={{ color: "var(--c-cyan)", fontSize: "0.85em" }}>TURN.</em>
      </h1>
      <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-lg)", maxWidth: "32ch", marginBottom: "2.5rem", lineHeight: 1.5 }}>
        This page does not exist. It may have moved or never been deployed.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </main>
  );
}
