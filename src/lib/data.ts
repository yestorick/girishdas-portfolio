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
  avatar_url: '', // User can paste an image URL or upload to Supabase
  nav_logo: '[GIRISH DAS]',
  status_badge: 'Open to opportunities',
  headline_intro: "Hi, I'm Girish Das. I build",
  headline_highlight: 'HIGH-ROI DIGITAL GROWTH & PAID ADS',
  bio: 'Performance Marketer & Digital Growth Strategist scaling multi-channel paid acquisition across Meta, Google, and TikTok. I engineer high-converting landing pages, optimize ROAS, and scale ad budgets profitably.',
  email: 'girishdas@gmail.com',
  resume_url: '#',
  github_url: 'https://github.com/yestorick',
  linkedin_url: 'https://linkedin.com/in/girishdas',
  twitter_url: 'https://x.com/girishdas',
  footer_tagline: 'Available for full-time growth leadership roles, performance marketing contracts, or high-scale paid acquisition audits.',
};

export const DEFAULT_RIGHT_NOW: RightNow = {
  building_title: 'Scalable Paid Acquisition Funnels',
  building_desc: 'Managing multi-channel ad spend & high-intent CRO landing pages',
  learning: 'AI-driven creative testing & cookieless attribution models (GA4 + CAPI)',
  reading: 'Breakthrough Advertising by Eugene Schwartz',
  based_in: 'Bengaluru, India',
};

export const DEFAULT_EXPERIENCES: Experience[] = [
  {
    role: 'Lead Performance Marketer',
    company: 'GrowthScale Media',
    description: 'Managing $150K+/month paid media spend across Meta, Google Ads & TikTok; scaled client revenue by 320% with 4.5x average ROAS.',
    period: '2024 - Now',
    order_index: 1,
  },
  {
    role: 'Senior Digital Marketing Specialist',
    company: 'OmniDigital Agency',
    description: 'Spearheaded full-funnel paid search & paid social campaigns, built high-converting landing pages, and implemented GA4 server-side tracking.',
    period: '2022 - 2024',
    order_index: 2,
  },
  {
    role: 'Digital Marketing & Acquisition Associate',
    company: 'Vanguard Growth Labs',
    description: 'Conducted rigorous A/B creative testing, audience segmentation, and email nurture workflows with a 42% decrease in blended CAC.',
    period: '2020 - 2022',
    order_index: 3,
  },
];

export const DEFAULT_TECH_STACK: TechStackGroup[] = [
  {
    category: 'Paid Channels & Ads',
    color: 'blue',
    skills: ['Meta Ads (FB/IG)', 'Google Search & PMax', 'TikTok Ads', 'YouTube Ads', 'LinkedIn Ads'],
    order_index: 1,
  },
  {
    category: 'Analytics & Tracking',
    color: 'mint',
    skills: ['Google Analytics 4', 'Google Tag Manager', 'Meta Conversions API', 'Looker Studio', 'Triple Whale'],
    order_index: 2,
  },
  {
    category: 'CRO & Funnels',
    color: 'yellow',
    skills: ['Unbounce', 'Webflow', 'Shopify Plus', 'Optimizely', 'Hotjar', 'VWO'],
    order_index: 3,
  },
  {
    category: 'Marketing Tools & Ops',
    color: 'purple',
    skills: ['Klaviyo', 'HubSpot', 'Zapier Automation', 'SEMrush & Ahrefs', 'Canva Pro', 'PostHog'],
    order_index: 4,
  },
];

export const DEFAULT_PROJECTS: Project[] = [
  {
    slug: 'scaling-d2c-brand-meta-tiktok',
    title: 'Scaling D2C E-Commerce Brand from $30K to $180K/mo',
    description: 'Multi-channel paid social acquisition blitz on Meta & TikTok paired with dynamic landing page CRO that lowered CAC by 38%.',
    client: 'D2C Apparel & Lifestyle Brand',
    role: 'Lead Growth & Paid Media Strategist',
    duration: '4 Months',
    metrics: ['4.8x Blended ROAS', '-38% Customer CAC', '+310% Net Monthly Revenue'],
    tags: ['Meta Ads', 'TikTok Ads', 'Shopify CRO', 'Triple Whale'],
    color: 'yellow',
    live_url: 'https://girishdas.vercel.app',
    featured: true,
    order_index: 1,
    content: `# Scaling D2C E-Commerce Brand from $30K to $180K/mo

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
- **Hook Variations**: Tested 5 distinct emotional hooks per video (Problem-Agitate, UGC Unboxing, Founder Story, Us vs. Them Comparison, and Before/After).
- **Format Diversification**: Rolled out authentic creator UGC (User-Generated Content), TikTok native style 9:16 vertical videos, and high-contrast motion graphic carousels.
- **Micro-Budget Sandbox**: Tested 15-20 creative iterations weekly in dynamic creative ad sets (DCT) before promoting winners to high-budget Advantage+ Shopping Campaigns (ASC).

### 2. Full-Funnel Retargeting & Offer Architecture
- **Middle of Funnel (MOF)**: Retargeted video viewers (75%+ watch time) and social engagers with social proof carousels and influencer testimonials.
- **Bottom of Funnel (BOF)**: Dynamic product catalog ads (DPA) targeting 30-day website visitors with tiered bundle discounts and free shipping thresholds.

### 3. Conversion Rate Optimization (CRO)
Traffic alone doesn't scale without a leak-proof funnel. We redesigned the product detail page (PDP):
- Added sticky "Add to Cart" CTA on mobile viewports.
- Integrated transparent customer review badges directly below the main hero image.
- Implemented 1-click checkout with Shop Pay and Apple Pay, reducing checkout abandonment by 24%.

### 4. Cookieless Tracking & Attribution Setup
Configured Meta Conversions API (CAPI) via Google Tag Manager Server-Side container, maintaining a 9.2/10 Event Match Quality (EMQ) score to circumvent iOS 14.5+ attribution drop-off.

---

## Measurable Results

| Metric | Before Intervention | After 120 Days | Improvement |
| :--- | :--- | :--- | :--- |
| **Monthly Revenue** | $31,200 | $184,500 | **+491% Growth** |
| **Blended ROAS** | 2.1x | **4.8x** | **+128% Efficiency** |
| **Customer CAC** | $66.40 | **$41.15** | **-38% Cost Reduction** |
| **Conversion Rate** | 1.8% | **3.4%** | **+88% Lift** |

---

## Key Takeaways
1. **Creative is the new targeting**: High-converting creative hooks combined with broad audience targeting consistently outperformed narrow interest stacks.
2. **Post-click experience drives the sale**: Aligning the ad's exact promise directly with the landing page above-the-fold headline doubled conversion velocity.`,
  },
  {
    slug: 'b2b-saas-google-search-scale',
    title: 'B2B SaaS Google Search & High-Intent Pipeline Scaling',
    description: 'Restructured paid search architecture with negative keyword sculpting and dedicated comparison landing pages, lifting qualified demo requests by 190%.',
    client: 'Cloud Security & Compliance SaaS',
    role: 'Search Engine Marketing Lead',
    duration: '3 Months',
    metrics: ['+190% Qualified Leads', '3.4x Pipeline Value', '62% Lower Cost Per Demo'],
    tags: ['Google Search', 'High-Intent Keywords', 'Unbounce CRO', 'GA4'],
    color: 'mint',
    live_url: 'https://girishdas.vercel.app',
    featured: true,
    order_index: 2,
    content: `# B2B SaaS Google Search & High-Intent Pipeline Scaling

## The Challenge
A Series A B2B software company was burning $25,000/month on Google Ads with little to show: cost per sales-qualified lead (SQL) exceeded $480, and the sales team reported over 70% of inbound demo requests were tire-kickers or students looking for free templates.

---

## The Strategic Solution

### 1. High-Intent Keyword Sculpting
- Stripped away broad generic keywords (e.g. "cloud software", "compliance guide").
- Rebuilt campaigns strictly around **high-commercial intent terms**:
  - Direct Competitor Alternatives (e.g., *"[Competitor] alternative"*, *"[Competitor] pricing"*).
  - Software evaluation queries (e.g., *"SOC 2 automated compliance platform"*).
- Deployed an extensive 600+ negative keyword list to eliminate non-buyers (e.g., *jobs, salary, open source, pdf, free, tutorial*).

### 2. Bespoke "Us vs. Them" Comparison Landing Pages
Rather than routing traffic to the generic homepage, every competitor ad landed on a dedicated, distraction-free Unbounce landing page featuring:
- Head-to-head feature comparison matrix.
- Verified G2 & Trustpilot rating chips.
- Interactive ROI calculator showcasing time saved.
- Multi-step frictionless demo booking form connected via Calendly & HubSpot.

### 3. Smart Bidding with Value-Based Conversion Tracking
Configured offline conversion import (OCI) between HubSpot CRM and Google Ads. Instead of optimizing for cheap form fills, Google's Smart Bidding algorithm was fed actual **Sales-Qualified Opportunities**, focusing budget on high-contract-value buyers.

---

## Measurable Results
- **+190% Increase in Qualified Demo Bookings**
- **62% Reduction in Cost Per Qualified Demo** (from $480 down to $182)
- **$1.4M in New Attributed Pipeline Value** within 90 days.`,
  },
  {
    slug: 'omnichannel-growth-creative-engine',
    title: 'Omnichannel Paid Media & Creative Testing Engine',
    description: 'Designed a cross-channel paid funnel synchronizing Meta, YouTube, and retargeting ads with automated email workflows, generating over $500K in tracked sales.',
    client: 'EdTech & Digital Learning Platform',
    role: 'Growth Marketing Director',
    duration: '6 Months',
    metrics: ['$500K+ Ad Spend Managed', '28 Winning Creative Hooks', '4.1x Blended ROAS'],
    tags: ['Omnichannel', 'A/B Testing', 'CAPI & GTM', 'Klaviyo'],
    color: 'purple',
    live_url: 'https://girishdas.vercel.app',
    featured: true,
    order_index: 3,
    content: `# Omnichannel Paid Media & Creative Testing Engine

## The Strategy
To overcome ad fatigue and rising ad costs, we built an integrated growth engine orchestrating **Meta, YouTube Ads, and Klaviyo lifecycle retention**.

### Key Pillars:
1. **Video Hook Optimization**: Tested 100+ creative angles; identified 28 evergreen video hooks that maintained high ROAS across 180+ days.
2. **Channel-Specific Messaging**:
   - YouTube Ads for long-form authority building & deep educational proof.
   - Meta & Instagram for rapid visual urgency, testimonials, and dynamic retargeting.
3. **Lifecycle Synergy**: Integrated Klaviyo abandoned checkout SMS & email sequences, recovering an additional 18.5% of unconverted paid traffic.

---

## Key Results
- Managed over **$500,000** in multi-channel paid media budget.
- Delivered a sustained **4.1x blended ROAS** across all quarters.
- Decreased overall customer payback period from 65 days to 28 days.`,
  },
];

export const DEFAULT_FAVORITES: FavoriteItem[] = [
  {
    category: 'Books',
    icon: 'book',
    color: 'peach',
    title: 'Breakthrough Advertising',
    subtitle: 'Eugene Schwartz • The Direct Response Bible',
    order_index: 1,
  },
  {
    category: 'Podcasts',
    icon: 'music',
    color: 'blue',
    title: 'Marketing Against The Grain',
    subtitle: 'Kipp Bodnar & Kieran Flanagan • HubSpot Growth',
    order_index: 2,
  },
  {
    category: 'Films & shows',
    icon: 'film',
    color: 'purple',
    title: 'Moneyball',
    subtitle: 'Bennett Miller • Data-Driven Strategy',
    order_index: 3,
  },
  {
    category: 'Tools I love',
    icon: 'tool',
    color: 'mint',
    title: 'Meta Ads Manager & GA4',
    subtitle: 'Paid Acquisition & Cookieless Attribution Stack',
    order_index: 4,
  },
];

export const DEFAULT_POSTS: BlogPost[] = [
  {
    title: 'How to Scale Meta Ads Past $50,000/Month Without ROAS Fatigue',
    slug: 'how-to-scale-meta-ads-past-50k',
    excerpt: 'The exact Advantage+ campaign architecture, creative testing pipeline, and budget pacing framework to scale paid social profitably.',
    content: `# How to Scale Meta Ads Past $50,000/Month Without ROAS Fatigue

Every media buyer has hit the dreaded "scaling wall": you increase daily budgets by 30%, and your CPA spikes by 80%. Here is the exact framework to break through.

## 1. Separate Testing from Scaling (The Two-Account Sandbox)
Never test new creative concepts directly inside your primary scaling campaigns. 

Use a dedicated **Testing Campaign**:
- **Dynamic Creative Ad Sets (DCT)**: 3 creatives, 2 copy variations, 2 headlines.
- Run at a fixed budget until you gather statistically significant conversion metrics (minimum 50 purchases).
- Extract the winning post ID (with all accumulated likes and comments) and promote it into your **Advantage+ Shopping Campaign (ASC)**.

## 2. Creative Angle Diversification
Most advertisers create 10 ads that all pitch the same benefit. To scale to six figures, you need distinct emotional angles:
- **Angle A**: The Pain Point / Problem Solver (focus on current frustration).
- **Angle B**: The Competitor Alternative (why other solutions fail).
- **Angle C**: The Social Proof / Viral Trend (UGC reactions).
- **Angle D**: The Value / Bundle Economics (financial upside).

## 3. Monitor Blended Metrics (MER)
In the post-iOS 14.5 landscape, in-platform ROAS is often under-reported by 15-25%. Focus on your **Marketing Efficiency Ratio (MER)**:

\`\`\`
MER = Total Store Revenue / Total Paid Ad Spend
\`\`\`

If your MER remains healthy above 3.5x, continue scaling aggregate budget regardless of in-platform reporting delays.`,
    read_time: '5 min read',
    published_at: '2026-11-20',
    published: true,
  },
  {
    title: 'The Cookieless Future: Setting Up Meta CAPI and GA4 Server-Side Attribution',
    slug: 'cookieless-attribution-capi-ga4',
    excerpt: 'Step-by-step blueprint to implement server-side tracking via Google Tag Manager and overcome browser cookie degradation.',
    content: `# The Cookieless Future: Setting Up Meta CAPI and GA4 Server-Side Attribution

Client-side browser tracking is dying. Safari ITP, Firefox tracking protection, and ad blockers routinely block 20% to 35% of client-side pixels.

## Why Server-Side Tracking Is Essential
With Server-Side Google Tag Manager (sGTM) and Meta Conversions API:
- Events originate directly from your cloud server, invisible to ad blockers.
- First-party cookies are set via your custom domain (\`metrics.yourdomain.com\`), extending cookie lifetime from 24 hours to up to 1 year.
- Customer data parameters (hashed email, phone, IP address) are securely enriched, dramatically improving Meta Event Match Quality (EMQ).

## Implementation Checklist
1. Deploy a server-side GTM container on a custom subdomain.
2. Forward Web GTM events to the server endpoint via the GA4 client.
3. Configure the official Meta CAPI tag on the server container.
4. Pass deduplicated \`event_id\` headers between browser and server to eliminate double-counting.`,
    read_time: '6 min read',
    published_at: '2026-11-12',
    published: true,
  },
  {
    title: 'Landing Page Anatomy: 7 CRO Tweaks That Doubled Conversion Rates',
    slug: 'landing-page-cro-tweaks',
    excerpt: 'Proven direct-response layout patterns and micro-copy changes that increase page conversion velocity on mobile viewports.',
    content: `# Landing Page Anatomy: 7 CRO Tweaks That Doubled Conversion Rates

Generating traffic is only half the battle. If your landing page converts at 1.5% instead of 3.0%, you are paying double for every single customer.

## 1. Above-The-Fold Clarity
Visitors decide whether to stay within 3 seconds. Your hero section must answer 3 fundamental questions immediately:
- What is this?
- How does it improve my life or business?
- What do I do next?

## 2. Eliminate Navigation Distractions
Remove the traditional top navigation bar on paid landing pages. Every external link (e.g., "About Us", "Press", "Careers") is a leak where paid ad dollars escape without converting.

## 3. High-Contrast Neo-Brutalist CTAs
Buttons should look physically clickable. Solid black borders, tactile drop shadows, and high-contrast color pills out-perform subtle ghost buttons by over 28% in mobile A/B testing.`,
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
