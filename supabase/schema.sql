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
    headline_highlight TEXT NOT NULL DEFAULT 'Performance & Digital Marketing | Meta Ads, Google Ads and AI-Powered Creative Workflows',
    bio TEXT NOT NULL DEFAULT 'Performance and digital marketer managing ₹60K per month across Meta Ads and Google Ads: 3x ROAS, 30% lower CPC and up to 40% higher appointment enquiry rate. Uses AI videos and agents to replace costly shoots and speed up ad analysis. Driven by quick testing and killing losing ads so budget goes to winners; seeks full ownership and challenges that help me grow and learn more.',
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
    projects_subtitle TEXT DEFAULT 'Paid media campaigns, AI creative workflows, and healthcare content systems I''ve built and managed',
    stack_heading TEXT DEFAULT 'Tech & marketing stacks',
    blog_heading TEXT DEFAULT 'From my blog',
    blog_subtitle TEXT DEFAULT 'Personal notes on Meta Ads, Google Ads, AI creative workflows, conversion tracking, and digital content strategy.',
    footer_heading TEXT DEFAULT 'Let''s connect.',
    footer_tagline TEXT NOT NULL DEFAULT 'Always open to connecting with hiring teams, marketers, and founders about performance marketing roles and AI-powered creative workflows.',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- TABLE: right_now (Building, Learning, Current Projects, Based in)
-- -----------------------------------------------------------------------------
CREATE TABLE right_now (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    card_title TEXT NOT NULL DEFAULT 'Right now',
    building_title TEXT NOT NULL DEFAULT 'AI Video Ads & Creative Agents',
    building_desc TEXT NOT NULL DEFAULT 'Google Flow, Higgsfield, ElevenLabs & Claude Code ad-analysis workflows',
    learning TEXT NOT NULL DEFAULT 'Rapid creative testing, flagging ad fatigue early & scaling winning ads',
    current_projects TEXT NOT NULL DEFAULT 'NCD Immunocare (₹60K/mo Ads), Dr Saibal Moitra Clone & Meta Ads Analysis Agent',
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
-- TABLE: projects (My Projects, AI Creative Projects & Write-Ups)
-- -----------------------------------------------------------------------------
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'marketing',
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
-- Public can READ published data; ONLY server service_role or authenticated users can WRITE.
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

-- Grant PostgREST schema & table privileges (anon read-only, server service_role/authenticated full write)
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT SELECT ON site_profile, right_now, experiences, education, tech_stack, projects, posts TO anon;
GRANT ALL ON site_profile, right_now, experiences, education, tech_stack, projects, posts TO authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

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
-- SEED DATA (Updated Résumé Details for Girish Das / Rick)
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
    'Performance & Digital Marketing | Meta Ads, Google Ads and AI-Powered Creative Workflows',
    'Performance and digital marketer managing ₹60K per month across Meta Ads and Google Ads: 3x ROAS, 30% lower CPC and up to 40% higher appointment enquiry rate. Uses AI videos and agents to replace costly shoots and speed up ad analysis. Driven by quick testing and killing losing ads so budget goes to winners; seeks full ownership and challenges that help me grow and learn more.',
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
    'Paid media campaigns, AI creative workflows, and healthcare content systems I''ve built and managed',
    'Tech & marketing stacks',
    'From my blog',
    'Personal notes on Meta Ads, Google Ads, AI creative workflows, conversion tracking, and digital content strategy.',
    'Let''s connect.',
    'Always open to connecting with hiring teams, marketers, and founders about performance marketing roles and AI-powered creative workflows.'
);

INSERT INTO right_now (card_title, building_title, building_desc, learning, current_projects, based_in)
VALUES (
    'Right now',
    'AI Video Ads & Creative Agents',
    'Google Flow, Higgsfield, ElevenLabs & Claude Code ad-analysis workflows',
    'Rapid creative testing, flagging ad fatigue early & scaling winning ads',
    'NCD Immunocare (₹60K/mo Ads), Dr Saibal Moitra Clone & Meta Ads Analysis Agent',
    'Kolkata, India'
);

INSERT INTO experiences (role, company, description, period, order_index)
VALUES 
    (
        'Performance Marketing Executive',
        'NCD Immunocare Pvt Ltd (AATC), Kolkata',
        E'Manage ₹60K per month in ad spend across Meta Ads and Google Ads.\nAchieved 3x ROAS on Google Ads and a 30% lower cost per click (CPC).\nIncreased appointment enquiry rate by up to 40% on Meta Ads, with 80% of focus on high-winning creatives after Meta''s Andromeda update.\nJoined through a referral from one of my clients.',
        'May 2025 - Present',
        1
    ),
    (
        'Personal Healthcare Content and Website Manager',
        'Dr Saibal Moitra, Allergy Specialist',
        'Built Dr Saibal Moitra''s online presence as a trusted allergy specialist, giving patients reliable allergy information through authoritative content and a dedicated website.',
        'Mar 2025 - Present',
        2
    ),
    (
        'Organic Social Media Manager',
        'Freelance',
        E'Managed organic social media content and content calendars for 3 client accounts over 1.3 years.\nWound down freelance work in January 2025 after receiving a full-time job offer.',
        'Sep 2023 - Jan 2025 (1.3 years)',
        3
    );

INSERT INTO education (degree, institution, period, description, order_index)
VALUES
    ('B.Sc. (Honours), Chemistry', 'Taki Government College, West Bengal', 'Dropped out (2nd year)', 'Dropped out in 2nd year to pursue a full-time career in digital marketing. Self-taught performance marketing and content strategy through YouTube and X (Twitter), applied on live campaigns.', 1);

INSERT INTO tech_stack (category, color, skills, order_index)
VALUES 
    ('Paid Media', 'blue', ARRAY['Meta Ads', 'Google Ads', 'Creative Testing', 'A/B Testing', 'Audience Targeting', 'Budget Scaling'], 1),
    ('Analytics', 'mint', ARRAY['Google Analytics 4', 'Google Tag Manager', 'Conversion Tracking', 'CPC', 'CPL', 'CTR', 'ROAS Reporting'], 2),
    ('Content', 'yellow', ARRAY['Organic Social Media', 'Content Calendars', 'Copywriting', 'Video Storytelling', 'Authority Content', 'Canva'], 3),
    ('AI Automation', 'purple', ARRAY['Google Flow', 'Higgsfield', 'ElevenLabs', 'Claude Code', 'Antigravity', 'AI Agents', 'AI Video Production'], 4);

INSERT INTO projects (
    slug, title, category, description, content, client, role, duration,
    completion_date, made_by, image_url, screenshots, metrics, tags, color, live_url, featured, order_index
)
VALUES 
    (
        'ai-video-ad-production',
        'AI Video Ad Production',
        'ai-creative',
        'Storytelling and ad-style videos made with AI, replacing costly shoots and recordings.',
        '# AI Video Ad Production

## Overview & Why I Built This
Traditional video shoots slow down ad testing and inflate creative production costs. I built an end-to-end AI video production workflow using **Google Flow**, **Higgsfield**, and **ElevenLabs** so I can test more hooks and ad angles quickly.

## How I Completed It
- Scripted patient-first and direct-response ad hooks tailored to real audience objections.
- Generated realistic visual scenes with **Google Flow** and **Higgsfield** to replace expensive physical studio shoots.
- Produced natural voiceovers in **ElevenLabs** and assembled variations for rapid Meta Ads creative testing.',
        'AI Creative Workflow',
        'Performance & Creative Marketer',
        '2025 – Ongoing',
        '2025 – Ongoing',
        'Made by me',
        '',
        ARRAY[]::TEXT[],
        ARRAY['Zero Shoot Cost', 'Faster Ad Variations'],
        ARRAY['Google Flow', 'Higgsfield', 'ElevenLabs'],
        'yellow',
        '',
        true,
        1
    ),
    (
        'ai-creative-editing-agent',
        'AI Creative Editing Agent',
        'ai-creative',
        'Agent that edits my ad and social creative videos faster, so more variations get tested.',
        '# AI Creative Editing Agent

## Overview & Objective
Post-Andromeda Meta Ads reward rapid creative iteration. Manual editing became a bottleneck when preparing multiple hooks, aspect ratios, and cuts for testing.

## How I Completed It
- Built an **AI Creative Editing Agent** in **Antigravity** to automate repetitive cutting, pacing, and formatting tasks across ad and social videos.
- Standardized edit templates so raw AI scenes turn into ready-to-launch ad variations fast enough to feed weekly tests.',
        'AI Creative Workflow',
        'Builder & Marketer',
        '2025 – Ongoing',
        '2025 – Ongoing',
        'Made by me',
        '',
        ARRAY[]::TEXT[],
        ARRAY['Faster Turnaround', 'More Creative Tests'],
        ARRAY['Antigravity', 'AI Agents', 'Video Editing'],
        'mint',
        '',
        true,
        2
    ),
    (
        'digital-clone-dr-saibal-moitra',
        'Digital Clone of Dr Saibal Moitra',
        'ai-creative',
        'Full digital clone that grows his online presence without him recording.',
        '# Digital Clone of Dr Saibal Moitra

## Overview & Objective
Busy medical specialists rarely have time to sit in front of a camera every week, even though patients look for trustworthy doctor-led video education.

## How I Completed It
- Created a full AI digital clone workflow for **Dr Saibal Moitra** so educational allergy videos and social explainers ship consistently without taking up his clinical schedule.
- Combined clinically accurate scripts with natural AI voice and video synthesis to grow patient trust on social platforms.',
        'Dr Saibal Moitra, Allergy Specialist',
        'Digital & AI Workflow Manager',
        '2025 – Ongoing',
        '2025 – Ongoing',
        'Made by me',
        '',
        ARRAY[]::TEXT[],
        ARRAY['Zero Recording Time', 'Consistent Presence'],
        ARRAY['AI', 'Digital Clone', 'Video Storytelling'],
        'purple',
        '',
        true,
        3
    ),
    (
        'meta-ads-analysis-agent',
        'Meta Ads Analysis Agent (in progress)',
        'ai-creative',
        'Agent that flags ad fatigue and which creatives to stop or scale, so budget goes to winners.',
        '# Meta Ads Analysis Agent (in progress)

## Overview & Objective
Managing ₹60K/month across live ad sets means catching creative fatigue fast and shifting spend away from underperforming ads before budget is wasted.

## How I Am Building It
- Developing an analysis agent using **Claude Code** to inspect Meta Ads performance trends, flag rising CPA / falling CTR fatigue signals, and highlight which creatives to pause or scale.
- Built around one operating rule: kill losing ads quickly so budget goes to winners.',
        'Paid Media Automation',
        'Builder & Performance Marketer',
        'In Progress',
        'In Progress',
        'Made by me',
        '',
        ARRAY[]::TEXT[],
        ARRAY['Flags Ad Fatigue', 'Stop vs Scale Rules'],
        ARRAY['Claude Code', 'Meta Ads', 'AI Agents'],
        'yellow',
        '',
        true,
        4
    ),
    (
        'google-ads-meta-ads-performance',
        'Google Ads & Meta Ads Performance at NCD Immunocare',
        'marketing',
        'Manage ₹60K/month across Meta and Google Ads: 3x ROAS on Google Ads, 30% lower CPC, and up to 40% higher appointment enquiry rate.',
        '# Google Ads & Meta Ads Performance at NCD Immunocare

## Overview & Objective
As the Performance Marketing Executive at NCD Immunocare Pvt Ltd (AATC) in Kolkata, I manage ₹60,000 per month across Meta Ads and Google Ads to generate qualified patient appointment enquiries efficiently.

---

## How I Executed It

### 1. Google Ads Search & Display Restructuring
- Performed granular **keyword research** focused strictly on high-intent patient search queries rather than broad informational terms.
- Tightened match types and curated negative keyword lists to achieve a **30% lower CPC** and **3x ROAS**.
- Implemented clean **conversion tracking** via Google Tag Manager (GTM) and Google Analytics 4 (GA4).

### 2. Creative-First Meta Ads (Post-Andromeda Update)
- Shifted **80% of optimization focus toward high-winning creatives** after Meta''s Andromeda update.
- Killed losing ads quickly so budget stayed concentrated on winning variations, driving up to **40% higher appointment enquiry rate**.',
        'NCD Immunocare Pvt Ltd (AATC)',
        'Performance Marketing Executive',
        'May 2025 - Present',
        'May 2025 – Ongoing',
        'Made by me',
        '',
        ARRAY[]::TEXT[],
        ARRAY['3x Google Ads ROAS', '30% Lower CPC', '+40% Enquiry Rate'],
        ARRAY['Meta Ads', 'Google Ads', 'GA4 & GTM'],
        'mint',
        '',
        true,
        5
    ),
    (
        'doctor-authority-content-system',
        'Doctor Authority Content System — Dr Saibal Moitra',
        'marketing',
        'Built Dr Saibal Moitra''s online presence as a trusted allergy specialist with authoritative patient content and a dedicated website.',
        '# Doctor Authority Content System — Dr Saibal Moitra

## Overview & Objective
Patients searching for allergy diagnosis and specialist care need accurate, reassuring guidance. I built Dr Saibal Moitra''s online presence as a trusted allergy specialist through authoritative content and a dedicated website.

---

## How I Executed It
- Structured a dedicated patient-focused website presenting allergy services clearly on mobile and desktop.
- Produced authoritative medical content and content calendars giving patients reliable allergy information they can trust.',
        'Dr Saibal Moitra, Allergy Specialist',
        'Healthcare Content & Website Manager',
        'Mar 2025 - Present',
        'Mar 2025 – Ongoing',
        'Made by me',
        '',
        ARRAY[]::TEXT[],
        ARRAY['Trusted Online Authority', 'Dedicated Website'],
        ARRAY['Content Strategy', 'Authority Content', 'Healthcare Web'],
        'purple',
        '',
        true,
        6
    );

INSERT INTO posts (title, slug, excerpt, content, read_time, published_at, published)
VALUES 
    (
        'Focusing on High-Winning Creatives After Meta''s Andromeda Update',
        'meta-ads-andromeda-creative-strategy',
        'Why shifting 80% of optimization energy toward high-winning creatives and killing losing ads fast lifted appointment enquiries by up to 40%.',
        '# Focusing on High-Winning Creatives After Meta''s Andromeda Update

Media buying on Meta has evolved significantly. With deeper machine-learning retrieval models like Andromeda, creative relevance does the heavy lifting that granular interest targeting used to handle.

## What Changed in Practice
- Instead of splitting ₹60K/mo budgets across narrow audience pockets, consolidating campaigns lets delivery algorithms learn faster.
- Combining **AI Video Ad Production** (`Google Flow`, `Higgsfield`, `ElevenLabs`) with faster AI-assisted editing helps ship fresh hooks every week and kill losing ads early.

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
        'Replacing Expensive Video Shoots With AI Creative Workflows',
        'ai-creative-workflows-for-performance-ads',
        'How Google Flow, Higgsfield, ElevenLabs, and custom AI agents help performance marketers test more variations without studio budgets.',
        '# Replacing Expensive Video Shoots With AI Creative Workflows

In performance marketing, the team that tests more winning variations wins. Waiting weeks for studio shoots bottlenecks everything.

## My AI Creative Stack
- **Google Flow + Higgsfield + ElevenLabs** for ad-style storytelling videos.
- **Antigravity** creative editing workflows to assemble variations faster.
- **Claude Code** ad-analysis workflows to spot fatigue early and move budget straight to winners.',
        '4 min read',
        CURRENT_DATE - INTERVAL '19 days',
        true
    );
