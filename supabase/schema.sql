-- KBlueBio Supabase schema
-- Run this in the Supabase SQL Editor before seed.sql

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS news_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('notice', 'press', 'disclosure', 'ir')),
  title TEXT NOT NULL,
  date DATE NOT NULL,
  author TEXT NOT NULL DEFAULT '홍보팀',
  views INTEGER NOT NULL DEFAULT 0,
  content TEXT NOT NULL,
  files JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS papers_patents (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('paper', 'patent')),
  title_ko TEXT NOT NULL,
  title_en TEXT NOT NULL,
  journal_ko TEXT NOT NULL DEFAULT '',
  journal_en TEXT NOT NULL DEFAULT '',
  authors_ko TEXT NOT NULL DEFAULT '',
  authors_en TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL,
  status_ko TEXT NOT NULL,
  status_en TEXT NOT NULL,
  number TEXT,
  summary_ko TEXT NOT NULL,
  summary_en TEXT NOT NULL,
  link TEXT,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  files JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_news_posts_published_date ON news_posts (is_published, date DESC);
CREATE INDEX IF NOT EXISTS idx_papers_patents_published_date ON papers_patents (is_published, date DESC);

ALTER TABLE news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE papers_patents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published news" ON news_posts;
CREATE POLICY "Public read published news"
  ON news_posts
  FOR SELECT
  USING (is_published = true);

DROP POLICY IF EXISTS "Public read published papers" ON papers_patents;
CREATE POLICY "Public read published papers"
  ON papers_patents
  FOR SELECT
  USING (is_published = true);
