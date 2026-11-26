-- ==============================================================================
-- Girish Das - Performance Marketer & Growth Strategist Portfolio Schema
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Drop existing tables if re-running (safe re-run)
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS tech_stack CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS right_now CASCADE;
DROP TABLE IF EXISTS site_profile CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

-- -----------------------------------------------------------------------------
-- TABLE: site_profile (Bio, Hero Headline, Socials, Avatar, Resume)
-- -----------------------------------------------------------------------------
CREATE TABLE site_profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL DEFAULT 'Girish Das',
    avatar_url TEXT DEFAULT '', -- Drop your photo URL here!
    nav_logo TEXT NOT NULL DEFAULT 'GIRISH DAS',
    status_badge TEXT NOT NULL DEFAULT 'Open to opportunities',
    headline_intro TEXT NOT NULL DEFAULT 'Hi, I''m Girish Das. I build',
    headline_highlight TEXT NOT NULL DEFAULT 'high-ROI digital growth & paid ads',
    bio TEXT NOT NULL DEFAULT 'Performance Marketer & Digital Growth Strategist scaling multi-channel paid acquisition across Meta, Google, and TikTok. I engineer high-converting landing pages, optimize ROAS, and scale ad budgets profitably.',
    email TEXT NOT NULL DEFAULT 'girishdas@gmail.com',
    resume_url TEXT DEFAULT '#',
    github_url TEXT DEFAULT 'https://github.com/yestorick',
    linkedin_url TEXT DEFAULT 'https://linkedin.com/in/girishdas',
    twitter_url TEXT DEFAULT 'https://x.com/girishdas',
    footer_tagline TEXT NOT NULL DEFAULT 'Available for full-time growth leadership roles, performance marketing contracts, or high-scale paid acquisition audits.',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- TABLE: right_now (What you're currently building, learning, reading, based in)
-- -----------------------------------------------------------------------------
CREATE TABLE right_now (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    building_title TEXT NOT NULL DEFAULT 'Scalable Paid Acquisition Funnels',
    building_desc TEXT NOT NULL DEFAULT 'Managing multi-channel ad spend & high-intent CRO landing pages',
    learning TEXT NOT NULL DEFAULT 'AI-driven creative testing & cookieless attribution models (GA4 + CAPI)',
    reading TEXT NOT NULL DEFAULT 'Breakthrough Advertising by Eugene Schwartz',
    based_in TEXT NOT NULL DEFAULT 'Bengaluru, India',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- TABLE: experiences (Career & Growth track record)
-- -----------------------------------------------------------------------------
CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    description TEXT NOT NULL,
    period TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- TABLE: tech_stack (Paid Channels, Tracking, CRO, Marketing Ops)
-- -----------------------------------------------------------------------------
CREATE TABLE tech_stack (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL, -- 'Paid Channels & Ads', 'Analytics & Tracking', 'CRO & Funnels', 'Marketing Tools & Ops'
    color TEXT NOT NULL DEFAULT 'blue', -- 'blue', 'mint', 'yellow', 'purple'
    skills TEXT[] NOT NULL DEFAULT '{}',
    order_index INT NOT NULL DEFAULT 0
);

-- -----------------------------------------------------------------------------
-- TABLE: projects (Recent Work & In-Depth Case Studies)
-- -----------------------------------------------------------------------------
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL, -- Detailed Case Study in Markdown
    client TEXT,
    role TEXT,
    duration TEXT,
    metrics TEXT[] NOT NULL DEFAULT '{}',
    tags TEXT[] NOT NULL DEFAULT '{}',
    color TEXT NOT NULL DEFAULT 'yellow', -- 'yellow', 'mint', 'purple'
    image_url TEXT,
    live_url TEXT,
    github_url TEXT,
    featured BOOLEAN DEFAULT true,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- TABLE: favorites (Books, Podcasts, Films & Shows, Tools I love)
-- -----------------------------------------------------------------------------
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL, -- 'Books', 'Podcasts', 'Films & shows', 'Tools I love'
    icon TEXT NOT NULL DEFAULT 'book', -- 'book', 'music', 'film', 'tool'
    color TEXT NOT NULL DEFAULT 'peach', -- 'peach', 'blue', 'purple', 'mint'
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0
);

-- -----------------------------------------------------------------------------
-- TABLE: posts (Marketing Blog Articles with Markdown Content)
-- -----------------------------------------------------------------------------
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL, -- Markdown
    read_time TEXT NOT NULL DEFAULT '5 min read',
    published_at DATE NOT NULL DEFAULT CURRENT_DATE,
    published BOOLEAN NOT NULL DEFAULT true,
    cover_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Anyone can READ (SELECT). Only authenticated admins can INSERT/UPDATE/DELETE.
-- -----------------------------------------------------------------------------
ALTER TABLE site_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE right_now ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Public READ access
CREATE POLICY "Public profiles are viewable by everyone" ON site_profile FOR SELECT USING (true);
CREATE POLICY "Right now is viewable by everyone" ON right_now FOR SELECT USING (true);
CREATE POLICY "Experiences are viewable by everyone" ON experiences FOR SELECT USING (true);
CREATE POLICY "Tech stack is viewable by everyone" ON tech_stack FOR SELECT USING (true);
CREATE POLICY "Projects are viewable by everyone" ON projects FOR SELECT USING (true);
CREATE POLICY "Favorites are viewable by everyone" ON favorites FOR SELECT USING (true);
CREATE POLICY "Published posts are viewable by everyone" ON posts FOR SELECT USING (published = true);

-- Authenticated (Admin) FULL access
CREATE POLICY "Admins have full access to site_profile" ON site_profile FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to right_now" ON right_now FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to experiences" ON experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to tech_stack" ON tech_stack FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to favorites" ON favorites FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to posts" ON posts FOR ALL USING (auth.role() = 'authenticated');

-- -----------------------------------------------------------------------------
-- SEED DATA (Performance Marketer Persona for Girish Das)
-- -----------------------------------------------------------------------------
INSERT INTO site_profile (name, avatar_url, nav_logo, status_badge, headline_intro, headline_highlight, bio, email, resume_url, github_url, linkedin_url, twitter_url, footer_tagline)
VALUES (
    'Girish Das',
    '',
    'GIRISH DAS',
    'Open to opportunities',
    'Hi, I''m Girish Das. I build',
    'high-ROI digital growth & paid ads',
    'Performance Marketer & Digital Growth Strategist scaling multi-channel paid acquisition across Meta, Google, and TikTok. I engineer high-converting landing pages, optimize ROAS, and scale ad budgets profitably.',
    'girishdas@gmail.com',
    '#',
    'https://github.com/yestorick',
    'https://linkedin.com/in/girishdas',
    'https://x.com/girishdas',
    'Available for full-time growth leadership roles, performance marketing contracts, or high-scale paid acquisition audits.'
);

INSERT INTO right_now (building_title, building_desc, learning, reading, based_in)
VALUES (
    'Scalable Paid Acquisition Funnels',
    'Managing multi-channel ad spend & high-intent CRO landing pages',
    'AI-driven creative testing & cookieless attribution models (GA4 + CAPI)',
    'Breakthrough Advertising by Eugene Schwartz',
    'Bengaluru, India'
);

INSERT INTO experiences (role, company, description, period, order_index)
VALUES 
    ('Lead Performance Marketer', 'GrowthScale Media', 'Managing $150K+/month paid media spend across Meta, Google Ads & TikTok; scaled client revenue by 320% with 4.5x average ROAS.', '2024 - Now', 1),
    ('Senior Digital Marketing Specialist', 'OmniDigital Agency', 'Spearheaded full-funnel paid search & paid social campaigns, built high-converting landing pages, and implemented GA4 server-side tracking.', '2022 - 2024', 2),
    ('Digital Marketing & Acquisition Associate', 'Vanguard Growth Labs', 'Conducted rigorous A/B creative testing, audience segmentation, and email nurture workflows with a 42% decrease in blended CAC.', '2020 - 2022', 3);

INSERT INTO tech_stack (category, color, skills, order_index)
VALUES 
    ('Paid Channels & Ads', 'blue', ARRAY['Meta Ads (FB/IG)', 'Google Search & PMax', 'TikTok Ads', 'YouTube Ads', 'LinkedIn Ads'], 1),
    ('Analytics & Tracking', 'mint', ARRAY['Google Analytics 4', 'Google Tag Manager', 'Meta Conversions API', 'Looker Studio', 'Triple Whale'], 2),
    ('CRO & Funnels', 'yellow', ARRAY['Unbounce', 'Webflow', 'Shopify Plus', 'Optimizely', 'Hotjar', 'VWO'], 3),
    ('Marketing Tools & Ops', 'purple', ARRAY['Klaviyo', 'HubSpot', 'Zapier Automation', 'SEMrush & Ahrefs', 'Canva Pro', 'PostHog'], 4);

INSERT INTO projects (slug, title, description, content, client, role, duration, metrics, tags, color, live_url, featured, order_index)
VALUES 
    (
        'scaling-d2c-brand-meta-tiktok',
        'Scaling D2C E-Commerce Brand from $30K to $180K/mo',
        'Multi-channel paid social acquisition blitz on Meta & TikTok paired with dynamic landing page CRO that lowered CAC by 38%.',
        '# Scaling D2C E-Commerce Brand from $30K to $180K/mo

## Overview & The Challenge
The brand had strong product-market fit with organic word-of-mouth but was stuck at ~$30,000 in monthly revenue. Prior agency campaigns were suffering from high customer acquisition costs (CAC > $65) and rapid ad creative fatigue on Meta within 7 to 10 days.

### Core Objectives:
- Expand top-of-funnel (TOF) audience reach on Meta and launch TikTok Ads from scratch.
- Lower blended CAC from $65 down to under $42.
- Build a systematic creative testing pipeline capable of finding 2-3 winning hooks weekly.
- Achieve a minimum 3.8x blended Return on Ad Spend (ROAS).

---

## Strategic Approach & Execution

### 1. High-Velocity Creative Testing Engine
Instead of relying on static product mockups, we deployed a structured creative matrix:
- **Hook Variations**: Tested 5 distinct emotional hooks per video.
- **Format Diversification**: Rolled out authentic creator UGC, TikTok native style 9:16 vertical videos, and high-contrast motion graphic carousels.
- **Micro-Budget Sandbox**: Tested 15-20 creative iterations weekly in dynamic creative ad sets (DCT) before promoting winners to high-budget Advantage+ Shopping Campaigns (ASC).

### 2. Full-Funnel Retargeting & Offer Architecture
- **Middle of Funnel (MOF)**: Retargeted video viewers (75%+ watch time) and social engagers with social proof carousels.
- **Bottom of Funnel (BOF)**: Dynamic product catalog ads (DPA) targeting 30-day website visitors with tiered bundle discounts.

### 3. Conversion Rate Optimization (CRO)
- Added sticky "Add to Cart" CTA on mobile viewports.
- Integrated transparent customer review badges directly below the main hero image.
- Implemented 1-click checkout with Shop Pay and Apple Pay, reducing checkout abandonment by 24%.

---

## Measurable Results
- **+491% Growth in Monthly Revenue** (from $31,200 to $184,500)
- **4.8x Blended ROAS**
- **-38% Customer Acquisition Cost (CAC)**',
        'D2C Apparel & Lifestyle Brand',
        'Lead Growth & Paid Media Strategist',
        '4 Months',
        ARRAY['4.8x Blended ROAS', '-38% Customer CAC', '+310% Net Monthly Revenue'],
        ARRAY['Meta Ads', 'TikTok Ads', 'Shopify CRO', 'Triple Whale'],
        'yellow',
        '',
        true,
        1
    ),
    (
        'b2b-saas-google-search-scale',
        'B2B SaaS Google Search & High-Intent Pipeline Scaling',
        'Restructured paid search architecture with negative keyword sculpting and dedicated comparison landing pages, lifting qualified demo requests by 190%.',
        '# B2B SaaS Google Search & High-Intent Pipeline Scaling

## The Challenge
A Series A B2B software company was burning $25,000/month on Google Ads with little to show: cost per sales-qualified lead (SQL) exceeded $480, and the sales team reported over 70% of inbound demo requests were tire-kickers.

---

## The Strategic Solution
1. **High-Intent Keyword Sculpting**: Stripped away broad generic keywords and focused on competitor alternatives and high-intent software evaluation queries.
2. **Dedicated Comparison Landing Pages**: Deployed distraction-free Unbounce landing pages with head-to-head feature matrices and G2 social proof.
3. **Offline Conversion Tracking**: Fed CRM sales-qualified opportunities back into Google Smart Bidding algorithms.

---

## Measurable Results
- **+190% Qualified Leads**
- **3.4x Pipeline Value**
- **62% Lower Cost Per Demo**',
        'Cloud Security & Compliance SaaS',
        'Search Engine Marketing Lead',
        '3 Months',
        ARRAY['+190% Qualified Leads', '3.4x Pipeline Value', '62% Lower Cost Per Demo'],
        ARRAY['Google Search', 'High-Intent Keywords', 'Unbounce CRO', 'GA4'],
        'mint',
        '',
        true,
        2
    ),
    (
        'omnichannel-growth-creative-engine',
        'Omnichannel Paid Media & Creative Testing Engine',
        'Designed a cross-channel paid funnel synchronizing Meta, YouTube, and retargeting ads with automated email workflows, generating over $500K in tracked sales.',
        '# Omnichannel Paid Media & Creative Testing Engine

## Overview
Engineered an omnichannel paid acquisition engine synchronizing YouTube Ads, Meta retargeting, and Klaviyo automated email flows.

## Results
- **$500K+ Ad Spend Managed**
- **28 Winning Creative Hooks Discovered**
- **4.1x Blended ROAS Sustained**',
        'EdTech & Digital Learning Platform',
        'Growth Marketing Director',
        '6 Months',
        ARRAY['$500K+ Ad Spend Managed', '28 Winning Creative Hooks', '4.1x Blended ROAS'],
        ARRAY['Omnichannel', 'A/B Testing', 'CAPI & GTM', 'Klaviyo'],
        'purple',
        '',
        true,
        3
    );

INSERT INTO favorites (category, icon, color, title, subtitle, order_index)
VALUES 
    ('Books', 'book', 'peach', 'Breakthrough Advertising', 'Eugene Schwartz • Direct Response Bible', 1),
    ('Podcasts', 'music', 'blue', 'Marketing Against The Grain', 'Kipp Bodnar & Kieran Flanagan • HubSpot Growth', 2),
    ('Films & shows', 'film', 'purple', 'Moneyball', 'Bennett Miller • Data-Driven Strategy', 3),
    ('Tools I love', 'tool', 'mint', 'Meta Ads Manager & GA4', 'Paid Acquisition & Cookieless Attribution Stack', 4);

INSERT INTO posts (title, slug, excerpt, content, read_time, published_at, published)
VALUES 
    (
        'How to Scale Meta Ads Past $50,000/Month Without ROAS Fatigue',
        'how-to-scale-meta-ads-past-50k',
        'The exact Advantage+ campaign architecture, creative testing pipeline, and budget pacing framework to scale paid social profitably.',
        '# How to Scale Meta Ads Past $50,000/Month Without ROAS Fatigue

Every media buyer has hit the dreaded scaling wall: you increase daily budgets by 30%, and your CPA spikes by 80%. Here is the exact framework to break through.

## 1. Separate Testing from Scaling (The Two-Account Sandbox)
Never test new creative concepts directly inside your primary scaling campaigns. 

Use a dedicated Testing Campaign:
- Dynamic Creative Ad Sets (DCT): 3 creatives, 2 copy variations, 2 headlines.
- Run at a fixed budget until you gather statistically significant conversion metrics.
- Extract the winning post ID and promote it into your Advantage+ Shopping Campaign (ASC).

## 2. Creative Angle Diversification
Most advertisers create 10 ads that all pitch the same benefit. To scale to six figures, you need distinct emotional angles:
- The Pain Point / Problem Solver
- The Competitor Alternative
- The Social Proof / Viral Trend
- The Value / Bundle Economics',
        '5 min read',
        CURRENT_DATE - INTERVAL '3 days',
        true
    ),
    (
        'The Cookieless Future: Setting Up Meta CAPI and GA4 Server-Side Attribution',
        'cookieless-attribution-capi-ga4',
        'Step-by-step blueprint to implement server-side tracking via Google Tag Manager and overcome browser cookie degradation.',
        '# The Cookieless Future: Setting Up Meta CAPI and GA4 Server-Side Attribution

Client-side browser tracking is dying. Safari ITP, Firefox tracking protection, and ad blockers routinely block 20% to 35% of client-side pixels.

## Why Server-Side Tracking Is Essential
With Server-Side Google Tag Manager (sGTM) and Meta Conversions API:
- Events originate directly from your cloud server, invisible to ad blockers.
- First-party cookies are set via your custom domain, extending cookie lifetime from 24 hours to up to 1 year.
- Customer data parameters are securely enriched, dramatically improving Meta Event Match Quality (EMQ).',
        '6 min read',
        CURRENT_DATE - INTERVAL '11 days',
        true
    ),
    (
        'Landing Page Anatomy: 7 CRO Tweaks That Doubled Conversion Rates',
        'landing-page-cro-tweaks',
        'Proven direct-response layout patterns and micro-copy changes that increase page conversion velocity on mobile viewports.',
        '# Landing Page Anatomy: 7 CRO Tweaks That Doubled Conversion Rates

Generating traffic is only half the battle. If your landing page converts at 1.5% instead of 3.0%, you are paying double for every single customer.

## 1. Above-The-Fold Clarity
Visitors decide whether to stay within 3 seconds. Your hero section must answer 3 fundamental questions immediately:
- What is this?
- How does it improve my life or business?
- What do I do next?

## 2. Eliminate Navigation Distractions
Remove traditional top navigation bars on paid landing pages to eliminate traffic leaks.',
        '4 min read',
        CURRENT_DATE - INTERVAL '19 days',
        true
    );
