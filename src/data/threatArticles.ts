import type { ThreatArticle } from "../types";

// Educational sample content only. Labelled as samples.
// Do NOT invent specific CVE IDs, real incident statistics or sources.
export const THREAT_ARTICLES: ThreatArticle[] = [
  {
    id: "1",
    title: "Threat of the Month: Supply-Chain Compromise via Dependency Confusion",
    summary: "Attackers register public package names that shadow private internal packages, causing build systems to fetch and execute malicious code. This class of attack has affected multiple organisations and is difficult to detect without a proper internal package mirror.",
    category: "Threat",
    publicationDate: "2026-10-01",
    isSample: true,
  },
  {
    id: "2",
    title: "Vulnerability Spotlight: Improper Authorisation in REST APIs",
    summary: "Broken Object-Level Authorisation (BOLA), ranked #1 in the OWASP API Security Top 10, remains one of the most exploited classes of web vulnerability. This explainer covers what it is, why it happens and how to test for it in a lab environment.",
    category: "CVE",
    publicationDate: "2026-10-08",
    sourceUrl: "https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/",
    sourceName: "OWASP API Security Project",
    isSample: true,
  },
  {
    id: "3",
    title: "Security Tool of the Month: Wireshark",
    summary: "Wireshark is the de-facto standard for network protocol analysis. This month we look at five filters every beginner should know, how to reassemble TCP streams and how to safely capture traffic in a lab environment.",
    category: "Tool",
    publicationDate: "2026-10-15",
    sourceUrl: "https://www.wireshark.org/docs/",
    sourceName: "Wireshark Documentation",
    isSample: true,
  },
  {
    id: "4",
    title: "Attack Breakdown: Credential Stuffing",
    summary: "Credential stuffing attacks use leaked username/password pairs from one breach against other services, banking on the reality that many users reuse passwords. We walk through the attack flow, detection signals and the controls that stop it.",
    category: "Attack",
    publicationDate: "2026-10-22",
    isSample: true,
  },
  {
    id: "5",
    title: "Defence Strategy: Implementing Zero Trust for Student Projects",
    summary: "Zero Trust is not a product — it is an architectural principle. This article translates the core tenets (verify explicitly, least privilege, assume breach) into concrete steps that a student developer can apply to a small cloud project.",
    category: "Defence",
    publicationDate: "2026-10-29",
    isSample: true,
  },
  {
    id: "6",
    title: "Malware Analysis Insights: Understanding Dropper Mechanics",
    summary: "A dropper is malware whose primary job is to install a secondary payload without detection. This educational breakdown covers common obfuscation techniques seen in academic malware samples and how analysts approach static analysis safely in an isolated environment.",
    category: "Malware",
    publicationDate: "2026-10-10",
    isSample: true,
  },
];
