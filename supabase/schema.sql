-- ==============================================================================
-- Girish Das - Personal Portfolio Supabase Database Schema
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
-- TABLE: site_profile (Bio, Hero Headline, Socials, Resume)
-- -----------------------------------------------------------------------------
CREATE TABLE site_profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL DEFAULT 'Girish Das',
    nav_logo TEXT NOT NULL DEFAULT 'GIRISH DAS',
    status_badge TEXT NOT NULL DEFAULT 'Open to opportunities',
    headline_intro TEXT NOT NULL DEFAULT 'Hi, I''m Girish Das. I build',
    headline_highlight TEXT NOT NULL DEFAULT 'scalable web systems & intelligent software',
    bio TEXT NOT NULL DEFAULT 'Full-stack engineer passionate about craft, architecture, and delivering high-impact digital experiences that people love using.',
    email TEXT NOT NULL DEFAULT 'girishdas@example.com',
    resume_url TEXT DEFAULT '/resume.pdf',
    github_url TEXT DEFAULT 'https://github.com/yestorick',
    linkedin_url TEXT DEFAULT 'https://linkedin.com/in/girishdas',
    twitter_url TEXT DEFAULT 'https://x.com/girishdas',
    footer_tagline TEXT NOT NULL DEFAULT 'Open for contract opportunities, high-growth engineering teams, and collaborative product builds.',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- TABLE: right_now (What you're currently building, learning, reading, based in)
-- -----------------------------------------------------------------------------
CREATE TABLE right_now (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    building_title TEXT NOT NULL DEFAULT 'Rankgate GMB & AI Automation',
    building_desc TEXT NOT NULL DEFAULT 'Autonomous review generation and QR funnel platform',
    learning TEXT NOT NULL DEFAULT 'Next.js 15 Server Actions & Supabase Vector',
    reading TEXT NOT NULL DEFAULT 'Designing Data-Intensive Applications',
    based_in TEXT NOT NULL DEFAULT 'Bengaluru, India',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- TABLE: experiences (Career & Education timeline)
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
-- TABLE: tech_stack (Categorized Skills & Tools)
-- -----------------------------------------------------------------------------
CREATE TABLE tech_stack (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL, -- 'Languages', 'Frontend', 'Backend & data', 'Tools'
    color TEXT NOT NULL DEFAULT 'blue', -- 'blue', 'mint', 'yellow', 'purple'
    skills TEXT[] NOT NULL DEFAULT '{}',
    order_index INT NOT NULL DEFAULT 0
);

-- -----------------------------------------------------------------------------
-- TABLE: projects (Recent Work & Case Studies)
-- -----------------------------------------------------------------------------
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
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
-- TABLE: favorites (Books, Music, Films & Shows, Tools I love)
-- -----------------------------------------------------------------------------
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL, -- 'Books', 'Music', 'Films & shows', 'Tools I love'
    icon TEXT NOT NULL DEFAULT 'book', -- 'book', 'music', 'film', 'tool'
    color TEXT NOT NULL DEFAULT 'peach', -- 'peach', 'blue', 'purple', 'mint'
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0
);

-- -----------------------------------------------------------------------------
-- TABLE: posts (Blog Articles with Markdown Content)
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
-- SEED DATA (Default Initial Content for Girish Das matching design)
-- -----------------------------------------------------------------------------
INSERT INTO site_profile (name, nav_logo, status_badge, headline_intro, headline_highlight, bio, email, resume_url, github_url, linkedin_url, twitter_url, footer_tagline)
VALUES (
    'Girish Das',
    'GIRISH DAS',
    'Open to opportunities',
    'Hi, I''m Girish Das. I build',
    'scalable web systems & intelligent software',
    'Full-stack engineer passionate about software craft, performant architecture, and shipping production applications with high velocity and clean design.',
    'girishdas@example.com',
    '#',
    'https://github.com/yestorick',
    'https://linkedin.com/in/girishdas',
    'https://x.com/girishdas',
    'Feel free to reach out for high-impact roles, engineering contracts, or collaborative technical projects.'
);

INSERT INTO right_now (building_title, building_desc, learning, reading, based_in)
VALUES (
    'Rankgate GMB & AI Automation',
    'Autonomous customer review generation and QR routing engine',
    'Next.js 15 App Router & Supabase Postgres',
    'Designing Data-Intensive Applications',
    'Bengaluru, India'
);

INSERT INTO experiences (role, company, description, period, order_index)
VALUES 
    ('Senior Full-Stack Engineer', 'Apex Systems', 'Leading core backend architecture and reactive micro-frontends with high throughput and sub-100ms API latency.', '2024 - Now', 1),
    ('Software Engineer', 'Nova Cloud Labs', 'Engineered distributed serverless pipelines, automated CI/CD workflows, and integrated real-time analytics.', '2022 - 2024', 2),
    ('Full-Stack Developer & B.Tech CS', 'Tech Institute', 'Built cloud services, distributed database integrations, and open-source developer tooling.', '2019 - 2022', 3);

INSERT INTO tech_stack (category, color, skills, order_index)
VALUES 
    ('Languages', 'blue', ARRAY['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL'], 1),
    ('Frontend', 'mint', ARRAY['React', 'Next.js', 'Tailwind CSS', 'Redux', 'HTML5/CSS3'], 2),
    ('Backend & data', 'yellow', ARRAY['Node.js', 'Supabase', 'PostgreSQL', 'FastAPI', 'MongoDB'], 3),
    ('Tools', 'purple', ARRAY['Git & GitHub', 'Docker', 'Vercel', 'Linux', 'Figma', 'Postman'], 4);

INSERT INTO projects (title, description, tags, color, live_url, github_url, featured, order_index)
VALUES 
    ('Rankgate GMB', 'Autonomous Google Business Profile review engine with one-tap QR code routing and intelligent keyword optimization.', ARRAY['Next.js', 'FastAPI', 'MongoDB', 'Gemini AI'], 'yellow', 'https://rickgmb.vercel.app', 'https://github.com/yestorick/review-gmb-dev', true, 1),
    ('DevPulse Studio', 'Developer analytics workbench visualizing git commits, PR velocity, and test coverage across distributed teams.', ARRAY['TypeScript', 'Supabase', 'Postgres', 'Tailwind'], 'mint', 'https://girishdas.vercel.app', 'https://github.com/yestorick', true, 2),
    ('AgentMesh Orchestrator', 'Multi-agent coordination system enabling autonomous code review, linting, and automated cloud deployments.', ARRAY['Python', 'FastAPI', 'Docker', 'Vercel'], 'purple', 'https://girishdas.vercel.app', 'https://github.com/yestorick', true, 3);

INSERT INTO favorites (category, icon, color, title, subtitle, order_index)
VALUES 
    ('Books', 'book', 'peach', 'Designing Data-Intensive Applications', 'Martin Kleppmann', 1),
    ('Music', 'music', 'blue', 'Random Access Memories', 'Daft Punk • Electronic', 2),
    ('Films & shows', 'film', 'purple', 'Interstellar', 'Christopher Nolan • 2014', 3),
    ('Tools I love', 'tool', 'mint', 'VS Code & Supabase', 'Developer Stack & Database', 4);

INSERT INTO posts (title, slug, excerpt, content, read_time, published_at, published)
VALUES 
    (
        'Building Resilient Serverless APIs with Next.js and Supabase',
        'building-resilient-serverless-apis',
        'How to design fault-tolerant database connections, handle cold starts gracefully, and structure production PostgreSQL queries with Supabase.',
        '# Building Resilient Serverless APIs with Next.js and Supabase

Serverless functions have transformed how we build and scale modern web applications. However, handling database connection pooling and cold starts requires careful architectural choices.

## The Challenge with Connection Limits

Traditional relational databases like PostgreSQL expect persistent connections. In serverless environments, sudden spikes can exhaust connection limits quickly.

### Supabase Connection Pooling

Supabase provides built-in Supavisor connection pooling out of the box. By configuring transaction mode and utilizing the Supabase JavaScript client with session re-use, our serverless routes execute reliably without connection exhaustion:

```typescript
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

## Zero-Downtime Fallback Design

By implementing graceful fallback layers, our client applications remain fast and resilient even during network hiccups or cold boots.

Stay tuned for more deep dives into cloud architecture!
',
        '5 min read',
        CURRENT_DATE - INTERVAL '3 days',
        true
    ),
    (
        'The Neo-Brutalist Design Philosophy: Why Functionality & Bold Borders Win',
        'neo-brutalist-design-philosophy',
        'Exploring why tactile drop-shadows, high-contrast borders, and joyful pastel palettes make digital interfaces more memorable.',
        '# The Neo-Brutalist Design Philosophy

Neo-brutalism blends raw HTML brutalism with playful typography, vibrant pastel hues, and tactile offset drop-shadows.

## Key Design Principles

1. **High Contrast Borders**: 2px to 3px solid black borders provide immediate visual definition.
2. **Tactile Shadows**: Hard-edge offsets (e.g., `4px 4px 0px #000`) communicate physical depth without muddy blurs.
3. **Intentional Color Blocking**: Gentle pastels (mint, lavender, peach, soft yellow) keep the visual hierarchy clear and approachable.

Interfaces should feel fun, responsive, and tactile.
',
        '4 min read',
        CURRENT_DATE - INTERVAL '10 days',
        true
    ),
    (
        'Scaling Real-Time Agent Workflows on the Edge',
        'scaling-real-time-agent-workflows',
        'Lessons learned deploying autonomous agent loops, streaming LLM completions, and orchestrating serverless tasks on Vercel.',
        '# Scaling Real-Time Agent Workflows on the Edge

Building AI agent workflows requires fast token streaming, structured JSON parsing, and deterministic prompt guarantees.

## Dynamic Prompt Construction

We ensure that all agent outputs adhere strictly to schema expectations while keeping response latency under 1.5 seconds across global regions.
',
        '6 min read',
        CURRENT_DATE - INTERVAL '21 days',
        true
    );
