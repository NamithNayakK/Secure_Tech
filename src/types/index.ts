// ─── Core types used across the project ─────────────────────

export interface Event {
  id: string;
  title: string;
  slug: string;
  status: "upcoming" | "completed";
  category: "Workshop" | "CTF" | "Hackathon" | "Talk" | "Awareness" | "Bootcamp";
  date: string;          // ISO date string
  endDate?: string;
  venue: string;
  description: string;
  longDescription?: string;
  speakers?: Speaker[];
  schedule?: ScheduleItem[];
  registrationLink?: string;
  galleryImages?: string[];
  keyTakeaways?: string[];
  bannerImage?: string;
  tags?: string[];
  isSample?: boolean;
}

export interface Speaker {
  name: string;
  role: string;
  bio?: string;
  photo?: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  speaker?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: "Red Team" | "Blue Team" | "AI Security" | "Web Security" | "Digital Forensics" | "Network Security" | "Research";
  tags: string[];
  contributors: TeamMember[];
  githubUrl?: string;
  demoUrl?: string;
  status: "active" | "completed" | "archived";
  featured?: boolean;
  coverImage?: string;
  isSample?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  team: "Faculty" | "Leadership" | "Technical" | "Red Team" | "Blue Team" | "R&D" | "Events" | "Media";
  department?: string;
  semester?: number;
  interests?: string[];
  photo?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  isSample?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: "CTF" | "Hackathon" | "Workshop" | "Recognition" | "Research" | "Collaboration";
  date: string;
  participants?: string[];
  rank?: string;
  certificate?: string;
  photo?: string;
  isSample?: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  slug: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  timeEstimate: string;
  description: string;
  scenario: string;
  instructions: string[];
  hints: string[];
  solution: string;
  explanation: string;
  isChallengeOfWeek?: boolean;
  isSample?: boolean;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  topics: {
    level: "Beginner" | "Intermediate" | "Advanced";
    items: string[];
  }[];
  resources: Resource[];
}

export interface Resource {
  name: string;
  description: string;
  url: string;
  category: string;
  isFree?: boolean;
}

export interface ThreatArticle {
  id: string;
  title: string;
  summary: string;
  content?: string;
  category: "Threat" | "CVE" | "Malware" | "Tool" | "Research" | "Attack" | "Defence";
  publicationDate: string;
  sourceUrl?: string;
  sourceName?: string;
  isSample?: boolean;
}

export interface Statistic {
  label: string;
  value: number | null; // null = render dash placeholder
  suffix?: string;
}

export interface Domain {
  id: string;
  name: string;
  description: string;
  glyph: string; // SVG path data
}
