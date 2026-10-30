import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface Node {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseX: number;
  baseY: number;
}

const NODES_DATA = [
  { id: "web", label: "Web Security", description: "OWASP Top 10, injection attacks, XSS, broken auth and secure API design." },
  { id: "net", label: "Network Security", description: "Packet capture, intrusion detection, firewall rules and traffic analysis." },
  { id: "forensics", label: "Digital Forensics", description: "Evidence preservation, memory dumps, log analysis and timeline reconstruction." },
  { id: "cloud", label: "Cloud Security", description: "IAM policies, container escapes, misconfigured storage and IaC scanning." },
  { id: "ai", label: "AI Security", description: "Adversarial inputs, model theft, data poisoning and LLM attack surfaces." },
  { id: "hacking", label: "Ethical Hacking", description: "Structured offensive testing from recon through reporting — in authorised environments." },
];

const EDGES = [
  ["web", "net"], ["web", "hacking"], ["net", "forensics"],
  ["forensics", "ai"], ["cloud", "ai"], ["cloud", "net"],
  ["hacking", "web"], ["hacking", "cloud"], ["ai", "hacking"],
];

function buildNodes(w: number, h: number): Node[] {
  const cx = w / 2, cy = h / 2;
  const r = Math.min(w, h) * 0.32;
  return NODES_DATA.map((n, i) => {
    const angle = (i / NODES_DATA.length) * Math.PI * 2 - Math.PI / 2;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    return { ...n, x, y, vx: 0, vy: 0, radius: 28, baseX: x, baseY: y };
  });
}

export default function NetworkTopology() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const hoveredRef = useRef<string | null>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);
  const reducedMotion = useReducedMotion();
  const [activeNode, setActiveNode] = useState<Node | null>(null);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
    nodesRef.current = buildNodes(w, h);
  }, []);

  useEffect(() => {
    init();
    const ro = new ResizeObserver(init);
    if (canvasRef.current) ro.observe(canvasRef.current.parentElement!);

    const canvas = canvasRef.current!;
    const getXY = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const src = "touches" in e ? e.touches[0] : e;
      return { x: src.clientX - rect.left, y: src.clientY - rect.top };
    };

    const onMove = (e: MouseEvent) => { const p = getXY(e); mouseRef.current = p; };
    const onClick = (e: MouseEvent) => {
      const { x, y } = getXY(e);
      const hit = nodesRef.current.find((n) => Math.hypot(n.x - x, n.y - y) < n.radius + 8);
      setActiveNode(hit ?? null);
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("click", onClick);

    let frame: number;
    const draw = () => {
      const c = canvas.getContext("2d")!;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      c.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update node positions with cursor attraction
      nodes.forEach((n) => {
        const dx = mx - n.x, dy = my - n.y;
        const dist = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - dist / 180) * (reducedMotion ? 0 : 12);
        const tx = n.baseX + (dx / (dist || 1)) * influence;
        const ty = n.baseY + (dy / (dist || 1)) * influence;
        n.vx += (tx - n.x) * 0.08;
        n.vy += (ty - n.y) * 0.08;
        n.vx *= 0.85; n.vy *= 0.85;
        if (!reducedMotion) { n.x += n.vx; n.y += n.vy; }
        hoveredRef.current = dist < n.radius + 8 ? n.id : hoveredRef.current === n.id ? null : hoveredRef.current;
      });

      // Draw edges
      EDGES.forEach(([a, b]) => {
        const na = nodes.find((n) => n.id === a)!;
        const nb = nodes.find((n) => n.id === b)!;
        const isActive = hoveredRef.current === a || hoveredRef.current === b;
        c.beginPath();
        c.moveTo(na.x, na.y);
        c.lineTo(nb.x, nb.y);
        c.strokeStyle = isActive ? "rgba(22,196,217,0.4)" : "rgba(232,238,245,0.08)";
        c.lineWidth = isActive ? 1.5 : 1;
        c.stroke();
      });

      // Draw nodes
      nodes.forEach((n) => {
        const isHovered = hoveredRef.current === n.id;
        const isActive = activeNode?.id === n.id;

        // Outer glow ring on hover
        if (isHovered || isActive) {
          c.beginPath();
          c.arc(n.x, n.y, n.radius + 10, 0, Math.PI * 2);
          c.strokeStyle = "rgba(22,196,217,0.2)";
          c.lineWidth = 1;
          c.stroke();
        }

        // Node circle
        c.beginPath();
        c.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        c.fillStyle = isActive
          ? "rgba(22,196,217,0.2)"
          : isHovered
          ? "rgba(22,196,217,0.12)"
          : "rgba(20,36,58,0.9)";
        c.fill();
        c.strokeStyle = isActive
          ? "rgba(22,196,217,0.9)"
          : isHovered
          ? "rgba(22,196,217,0.5)"
          : "rgba(232,238,245,0.12)";
        c.lineWidth = 1.5;
        c.stroke();

        // Label
        c.fillStyle = isHovered || isActive ? "#16C4D9" : "#7a8fa6";
        c.font = `500 ${isHovered ? 11 : 10}px 'JetBrains Mono', monospace`;
        c.textAlign = "center";
        c.textBaseline = "middle";

        // Wrap long labels
        const words = n.label.split(" ");
        if (words.length > 1) {
          c.fillText(words[0], n.x, n.y - 6);
          c.fillText(words.slice(1).join(" "), n.x, n.y + 7);
        } else {
          c.fillText(n.label, n.x, n.y);
        }
      });

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    rafRef.current = frame;

    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("click", onClick);
      ro.disconnect();
    };
  }, [init, reducedMotion, activeNode]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        id="topology-canvas"
        style={{ width: "100%", height: "100%", cursor: "crosshair" }}
        aria-label="Interactive network topology showing cybersecurity domains"
        role="img"
      />

      {/* Info panel */}
      {activeNode && (
        <div
          style={{
            position: "absolute",
            bottom: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(20,36,58,0.95)",
            border: "1px solid rgba(22,196,217,0.3)",
            padding: "0.875rem 1.25rem",
            maxWidth: "300px",
            width: "90%",
            backdropFilter: "blur(8px)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
            <p className="font-mono-label" style={{ color: "var(--c-cyan)" }}>{activeNode.label}</p>
            <button
              onClick={() => setActiveNode(null)}
              style={{ background: "none", border: "none", color: "var(--c-muted)", cursor: "pointer", fontSize: "1rem", lineHeight: 1 }}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <p style={{ color: "var(--c-muted)", fontSize: "var(--fs-sm)", lineHeight: 1.5 }}>
            {activeNode.description}
          </p>
        </div>
      )}

      {/* Accessible text fallback */}
      <ul className="sr-only" aria-label="Cybersecurity domain list">
        {NODES_DATA.map((n) => (
          <li key={n.id}>
            <strong>{n.label}:</strong> {n.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
