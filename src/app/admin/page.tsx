import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminAuthCard from '@/components/admin/AdminAuthCard';
import AdminStudio from '@/components/admin/AdminStudio';
import {
  isAdminPasswordConfigured,
  verifyAdminSession,
} from '@/lib/admin-auth';
import {
  fetchAllAdminContent,
  getProtectedAdminDiagnostics,
} from '@/lib/supabase-admin';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Access',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

async function readSqlSafe(filename: string, fallbackText: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'supabase', filename);
    return await fs.readFile(filePath, 'utf8');
  } catch {
    return fallbackText;
  }
}

export default async function AdminPage() {
  // 1. Fail closed if ADMIN_PASSWORD / ADMIN_PASSWORD_HASH is not set on server
  if (!isAdminPasswordConfigured()) {
    return (
      <div className="min-h-dvh bg-[#FBF9F5] flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to portfolio</span>
          </Link>

          <section className="neo-card-static bg-white rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-100 border border-amber-400 flex items-center justify-center shrink-0">
                <ShieldAlert
                  className="w-4 h-4 text-amber-900"
                  aria-hidden="true"
                />
              </div>
              <h1 className="text-xl font-extrabold text-[#1C1917] font-display">
                Admin Not Configured
              </h1>
            </div>
            <p className="text-sm text-[#57534E] leading-relaxed">
              This route stays locked until server-side secrets are configured in your hosting environment. No password is stored in public code.
            </p>
            <div className="rounded-xl border border-[#1C1917]/15 bg-[#FBF9F5] p-4 text-xs text-[#44403C] space-y-2">
              <p className="font-bold text-[#1C1917]">
                In Vercel → Settings → Environment Variables (Server-Only):
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Add <code>ADMIN_PASSWORD</code> (Secret)
                </li>
                <li>
                  Add <code>SUPABASE_SERVICE_ROLE_KEY</code> (Secret)
                </li>
                <li>
                  Optional: <code>ADMIN_SESSION_SECRET</code> (32+ random chars)
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // 2. Enforce strict server-side signed HttpOnly session cookie BEFORE loading admin data or studio UI
  const isAuthed = await verifyAdminSession();
  if (!isAuthed) {
    return <AdminAuthCard />;
  }

  // 3. Only authenticated sessions receive database diagnostics, drafts, and editing controls
  const [content, diagnostics, migrationSql, schemaSql] = await Promise.all([
    fetchAllAdminContent(),
    getProtectedAdminDiagnostics(),
    readSqlSafe(
      'migrations_update.sql',
      '-- Open supabase/migrations_update.sql in your repository.'
    ),
    readSqlSafe(
      'schema.sql',
      '-- Open supabase/schema.sql in your repository.'
    ),
  ]);

  return (
    <div className="min-h-dvh flex flex-col bg-[#FBF9F5]">
      <Navbar
        logoText={content.profile.nav_logo || content.profile.name}
        avatarUrl={content.profile.avatar_url}
        statusBadge={content.profile.status_badge}
      />

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 focus:outline-none"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to Home</span>
        </Link>

        <AdminStudio
          diagnostics={diagnostics}
          migrationSql={migrationSql}
          schemaSql={schemaSql}
          initialProfile={content.profile}
          initialRightNow={content.rightNow}
          initialExperiences={content.experiences}
          initialEducation={content.education}
          initialTechStack={content.techStack}
          initialProjects={content.projects}
          initialPosts={content.posts}
        />
      </main>

      <Footer profile={content.profile} />
    </div>
  );
}
