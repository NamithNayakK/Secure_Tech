// ============================================================
// SITE CONFIGURATION — edit here, changes propagate everywhere
// ============================================================

export const SITE_CONFIG = {
  clubName: "Secure Tech Club",
  shortName: "Secure Tech",
  tagline: "Learn. Defend. Investigate. Build.",
  concept: "THE CYBER RANGE",
  heroHeadline: ["THINK LIKE AN", "ATTACKER.", "BUILD LIKE A", "DEFENDER."],
  heroSupport:
    "We are Secure Tech Club — a community of cybersecurity enthusiasts exploring digital security through hands-on learning, CTF competitions, research and innovation.",

  college: {
    name: "Global Academy of Technology",
    shortName: "GAT",
    city: "Bengaluru, India",
    url: "https://gat.ac.in/",
  },

  contact: {
    email: "securetech@gat.ac.in", // replace before launch
    instagram: "#",                 // replace with real handle
    linkedin: "#",                  // replace with real profile
    github: "#",                    // replace with real org
    twitter: "#",                   // replace with real handle
  },

  // Global flag: when true, placeholder/sample content shows a "SAMPLE" badge
  SHOW_SAMPLE_BADGES: true,
} as const;

export type SiteConfig = typeof SITE_CONFIG;
