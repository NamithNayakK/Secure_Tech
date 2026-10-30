export const SECURITY_RESOURCES = [
  {
    name: "Kali Linux",
    description: "The industry-standard penetration testing distribution. Pre-loaded with hundreds of security tools across recon, exploitation, forensics and reporting.",
    url: "https://www.kali.org/",
    category: "Platform",
  },
  {
    name: "Wireshark",
    description: "The world-leading network protocol analyser. Capture and interactively browse traffic from a live network or a PCAP file.",
    url: "https://www.wireshark.org/",
    category: "Network",
  },
  {
    name: "Burp Suite Community",
    description: "The go-to web application security testing proxy. Intercept, modify and replay HTTP/S traffic; run active scans; extend with plugins.",
    url: "https://portswigger.net/burp/communitydownload",
    category: "Web",
  },
  {
    name: "OWASP ZAP",
    description: "An open-source web application scanner maintained by OWASP. Good for automated scanning in CI pipelines and a solid learning tool.",
    url: "https://www.zaproxy.org/",
    category: "Web",
  },
  {
    name: "Nmap",
    description: "The reference network discovery and security auditing tool. Map hosts, enumerate open ports, identify OS and services with NSE scripting.",
    url: "https://nmap.org/",
    category: "Network",
  },
  {
    name: "Metasploit Framework",
    description: "The most widely-used exploitation framework for developing and executing exploit code against remote targets. Use in authorised lab environments only.",
    url: "https://www.metasploit.com/",
    category: "Exploitation",
  },
  {
    name: "OWASP WSTG",
    description: "The OWASP Web Security Testing Guide — a comprehensive manual for testing the security of web applications, covering methodology, checklists and techniques.",
    url: "https://owasp.org/www-project-web-security-testing-guide/",
    category: "Reference",
  },
];

export const LEARNING_PATHS = [
  {
    id: "fundamentals",
    title: "Security Fundamentals",
    description: "Start here. CIA triad, threat modelling basics and the vocabulary of security.",
    topics: [
      { level: "Beginner" as const, items: ["CIA Triad", "Common Attack Types", "Security Mindset", "Basic Cryptography Concepts"] },
      { level: "Intermediate" as const, items: ["Threat Modelling", "Risk Assessment", "Authentication Protocols", "PKI Basics"] },
      { level: "Advanced" as const, items: ["Security Architecture Patterns", "Zero Trust Design", "Formal Verification Concepts"] },
    ],
  },
  {
    id: "linux-networking",
    title: "Linux & Networking",
    description: "The foundation every security practitioner needs — file systems, processes, TCP/IP and packet analysis.",
    topics: [
      { level: "Beginner" as const, items: ["Linux CLI Basics", "File Permissions", "OSI Model", "IP/TCP Fundamentals"] },
      { level: "Intermediate" as const, items: ["Bash Scripting", "Wireshark & tcpdump", "Subnetting", "DNS Deep-Dive"] },
      { level: "Advanced" as const, items: ["Kernel Internals", "eBPF Basics", "BGP & Routing Security"] },
    ],
  },
  {
    id: "web-app-security",
    title: "Web App Security",
    description: "OWASP Top 10, Burp Suite and modern web vulnerability classes from injection to broken access control.",
    topics: [
      { level: "Beginner" as const, items: ["HTTP Basics", "Browser Security Model", "OWASP Top 10 Overview"] },
      { level: "Intermediate" as const, items: ["SQL Injection", "XSS", "CSRF", "IDOR", "Burp Suite Workflow"] },
      { level: "Advanced" as const, items: ["OAuth/OIDC Attacks", "Deserialization", "XXE", "WebSockets Security"] },
    ],
  },
  {
    id: "ethical-hacking",
    title: "Ethical Hacking",
    description: "Structured offensive methodology — recon, enumeration, exploitation, post-exploitation and reporting.",
    topics: [
      { level: "Beginner" as const, items: ["Legal & Ethical Framework", "Passive Recon", "Active Scanning with Nmap"] },
      { level: "Intermediate" as const, items: ["Vulnerability Scanning", "Metasploit Basics", "Password Cracking", "Privilege Escalation Concepts"] },
      { level: "Advanced" as const, items: ["AD Attacks", "Custom Exploit Development Concepts", "Report Writing"] },
    ],
  },
  {
    id: "digital-forensics",
    title: "Digital Forensics",
    description: "Acquisition, preservation and analysis of digital evidence from disk, memory and network artefacts.",
    topics: [
      { level: "Beginner" as const, items: ["Forensics Principles", "File Systems Overview", "Evidence Handling"] },
      { level: "Intermediate" as const, items: ["Autopsy & Sleuth Kit", "Memory Analysis with Volatility", "Log Analysis"] },
      { level: "Advanced" as const, items: ["Malware Triage", "Timeline Analysis", "Anti-Forensics Techniques"] },
    ],
  },
  {
    id: "blue-team-soc",
    title: "Blue Team & SOC",
    description: "Detection engineering, SIEM alerting, threat hunting and incident response playbooks.",
    topics: [
      { level: "Beginner" as const, items: ["SOC Roles & Tiers", "Alert Triage", "Log Sources & SIEM Basics"] },
      { level: "Intermediate" as const, items: ["MITRE ATT&CK Navigation", "Detection Rules", "Incident Playbooks"] },
      { level: "Advanced" as const, items: ["Threat Hunting", "Purple Teaming", "Detection-as-Code"] },
    ],
  },
  {
    id: "cloud-security",
    title: "Cloud Security",
    description: "IAM, shared responsibility, cloud-native misconfigurations and infrastructure-as-code security.",
    topics: [
      { level: "Beginner" as const, items: ["Shared Responsibility Model", "Cloud IAM Basics", "Common Misconfigurations"] },
      { level: "Intermediate" as const, items: ["S3 Security", "Container Security", "Secrets Management"] },
      { level: "Advanced" as const, items: ["Cloud-Native Attack Paths", "IaC Security Scanning", "CSPM Tools"] },
    ],
  },
  {
    id: "ai-security",
    title: "AI Security",
    description: "Adversarial machine learning, model security and the emerging attack surface of AI-powered systems.",
    topics: [
      { level: "Beginner" as const, items: ["AI/ML Primer for Security", "Prompt Injection Basics", "AI Trust Boundaries"] },
      { level: "Intermediate" as const, items: ["Adversarial Examples", "Data Poisoning", "Model Extraction"] },
      { level: "Advanced" as const, items: ["LLM Security Research", "AI Red Teaming Methodology", "Responsible Disclosure for AI"] },
    ],
  },
];
