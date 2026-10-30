import type { Domain } from "../types";

// Custom monoline SVG glyph paths (1.5px stroke, 24x24 viewBox)
export const DOMAINS: Domain[] = [
  {
    id: "ethical-hacking",
    name: "Ethical Hacking",
    description: "Structured offensive testing to find and fix vulnerabilities before adversaries do.",
    glyph: "M12 3L4 7v5c0 4.5 3.5 8.5 8 9.5 4.5-1 8-5 8-9.5V7L12 3z",
  },
  {
    id: "web-app-security",
    name: "Web Application Security",
    description: "Understanding and mitigating OWASP Top-10 risks in modern web stacks.",
    glyph: "M3 5h18M3 9h18M3 13h9M3 17h6M15 13l4 4-4 4",
  },
  {
    id: "network-security",
    name: "Network Security",
    description: "Packet analysis, intrusion detection and perimeter hardening at layer 2–7.",
    glyph: "M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4M4 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4M20 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4M12 6v6M6 19l6-7M18 19l-6-7",
  },
  {
    id: "digital-forensics",
    name: "Digital Forensics",
    description: "Recovering, preserving and analysing digital evidence from files, memory and logs.",
    glyph: "M10 4H4v6M10 4l-6 6M21 12v8h-8M21 12l-8 8M9 21H4v-5",
  },
  {
    id: "cloud-security",
    name: "Cloud Security",
    description: "IAM misconfigurations, container escapes and securing infrastructure as code.",
    glyph: "M6 19a4 4 0 0 1-.8-7.9 5.5 5.5 0 0 1 10.9-1.1A3.5 3.5 0 0 1 18 17H6z",
  },
  {
    id: "ai-ml-security",
    name: "AI & ML Security",
    description: "Adversarial inputs, model inversion, data poisoning and AI system hardening.",
    glyph: "M12 2L2 7l10 5 10-5-10-5M2 17l10 5 10-5M2 12l10 5 10-5",
  },
  {
    id: "malware-analysis",
    name: "Malware Analysis",
    description: "Static and dynamic analysis of malicious code in sandboxed environments.",
    glyph: "M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M16.9 16.9l1.4 1.4",
  },
  {
    id: "soc-ir",
    name: "Security Operations & IR",
    description: "SIEM, alert triage, incident timelines and playbook-driven response.",
    glyph: "M22 12h-4l-3 9L9 3l-3 9H2",
  },
];
