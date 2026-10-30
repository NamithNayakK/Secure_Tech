import type { TeamMember } from "../types";

export const TEAM: TeamMember[] = [
  {
    id: "faculty-1",
    name: "Faculty Coordinator",
    role: "Faculty Coordinator",
    team: "Faculty",
    department: "Computer Science & Engineering",
    isSample: true,
  },
  {
    id: "president",
    name: "President",
    role: "President",
    team: "Leadership",
    interests: ["Penetration Testing", "Network Security"],
    isSample: true,
  },
  {
    id: "vp",
    name: "Vice President",
    role: "Vice President",
    team: "Leadership",
    interests: ["Digital Forensics", "OSINT"],
    isSample: true,
  },
];
