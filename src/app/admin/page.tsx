import fs from 'node:fs/promises';
import path from 'node:path';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminStudio from '@/components/admin/AdminStudio';
import {
  getProfile,
  getRightNow,
  getExperiences,
  getEducation,
  getTechStack,
  getProjects,
  getPosts,
  getSupabaseDiagnostics,
} from '@/lib/data';
import { getPublicSupabaseConfig } from '@/lib/supabase';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function readSqlSafe(filename: string, fallbackText: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'supabase', filename);
    return await fs.readFile(filePath, 'utf8');
  } catch {
    return fallbackText;
  }
}

export default async function AdminPage() {
  const [
    profile,
    rightNow,
    experiences,
    education,
    techStack,
    projects,
    posts,
    diagnostics,
    migrationSql,
    schemaSql,
  ] = await Promise.all([
    getProfile(),
    getRightNow(),
    getExperiences(),
    getEducation(),
    getTechStack(),
    getProjects(),
    getPosts(),
    getSupabaseDiagnostics(),
    readSqlSafe(
      'migrations_update.sql',
      '-- Open supabase/migrations_update.sql in your repository.'
    ),
    readSqlSafe(
      'schema.sql',
      '-- Open supabase/schema.sql in your repository.'
    ),
  ]);

  const publicCfg = getPublicSupabaseConfig();

  return (
    <div className="min-h-dvh flex flex-col bg-[#FBF9F5]">
      <Navbar
        logoText={profile.nav_logo || profile.name}
        avatarUrl={profile.avatar_url}
        statusBadge={profile.status_badge}
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
          supabaseUrl={publicCfg.url}
          supabaseAnonKey={publicCfg.anonKey}
          diagnostics={diagnostics}
          migrationSql={migrationSql}
          schemaSql={schemaSql}
          initialProfile={profile}
          initialRightNow={rightNow}
          initialExperiences={experiences}
          initialEducation={education}
          initialTechStack={techStack}
          initialProjects={projects}
          initialPosts={posts}
        />
      </main>

      <Footer profile={profile} />
    </div>
  );
}
