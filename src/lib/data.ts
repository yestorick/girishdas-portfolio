import { supabase, isSupabaseConfigured } from './supabase';
import {
  SiteProfile,
  RightNow,
  Experience,
  TechStackGroup,
  Project,
  FavoriteItem,
  BlogPost,
} from './types';

export const DEFAULT_PROFILE: SiteProfile = {
  name: 'Girish Das',
  nickname: 'Rick',
  avatar_url: '', // Upload photo in Supabase and paste URL here
  nav_logo: 'Girish Das',
  status_badge: 'Open to opportunities',
  headline_intro: "Hi, I'm Girish Das.",
  headline_highlight: 'Performance & Digital Marketing Executive',
  bio: 'Performance and digital marketer with 2.5 years of experience managing Google Ads and Meta Ads, delivering 3x ROAS, 30% lower CPC, and authoritative healthcare content that earns patient trust.',
  email: 'hellorick73@gmail.com',
  phone: '+91 81012 03353',
  resume_url: '#',
  github_url: 'https://github.com/yestorick',
  linkedin_url: 'https://linkedin.com/in/hellogirish',
  twitter_url: 'https://x.com/girishdas',
  footer_tagline: 'Always open to connecting with hiring teams, marketers, and founders about performance marketing roles and digital projects.',
};

export const DEFAULT_RIGHT_NOW: RightNow = {
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
    description: 'Managing ₹60K/month across Google Ads & Meta Ads; delivered 3x ROAS on Google Ads, 30% lower CPC, and up to 40% higher appointment enquiry rate on Meta Ads.',
    period: 'May 2025 - Present',
    order_index: 1,
  },
  {
    role: 'Personal Healthcare Content and Website Manager',
    company: 'Dr Saibal Moitra, Allergy Specialist',
    description: 'Established Dr Saibal Moitra as a trusted allergy specialist online through authoritative medical content and a dedicated patient-focused website.',
    period: 'Mar 2025 - Present',
    order_index: 2,
  },
  {
    role: 'Organic Social Media Manager',
    company: 'Freelance',
    description: 'Acquired 4 freelance clients independently and delivered 1.3 years of consistent organic social media content before taking a full-time marketing role.',
    period: 'Sep 2023 - Jan 2025',
    order_index: 3,
  },
];

export const DEFAULT_TECH_STACK: TechStackGroup[] = [
  {
    category: 'Paid Media',
    color: 'blue',
    skills: ['Google Ads (Search, Display)', 'Meta Ads', 'Keyword Research', 'Audience Targeting', 'A/B Testing', 'Budget Optimisation'],
    order_index: 1,
  },
  {
    category: 'Analytics & Tracking',
    color: 'mint',
    skills: ['Google Analytics 4', 'Google Tag Manager', 'Conversion Tracking', 'CPC / CPL / CTR', 'ROAS Reporting'],
    order_index: 2,
  },
  {
    category: 'Content & Creative',
    color: 'yellow',
    skills: ['Organic Social Media', 'Content Calendars', 'Copywriting', 'Authority Content', 'Canva'],
    order_index: 3,
  },
  {
    category: 'Tech & Outreach',
    color: 'purple',
    skills: ['Next.js & Vercel', 'Supabase', 'Healthcare Websites', 'Cold Outreach (Phone & Email)'],
    order_index: 4,
  },
];

export const DEFAULT_PROJECTS: Project[] = [
  {
    slug: 'google-ads-meta-ads-performance',
    title: 'Google Ads & Meta Ads Performance at NCD Immunocare',
    description: 'Managed ₹60K/month across Google and Meta Ads, delivering 3x ROAS, 30% lower CPC, and up to 40% more appointment enquiries.',
    client: 'NCD Immunocare Pvt Ltd (AATC)',
    role: 'Performance Marketing Executive',
    duration: 'May 2025 - Present',
    completion_date: 'May 2025 – Ongoing',
    made_by: 'Made by me',
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
    description: 'Built a dedicated healthcare website and authoritative allergy content hub positioning Dr Saibal Moitra as a trusted specialist online.',
    client: 'Dr Saibal Moitra, Allergy Specialist',
    role: 'Healthcare Content & Website Manager',
    duration: 'Mar 2025 - Present',
    completion_date: 'Mar 2025 – Ongoing',
    made_by: 'Made by me',
    screenshots: [],
    metrics: ['Trusted Online Authority', 'Dedicated Medical Hub', 'Clear Patient Education'],
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
    description: 'Designed and launched my personal site powered by Next.js, Tailwind CSS, and Supabase to present my paid ads and content work.',
    client: 'Personal Brand & Career',
    role: 'Creator & Marketer',
    duration: 'Ongoing',
    completion_date: 'Nov 2026',
    made_by: 'Made by me',
    screenshots: [],
    metrics: ['Mobile-First Design', 'Supabase Dynamic CMS', 'Custom Case Studies'],
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
- Organized all career data—experience, tech & marketing stacks, projects, blog notes, and favorites—into clean PostgreSQL tables on **Supabase**.
- Allows adding new campaign breakdowns or marketing articles quickly in Markdown without touching application code.

### 2. Calm, Eye-Soothing Personal UI
- Focused on readable typography, muted neutral tones with selective warm highlights, and responsive single-column mobile formatting.
- Includes an integrated printable résumé page tailored for recruiters.`,
  },
];

export const DEFAULT_FAVORITES: FavoriteItem[] = [
  {
    category: 'Books',
    icon: 'book',
    color: 'peach',
    title: 'Breakthrough Advertising',
    subtitle: 'Eugene Schwartz • Copy & Market Awareness',
    order_index: 1,
  },
  {
    category: 'Learning',
    icon: 'music',
    color: 'blue',
    title: 'YouTube & X (Twitter)',
    subtitle: 'Applied Paid Media & Content Breakdowns',
    order_index: 2,
  },
  {
    category: 'Films & shows',
    icon: 'film',
    color: 'purple',
    title: 'Moneyball',
    subtitle: 'Evidence-Led Decision Making',
    order_index: 3,
  },
  {
    category: 'Tools I use',
    icon: 'tool',
    color: 'mint',
    title: 'Google Ads, Meta & GA4',
    subtitle: 'Daily Paid Media & Tracking Stack',
    order_index: 4,
  },
];

export const DEFAULT_POSTS: BlogPost[] = [
  {
    title: 'Focusing on High-Winning Creatives After Meta’s Andromeda Update',
    slug: 'meta-ads-andromeda-creative-strategy',
    excerpt: 'Why shifting 80% of optimization energy from micro-targeting toward ad creatives increased appointment enquiry rates by up to 40%.',
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
  },
  {
    title: 'Cutting Google Ads CPC by 30% While Maintaining 3x ROAS',
    slug: 'cutting-google-ads-cpc-3x-roas',
    excerpt: 'Practical keyword sculpting, search term hygiene, and landing alignment steps for lean monthly budgets like ₹60K/mo.',
    content: `# Cutting Google Ads CPC by 30% While Maintaining 3x ROAS

Managing a focused monthly budget (such as ₹60K/mo) leaves zero room for wasted search spend.

## Three Levers That Made the Biggest Difference
1. **Intent-First Keyword Research**: Separating high-intent service queries from broad research phrases.
2. **Weekly Search Term Audits**: Adding negative keywords proactively before spend leaks out.
3. **Ad-to-Page Continuity**: Ensuring the landing page speaks directly to the visitor's immediate question so bounce rate drops and Quality Score improves.`,
    read_time: '5 min read',
    published_at: '2026-11-12',
    published: true,
  },
  {
    title: 'Why Trusted Content Matters More Than Ever in Healthcare Marketing',
    slug: 'healthcare-authority-content-trust',
    excerpt: 'Lessons from managing online authority and patient education websites for medical specialists.',
    content: `# Why Trusted Content Matters More Than Ever in Healthcare Marketing

In medical and healthcare categories, aggressive sales copy backfires. Patients are looking for clarity, empathy, and accuracy.

## Building Lasting Authority
- Explain conditions, triggers, and next steps in plain, accurate language.
- Keep the dedicated website calm, uncluttered, and easy to read on a smartphone.
- Consistency across website copy and organic content compounds credibility over months.`,
    read_time: '4 min read',
    published_at: '2026-11-04',
    published: true,
  },
];

// Data Fetchers with graceful fallback
export async function getProfile(): Promise<SiteProfile> {
  if (!isSupabaseConfigured || !supabase) return DEFAULT_PROFILE;
  try {
    const { data, error } = await supabase.from('site_profile').select('*').limit(1).maybeSingle();
    if (error || !data) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...data };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export async function getRightNow(): Promise<RightNow> {
  if (!isSupabaseConfigured || !supabase) return DEFAULT_RIGHT_NOW;
  try {
    const { data, error } = await supabase.from('right_now').select('*').limit(1).maybeSingle();
    if (error || !data) return DEFAULT_RIGHT_NOW;
    return { ...DEFAULT_RIGHT_NOW, ...data };
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
    return data;
  } catch {
    return DEFAULT_EXPERIENCES;
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
    return data;
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
    return data;
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
    return data;
  } catch {
    return DEFAULT_PROJECTS.find((p) => p.slug === slug) || null;
  }
}

export async function getFavorites(): Promise<FavoriteItem[]> {
  if (!isSupabaseConfigured || !supabase) return DEFAULT_FAVORITES;
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .order('order_index', { ascending: true });
    if (error || !data || data.length === 0) return DEFAULT_FAVORITES;
    return data;
  } catch {
    return DEFAULT_FAVORITES;
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
    if (error || !data || data.length === 0) return DEFAULT_POSTS;
    return data;
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
      .maybeSingle();
    if (error || !data) {
      return DEFAULT_POSTS.find((p) => p.slug === slug) || null;
    }
    return data;
  } catch {
    return DEFAULT_POSTS.find((p) => p.slug === slug) || null;
  }
}
