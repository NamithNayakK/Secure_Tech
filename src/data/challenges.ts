import type { Challenge } from "../types";

export const CHALLENGES: Challenge[] = [
  {
    id: "cotw-1",
    title: "THE SUSPICIOUS LOGIN",
    slug: "suspicious-login",
    category: "Digital Forensics / Log Analysis",
    difficulty: "Beginner",
    timeEstimate: "30–45 min",
    isChallengeOfWeek: true,
    isSample: true,
    description: "A company''s internal application recorded an unusual authentication event at 02:17 UTC. Your job is to examine the fictional log excerpt, identify the anomaly and explain what likely happened.",
    scenario: `You are a junior SOC analyst. A senior engineer forwards you the following authentication log snippet from a fictional internal service called VaultApp. No real company or system is represented. Your task is to find what is unusual.

[FICTIONAL LOG — for educational purposes only]
2026-10-29 02:15:43 UTC | INFO  | auth | user=alice@corp.local | ip=192.168.1.42 | status=SUCCESS | ua=Mozilla/5.0 (Windows NT 10.0)
2026-10-29 02:15:51 UTC | INFO  | auth | user=alice@corp.local | ip=192.168.1.42 | status=SUCCESS | ua=Mozilla/5.0 (Windows NT 10.0)
2026-10-29 02:17:03 UTC | WARN  | auth | user=alice@corp.local | ip=185.220.101.7 | status=SUCCESS | ua=python-requests/2.28
2026-10-29 02:17:09 UTC | INFO  | auth | user=alice@corp.local | ip=192.168.1.42 | status=FAIL   | ua=Mozilla/5.0 (Windows NT 10.0)
2026-10-29 02:17:10 UTC | INFO  | auth | user=alice@corp.local | ip=192.168.1.42 | status=FAIL   | ua=Mozilla/5.0 (Windows NT 10.0)`,
    instructions: [
      "Read the log excerpt carefully. Note the timestamps, IP addresses, user-agent strings and status codes.",
      "Identify any line that stands out from the expected pattern.",
      "Write a short paragraph describing the anomaly: what happened, when and why it is suspicious.",
      "Suggest two immediate response actions a SOC analyst might take.",
    ],
    hints: [
      "Look at IP addresses. Most logins come from the same place. Does one line differ?",
      "User-agent strings identify the software making the request. A browser and a Python script look very different.",
      "The timing is important — what does a SUCCESS from an unexpected IP followed by FAILs from the original IP suggest?",
    ],
    solution: `The anomalous line is at 02:17:03 UTC:
- IP 185.220.101.7 is a known Tor exit-node range (in a real scenario, you would look this up — here it is fictional context).
- The user-agent is "python-requests", indicating a scripted, not browser-based, request.
- A SUCCESS from this IP followed immediately by FAIL attempts from the legitimate IP suggests: the attacker obtained Alice''s credentials (e.g., via phishing or a leaked database) and logged in using an automated script, while Alice herself was simultaneously trying and failing to log in — possibly experiencing a password change or session conflict.`,
    explanation: `This pattern is called a credential-stuffing indicator combined with a concurrent session anomaly. Key forensic signals:
1. Geographic/IP impossibility: two IPs active within seconds.
2. User-agent mismatch: scripted access alongside browser access.
3. Outcome inversion: attacker succeeds; legitimate user fails.

Immediate response actions: (a) Force-expire Alice''s session tokens and reset her password. (b) Block or flag the suspicious IP and raise a ticket for deeper investigation of how the credentials were leaked.`,
  },
];
