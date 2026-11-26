'use client';

import { useState, useEffect, useMemo, useRef, KeyboardEvent } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import {
  SiteProfile,
  RightNow,
  Experience,
  Education,
  TechStackGroup,
  Project,
  BlogPost,
  SupabaseDiagnostics,
} from '@/lib/types';
import AdminAuthCard from './AdminAuthCard';
import { ProfileEditor, RightNowEditor } from './ProfileAndNowEditors';
import { ExperienceAndEduEditor, TechStackEditor } from './CareerAndStackEditors';
import { ProjectsEditor, BlogEditor } from './ProjectsAndBlogEditors';
import DatabaseSetupPanel from './DatabaseSetupPanel';
import {
  Database,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';

interface AdminStudioProps {
  supabaseUrl: string;
  supabaseAnonKey: string;
  diagnostics: SupabaseDiagnostics;
  migrationSql: string;
  schemaSql: string;
  initialProfile: SiteProfile;
  initialRightNow: RightNow;
  initialExperiences: Experience[];
  initialEducation: Education[];
  initialTechStack: TechStackGroup[];
  initialProjects: Project[];
  initialPosts: BlogPost[];
}

type TabId =
  | 'profile'
  | 'rightnow'
  | 'career'
  | 'projects'
  | 'stacks'
  | 'blog'
  | 'setup';

const TABS: { id: TabId; label: string }[] = [
  { id: 'profile', label: 'Profile & Copy' },
  { id: 'rightnow', label: 'Right Now' },
  { id: 'career', label: 'Experience & Edu' },
  { id: 'projects', label: 'Projects' },
  { id: 'stacks', label: 'Stacks' },
  { id: 'blog', label: 'Blog Posts' },
  { id: 'setup', label: 'DB Setup & SQL' },
];

export default function AdminStudio({
  supabaseUrl,
  supabaseAnonKey,
  diagnostics,
  migrationSql,
  schemaSql,
  initialProfile,
  initialRightNow,
  initialExperiences,
  initialEducation,
  initialTechStack,
  initialProjects,
  initialPosts,
}: AdminStudioProps) {
  const client = useMemo(() => {
    if (!diagnostics.configured || !supabaseUrl || !supabaseAnonKey) return null;
    return createClient(supabaseUrl, supabaseAnonKey);
  }, [diagnostics.configured, supabaseUrl, supabaseAnonKey]);

  const [activeTab, setActiveTab] = useState<TabId>(
    diagnostics.needsMigration ? 'setup' : 'profile'
  );
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<SiteProfile>(initialProfile);
  const [rightNow, setRightNow] = useState<RightNow>(initialRightNow);
  const [experiences, setExperiences] =
    useState<Experience[]>(initialExperiences);
  const [educationList, setEducationList] =
    useState<Education[]>(initialEducation);
  const [techStack, setTechStack] = useState<TechStackGroup[]>(initialTechStack);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [refreshing, setRefreshing] = useState(false);

  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const loadAllFromSupabase = async () => {
    if (!client) return;
    setRefreshing(true);
    try {
      const [pRes, rnRes, expRes, eduRes, stackRes, projRes, postRes] =
        await Promise.all([
          client
            .from('site_profile')
            .select('*')
            .order('updated_at', { ascending: false })
            .limit(1)
            .maybeSingle(),
          client
            .from('right_now')
            .select('*')
            .order('updated_at', { ascending: false })
            .limit(1)
            .maybeSingle(),
          client
            .from('experiences')
            .select('*')
            .order('order_index', { ascending: true }),
          client
            .from('education')
            .select('*')
            .order('order_index', { ascending: true }),
          client
            .from('tech_stack')
            .select('*')
            .order('order_index', { ascending: true }),
          client
            .from('projects')
            .select('*')
            .order('order_index', { ascending: true }),
          client
            .from('posts')
            .select('*')
            .order('published_at', { ascending: false }),
        ]);

      if (!pRes.error && pRes.data) setProfile(pRes.data as SiteProfile);
      if (!rnRes.error && rnRes.data) setRightNow(rnRes.data as RightNow);
      if (!expRes.error && expRes.data && expRes.data.length > 0) {
        setExperiences(expRes.data as Experience[]);
      }
      if (!eduRes.error && eduRes.data && eduRes.data.length > 0) {
        setEducationList(eduRes.data as Education[]);
      }
      if (!stackRes.error && stackRes.data && stackRes.data.length > 0) {
        setTechStack(stackRes.data as TechStackGroup[]);
      }
      if (!projRes.error && projRes.data && projRes.data.length > 0) {
        setProjects(projRes.data as Project[]);
      }
      if (!postRes.error && postRes.data && postRes.data.length > 0) {
        setPosts(postRes.data as BlogPost[]);
      }
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!client) return;
    client.auth.getSession().then(({ data }) => {
      const email = data.session?.user?.email || null;
      setUserEmail(email);
      if (email) {
        loadAllFromSupabase();
      }
    });

    const { data: sub } = client.auth.onAuthStateChange((_event, session) => {
      const email = session?.user?.email || null;
      setUserEmail(email);
      if (email) {
        loadAllFromSupabase();
      }
    });

    return () => {
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  const selectTab = (id: TabId, el?: HTMLButtonElement | null) => {
    setActiveTab(id);
    if (el) {
      el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  };

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    let nextIdx: number | null = null;
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % TABS.length;
    else if (e.key === 'ArrowLeft')
      nextIdx = (idx - 1 + TABS.length) % TABS.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = TABS.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      const targetTab = TABS[nextIdx];
      const targetBtn = tabRefs.current[targetTab.id];
      selectTab(targetTab.id, targetBtn);
      targetBtn?.focus();
    }
  };

  const canEdit = Boolean(client && userEmail);

  return (
    <div className="space-y-6">
      {/* Studio Header Card */}
      <section className="neo-card-static bg-[#EDF3F7] rounded-2xl p-6 text-[#1C1917] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="w-8 h-8 rounded-lg bg-white border-[1.5px] border-[#292524] flex items-center justify-center">
                <Database className="w-4 h-4 text-[#1C1917]" aria-hidden="true" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
                Supabase CMS Studio
              </h1>
              {diagnostics.configured ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#E4F1E7] border border-[#1E5631]/30 text-[#1E5631]">
                  <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Supabase Connected</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-amber-100 border border-amber-400 text-amber-950">
                  <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Fallback Defaults Active</span>
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#44403C]">
              Every text block, heading, project write-up, stack card, résumé item, and blog post on your website is backed by Supabase PostgreSQL + Storage.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            {canEdit && (
              <button
                type="button"
                disabled={refreshing}
                onClick={loadAllFromSupabase}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-[#292524]/40 text-xs font-semibold text-[#1C1917] hover:bg-[#FBF9F5] min-h-[40px] whitespace-nowrap"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`}
                  aria-hidden="true"
                />
                <span>Refresh</span>
              </button>
            )}
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-[#292524]/40 text-xs font-semibold text-[#1C1917] hover:bg-[#FBF9F5] min-h-[40px] whitespace-nowrap"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
            {userEmail && client && (
              <button
                type="button"
                onClick={() => client.auth.signOut()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#1C1917] text-white text-xs font-semibold hover:opacity-90 min-h-[40px] whitespace-nowrap"
              >
                <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Sign Out ({userEmail})</span>
              </button>
            )}
          </div>
        </div>

        {diagnostics.needsMigration && (
          <div className="rounded-xl border border-amber-400 bg-amber-50 p-3.5 text-xs sm:text-sm text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
              Your connected Supabase database is missing new columns or tables. Run the non-destructive migration script to unlock every field cleanly.
            </span>
            <button
              type="button"
              onClick={() => selectTab('setup', tabRefs.current['setup'])}
              className="px-3.5 py-1.5 rounded-full bg-amber-900 text-white text-xs font-semibold shrink-0"
            >
              View Migration SQL →
            </button>
          </div>
        )}
      </section>

      {/* Sign In Card (if configured and not authenticated yet) */}
      {client && !userEmail && activeTab !== 'setup' && (
        <AdminAuthCard
          supabaseClient={client}
          onSignedIn={loadAllFromSupabase}
        />
      )}

      {/* Single-Row Scrollable Tablist (per tabs guide) */}
      <div
        role="tablist"
        aria-label="Supabase content sections"
        className="admin-tablist flex flex-nowrap items-center gap-1 overflow-x-auto border-b border-[#1C1917]/15 bg-[#FBF9F5]"
      >
        {TABS.map((tab, idx) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={(e) => selectTab(tab.id, e.currentTarget)}
              onKeyDown={(e) => handleTabKeyDown(e, idx)}
              className={`admin-tab px-4 py-2.5 text-sm whitespace-nowrap transition-colors ${
                isSelected
                  ? 'font-bold text-[#1C1917]'
                  : 'font-medium text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div
        role="tabpanel"
        aria-labelledby="tab-profile"
        hidden={activeTab !== 'profile'}
      >
        <ProfileEditor
          initialProfile={profile}
          supabaseClient={client}
          canEdit={canEdit}
          onSaved={setProfile}
        />
      </div>

      <div
        role="tabpanel"
        aria-labelledby="tab-rightnow"
        hidden={activeTab !== 'rightnow'}
      >
        <RightNowEditor
          initialRightNow={rightNow}
          supabaseClient={client}
          canEdit={canEdit}
          onSaved={setRightNow}
        />
      </div>

      <div
        role="tabpanel"
        aria-labelledby="tab-career"
        hidden={activeTab !== 'career'}
      >
        <ExperienceAndEduEditor
          experiences={experiences}
          educationList={educationList}
          supabaseClient={client}
          canEdit={canEdit}
          onExperiencesChange={setExperiences}
          onEducationChange={setEducationList}
        />
      </div>

      <div
        role="tabpanel"
        aria-labelledby="tab-projects"
        hidden={activeTab !== 'projects'}
      >
        <ProjectsEditor
          projects={projects}
          supabaseClient={client}
          canEdit={canEdit}
          onChange={setProjects}
        />
      </div>

      <div
        role="tabpanel"
        aria-labelledby="tab-stacks"
        hidden={activeTab !== 'stacks'}
      >
        <TechStackEditor
          stackGroups={techStack}
          supabaseClient={client}
          canEdit={canEdit}
          onChange={setTechStack}
        />
      </div>

      <div
        role="tabpanel"
        aria-labelledby="tab-blog"
        hidden={activeTab !== 'blog'}
      >
        <BlogEditor
          posts={posts}
          supabaseClient={client}
          canEdit={canEdit}
          onChange={setPosts}
        />
      </div>

      <div
        role="tabpanel"
        aria-labelledby="tab-setup"
        hidden={activeTab !== 'setup'}
      >
        <DatabaseSetupPanel
          diagnostics={diagnostics}
          migrationSql={migrationSql}
          schemaSql={schemaSql}
        />
      </div>
    </div>
  );
}
