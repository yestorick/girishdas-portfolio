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
  BookOpen,
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
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar logoText="[ADMIN GUIDE]" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-black mb-8 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>

        {/* Header */}
        <div className="neo-card-static bg-[#BAE6FD] rounded-2xl p-6 sm:p-8 mb-8 text-black">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-white border-2 border-black flex items-center justify-center shadow-brutal-sm">
              <Database className="w-4 h-4 text-black" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black">
              Supabase Content Management Hub
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#222] max-w-2xl leading-relaxed">
            Manage and edit your experiences, write and publish new blog articles, upload projects, and update your status in real-time through Supabase.
          </p>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="space-y-6">
          {/* Step 1: SQL Setup */}
          <div className="neo-card bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#BBF7D0] border-2 border-black flex items-center justify-center text-xs font-black">
                  1
                </span>
                <h2 className="text-base sm:text-lg font-extrabold text-black">
                  Initialize Supabase Tables (1-Click SQL)
                </h2>
              </div>
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn inline-flex items-center gap-1.5 bg-[#FDE68A] text-black px-3 py-1 text-xs font-bold rounded-full"
              >
                <span>Supabase Dashboard</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-xs sm:text-sm text-[#444] mb-4">
              In your Supabase project, go to <strong>SQL Editor</strong>, open the provided <code>supabase/schema.sql</code> file, and click <strong>Run</strong>. This will automatically create all tables with Row-Level-Security (RLS) policies and seed initial data.
            </p>

            <div className="bg-[#141416] text-white p-4 rounded-xl text-xs font-mono border-2 border-black relative">
              <button
                onClick={copySqlSnippet}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-1 text-[11px]"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Instructions'}</span>
              </button>
              <pre className="overflow-x-auto">
{`-- File located at: supabase/schema.sql
-- Tables created:
-- 1. site_profile  (Bio, Status badge, Socials, Resume)
-- 2. right_now     (Building, Learning, Reading, Based in)
-- 3. experiences   (Role, Company, Description, Period)
-- 4. tech_stack    (Languages, Frontend, Backend & data, Tools)
-- 5. projects      (Projects, Tags, Color, Live URLs)
-- 6. favorites     (Books, Music, Films, Tools)
-- 7. posts         (Blog posts with Markdown)`}
              </pre>
            </div>
          </div>

          {/* Step 2: Vercel Environment Variables */}
          <div className="neo-card bg-white rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-[#BBF7D0] border-2 border-black flex items-center justify-center text-xs font-black">
                2
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-black">
                Connect to Vercel Deployment
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#444] mb-3 leading-relaxed">
              In your Vercel Project Settings under <strong>Environment Variables</strong>, add your two Supabase keys:
            </p>
            <div className="bg-slate-50 border-2 border-black rounded-xl p-4 text-xs font-mono space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-black">NEXT_PUBLIC_SUPABASE_URL</span>
                <span className="text-slate-500">https://your-project.supabase.co</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-black">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
                <span className="text-slate-500">eyJhbGciOiJIUzI1Ni...</span>
              </div>
            </div>
          </div>

          {/* Step 3: How to Edit Content Structured Way */}
          <div className="neo-card bg-white rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-[#BBF7D0] border-2 border-black flex items-center justify-center text-xs font-black">
                3
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-black">
                How to Edit Content in Supabase Table Editor
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border-2 border-black bg-[#BBF7D0]/40">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm mb-1.5">
                  <PenTool className="w-4 h-4 text-emerald-800" />
                  <span>Publish New Blog Post</span>
                </div>
                <p className="text-xs text-[#333]">
                  Go to <strong>posts</strong> table &gt; Click <strong>Insert Row</strong>. Enter <code>title</code>, <code>slug</code>, <code>read_time</code>, and write your blog post in <code>content</code> using standard Markdown! Set <code>published = true</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl border-2 border-black bg-[#FDE68A]/40">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm mb-1.5">
                  <Layers className="w-4 h-4 text-amber-800" />
                  <span>Upload New Project</span>
                </div>
                <p className="text-xs text-[#333]">
                  Go to <strong>projects</strong> table &gt; Click <strong>Insert Row</strong>. Fill <code>title</code>, <code>description</code>, <code>tags</code> (e.g. <code>{'{"React", "Node"}'}</code>), <code>color</code> (<code>yellow</code>, <code>mint</code>, or <code>purple</code>), and <code>live_url</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl border-2 border-black bg-[#DDD6FE]/40">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm mb-1.5">
                  <Briefcase className="w-4 h-4 text-purple-800" />
                  <span>Update Work Experience</span>
                </div>
                <p className="text-xs text-[#333]">
                  Go to <strong>experiences</strong> table &gt; Edit or insert any job role, company name, summary description, and period (e.g. <code>2024 - Now</code>).
                </p>
              </div>

              <div className="p-4 rounded-xl border-2 border-black bg-[#FFC4B0]/40">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm mb-1.5">
                  <Sparkles className="w-4 h-4 text-rose-800" />
                  <span>Update &quot;Right Now&quot; Card</span>
                </div>
                <p className="text-xs text-[#333]">
                  Go to <strong>right_now</strong> table &gt; Edit what you are currently building, learning, reading, or your current city.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer
        profile={{
          name: 'Girish Das',
          nav_logo: '[GIRISH DAS]',
          status_badge: 'Open to opportunities',
          headline_intro: "Hi, I'm Girish Das.",
          headline_highlight: 'BUILDER',
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
