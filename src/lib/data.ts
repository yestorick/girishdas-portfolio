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
  nav_logo: '[GIRISH DAS]',
  status_badge: 'Open to opportunities',
  headline_intro: "Hi, I'm Girish Das. I build",
  headline_highlight: 'SCALABLE WEB & AI SYSTEMS',
  bio: 'Full-stack software engineer crafting responsive, fast, and resilient web applications with modern architectures.',
  email: 'girishdas@gmail.com',
  resume_url: '#',
  github_url: 'https://github.com/yestorick',
  linkedin_url: 'https://linkedin.com/in/girishdas',
  twitter_url: 'https://x.com/girishdas',
  footer_tagline: 'Feel free to reach out for high-impact roles, engineering contracts, or collaborative technical projects.',
};

export const DEFAULT_RIGHT_NOW: RightNow = {
  building_title: 'Rankgate GMB & AI SaaS',
  building_desc: 'One-tap review routing and QR engine',
  learning: 'Next.js 15 App Router & Supabase Postgres',
  reading: 'Designing Data-Intensive Applications',
  based_in: 'Bengaluru, India',
};

export const DEFAULT_EXPERIENCES: Experience[] = [
  {
    role: 'Senior Full-Stack Engineer',
    company: 'Apex Systems',
    description: 'Leading core web architecture, micro-frontends, and high-throughput real-time APIs.',
    period: '2024 - Now',
    order_index: 1,
  },
  {
    role: 'Software Engineer',
    company: 'Nova Cloud Labs',
    description: 'Engineered distributed serverless pipelines, automated CI/CD workflows, and database layers.',
    period: '2022 - 2024',
    order_index: 2,
  },
  {
    role: 'Full-Stack Developer & CS Fellow',
    company: 'Tech Institute',
    description: 'Graduated with Distinction; developed open-source tools and cloud storage integrations.',
    period: '2019 - 2021',
    order_index: 3,
  },
];

export const DEFAULT_TECH_STACK: TechStackGroup[] = [
  {
    category: 'Languages',
    color: 'blue',
    skills: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL'],
    order_index: 1,
  },
  {
    category: 'Frontend',
    color: 'mint',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Redux', 'HTML5/CSS3'],
    order_index: 2,
  },
  {
    category: 'Backend & data',
    color: 'yellow',
    skills: ['Node.js', 'Supabase', 'PostgreSQL', 'FastAPI', 'MongoDB'],
    order_index: 3,
  },
  {
    category: 'Tools',
    color: 'purple',
    skills: ['Git & GitHub', 'Docker', 'Vercel', 'Linux', 'Figma', 'Postman'],
    order_index: 4,
  },
];

export const DEFAULT_PROJECTS: Project[] = [
  {
    title: 'Rankgate GMB',
    description: 'Autonomous Google Business Profile review engine with one-tap QR routing and intelligent keyword optimization.',
    tags: ['Next.js', 'FastAPI', 'MongoDB', 'Gemini AI'],
    color: 'yellow',
    live_url: 'https://rickgmb.vercel.app',
    github_url: 'https://github.com/yestorick/review-gmb-dev',
    featured: true,
    order_index: 1,
  },
  {
    title: 'DevPulse Studio',
    description: 'Developer analytics workbench visualizing git commits, PR velocity, and test coverage across distributed teams.',
    tags: ['TypeScript', 'Supabase', 'Postgres', 'Tailwind'],
    color: 'mint',
    live_url: 'https://girishdas.vercel.app',
    github_url: 'https://github.com/yestorick',
    featured: true,
    order_index: 2,
  },
  {
    title: 'AgentMesh Orchestrator',
    description: 'Multi-agent coordination system enabling autonomous code review, linting, and automated cloud deployments.',
    tags: ['Python', 'FastAPI', 'Docker', 'Vercel'],
    color: 'purple',
    live_url: 'https://girishdas.vercel.app',
    github_url: 'https://github.com/yestorick',
    featured: true,
    order_index: 3,
  },
];

export const DEFAULT_FAVORITES: FavoriteItem[] = [
  {
    category: 'Books',
    icon: 'book',
    color: 'peach',
    title: 'Designing Data-Intensive Applications',
    subtitle: 'Martin Kleppmann',
    order_index: 1,
  },
  {
    category: 'Music',
    icon: 'music',
    color: 'blue',
    title: 'Random Access Memories',
    subtitle: 'Daft Punk • Electronic',
    order_index: 2,
  },
  {
    category: 'Films & shows',
    icon: 'film',
    color: 'purple',
    title: 'Interstellar',
    subtitle: 'Christopher Nolan • 2014',
    order_index: 3,
  },
  {
    category: 'Tools I love',
    icon: 'tool',
    color: 'mint',
    title: 'VS Code & Supabase',
    subtitle: 'Developer Stack & Cloud Database',
    order_index: 4,
  },
];

export const DEFAULT_POSTS: BlogPost[] = [
  {
    title: 'Building Resilient Serverless APIs with Next.js and Supabase',
    slug: 'building-resilient-serverless-apis',
    excerpt: 'How to design fault-tolerant database connections, handle cold starts gracefully, and structure production PostgreSQL queries with Supabase.',
    content: `# Building Resilient Serverless APIs with Next.js and Supabase

Serverless functions have transformed how we build and scale modern web applications. However, handling database connection pooling and cold starts requires careful architectural choices.

## The Challenge with Connection Limits

Traditional relational databases like PostgreSQL expect persistent connections. In serverless environments, sudden traffic spikes can exhaust connection limits quickly.

### Supabase Connection Pooling

Supabase provides built-in Supavisor connection pooling out of the box. By configuring transaction mode and utilizing the Supabase JavaScript client with session re-use, our serverless routes execute reliably without connection exhaustion:

\`\`\`typescript
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
\`\`\`

## Zero-Downtime Fallback Design

By implementing graceful fallback layers, our client applications remain fast and resilient even during network hiccups or cold boots.

Stay tuned for more deep dives into cloud architecture!`,
    read_time: '5 min read',
    published_at: '2026-11-20',
    published: true,
  },
  {
    title: 'The Neo-Brutalist Design Philosophy: Why Bold Borders & High Contrast Win',
    slug: 'neo-brutalist-design-philosophy',
    excerpt: 'Exploring why tactile drop-shadows, high-contrast borders, and joyful pastel palettes make digital interfaces more memorable.',
    content: `# The Neo-Brutalist Design Philosophy

Neo-brutalism blends raw HTML brutalism with playful typography, vibrant pastel hues, and tactile offset drop-shadows.

## Key Design Principles

1. **High Contrast Borders**: 2px solid black borders provide immediate visual definition.
2. **Tactile Shadows**: Hard-edge offsets (e.g., \`4px 4px 0px #000\`) communicate physical depth without muddy blurs.
3. **Intentional Color Blocking**: Gentle pastels (mint, lavender, peach, soft yellow) keep the visual hierarchy clear and approachable.

Interfaces should feel fun, responsive, and tactile.`,
    read_time: '4 min read',
    published_at: '2026-11-13',
    published: true,
  },
  {
    title: 'Scaling Real-Time Agent Workflows on the Edge',
    slug: 'scaling-real-time-agent-workflows',
    excerpt: 'Lessons learned deploying autonomous agent loops, streaming LLM completions, and orchestrating serverless tasks on Vercel.',
    content: `# Scaling Real-Time Agent Workflows on the Edge

Building AI agent workflows requires fast token streaming, structured JSON parsing, and deterministic prompt guarantees.

## Dynamic Prompt Construction

We ensure that all agent outputs adhere strictly to schema expectations while keeping response latency under 1.5 seconds across global regions.`,
    read_time: '6 min read',
    published_at: '2026-11-02',
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
