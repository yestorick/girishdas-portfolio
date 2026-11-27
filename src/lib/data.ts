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
  headline_highlight:
    'Performance & Digital Marketing | Meta Ads, Google Ads and AI-Powered Creative Workflows',
  bio: 'Performance and digital marketer managing ₹60K per month across Meta Ads and Google Ads: 3x ROAS, 30% lower CPC and up to 40% higher appointment enquiry rate. Uses AI videos and agents to replace costly shoots and speed up ad analysis. Driven by quick testing and killing losing ads so budget goes to winners; seeks full ownership and challenges that help me grow and learn more.',
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
    "Paid media campaigns, AI creative workflows, and healthcare content systems I've built and managed",
  stack_heading: 'Tech & marketing stacks',
  blog_heading: 'From my blog',
  blog_subtitle:
    'Personal notes on Meta Ads, Google Ads, AI creative workflows, conversion tracking, and digital content strategy.',
  footer_heading: "Let's connect.",
  footer_tagline:
    'Always open to connecting with hiring teams, marketers, and founders about performance marketing roles and AI-powered creative workflows.',
};

export const DEFAULT_RIGHT_NOW: RightNow = {
  card_title: 'Right now',
  building_title: 'AI Video Ads & Creative Agents',
  building_desc:
    'Google Flow, Higgsfield, ElevenLabs & Claude Code ad-analysis workflows',
  learning:
    'Rapid creative testing, flagging ad fatigue early & scaling winning ads',
  current_projects:
    'NCD Immunocare (₹60K/mo Ads), Dr Saibal Moitra Clone & Meta Ads Analysis Agent',
  based_in: 'Kolkata, India',
};

export const DEFAULT_EXPERIENCES: Experience[] = [
  {
    role: 'Performance Marketing Executive',
    company: 'NCD Immunocare Pvt Ltd (AATC), Kolkata',
    description: [
      'Manage ₹60K per month in ad spend across Meta Ads and Google Ads.',
      'Achieved 3x ROAS on Google Ads and a 30% lower cost per click (CPC).',
      "Increased appointment enquiry rate by up to 40% on Meta Ads, with 80% of focus on high-winning creatives after Meta's Andromeda update.",
      'Joined through a referral from one of my clients.',
    ].join('\n'),
    period: 'May 2025 - Present',
    order_index: 1,
  },
  {
    role: 'Personal Healthcare Content and Website Manager',
    company: 'Dr Saibal Moitra, Allergy Specialist',
    description:
      "Built Dr Saibal Moitra's online presence as a trusted allergy specialist, giving patients reliable allergy information through authoritative content and a dedicated website.",
    period: 'Mar 2025 - Present',
    order_index: 2,
  },
  {
    role: 'Organic Social Media Manager',
    company: 'Freelance',
    description: [
      'Managed organic social media content and content calendars for 3 client accounts over 1.3 years.',
      'Wound down freelance work in January 2025 after receiving a full-time job offer.',
    ].join('\n'),
    period: 'Sep 2023 - Jan 2025 (1.3 years)',
    order_index: 3,
  },
];

export const DEFAULT_EDUCATION: Education[] = [
  {
    degree: 'B.Sc. (Honours), Chemistry',
    institution: 'Taki Government College, West Bengal',
    period: 'Dropped out (2nd year)',
    description:
      'Dropped out in 2nd year to pursue a full-time career in digital marketing. Self-taught performance marketing and content strategy through YouTube and X (Twitter), applied on live campaigns.',
    order_index: 1,
  },
];

export const DEFAULT_TECH_STACK: TechStackGroup[] = [
  {
    category: 'Paid Media',
    color: 'blue',
    skills: [
      'Meta Ads',
      'Google Ads',
      'Creative Testing',
      'A/B Testing',
      'Audience Targeting',
      'Budget Scaling',
    ],
    order_index: 1,
  },
  {
    category: 'Analytics',
    color: 'mint',
    skills: [
      'Google Analytics 4',
      'Google Tag Manager',
      'Conversion Tracking',
      'CPC',
      'CPL',
      'CTR',
      'ROAS Reporting',
    ],
    order_index: 2,
  },
  {
    category: 'Content',
    color: 'yellow',
    skills: [
      'Organic Social Media',
      'Content Calendars',
      'Copywriting',
      'Video Storytelling',
      'Authority Content',
      'Canva',
    ],
    order_index: 3,
  },
  {
    category: 'AI Automation',
    color: 'purple',
    skills: [
      'Google Flow',
      'Higgsfield',
      'ElevenLabs',
      'Claude Code',
      'Antigravity',
      'AI Agents',
      'AI Video Production',
    ],
    order_index: 4,
  },
];

export const DEFAULT_PROJECTS: Project[] = [
  {
    slug: 'ai-video-ad-production',
    title: 'AI Video Ad Production',
    category: 'ai-creative',
    description:
      'Storytelling and ad-style videos made with AI, replacing costly shoots and recordings.',
    client: 'AI Creative Workflow',
    role: 'Performance & Creative Marketer',
    duration: '2025 – Ongoing',
    completion_date: '2025 – Ongoing',
    made_by: 'Made by me',
    image_url: '',
    screenshots: [],
    metrics: ['Zero Shoot Cost', 'Faster Ad Variations'],
    tags: ['Google Flow', 'Higgsfield', 'ElevenLabs'],
    color: 'yellow',
    live_url: '',
    featured: true,
    order_index: 1,
    content: `# AI Video Ad Production

## Overview & Why I Built This
Traditional video shoots slow down ad testing and inflate creative production costs. I built an end-to-end AI video production workflow using **Google Flow**, **Higgsfield**, and **ElevenLabs** so I can test more hooks and ad angles quickly.

## How I Completed It
- Scripted patient-first and direct-response ad hooks tailored to real audience objections.
- Generated realistic visual scenes with **Google Flow** and **Higgsfield** to replace expensive physical studio shoots.
- Produced natural voiceovers in **ElevenLabs** and assembled variations for rapid Meta Ads creative testing.`,
  },
  {
    slug: 'ai-creative-editing-agent',
    title: 'AI Creative Editing Agent',
    category: 'ai-creative',
    description:
      'Agent that edits my ad and social creative videos faster, so more variations get tested.',
    client: 'AI Creative Workflow',
    role: 'Builder & Marketer',
    duration: '2025 – Ongoing',
    completion_date: '2025 – Ongoing',
    made_by: 'Made by me',
    image_url: '',
    screenshots: [],
    metrics: ['Faster Turnaround', 'More Creative Tests'],
    tags: ['Antigravity', 'AI Agents', 'Video Editing'],
    color: 'mint',
    live_url: '',
    featured: true,
    order_index: 2,
    content: `# AI Creative Editing Agent

## Overview & Objective
Post-Andromeda Meta Ads reward rapid creative iteration. Manual editing became a bottleneck when preparing multiple hooks, aspect ratios, and cuts for testing.

## How I Completed It
- Built an **AI Creative Editing Agent** in **Antigravity** to automate repetitive cutting, pacing, and formatting tasks across ad and social videos.
- Standardized edit templates so raw AI scenes turn into ready-to-launch ad variations fast enough to feed weekly tests.`,
  },
  {
    slug: 'digital-clone-dr-saibal-moitra',
    title: 'Digital Clone of Dr Saibal Moitra',
    category: 'ai-creative',
    description:
      'Full digital clone that grows his online presence without him recording.',
    client: 'Dr Saibal Moitra, Allergy Specialist',
    role: 'Digital & AI Workflow Manager',
    duration: '2025 – Ongoing',
    completion_date: '2025 – Ongoing',
    made_by: 'Made by me',
    image_url: '',
    screenshots: [],
    metrics: ['Zero Recording Time', 'Consistent Presence'],
    tags: ['AI', 'Digital Clone', 'Video Storytelling'],
    color: 'purple',
    live_url: '',
    featured: true,
    order_index: 3,
    content: `# Digital Clone of Dr Saibal Moitra

## Overview & Objective
Busy medical specialists rarely have time to sit in front of a camera every week, even though patients look for trustworthy doctor-led video education.

## How I Completed It
- Created a full AI digital clone workflow for **Dr Saibal Moitra** so educational allergy videos and social explainers ship consistently without taking up his clinical schedule.
- Combined clinically accurate scripts with natural AI voice and video synthesis to grow patient trust on social platforms.`,
  },
  {
    slug: 'meta-ads-analysis-agent',
    title: 'Meta Ads Analysis Agent (in progress)',
    category: 'ai-creative',
    description:
      'Agent that flags ad fatigue and which creatives to stop or scale, so budget goes to winners.',
    client: 'Paid Media Automation',
    role: 'Builder & Performance Marketer',
    duration: 'In Progress',
    completion_date: 'In Progress',
    made_by: 'Made by me',
    image_url: '',
    screenshots: [],
    metrics: ['Flags Ad Fatigue', 'Stop vs Scale Rules'],
    tags: ['Claude Code', 'Meta Ads', 'AI Agents'],
    color: 'yellow',
    live_url: '',
    featured: true,
    order_index: 4,
    content: `# Meta Ads Analysis Agent (in progress)

## Overview & Objective
Managing ₹60K/month across live ad sets means catching creative fatigue fast and shifting spend away from underperforming ads before budget is wasted.

## How I Am Building It
- Developing an analysis agent using **Claude Code** to inspect Meta Ads performance trends, flag rising CPA / falling CTR fatigue signals, and highlight which creatives to pause or scale.
- Built around one operating rule: kill losing ads quickly so budget goes to winners.`,
  },
  {
    slug: 'google-ads-meta-ads-performance',
    title: 'Google Ads & Meta Ads Performance at NCD Immunocare',
    category: 'marketing',
    description:
      'Manage ₹60K/month across Meta and Google Ads: 3x ROAS on Google Ads, 30% lower CPC, and up to 40% higher appointment enquiry rate.',
    client: 'NCD Immunocare Pvt Ltd (AATC)',
    role: 'Performance Marketing Executive',
    duration: 'May 2025 - Present',
    completion_date: 'May 2025 – Ongoing',
    made_by: 'Made by me',
    image_url: '',
    screenshots: [],
    metrics: ['3x Google Ads ROAS', '30% Lower CPC', '+40% Enquiry Rate'],
    tags: ['Meta Ads', 'Google Ads', 'GA4 & GTM'],
    color: 'mint',
    live_url: '',
    featured: true,
    order_index: 5,
    content: `# Google Ads & Meta Ads Performance at NCD Immunocare

## Overview & Objective
As the Performance Marketing Executive at NCD Immunocare Pvt Ltd (AATC) in Kolkata, I manage ₹60,000 per month across Meta Ads and Google Ads to generate qualified patient appointment enquiries efficiently.

---

## How I Executed It

### 1. Google Ads Search & Display Restructuring
- Performed granular **keyword research** focused strictly on high-intent patient search queries rather than broad informational terms.
- Tightened match types and curated negative keyword lists to achieve a **30% lower CPC** and **3x ROAS**.
- Implemented clean **conversion tracking** via Google Tag Manager (GTM) and Google Analytics 4 (GA4).

### 2. Creative-First Meta Ads (Post-Andromeda Update)
- Shifted **80% of optimization focus toward high-winning creatives** after Meta's Andromeda update.
- Killed losing ads quickly so budget stayed concentrated on winning variations, driving up to **40% higher appointment enquiry rate**.`,
  },
  {
    slug: 'doctor-authority-content-system',
    title: 'Doctor Authority Content System — Dr Saibal Moitra',
    category: 'marketing',
    description:
      "Built Dr Saibal Moitra's online presence as a trusted allergy specialist with authoritative patient content and a dedicated website.",
    client: 'Dr Saibal Moitra, Allergy Specialist',
    role: 'Healthcare Content & Website Manager',
    duration: 'Mar 2025 - Present',
    completion_date: 'Mar 2025 – Ongoing',
    made_by: 'Made by me',
    image_url: '',
    screenshots: [],
    metrics: ['Trusted Online Authority', 'Dedicated Website'],
    tags: ['Content Strategy', 'Authority Content', 'Healthcare Web'],
    color: 'purple',
    live_url: '',
    featured: true,
    order_index: 6,
    content: `# Doctor Authority Content System — Dr Saibal Moitra

## Overview & Objective
Patients searching for allergy diagnosis and specialist care need accurate, reassuring guidance. I built Dr Saibal Moitra's online presence as a trusted allergy specialist through authoritative content and a dedicated website.

---

## How I Executed It
- Structured a dedicated patient-focused website presenting allergy services clearly on mobile and desktop.
- Produced authoritative medical content and content calendars giving patients reliable allergy information they can trust.`,
  },
];

export const DEFAULT_POSTS: BlogPost[] = [
  {
    title: "Focusing on High-Winning Creatives After Meta's Andromeda Update",
    slug: 'meta-ads-andromeda-creative-strategy',
    excerpt:
      'Why shifting 80% of optimization energy toward high-winning creatives and killing losing ads fast lifted appointment enquiries by up to 40%.',
    content: `# Focusing on High-Winning Creatives After Meta's Andromeda Update

Media buying on Meta has evolved significantly. With deeper machine-learning retrieval models like Andromeda, creative relevance does the heavy lifting that granular interest targeting used to handle.

## What Changed in Practice
- Instead of splitting ₹60K/mo budgets across narrow audience pockets, consolidating campaigns lets delivery algorithms learn faster.
- Combining **AI Video Ad Production** (\`Google Flow\`, \`Higgsfield\`, \`ElevenLabs\`) with faster AI-assisted editing helps ship fresh hooks every week and kill losing ads early.

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
    title: 'Replacing Expensive Video Shoots With AI Creative Workflows',
    slug: 'ai-creative-workflows-for-performance-ads',
    excerpt:
      'How Google Flow, Higgsfield, ElevenLabs, and custom AI agents help performance marketers test more variations without studio budgets.',
    content: `# Replacing Expensive Video Shoots With AI Creative Workflows

In performance marketing, the team that tests more winning variations wins. Waiting weeks for studio shoots bottlenecks everything.

## My AI Creative Stack
- **Google Flow + Higgsfield + ElevenLabs** for ad-style storytelling videos.
- **Antigravity** creative editing workflows to assemble variations faster.
- **Claude Code** ad-analysis workflows to spot fatigue early and move budget straight to winners.`,
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

export function normalizeProfile(row: Record<string, unknown>): SiteProfile {
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

export function normalizeProject(row: Record<string, unknown>): Project {
  return {
    id: typeof row.id === 'string' ? row.id : undefined,
    slug: String(row.slug || ''),
    title: String(row.title || 'Untitled Project'),
    category:
      typeof row.category === 'string' && row.category.trim()
        ? row.category
        : 'marketing',
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

export function normalizePost(row: Record<string, unknown>): BlogPost {
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

// Public Data Fetchers with graceful fallback
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
        'Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY) are not configured on the server yet.',
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
      label:
        'projects fields (category, completion_date, made_by, screenshots)',
      query: sb
        .from('projects')
        .select('category, completion_date, made_by, screenshots')
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
