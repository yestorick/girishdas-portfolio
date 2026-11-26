import { supabase, isSupabaseConfigured, getPublicSupabaseConfig } from './supabase';
import {
  SiteProfile,
  RightNow,
  Experience,
  Education,
  TechStackGroup,
  Project,
  BlogPost,
  SupabaseDiagnostics,
  TableDiagnostic,
} from './types';

export const DEFAULT_PROFILE: SiteProfile = {
  name: 'Girish Das',
  nickname: 'Rick',
  avatar_url: '',
  nav_logo: 'Girish Das',
  status_badge: 'Open to opportunities',
  headline_intro: "Hi, I'm Girish Das.",
  headline_highlight: 'Performance & Digital Marketing Executive',
  bio: 'Performance and digital marketer with 2.5 years of experience managing Google Ads and Meta Ads, delivering 3x ROAS, 30% lower CPC, and authoritative healthcare content that earns patient trust.',
  email: 'hellorick73@gmail.com',
  phone: '+91 81012 03353',
  location: 'Kolkata, India',
  website_url: 'https://hellorick.vercel.app',
  resume_url: '#',
  github_url: 'https://github.com/yestorick',
  linkedin_url: 'https://linkedin.com/in/hellogirish',
  twitter_url: 'https://x.com/girishdas',
  hero_primary_cta: 'Contact me',
  hero_secondary_cta: 'My project & works',
  experience_heading: 'Experience',
  projects_heading: 'My projects',
  projects_subtitle:
    "Campaigns, content systems, and digital projects I've built and managed",
  stack_heading: 'Tech & marketing stacks',
  blog_heading: 'From my blog',
  blog_subtitle:
    'Personal notes on Google Ads, Meta Ads creatives, conversion tracking, and digital content strategy.',
  footer_heading: "Let's connect.",
  footer_tagline:
    'Always open to connecting with hiring teams, marketers, and founders about performance marketing roles and digital projects.',
};

export const DEFAULT_RIGHT_NOW: RightNow = {
  card_title: 'Right now',
  building_title: 'Google & Meta Lead Gen Funnels',
  building_desc: 'Managing ₹60K/mo ad spend and high-converting healthcare campaigns',
  learning: 'Post-Andromeda creative testing workflows & GA4 conversion attribution',
  current_projects: 'NCD Immunocare Ads + Dr Saibal Moitra Authority Website',
  based_in: 'Kolkata, India',
};

export const DEFAULT_EXPERIENCES: Experience[] = [
  {
    role: 'Performance Marketing Executive',
    company: 'NCD Immunocare Pvt Ltd (AATC), Kolkata',
    description:
      'Managing ₹60K/month across Google Ads & Meta Ads; delivered 3x ROAS on Google Ads, 30% lower CPC, and up to 40% higher appointment enquiry rate on Meta Ads.',
    period: 'May 2025 - Present',
    order_index: 1,
  },
  {
    role: 'Personal Healthcare Content and Website Manager',
    company: 'Dr Saibal Moitra, Allergy Specialist',
    description:
      'Established Dr Saibal Moitra as a trusted allergy specialist online through authoritative medical content and a dedicated patient-focused website.',
    period: 'Mar 2025 - Present',
    order_index: 2,
  },
  {
    role: 'Organic Social Media Manager',
    company: 'Freelance',
    description:
      'Acquired 4 freelance clients independently and delivered 1.3 years of consistent organic social media content before taking a full-time marketing role.',
    period: 'Sep 2023 - Jan 2025',
    order_index: 3,
  },
];

export const DEFAULT_EDUCATION: Education[] = [
  {
    degree: 'B.Sc. (Honours), Chemistry',
    institution: 'Taki Government College, West Bengal',
    period: 'Dropout (2nd year)',
    description:
      'Dropped out to pursue a full-time career in digital marketing. Self-taught performance marketing and content strategy through YouTube and X (Twitter), applied on live campaigns.',
    order_index: 1,
  },
];

export const DEFAULT_TECH_STACK: TechStackGroup[] = [
  {
    category: 'Paid Media',
    color: 'blue',
    skills: [
      'Google Ads (Search, Display)',
      'Meta Ads',
      'Keyword Research',
      'Audience Targeting',
      'A/B Testing',
      'Budget Optimisation',
    ],
    order_index: 1,
  },
  {
    category: 'Analytics & Tracking',
    color: 'mint',
    skills: [
      'Google Analytics 4',
      'Google Tag Manager',
      'Conversion Tracking',
      'CPC / CPL / CTR',
      'ROAS Reporting',
    ],
    order_index: 2,
  },
  {
    category: 'Content & Creative',
    color: 'yellow',
    skills: [
      'Organic Social Media',
      'Content Calendars',
      'Copywriting',
      'Authority Content',
      'Canva',
    ],
    order_index: 3,
  },
  {
    category: 'Tech & Outreach',
    color: 'purple',
    skills: [
      'Next.js & Vercel',
      'Supabase',
      'Healthcare Websites',
      'Cold Outreach (Phone & Email)',
    ],
    order_index: 4,
  },
];

export const DEFAULT_PROJECTS: Project[] = [
  {
    slug: 'google-ads-meta-ads-performance',
    title: 'Google Ads & Meta Ads Performance at NCD Immunocare',
    description:
      'Managed ₹60K/month across Google and Meta Ads, delivering 3x ROAS, 30% lower CPC, and up to 40% more appointment enquiries.',
    client: 'NCD Immunocare Pvt Ltd (AATC)',
    role: 'Performance Marketing Executive',
    duration: 'May 2025 - Present',
    completion_date: 'May 2025 – Ongoing',
    made_by: 'Made by me',
    image_url: '',
    screenshots: [],
    metrics: ['3x Google Ads ROAS', '30% Lower CPC', '+40% Enquiry Rate'],
    tags: ['Google Ads', 'Meta Ads', 'GA4 & GTM'],
    color: 'yellow',
    live_url: '',
    featured: true,
    order_index: 1,
    content: `# Google Ads & Meta Ads Performance at NCD Immunocare

## Overview & Objective
As the Performance Marketing Executive at NCD Immunocare Pvt Ltd (AATC) in Kolkata, I manage a monthly paid media budget of ₹60,000 across Google Ads and Meta Ads with one core goal: driving qualified patient appointment enquiries efficiently.

---

## How I Executed It

### 1. Google Ads Search & Display Restructuring
- Performed granular **keyword research** focused strictly on high-intent patient search queries rather than broad informational terms.
- Tightened match types and curated negative keyword lists to eliminate irrelevant ad clicks.
- Implemented clean **conversion tracking** via Google Tag Manager (GTM) and Google Analytics 4 (GA4) to measure true enquiry completions instead of vanity clicks.

### 2. Creative-First Meta Ads (Post-Andromeda Update)
- Following Meta's Andromeda retrieval update, shifted **80% of optimization focus toward high-winning creatives** and clearer patient hooks rather than over-segmenting ad sets.
- Ran structured A/B tests comparing educational healthcare creatives against direct appointment booking formats.
- Aligned landing expectations closely with the ad copy so visitors could enquire quickly.

---

## Verified Results

| Metric | Channel | Result Achieved |
| :--- | :--- | :--- |
| **Return on Ad Spend (ROAS)** | Google Ads | **3x ROAS** |
| **Cost Per Click (CPC)** | Google & Meta Ads | **30% Reduction** |
| **Appointment Enquiry Rate** | Meta Ads | **Up to 40% Increase** |
| **Monthly Ad Spend Managed** | Multi-Channel | **₹60,000 / month** |`,
  },
  {
    slug: 'doctor-authority-content-system',
    title: 'Doctor Authority Content System — Dr Saibal Moitra',
    description:
      'Built a dedicated healthcare website and authoritative allergy content hub positioning Dr Saibal Moitra as a trusted specialist online.',
    client: 'Dr Saibal Moitra, Allergy Specialist',
    role: 'Healthcare Content & Website Manager',
    duration: 'Mar 2025 - Present',
    completion_date: 'Mar 2025 – Ongoing',
    made_by: 'Made by me',
    image_url: '',
    screenshots: [],
    metrics: [
      'Trusted Online Authority',
      'Dedicated Medical Hub',
      'Clear Patient Education',
    ],
    tags: ['Content Marketing', 'Copywriting', 'Healthcare Web'],
    color: 'mint',
    live_url: '',
    featured: true,
    order_index: 2,
    content: `# Doctor Authority Content System — Dr Saibal Moitra

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
Established a reliable, trusted online presence that serves both existing patients seeking clear follow-up resources and new patients evaluating an allergy specialist.`,
  },
  {
    slug: 'personal-portfolio-website',
    title: 'Personal Portfolio Website (hellorick.vercel.app)',
    description:
      'Designed and launched my personal site powered by Next.js, Tailwind CSS, and Supabase to present my paid ads and content work.',
    client: 'Personal Brand & Career',
    role: 'Creator & Marketer',
    duration: 'Ongoing',
    completion_date: 'Nov 2026',
    made_by: 'Made by me',
    image_url: '',
    screenshots: [],
    metrics: [
      'Mobile-First Design',
      'Supabase Dynamic CMS',
      'Custom Case Studies',
    ],
    tags: ['Next.js', 'Supabase', 'Vercel'],
    color: 'purple',
    live_url: '',
    featured: true,
    order_index: 3,
    content: `# Personal Portfolio Website (hellorick.vercel.app)

## Why I Built This Site
As a performance and digital marketer, I wanted a personal home on the internet—not a generic template or agency clone—where hiring teams, recruiters, and founders can clearly read how I approach Google Ads, Meta Ads, conversion tracking, and content strategy.

---

## Technical & Content Architecture

### 1. Structured Supabase Backend
- Organized all career data—experience, tech & marketing stacks, projects, blog notes, and education—into clean PostgreSQL tables on **Supabase**.
- Allows adding new campaign breakdowns or marketing articles quickly in Markdown without touching application code.

### 2. Calm, Eye-Soothing Personal UI
- Focused on readable typography, muted neutral tones with selective warm highlights, and responsive single-column mobile formatting.
- Includes an integrated printable résumé page tailored for recruiters.`,
  },
];

export const DEFAULT_POSTS: BlogPost[] = [
  {
    title: "Focusing on High-Winning Creatives After Meta's Andromeda Update",
    slug: 'meta-ads-andromeda-creative-strategy',
    excerpt:
      'Why shifting 80% of optimization energy from micro-targeting toward ad creatives increased appointment enquiry rates by up to 40%.',
    content: `# Focusing on High-Winning Creatives After Meta's Andromeda Update

Media buying on Meta has evolved significantly. With deeper machine-learning retrieval models like Andromeda, creative relevance does the heavy lifting that granular interest targeting used to handle.

## What Changed in Practice
- Instead of splitting small budgets across dozens of narrow audience pockets, consolidating campaigns lets delivery algorithms learn faster.
- Testing distinct **hook angles and clear patient/customer value propositions** yields dramatically stronger enquiry quality.

## Measuring What Actually Matters
Pairing creative testing with clean **GTM & GA4 conversion tracking** ensures optimization chases real enquiries rather than cheap clicks.`,
    read_time: '4 min read',
    published_at: '2026-11-20',
    published: true,
    cover_image: '',
  },
  {
    title: 'Cutting Google Ads CPC by 30% While Maintaining 3x ROAS',
    slug: 'cutting-google-ads-cpc-3x-roas',
    excerpt:
      'Practical keyword sculpting, search term hygiene, and landing alignment steps for lean monthly budgets like ₹60K/mo.',
    content: `# Cutting Google Ads CPC by 30% While Maintaining 3x ROAS

Managing a focused monthly budget (such as ₹60K/mo) leaves zero room for wasted search spend.

## Three Levers That Made the Biggest Difference
1. **Intent-First Keyword Research**: Separating high-intent service queries from broad research phrases.
2. **Weekly Search Term Audits**: Adding negative keywords proactively before spend leaks out.
3. **Ad-to-Page Continuity**: Ensuring the landing page speaks directly to the visitor's immediate question so bounce rate drops and Quality Score improves.`,
    read_time: '5 min read',
    published_at: '2026-11-12',
    published: true,
    cover_image: '',
  },
  {
    title: 'Why Trusted Content Matters More Than Ever in Healthcare Marketing',
    slug: 'healthcare-authority-content-trust',
    excerpt:
      'Lessons from managing online authority and patient education websites for medical specialists.',
    content: `# Why Trusted Content Matters More Than Ever in Healthcare Marketing

In medical and healthcare categories, aggressive sales copy backfires. Patients are looking for clarity, empathy, and accuracy.

## Building Lasting Authority
- Explain conditions, triggers, and next steps in plain, accurate language.
- Keep the dedicated website calm, uncluttered, and easy to read on a smartphone.
- Consistency across website copy and organic content compounds credibility over months.`,
    read_time: '4 min read',
    published_at: '2026-11-04',
    published: true,
    cover_image: '',
  },
];

function safeStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  return [];
}

function nonEmpty(value: unknown, fallback: string): string {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value;
  }
  return fallback;
}

function normalizeProfile(row: Record<string, unknown>): SiteProfile {
  return {
    id: typeof row.id === 'string' ? row.id : undefined,
    name: nonEmpty(row.name, DEFAULT_PROFILE.name),
    nickname: typeof row.nickname === 'string' ? row.nickname : '',
    avatar_url: typeof row.avatar_url === 'string' ? row.avatar_url : '',
    nav_logo: nonEmpty(row.nav_logo, DEFAULT_PROFILE.nav_logo),
    status_badge: typeof row.status_badge === 'string' ? row.status_badge : '',
    headline_intro: nonEmpty(row.headline_intro, DEFAULT_PROFILE.headline_intro),
    headline_highlight:
      typeof row.headline_highlight === 'string' ? row.headline_highlight : '',
    bio: nonEmpty(row.bio, DEFAULT_PROFILE.bio),
    email: nonEmpty(row.email, DEFAULT_PROFILE.email),
    phone: typeof row.phone === 'string' ? row.phone : '',
    location: nonEmpty(row.location, DEFAULT_PROFILE.location || 'Kolkata, India'),
    website_url: nonEmpty(
      row.website_url,
      DEFAULT_PROFILE.website_url || 'https://hellorick.vercel.app'
    ),
    resume_url: typeof row.resume_url === 'string' ? row.resume_url : '#',
    github_url: typeof row.github_url === 'string' ? row.github_url : '',
    linkedin_url: typeof row.linkedin_url === 'string' ? row.linkedin_url : '',
    twitter_url: typeof row.twitter_url === 'string' ? row.twitter_url : '',
    hero_primary_cta: nonEmpty(
      row.hero_primary_cta,
      DEFAULT_PROFILE.hero_primary_cta || 'Contact me'
    ),
    hero_secondary_cta: nonEmpty(
      row.hero_secondary_cta,
      DEFAULT_PROFILE.hero_secondary_cta || 'My project & works'
    ),
    experience_heading: nonEmpty(
      row.experience_heading,
      DEFAULT_PROFILE.experience_heading || 'Experience'
    ),
    projects_heading: nonEmpty(
      row.projects_heading,
      DEFAULT_PROFILE.projects_heading || 'My projects'
    ),
    projects_subtitle: nonEmpty(
      row.projects_subtitle,
      DEFAULT_PROFILE.projects_subtitle || ''
    ),
    stack_heading: nonEmpty(
      row.stack_heading,
      DEFAULT_PROFILE.stack_heading || 'Tech & marketing stacks'
    ),
    blog_heading: nonEmpty(
      row.blog_heading,
      DEFAULT_PROFILE.blog_heading || 'From my blog'
    ),
    blog_subtitle: nonEmpty(
      row.blog_subtitle,
      DEFAULT_PROFILE.blog_subtitle || ''
    ),
    footer_heading: nonEmpty(
      row.footer_heading,
      DEFAULT_PROFILE.footer_heading || "Let's connect."
    ),
    footer_tagline: nonEmpty(row.footer_tagline, DEFAULT_PROFILE.footer_tagline),
    updated_at: typeof row.updated_at === 'string' ? row.updated_at : undefined,
  };
}

function normalizeProject(row: Record<string, unknown>): Project {
  return {
    id: typeof row.id === 'string' ? row.id : undefined,
    slug: String(row.slug || ''),
    title: String(row.title || 'Untitled Project'),
    description: String(row.description || ''),
    content: String(row.content || ''),
    client: typeof row.client === 'string' ? row.client : '',
    role: typeof row.role === 'string' ? row.role : '',
    duration: typeof row.duration === 'string' ? row.duration : '',
    completion_date:
      typeof row.completion_date === 'string' ? row.completion_date : '',
    made_by: typeof row.made_by === 'string' ? row.made_by : 'Made by me',
    screenshots: safeStringArray(row.screenshots),
    metrics: safeStringArray(row.metrics),
    tags: safeStringArray(row.tags),
    color: typeof row.color === 'string' ? row.color : 'yellow',
    image_url: typeof row.image_url === 'string' ? row.image_url : '',
    live_url: typeof row.live_url === 'string' ? row.live_url : '',
    github_url: typeof row.github_url === 'string' ? row.github_url : '',
    featured: typeof row.featured === 'boolean' ? row.featured : true,
    order_index: typeof row.order_index === 'number' ? row.order_index : 0,
    created_at: typeof row.created_at === 'string' ? row.created_at : undefined,
  };
}

function normalizePost(row: Record<string, unknown>): BlogPost {
  return {
    id: typeof row.id === 'string' ? row.id : undefined,
    title: String(row.title || 'Untitled Post'),
    slug: String(row.slug || ''),
    excerpt: String(row.excerpt || ''),
    content: String(row.content || ''),
    read_time: nonEmpty(row.read_time, '4 min read'),
    published_at: String(row.published_at || ''),
    published: Boolean(row.published),
    cover_image: typeof row.cover_image === 'string' ? row.cover_image : '',
    created_at: typeof row.created_at === 'string' ? row.created_at : undefined,
    updated_at: typeof row.updated_at === 'string' ? row.updated_at : undefined,
  };
}

// Data Fetchers with graceful fallback
export async function getProfile(): Promise<SiteProfile> {
  if (!isSupabaseConfigured || !supabase) return DEFAULT_PROFILE;
  try {
    const { data, error } = await supabase
      .from('site_profile')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error || !data) return DEFAULT_PROFILE;
    return normalizeProfile(data as Record<string, unknown>);
  } catch {
    return DEFAULT_PROFILE;
  }
}

export async function getRightNow(): Promise<RightNow> {
  if (!isSupabaseConfigured || !supabase) return DEFAULT_RIGHT_NOW;
  try {
    const { data, error } = await supabase
      .from('right_now')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error || !data) return DEFAULT_RIGHT_NOW;
    return {
      id: typeof data.id === 'string' ? data.id : undefined,
      card_title: nonEmpty(data.card_title, DEFAULT_RIGHT_NOW.card_title || 'Right now'),
      building_title: nonEmpty(data.building_title, DEFAULT_RIGHT_NOW.building_title),
      building_desc: typeof data.building_desc === 'string' ? data.building_desc : '',
      learning: nonEmpty(data.learning, DEFAULT_RIGHT_NOW.learning),
      current_projects:
        typeof data.current_projects === 'string'
          ? data.current_projects
          : DEFAULT_RIGHT_NOW.current_projects,
      reading: typeof data.reading === 'string' ? data.reading : undefined,
      based_in: nonEmpty(data.based_in, DEFAULT_RIGHT_NOW.based_in),
      updated_at: typeof data.updated_at === 'string' ? data.updated_at : undefined,
    };
  } catch {
    return DEFAULT_RIGHT_NOW;
  }
}

export async function getExperiences(): Promise<Experience[]> {
  if (!isSupabaseConfigured || !supabase) return DEFAULT_EXPERIENCES;
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('order_index', { ascending: true });
    if (error || !data || data.length === 0) return DEFAULT_EXPERIENCES;
    return data as Experience[];
  } catch {
    return DEFAULT_EXPERIENCES;
  }
}

export async function getEducation(): Promise<Education[]> {
  if (!isSupabaseConfigured || !supabase) return DEFAULT_EDUCATION;
  try {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('order_index', { ascending: true });
    if (error || !data || data.length === 0) return DEFAULT_EDUCATION;
    return data as Education[];
  } catch {
    return DEFAULT_EDUCATION;
  }
}

export async function getTechStack(): Promise<TechStackGroup[]> {
  if (!isSupabaseConfigured || !supabase) return DEFAULT_TECH_STACK;
  try {
    const { data, error } = await supabase
      .from('tech_stack')
      .select('*')
      .order('order_index', { ascending: true });
    if (error || !data || data.length === 0) return DEFAULT_TECH_STACK;
    return data.map((row) => ({
      id: row.id,
      category: String(row.category || ''),
      color: typeof row.color === 'string' ? row.color : 'blue',
      skills: safeStringArray(row.skills),
      order_index: typeof row.order_index === 'number' ? row.order_index : 0,
    }));
  } catch {
    return DEFAULT_TECH_STACK;
  }
}

export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured || !supabase) return DEFAULT_PROJECTS;
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });
    if (error || !data || data.length === 0) return DEFAULT_PROJECTS;
    return data.map((row) => normalizeProject(row as Record<string, unknown>));
  } catch {
    return DEFAULT_PROJECTS;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSupabaseConfigured || !supabase) {
    return DEFAULT_PROJECTS.find((p) => p.slug === slug) || null;
  }
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    if (error || !data) {
      return DEFAULT_PROJECTS.find((p) => p.slug === slug) || null;
    }
    return normalizeProject(data as Record<string, unknown>);
  } catch {
    return DEFAULT_PROJECTS.find((p) => p.slug === slug) || null;
  }
}

export async function getPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured || !supabase) return DEFAULT_POSTS;
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false });
    if (error) return DEFAULT_POSTS;
    if (!data || data.length === 0) {
      const { count } = await supabase
        .from('posts')
        .select('id', { count: 'exact', head: true });
      if (count && count > 0) return [];
      return DEFAULT_POSTS;
    }
    return data.map((row) => normalizePost(row as Record<string, unknown>));
  } catch {
    return DEFAULT_POSTS;
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured || !supabase) {
    return DEFAULT_POSTS.find((p) => p.slug === slug) || null;
  }
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();
    if (error || !data) {
      return DEFAULT_POSTS.find((p) => p.slug === slug) || null;
    }
    return normalizePost(data as Record<string, unknown>);
  } catch {
    return DEFAULT_POSTS.find((p) => p.slug === slug) || null;
  }
}

export async function getSupabaseDiagnostics(): Promise<SupabaseDiagnostics> {
  const cfg = getPublicSupabaseConfig();
  const tableNames = [
    'site_profile',
    'right_now',
    'experiences',
    'education',
    'tech_stack',
    'projects',
    'posts',
  ];

  if (!cfg.isConfigured || !supabase) {
    return {
      configured: false,
      hasUrl: Boolean(cfg.url),
      hasAnonKey: Boolean(cfg.anonKey),
      needsMigration: false,
      migrationWarnings: [
        'Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY) are not set yet. Site is serving fallback defaults.',
      ],
      tables: tableNames.map((table) => ({
        table,
        ok: false,
        count: null,
        error: 'Not connected',
      })),
    };
  }

  const sb = supabase;

  const tables: TableDiagnostic[] = await Promise.all(
    tableNames.map(async (table) => {
      try {
        const { count, error } = await sb
          .from(table)
          .select('id', { count: 'exact', head: true });
        if (error) {
          return { table, ok: false, count: null, error: error.message };
        }
        return { table, ok: true, count: count ?? 0 };
      } catch (err) {
        return {
          table,
          ok: false,
          count: null,
          error: err instanceof Error ? err.message : 'Query failed',
        };
      }
    })
  );

  const migrationWarnings: string[] = [];

  const columnChecks = [
    {
      label:
        'site_profile extended fields (nickname, avatar_url, phone, location, website_url, hero_primary_cta, footer_heading)',
      query: sb
        .from('site_profile')
        .select(
          'nickname, avatar_url, phone, location, website_url, hero_primary_cta, footer_heading'
        )
        .limit(1),
    },
    {
      label: 'right_now extended columns (card_title, current_projects)',
      query: sb.from('right_now').select('card_title, current_projects').limit(1),
    },
    {
      label: 'projects simplified fields (completion_date, made_by, screenshots)',
      query: sb
        .from('projects')
        .select('completion_date, made_by, screenshots')
        .limit(1),
    },
  ];

  for (const check of columnChecks) {
    const { error } = await check.query;
    if (error) {
      migrationWarnings.push(`${check.label}: ${error.message}`);
    }
  }

  const missingTables = tables.filter((t) => !t.ok);
  for (const t of missingTables) {
    migrationWarnings.push(`Table "${t.table}": ${t.error || 'missing or inaccessible'}`);
  }

  return {
    configured: true,
    hasUrl: Boolean(cfg.url),
    hasAnonKey: Boolean(cfg.anonKey),
    needsMigration: migrationWarnings.length > 0,
    migrationWarnings,
    tables,
  };
}
