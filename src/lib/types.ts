export interface SiteProfile {
  id?: string;
  name: string;
  nickname?: string;
  avatar_url?: string;
  nav_logo: string;
  status_badge: string;
  headline_intro: string;
  headline_highlight: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  website_url?: string;
  resume_url: string;
  github_url: string;
  linkedin_url: string;
  twitter_url: string;
  hero_primary_cta?: string;
  hero_secondary_cta?: string;
  experience_heading?: string;
  projects_heading?: string;
  projects_subtitle?: string;
  stack_heading?: string;
  blog_heading?: string;
  blog_subtitle?: string;
  footer_heading?: string;
  footer_tagline: string;
  updated_at?: string;
}

export interface RightNow {
  id?: string;
  card_title?: string;
  building_title: string;
  building_desc: string;
  learning: string;
  current_projects?: string;
  reading?: string;
  based_in: string;
  updated_at?: string;
}

export interface Experience {
  id?: string;
  role: string;
  company: string;
  description: string;
  period: string;
  order_index: number;
  created_at?: string;
}

export interface Education {
  id?: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
  order_index: number;
  created_at?: string;
}

export interface TechStackGroup {
  id?: string;
  category: string;
  color: 'blue' | 'mint' | 'yellow' | 'purple' | string;
  skills: string[];
  order_index: number;
}

export interface Project {
  id?: string;
  slug: string;
  title: string;
  category?: string;
  description: string;
  content: string;
  client?: string;
  role?: string;
  duration?: string;
  completion_date?: string;
  made_by?: string;
  screenshots?: string[];
  metrics?: string[];
  tags: string[];
  color: 'yellow' | 'mint' | 'purple' | string;
  image_url?: string;
  live_url?: string;
  github_url?: string;
  featured?: boolean;
  order_index: number;
  created_at?: string;
}

export interface FavoriteItem {
  id?: string;
  category: string;
  icon: 'book' | 'music' | 'film' | 'tool' | string;
  color: 'peach' | 'blue' | 'purple' | 'mint' | string;
  title: string;
  subtitle: string;
  order_index: number;
}

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  read_time: string;
  published_at: string;
  published: boolean;
  cover_image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TableDiagnostic {
  table: string;
  ok: boolean;
  count: number | null;
  error?: string;
}

export interface SupabaseDiagnostics {
  configured: boolean;
  hasUrl: boolean;
  hasAnonKey: boolean;
  needsMigration: boolean;
  migrationWarnings: string[];
  tables: TableDiagnostic[];
}
