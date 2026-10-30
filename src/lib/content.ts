/**
 * Data-access layer. Swap the local imports for Supabase queries
 * in the commented sections below to connect a live database.
 */
import { EVENTS } from "../data/events";
import { PROJECTS } from "../data/projects";
import { TEAM } from "../data/team";
import { ACHIEVEMENTS } from "../data/achievements";
import { CHALLENGES } from "../data/challenges";
import { THREAT_ARTICLES } from "../data/threatArticles";
import { STATISTICS } from "../data/statistics";
import { DOMAINS } from "../data/domains";
import { LEARNING_PATHS, SECURITY_RESOURCES } from "../data/resources";
import type { Event, Project, TeamMember, Achievement, Challenge, ThreatArticle } from "../types";

// ── Events ───────────────────────────────────────────────────
export const getEvents = (): Event[] => EVENTS;
export const getUpcomingEvents = (): Event[] => EVENTS.filter((e) => e.status === "upcoming");
export const getPastEvents = (): Event[] => EVENTS.filter((e) => e.status === "completed");
export const getEventBySlug = (slug: string): Event | undefined =>
  EVENTS.find((e) => e.slug === slug);

// ── Projects ─────────────────────────────────────────────────
export const getProjects = (): Project[] => PROJECTS;
export const getFeaturedProjects = (): Project[] => PROJECTS.filter((p) => p.featured);
export const getProjectBySlug = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug);

// ── Team ─────────────────────────────────────────────────────
export const getTeam = (): TeamMember[] => TEAM;
export const getTeamByRole = (team: TeamMember["team"]): TeamMember[] =>
  TEAM.filter((m) => m.team === team);

// ── Achievements ─────────────────────────────────────────────
export const getAchievements = (): Achievement[] => ACHIEVEMENTS;

// ── Challenges ───────────────────────────────────────────────
export const getChallenges = (): Challenge[] => CHALLENGES;
export const getChallengeOfWeek = (): Challenge | undefined =>
  CHALLENGES.find((c) => c.isChallengeOfWeek);
export const getChallengeBySlug = (slug: string): Challenge | undefined =>
  CHALLENGES.find((c) => c.slug === slug);

// ── Threat Intelligence ──────────────────────────────────────
export const getThreatArticles = (): ThreatArticle[] => THREAT_ARTICLES;

// ── Statistics ───────────────────────────────────────────────
export const getStatistics = () => STATISTICS;

// ── Domains ──────────────────────────────────────────────────
export const getDomains = () => DOMAINS;

// ── Learning Paths ───────────────────────────────────────────
export const getLearningPaths = () => LEARNING_PATHS;

// ── Resources ────────────────────────────────────────────────
export const getSecurityResources = () => SECURITY_RESOURCES;
