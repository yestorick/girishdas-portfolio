-- ==============================================================================
-- Girish Das (Rick) - Personal Portfolio Supabase Database Schema (Fresh Setup)
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- NOTE: To upgrade an existing database WITHOUT losing data, run
--       supabase/migrations_update.sql instead!
-- ==============================================================================

-- 1. Drop existing tables if re-running (safe clean setup)
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS tech_stack CASCADE;
DROP TABLE IF EXISTS education CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS right_now CASCADE;
DROP TABLE IF EXISTS site_profile CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

-- -----------------------------------------------------------------------------
-- TABLE: site_profile (Profile, Hero Copy, Section Titles, Socials, SEO, Footer)
-- -----------------------------------------------------------------------------
CREATE TABLE site_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL DEFAULT 'Girish Das',
    nickname TEXT DEFAULT 'Rick',
    avatar_url TEXT DEFAULT '',
    nav_logo TEXT NOT NULL DEFAULT 'Girish Das',
    status_badge TEXT NOT NULL DEFAULT 'Open to opportunities',
    headline_intro TEXT NOT NULL DEFAULT 'Hi, I''m Girish Das.',
    headline_highlight TEXT NOT NULL DEFAULT 'Performance & Digital Marketing Executive',
    bio TEXT NOT NULL DEFAULT 'Performance and digital marketer with 2.5 years of experience managing Google Ads and Meta Ads, delivering 3x ROAS, 30% lower CPC, and authoritative healthcare content that earns patient trust.',
    email TEXT NOT NULL DEFAULT 'hellorick73@gmail.com',
    phone TEXT DEFAULT '+91 81012 03353',
    location TEXT DEFAULT 'Kolkata, India',
    website_url TEXT DEFAULT 'https://hellorick.vercel.app',
    resume_url TEXT DEFAULT '#',
    github_url TEXT DEFAULT 'https://github.com/yestorick',
    linkedin_url TEXT DEFAULT 'https://linkedin.com/in/hellogirish',
    twitter_url TEXT DEFAULT 'https://x.com/girishdas',
    hero_primary_cta TEXT DEFAULT 'Contact me',
    hero_secondary_cta TEXT DEFAULT 'My project & works',
    experience_heading TEXT DEFAULT 'Experience',
    projects_heading TEXT DEFAULT 'My projects',
    projects_subtitle TEXT DEFAULT 'Campaigns, content systems, and digital projects I''ve built and managed',
    stack_heading TEXT DEFAULT 'Tech & marketing stacks',
    blog_heading TEXT DEFAULT 'From my blog',
    blog_subtitle TEXT DEFAULT 'Personal notes on Google Ads, Meta Ads creatives, conversion tracking, and digital content strategy.',
    footer_heading TEXT DEFAULT 'Let''s connect.',
    footer_tagline TEXT NOT NULL DEFAULT 'Always open to connecting with hiring teams, marketers, and founders about performance marketing roles and digital projects.',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- TABLE: right_now (Building, Learning, Current Projects, Based in)
-- -----------------------------------------------------------------------------
CREATE TABLE right_now (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    card_title TEXT NOT NULL DEFAULT 'Right now',
    building_title TEXT NOT NULL DEFAULT 'Google & Meta Lead Gen Funnels',
    building_desc TEXT NOT NULL DEFAULT 'Managing ₹60K/mo ad spend and high-converting healthcare campaigns',
    learning TEXT NOT NULL DEFAULT 'Post-Andromeda creative testing workflows & GA4 conversion attribution',
    current_projects TEXT NOT NULL DEFAULT 'NCD Immunocare Ads + Dr Saibal Moitra Authority Website',
    based_in TEXT NOT NULL DEFAULT 'Kolkata, India',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- TABLE: experiences (Career Track Record)
-- -----------------------------------------------------------------------------
CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    description TEXT NOT NULL,
    period TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- TABLE: education (Education & Self-Learning for Résumé)
-- -----------------------------------------------------------------------------
CREATE TABLE education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- TABLE: tech_stack (Tech & Marketing Stacks)
-- -----------------------------------------------------------------------------
CREATE TABLE tech_stack (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL,
    color TEXT NOT NULL DEFAULT 'blue',
    skills TEXT[] NOT NULL DEFAULT '{}',
    order_index INT NOT NULL DEFAULT 0
);

-- -----------------------------------------------------------------------------
-- TABLE: projects (My Projects & Detailed Case Studies)
-- -----------------------------------------------------------------------------
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    client TEXT,
    role TEXT,
    duration TEXT,
    completion_date TEXT,
    made_by TEXT DEFAULT 'Made by me',
    screenshots TEXT[] NOT NULL DEFAULT '{}',
    metrics TEXT[] NOT NULL DEFAULT '{}',
    tags TEXT[] NOT NULL DEFAULT '{}',
    color TEXT NOT NULL DEFAULT 'yellow',
    image_url TEXT,
    live_url TEXT,
    github_url TEXT,
    featured BOOLEAN DEFAULT true,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- TABLE: posts (Blog Articles with Markdown Content)
-- -----------------------------------------------------------------------------
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    read_time TEXT NOT NULL DEFAULT '4 min read',
    published_at DATE NOT NULL DEFAULT CURRENT_DATE,
    published BOOLEAN NOT NULL DEFAULT true,
    cover_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------
ALTER TABLE site_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE right_now ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" ON site_profile FOR SELECT USING (true);
CREATE POLICY "Right now is viewable by everyone" ON right_now FOR SELECT USING (true);
CREATE POLICY "Experiences are viewable by everyone" ON experiences FOR SELECT USING (true);
CREATE POLICY "Education is viewable by everyone" ON education FOR SELECT USING (true);
CREATE POLICY "Tech stack is viewable by everyone" ON tech_stack FOR SELECT USING (true);
CREATE POLICY "Projects are viewable by everyone" ON projects FOR SELECT USING (true);
CREATE POLICY "Published posts are viewable by everyone" ON posts FOR SELECT USING (published = true);

CREATE POLICY "Admins have full access to site_profile" ON site_profile FOR ALL TO authenticated USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to right_now" ON right_now FOR ALL TO authenticated USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to experiences" ON experiences FOR ALL TO authenticated USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to education" ON education FOR ALL TO authenticated USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to tech_stack" ON tech_stack FOR ALL TO authenticated USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to projects" ON projects FOR ALL TO authenticated USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to posts" ON posts FOR ALL TO authenticated USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- -----------------------------------------------------------------------------
-- SUPABASE STORAGE BUCKET (Profile Photo, Thumbnails, Screenshots, Blog Images)
-- -----------------------------------------------------------------------------
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('portfolio-media', 'portfolio-media', true)
  ON CONFLICT (id) DO UPDATE SET public = true;

  DROP POLICY IF EXISTS "Public read access for portfolio-media" ON storage.objects;
  CREATE POLICY "Public read access for portfolio-media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-media');

  DROP POLICY IF EXISTS "Authenticated manage access for portfolio-media" ON storage.objects;
  CREATE POLICY "Authenticated manage access for portfolio-media"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'portfolio-media')
  WITH CHECK (bucket_id = 'portfolio-media');
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Storage bucket or policy skipped (%). You can create the public "portfolio-media" bucket in Supabase Dashboard -> Storage.', SQLERRM;
END $$;

-- -----------------------------------------------------------------------------
-- SEED DATA (Authentic Personal Details for Girish Das / Rick)
-- -----------------------------------------------------------------------------
INSERT INTO site_profile (
    name, nickname, avatar_url, nav_logo, status_badge, headline_intro, headline_highlight,
    bio, email, phone, location, website_url, resume_url, github_url, linkedin_url, twitter_url,
    hero_primary_cta, hero_secondary_cta, experience_heading, projects_heading, projects_subtitle,
    stack_heading, blog_heading, blog_subtitle, footer_heading, footer_tagline
)
VALUES (
    'Girish Das',
    'Rick',
    '',
    'Girish Das',
    'Open to opportunities',
    'Hi, I''m Girish Das.',
    'Performance & Digital Marketing Executive',
    'Performance and digital marketer with 2.5 years of experience managing Google Ads and Meta Ads, delivering 3x ROAS, 30% lower CPC, and authoritative healthcare content that earns patient trust.',
    'hellorick73@gmail.com',
    '+91 81012 03353',
    'Kolkata, India',
    'https://hellorick.vercel.app',
    '#',
    'https://github.com/yestorick',
    'https://linkedin.com/in/hellogirish',
    'https://x.com/girishdas',
    'Contact me',
    'My project & works',
    'Experience',
    'My projects',
    'Campaigns, content systems, and digital projects I''ve built and managed',
    'Tech & marketing stacks',
    'From my blog',
    'Personal notes on Google Ads, Meta Ads creatives, conversion tracking, and digital content strategy.',
    'Let''s connect.',
    'Always open to connecting with hiring teams, marketers, and founders about performance marketing roles and digital projects.'
);

INSERT INTO right_now (card_title, building_title, building_desc, learning, current_projects, based_in)
VALUES (
    'Right now',
    'Google & Meta Lead Gen Funnels',
    'Managing ₹60K/mo ad spend and high-converting healthcare campaigns',
    'Post-Andromeda creative testing workflows & GA4 conversion attribution',
    'NCD Immunocare Ads + Dr Saibal Moitra Authority Website',
    'Kolkata, India'
);

INSERT INTO experiences (role, company, description, period, order_index)
VALUES 
    ('Performance Marketing Executive', 'NCD Immunocare Pvt Ltd (AATC), Kolkata', 'Managing ₹60K/month across Google Ads & Meta Ads; delivered 3x ROAS on Google Ads, 30% lower CPC, and up to 40% higher appointment enquiry rate on Meta Ads.', 'May 2025 - Present', 1),
    ('Personal Healthcare Content and Website Manager', 'Dr Saibal Moitra, Allergy Specialist', 'Established Dr Saibal Moitra as a trusted allergy specialist online through authoritative medical content and a dedicated patient-focused website.', 'Mar 2025 - Present', 2),
    ('Organic Social Media Manager', 'Freelance', 'Acquired 4 freelance clients independently and delivered 1.3 years of consistent organic social media content before taking a full-time marketing role.', 'Sep 2023 - Jan 2025', 3);

INSERT INTO education (degree, institution, period, description, order_index)
VALUES
    ('B.Sc. (Honours), Chemistry', 'Taki Government College, West Bengal', 'Dropout (2nd year)', 'Dropped out to pursue a full-time career in digital marketing. Self-taught performance marketing and content strategy through YouTube and X (Twitter), applied on live campaigns.', 1);

INSERT INTO tech_stack (category, color, skills, order_index)
VALUES 
    ('Paid Media', 'blue', ARRAY['Google Ads (Search, Display)', 'Meta Ads', 'Keyword Research', 'Audience Targeting', 'A/B Testing', 'Budget Optimisation'], 1),
    ('Analytics & Tracking', 'mint', ARRAY['Google Analytics 4', 'Google Tag Manager', 'Conversion Tracking', 'CPC / CPL / CTR', 'ROAS Reporting'], 2),
    ('Content & Creative', 'yellow', ARRAY['Organic Social Media', 'Content Calendars', 'Copywriting', 'Authority Content', 'Canva'], 3),
    ('Tech & Outreach', 'purple', ARRAY['Next.js & Vercel', 'Supabase', 'Healthcare Websites', 'Cold Outreach (Phone & Email)'], 4);

INSERT INTO projects (
    slug, title, description, content, client, role, duration,
    completion_date, made_by, image_url, screenshots, metrics, tags, color, live_url, featured, order_index
)
VALUES 
    (
        'google-ads-meta-ads-performance',
        'Google Ads & Meta Ads Performance at NCD Immunocare',
        'Managed ₹60K/month across Google and Meta Ads, delivering 3x ROAS, 30% lower CPC, and up to 40% more appointment enquiries.',
        '# Google Ads & Meta Ads Performance at NCD Immunocare

## Overview & Objective
As the Performance Marketing Executive at NCD Immunocare Pvt Ltd (AATC) in Kolkata, I manage a monthly paid media budget of ₹60,000 across Google Ads and Meta Ads with one core goal: driving qualified patient appointment enquiries efficiently.

---

## How I Executed It

### 1. Google Ads Search & Display Restructuring
- Performed granular **keyword research** focused strictly on high-intent patient search queries rather than broad informational terms.
- Tightened match types and curated negative keyword lists to eliminate irrelevant ad clicks.
- Implemented clean **conversion tracking** via Google Tag Manager (GTM) and Google Analytics 4 (GA4) to measure true enquiry completions instead of vanity clicks.

### 2. Creative-First Meta Ads (Post-Andromeda Update)
- Following Meta''s Andromeda retrieval update, shifted **80% of optimization focus toward high-winning creatives** and clearer patient hooks rather than over-segmenting ad sets.
- Ran structured A/B tests comparing educational healthcare creatives against direct appointment booking formats.
- Aligned landing expectations closely with the ad copy so visitors could enquire quickly.

---

## Verified Results

| Metric | Channel | Result Achieved |
| :--- | :--- | :--- |
| **Return on Ad Spend (ROAS)** | Google Ads | **3x ROAS** |
| **Cost Per Click (CPC)** | Google & Meta Ads | **30% Reduction** |
| **Appointment Enquiry Rate** | Meta Ads | **Up to 40% Increase** |
| **Monthly Ad Spend Managed** | Multi-Channel | **₹60,000 / month** |',
        'NCD Immunocare Pvt Ltd (AATC)',
        'Performance Marketing Executive',
        'May 2025 - Present',
        'May 2025 – Ongoing',
        'Made by me',
        '',
        ARRAY[]::TEXT[],
        ARRAY['3x Google Ads ROAS', '30% Lower CPC', '+40% Enquiry Rate'],
        ARRAY['Google Ads', 'Meta Ads', 'GA4 & GTM'],
        'yellow',
        '',
        true,
        1
    ),
    (
        'doctor-authority-content-system',
        'Doctor Authority Content System — Dr Saibal Moitra',
        'Built a dedicated healthcare website and authoritative allergy content hub positioning Dr Saibal Moitra as a trusted specialist online.',
        '# Doctor Authority Content System — Dr Saibal Moitra

## Overview & Objective
Patients searching for allergy diagnosis and specialist care often encounter confusing or unreliable advice online. My goal was to establish Dr Saibal Moitra as a credible, approachable allergy specialist with authoritative digital content patients can trust.

---

## How I Executed It

### 1. Dedicated Website Experience
- Structured a clean, dedicated web presence explaining diagnostic services, allergy triggers, and appointment booking steps clearly.
- Removed visual clutter so patients on mobile devices can read information comfortably and reach out without friction.

### 2. Authoritative Patient-First Copywriting
- Translated complex clinical allergy concepts into calm, accurate, easy-to-understand articles and guides.
- Maintained a structured **content calendar** covering seasonal allergies, testing clarity, and preventive education.

---

## Key Outcome
Established a reliable, trusted online presence that serves both existing patients seeking clear follow-up resources and new patients evaluating an allergy specialist.',
        'Dr Saibal Moitra, Allergy Specialist',
        'Healthcare Content & Website Manager',
        'Mar 2025 - Present',
        'Mar 2025 – Ongoing',
        'Made by me',
        '',
        ARRAY[]::TEXT[],
        ARRAY['Trusted Online Authority', 'Dedicated Medical Hub', 'Clear Patient Education'],
        'mint',
        '',
        true,
        2
    ),
    (
        'personal-portfolio-website',
        'Personal Portfolio Website (hellorick.vercel.app)',
        'Designed and launched my personal site powered by Next.js, Tailwind CSS, and Supabase to present my paid ads and content work.',
        '# Personal Portfolio Website (hellorick.vercel.app)

## Why I Built This Site
As a performance and digital marketer, I wanted a personal home on the internet—not a generic template or agency clone—where hiring teams, recruiters, and founders can clearly read how I approach Google Ads, Meta Ads, conversion tracking, and content strategy.

---

## Technical & Content Architecture

### 1. Structured Supabase Backend
- Organized all career data—experience, tech & marketing stacks, projects, blog notes, and education—into clean PostgreSQL tables on **Supabase**.
- Allows adding new campaign breakdowns or marketing articles quickly in Markdown without touching application code.

### 2. Calm, Eye-Soothing Personal UI
- Focused on readable typography, muted neutral tones with selective warm highlights, and responsive single-column mobile formatting.
- Includes an integrated printable résumé page tailored for recruiters.',
        'Personal Brand & Career',
        'Creator & Marketer',
        'Ongoing',
        'Nov 2026',
        'Made by me',
        '',
        ARRAY[]::TEXT[],
        ARRAY['Mobile-First Design', 'Supabase Dynamic CMS', 'Custom Case Studies'],
        'purple',
        '',
        true,
        3
    );

INSERT INTO posts (title, slug, excerpt, content, read_time, published_at, published)
VALUES 
    (
        'Focusing on High-Winning Creatives After Meta''s Andromeda Update',
        'meta-ads-andromeda-creative-strategy',
        'Why shifting 80% of optimization energy from micro-targeting toward ad creatives increased appointment enquiry rates by up to 40%.',
        '# Focusing on High-Winning Creatives After Meta''s Andromeda Update

Media buying on Meta has evolved significantly. With deeper machine-learning retrieval models like Andromeda, creative relevance does the heavy lifting that granular interest targeting used to handle.

## What Changed in Practice
- Instead of splitting small budgets across dozens of narrow audience pockets, consolidating campaigns lets delivery algorithms learn faster.
- Testing distinct **hook angles and clear patient/customer value propositions** yields dramatically stronger enquiry quality.

## Measuring What Actually Matters
Pairing creative testing with clean **GTM & GA4 conversion tracking** ensures optimization chases real enquiries rather than cheap clicks.',
        '4 min read',
        CURRENT_DATE - INTERVAL '3 days',
        true
    ),
    (
        'Cutting Google Ads CPC by 30% While Maintaining 3x ROAS',
        'cutting-google-ads-cpc-3x-roas',
        'Practical keyword sculpting, search term hygiene, and landing alignment steps for lean monthly budgets like ₹60K/mo.',
        '# Cutting Google Ads CPC by 30% While Maintaining 3x ROAS

Managing a focused monthly budget (such as ₹60K/mo) leaves zero room for wasted search spend.

## Three Levers That Made the Biggest Difference
1. **Intent-First Keyword Research**: Separating high-intent service queries from broad research phrases.
2. **Weekly Search Term Audits**: Adding negative keywords proactively before spend leaks out.
3. **Ad-to-Page Continuity**: Ensuring the landing page speaks directly to the visitor''s immediate question so bounce rate drops and Quality Score improves.',
        '5 min read',
        CURRENT_DATE - INTERVAL '11 days',
        true
    ),
    (
        'Why Trusted Content Matters More Than Ever in Healthcare Marketing',
        'healthcare-authority-content-trust',
        'Lessons from managing online authority and patient education websites for medical specialists.',
        '# Why Trusted Content Matters More Than Ever in Healthcare Marketing

In medical and healthcare categories, aggressive sales copy backfires. Patients are looking for clarity, empathy, and accuracy.

## Building Lasting Authority
- Explain conditions, triggers, and next steps in plain, accurate language.
- Keep the dedicated website calm, uncluttered, and easy to read on a smartphone.
- Consistency across website copy and organic content compounds credibility over months.',
        '4 min read',
        CURRENT_DATE - INTERVAL '19 days',
        true
    );
