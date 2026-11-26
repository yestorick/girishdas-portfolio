'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Database,
  ArrowLeft,
  CheckCircle2,
  Copy,
  ExternalLink,
  Briefcase,
  Layers,
  Sparkles,
  PenTool,
} from 'lucide-react';

export default function AdminGuidePage() {
  const [copied, setCopied] = useState(false);

  const copySqlSnippet = () => {
    navigator.clipboard.writeText(`-- Girish Das Portfolio Database Setup
-- 1. Create a Supabase project at https://supabase.com
-- 2. Open SQL Editor
-- 3. Paste the contents of supabase/schema.sql and click Run!`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-dvh flex flex-col bg-[#FBF9F5]">
      <Navbar logoText="ADMIN GUIDE" />

      <main id="main-content" tabIndex={-1} className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-12 focus:outline-none">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to Portfolio</span>
        </Link>

        {/* Header */}
        <div className="neo-card-static bg-[#EDF3F7] rounded-2xl p-6 sm:p-8 mb-8 text-[#1C1917]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-white border-[1.5px] border-[#292524] flex items-center justify-center">
              <Database className="w-4 h-4 text-[#1C1917]" aria-hidden="true" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1C1917] font-display">
              Supabase Content Management Hub
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#44403C] max-w-2xl leading-relaxed">
            Manage and edit your experiences, write and publish new blog articles, upload case studies, and update your status in real-time through Supabase.
          </p>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="space-y-6">
          {/* Step 1: SQL Setup */}
          <div className="neo-card bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#EDF4EF] border border-[#292524] flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <h2 className="text-base sm:text-lg font-bold text-[#1C1917] font-display">
                  Initialize Supabase Tables (1-Click SQL)
                </h2>
              </div>
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn inline-flex items-center gap-1.5 bg-[#F9F3DF] hover:bg-[#F3E9C6] text-[#1C1917] px-3.5 py-1.5 text-xs font-semibold rounded-full"
              >
                <span>Supabase Dashboard</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>

            <p className="text-xs sm:text-sm text-[#57534E] mb-4">
              In your Supabase project, go to <strong>SQL Editor</strong>, open the provided <code>supabase/schema.sql</code> file, and click <strong>Run</strong>. This will automatically create all tables with Row-Level-Security (RLS) policies and seed initial data.
            </p>

            <div className="bg-[#18181B] text-stone-100 p-4 rounded-xl text-xs font-mono border border-[#292524] relative">
              <button
                type="button"
                onClick={copySqlSnippet}
                className="absolute top-3 right-3 px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white inline-flex items-center gap-1.5 text-[11px]"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
                <span>{copied ? 'Copied' : 'Copy Instructions'}</span>
              </button>
              <pre className="overflow-x-auto pr-28">
{`-- File located at: supabase/schema.sql
-- Tables created:
-- 1. site_profile  (Bio, Avatar URL, Status badge, Socials, Resume)
-- 2. right_now     (Building, Learning, Reading, Based in)
-- 3. experiences   (Role, Company, Description, Period)
-- 4. tech_stack    (Channels, Analytics, CRO, Tools)
-- 5. projects      (Case studies, Slug, Markdown content, Metrics)
-- 6. favorites     (Books, Podcasts, Films, Tools)
-- 7. posts         (Blog posts with Markdown)`}
              </pre>
            </div>
          </div>

          {/* Step 2: Vercel Environment Variables */}
          <div className="neo-card bg-white rounded-2xl p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-6 h-6 rounded-full bg-[#EDF4EF] border border-[#292524] flex items-center justify-center text-xs font-bold">
                2
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#1C1917] font-display">
                Connect to Vercel Deployment
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#57534E] mb-3 leading-relaxed">
              In your Vercel Project Settings under <strong>Environment Variables</strong> (or via the Supabase Vercel integration), confirm these two keys exist:
            </p>
            <div className="bg-[#FBF9F5] border border-[#1C1917]/20 rounded-xl p-4 text-xs font-mono space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-[#1C1917]">NEXT_PUBLIC_SUPABASE_URL</span>
                <span className="text-[#78716C]">https://your-project.supabase.co</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-[#1C1917]">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
                <span className="text-[#78716C]">eyJhbGciOiJIUzI1Ni...</span>
              </div>
            </div>
          </div>

          {/* Step 3: How to Edit Content Structured Way */}
          <div className="neo-card bg-white rounded-2xl p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-6 h-6 rounded-full bg-[#EDF4EF] border border-[#292524] flex items-center justify-center text-xs font-bold">
                3
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#1C1917] font-display">
                How to Edit Content in Supabase Table Editor
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-[#1C1917]/20 bg-[#EDF4EF]">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm mb-1.5 text-[#1C1917]">
                  <PenTool className="w-4 h-4 text-[#1E5631]" aria-hidden="true" />
                  <span>Publish New Blog Post</span>
                </div>
                <p className="text-xs text-[#44403C]">
                  Go to <strong>posts</strong> table &gt; Click <strong>Insert Row</strong>. Enter <code>title</code>, <code>slug</code>, <code>read_time</code>, and write your blog post in <code>content</code> using Markdown. Set <code>published = true</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#1C1917]/20 bg-[#F9F3DF]">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm mb-1.5 text-[#1C1917]">
                  <Layers className="w-4 h-4 text-[#78350F]" aria-hidden="true" />
                  <span>Upload New Case Study</span>
                </div>
                <p className="text-xs text-[#44403C]">
                  Go to <strong>projects</strong> table &gt; Click <strong>Insert Row</strong>. Fill <code>slug</code>, <code>title</code>, <code>description</code>, <code>metrics</code>, <code>tags</code>, and full Markdown breakdown in <code>content</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#1C1917]/20 bg-[#F1EEF7]">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm mb-1.5 text-[#1C1917]">
                  <Briefcase className="w-4 h-4 text-[#4C1D95]" aria-hidden="true" />
                  <span>Update Work Experience</span>
                </div>
                <p className="text-xs text-[#44403C]">
                  Go to <strong>experiences</strong> table &gt; Edit or insert any job role, company name, summary description, and period (e.g. <code>2024 - Now</code>).
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#1C1917]/20 bg-[#F7ECE6]">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm mb-1.5 text-[#1C1917]">
                  <Sparkles className="w-4 h-4 text-[#9A3412]" aria-hidden="true" />
                  <span>Update Photo &amp; Right Now</span>
                </div>
                <p className="text-xs text-[#44403C]">
                  Go to <strong>site_profile</strong> to paste your <code>avatar_url</code> photo, or edit <strong>right_now</strong> to update what you&apos;re building and reading.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer
        profile={{
          name: 'Girish Das',
          nav_logo: 'GIRISH DAS',
          status_badge: 'Open to opportunities',
          headline_intro: "Hi, I'm Girish Das.",
          headline_highlight: 'growth strategist',
          bio: '',
          email: 'girishdas@gmail.com',
          resume_url: '#',
          github_url: 'https://github.com/yestorick',
          linkedin_url: 'https://linkedin.com/in/girishdas',
          twitter_url: 'https://x.com/girishdas',
          footer_tagline: 'Girish Das Portfolio CMS Admin',
        }}
      />
    </div>
  );
}
