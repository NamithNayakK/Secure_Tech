-- ============================================================
-- SECURE TECH CLUB — Supabase SQL Schema
-- Run this in the Supabase SQL editor to set up all tables.
-- ============================================================

-- Events
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  status TEXT CHECK (status IN (''upcoming'', ''completed'')) NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  end_date DATE,
  venue TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  registration_link TEXT,
  tags TEXT[],
  banner_image TEXT,
  is_sample BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  category TEXT NOT NULL,
  tags TEXT[],
  github_url TEXT,
  demo_url TEXT,
  status TEXT CHECK (status IN (''active'', ''completed'', ''archived'')) NOT NULL DEFAULT ''active'',
  featured BOOLEAN DEFAULT FALSE,
  cover_image TEXT,
  is_sample BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Members
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  team TEXT NOT NULL,
  department TEXT,
  semester INTEGER,
  interests TEXT[],
  photo TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  is_sample BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Achievements
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  participants TEXT[],
  rank TEXT,
  certificate TEXT,
  photo TEXT,
  is_sample BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Challenges
CREATE TABLE IF NOT EXISTS challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN (''Beginner'', ''Intermediate'', ''Advanced'')) NOT NULL,
  time_estimate TEXT,
  description TEXT NOT NULL,
  scenario TEXT,
  instructions TEXT[],
  hints TEXT[],
  solution TEXT,
  explanation TEXT,
  is_challenge_of_week BOOLEAN DEFAULT FALSE,
  is_sample BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Threat articles
CREATE TABLE IF NOT EXISTS threat_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT,
  category TEXT NOT NULL,
  publication_date DATE NOT NULL,
  source_url TEXT,
  source_name TEXT,
  is_sample BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Membership enquiries (from Join form)
CREATE TABLE IF NOT EXISTS membership_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  department TEXT NOT NULL,
  semester INTEGER NOT NULL,
  interests TEXT[],
  why_join TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security: enquiries are insert-only for anon users
ALTER TABLE membership_enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous inserts" ON membership_enquiries
  FOR INSERT TO anon WITH CHECK (true);

-- Events and projects are read-only for anon
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon reads" ON events FOR SELECT TO anon USING (true);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon reads" ON projects FOR SELECT TO anon USING (true);

ALTER TABLE members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon reads" ON members FOR SELECT TO anon USING (true);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon reads" ON achievements FOR SELECT TO anon USING (true);

ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon reads" ON challenges FOR SELECT TO anon USING (true);

ALTER TABLE threat_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon reads" ON threat_articles FOR SELECT TO anon USING (true);
